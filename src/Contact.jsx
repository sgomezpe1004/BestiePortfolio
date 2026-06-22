import { useState } from 'react';
import { useLanguage } from './context/LanguageContext.jsx';
import { getTranslation } from './translations/translations.js';

function Contact() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:contacto@ejemplo.com?subject=${encodeURIComponent(`${language === 'es' ? 'Mensaje de' : 'Message from'} ${formData.name}`)}&body=${encodeURIComponent(formData.message)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="space-y-12">
      <header className="rounded-[2rem] border border-light-border bg-white/80 p-8 shadow-soft-light dark:border-dark-primary/15 dark:bg-dark-card dark:text-dark-text-primary dark:shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-light-secondary">{t('contact.title')}</p>
            <h1 className="mt-3 text-3xl font-semibold text-light-text-primary sm:text-4xl dark:text-dark-text-primary">{language === 'es' ? 'Hablemos de tu proyecto' : "Let's discuss your project"}</h1>
          </div>
          <div className="rounded-full border border-light-border bg-white/75 px-4 py-2 text-sm text-light-primary dark:border-dark-primary/15 dark:bg-dark-primary/10 dark:text-dark-text-secondary">
            {language === 'es' ? 'Disponible para oportunidades' : 'Open to new opportunities'}
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-light-border bg-white/80 p-8 shadow-soft-light dark:border-dark-primary/15 dark:bg-dark-card dark:text-dark-text-primary dark:shadow-card">
          <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">{language === 'es' ? 'Información de contacto' : 'Contact information'}</h2>
          <div className="mt-8 space-y-5">
            <div className="rounded-3xl border border-light-border bg-white/70 p-6 dark:border-dark-primary/15 dark:bg-dark-bg-secondary/70 dark:text-dark-text-primary">
              <p className="text-sm uppercase tracking-[0.35em] text-light-secondary">{t('contact.phone')}</p>
              <p className="mt-3 text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">+57 302 2584585</p>
            </div>
            <div className="rounded-3xl border border-light-border bg-white/70 p-6 dark:border-dark-primary/15 dark:bg-dark-bg-secondary/70 dark:text-dark-text-primary">
              <p className="text-sm uppercase tracking-[0.35em] text-light-secondary">{t('contact.email')}</p>
              <p className="mt-3 text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">{language === 'es' ? 'hdezmaria1004@gmail.com' : 'Available in the form'}</p>
            </div>
            <div className="rounded-3xl border border-light-border bg-white/70 p-6 dark:border-dark-primary/15 dark:bg-dark-bg-secondary/70 dark:text-dark-text-primary">
              <p className="text-sm uppercase tracking-[0.35em] text-light-secondary">{t('contact.location')}</p>
              <p className="mt-3 text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">{t('contact.colombia')}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-[2rem] border border-light-border bg-white/80 p-8 shadow-soft-light dark:border-dark-primary/15 dark:bg-dark-card dark:text-dark-text-primary dark:shadow-card">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-light-secondary">{t('contact.message')}</p>
            <p className="mt-3 text-light-text-secondary dark:text-dark-text-secondary">{language === 'es' ? 'Envíame un mensaje y te responderé pronto.' : 'Send me a message and I will reply soon.'}</p>
          </div>
          <div className="grid gap-5">
            <label className="space-y-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
              <span>{t('contact.name')}</span>
              <input
                type="text"
                name="name"
                placeholder={t('contact.nameInput')}
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border border-light-border bg-white/90 px-4 py-3 text-light-text-primary placeholder:text-light-text-secondary focus:border-light-primary focus:outline-none focus:ring-2 focus:ring-light-primary/20 dark:border-dark-primary/15 dark:bg-dark-bg-primary/90 dark:text-dark-text-primary"
              />
            </label>
            <label className="space-y-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
              <span>{language === 'es' ? 'Mensaje' : 'Message'}</span>
              <textarea
                name="message"
                rows="6"
                placeholder={t('contact.messageInput')}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border border-light-border bg-white/90 px-4 py-3 text-light-text-primary placeholder:text-light-text-secondary focus:border-light-primary focus:outline-none focus:ring-2 focus:ring-light-primary/20 dark:border-dark-primary/15 dark:bg-dark-bg-primary/90 dark:text-dark-text-primary"
              />
            </label>
          </div>
          <button
            type="submit"
            className="rounded-full bg-gradient-to-r from-light-primary to-light-secondary px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:opacity-90 dark:from-dark-primary dark:to-dark-secondary"
          >
            {t('contact.send')}
          </button>
          <p className="rounded-3xl border border-light-border bg-white/70 px-5 py-4 text-sm text-light-text-secondary dark:border-dark-primary/15 dark:bg-dark-bg-secondary/70 dark:text-dark-text-secondary">
            {language === 'es' ? 'Al enviar este formulario, se abrirá tu cliente de correo predeterminado.' : 'Submitting this form will open your default email client.'}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Contact;