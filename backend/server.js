import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import OpenAI from 'openai';

// ── Models ─────────────────────────────────────────────────────────
import User from './models/user_model.js';
import ChatSession from './models/session_model.js';

const app = express();

app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// ── MongoDB ────────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => console.error('Error conectando MongoDB:', err));

// ── OpenAI ─────────────────────────────────────────────────────────
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ══════════════════════════════════════════════════════════════════
// HEALTH CHECK
// ══════════════════════════════════════════════════════════════════
app.get('/', (req, res) => {
  res.json({ message: 'Servidor funcionando' });
});

// ══════════════════════════════════════════════════════════════════
// USERS
// ══════════════════════════════════════════════════════════════════

// POST /api/users/sync
// Crea el usuario si no existe (llamar al hacer login con Clerk)
app.post('/api/users/sync', async (req, res) => {
  try {
    const { clerkId, email, name } = req.body;

    if (!clerkId || !email) {
      return res.status(400).json({ error: 'clerkId y email son requeridos' });
    }

    let user = await User.findOne({ clerkId });

    if (!user) {
      user = await User.create({ clerkId, email, name });
    } else {
      // Actualizar nombre/email si cambió en Clerk
      user.email = email;
      user.name = name;
      await user.save();
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sincronizando usuario' });
  }
});

// GET /api/users/:clerkId
// Obtener usuario por clerkId
app.get('/api/users/:clerkId', async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.params.clerkId });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo usuario' });
  }
});

// ══════════════════════════════════════════════════════════════════
// CHAT SESSIONS
// ══════════════════════════════════════════════════════════════════

// GET /api/sessions/:clerkId
// Obtener todas las sesiones de un usuario
app.get('/api/sessions/:clerkId', async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.params.clerkId });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const sessions = await ChatSession.find({ userId: user._id })
      .sort({ updatedAt: -1 })
      .select('-messages'); // Sin mensajes para la lista (más ligero)

    res.json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo sesiones' });
  }
});

// GET /api/sessions/:clerkId/:sessionId
// Obtener una sesión con todos sus mensajes
app.get('/api/sessions/:clerkId/:sessionId', async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.params.clerkId });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const session = await ChatSession.findOne({
      _id: req.params.sessionId,
      userId: user._id,
    });

    if (!session) return res.status(404).json({ error: 'Sesión no encontrada' });

    res.json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo sesión' });
  }
});

// POST /api/sessions/:clerkId
// Crear nueva sesión de chat
app.post('/api/sessions/:clerkId', async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.params.clerkId });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const { name } = req.body;

    const session = await ChatSession.create({
      userId: user._id,
      name: name || 'New chat',
      messages: [],
    });

    res.status(201).json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creando sesión' });
  }
});

// PATCH /api/sessions/:clerkId/:sessionId/rename
// Renombrar una sesión
app.patch('/api/sessions/:clerkId/:sessionId/rename', async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.params.clerkId });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Nombre requerido' });

    const session = await ChatSession.findOneAndUpdate(
      { _id: req.params.sessionId, userId: user._id },
      { name },
      { new: true }
    );

    if (!session) return res.status(404).json({ error: 'Sesión no encontrada' });

    res.json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error renombrando sesión' });
  }
});

// DELETE /api/sessions/:clerkId/:sessionId
// Eliminar una sesión
app.delete('/api/sessions/:clerkId/:sessionId', async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.params.clerkId });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const session = await ChatSession.findOneAndDelete({
      _id: req.params.sessionId,
      userId: user._id,
    });

    if (!session) return res.status(404).json({ error: 'Sesión no encontrada' });

    res.json({ message: 'Sesión eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error eliminando sesión' });
  }
});

// ══════════════════════════════════════════════════════════════════
// MESSAGES
// ══════════════════════════════════════════════════════════════════

// POST /api/sessions/:clerkId/:sessionId/messages
// Añadir un mensaje a una sesión
app.post('/api/sessions/:clerkId/:sessionId/messages', async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.params.clerkId });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const { role, content } = req.body;
    if (!role || !content) {
      return res.status(400).json({ error: 'role y content son requeridos' });
    }

    const session = await ChatSession.findOneAndUpdate(
      { _id: req.params.sessionId, userId: user._id },
      {
        $push: { messages: { role, content } },
        // Auto-renombrar con el primer mensaje del usuario
        $set: { name: undefined },
      },
      { new: true }
    );

    if (!session) return res.status(404).json({ error: 'Sesión no encontrada' });

    // Auto-renombrar con el primer mensaje si la sesión se llama "New chat"
    if (role === 'user' && (session.name === 'New chat' || session.name === 'Nuevo chat')) {
      session.name = content.slice(0, 40);
      await session.save();
    }

    res.json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error añadiendo mensaje' });
  }
});

// ══════════════════════════════════════════════════════════════════
// OPENAI CHAT
// ══════════════════════════════════════════════════════════════════

// POST /api/chat
// Chat con OpenAI (sin persistencia, para uso rápido)
app.post('/api/chat', async (req, res) => {
  try {
    const { prompt, messages, system } = req.body;

    const messagesArray = [
      { role: 'system', content: system || 'You are a helpful assistant.' },
      ...(messages || []).map(m => ({ role: m.role, content: m.content })),
      { role: 'user', content: prompt },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messagesArray,
      temperature: 0.7,
      max_tokens: 300, // Reducido para respuestas más cortas
    });

    res.json({ text: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error en OpenAI:', error);
    res.status(500).json({ error: 'Failed to communicate with OpenAI' });
  }
});

// ── Start ──────────────────────────────────────────────────────────
app.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001');
});