export const translations = {
  es: {
    nav: {
      home: 'Inicio',
      experience: 'Experiencia',
      about: 'Acerca de',
      achievements: 'Logros',
      contact: 'Contacto'
    },
    header: {
      title: 'María Belén Hernández Caro',
      subtitle: 'Estudiante de Negocios Internacionales | Especialista en Atención al Cliente y Liderazgo',
      bio: 'Estudiante de sexto semestre de Negocios Internacionales con capacidad comunicativa y de liderazgo excepcionales. Experiencia en atención al cliente, ventas y docencia de inglés.'
    },
    about: {
      title: 'Acerca de Mí',
      profile: 'Perfil Profesional',
      profileText: 'Estudiante de sexto semestre de Negocios Internacionales con un perfil dinámico, proactivo y una destacada capacidad comunicativa y de liderazgo. Poseo una excelente oratoria y facilidad para hablar en público, lo que me permite transmitir ideas y proyectos con claridad y efectividad.',
      competencies: 'Áreas de Competencia',
      commerce: 'Comercio y Negocios',
      commerceText: 'Comercio internacional, negocios globales, análisis de mercados, negociación intercultural',
      management: 'Gestión y Estrategia',
      managementText: 'Gestión organizacional, análisis económico, planificación de eventos',
      interpersonal: 'Habilidades Interpersonales',
      interpersonalText: 'Liderazgo de equipos, comunicación efectiva, adaptabilidad y resiliencia'
    },
    experience: {
      title: 'Experiencia Laboral',
      salesAdvisor: 'Asesora de Ventas y Atención al Cliente',
      company1: 'Cero Pecado (Isla de Postres)',
      company1Current: 'Junio 2026',
      company1Desc: 'Atención directa al cliente con asesoría personalizada. Ejecución de estrategias de venta cruzada para alcanzar metas comerciales. Gestión de caja y control de calidad para garantizar una experiencia de compra excepcional y fidelizar clientes.',
      englishTeacher: 'Profesora de Inglés (Independiente)',
      company2: 'Educación Particular para Niños y Adultos',
      company2Current: 'Actualidad',
      company2Desc: 'Diseño y ejecución de programas académicos personalizados, implementación de metodologías dinámicas.',
      logistics: 'Asistente de Logística y Organización de Eventos',
      company3: 'Proyectos Diversos',
      company3Desc: 'Coordinación de actividades operativas y apoyo logístico integral en eventos.'
    },
    education: {
      title: 'Formación Académica',
      degree: 'Pregrado en Negocios Internacionales',
      semester: '6° Semestre en curso'
    },
    skills: {
      title: 'Habilidades y Fortalezas',
      professional: 'Habilidades Profesionales',
      personal: 'Fortalezas Personales',
      languages: 'Idiomas',
      spanish: 'Español - Nativo',
      english: 'Inglés - Avanzado (C1/C2)'
    },
    achievements: {
      title: 'Logros y Certificados',
      certificates: 'Mis Certificados'
    },
    contact: {
      title: 'Contacto',
      phone: 'Teléfono',
      email: 'Correo Electrónico',
      location: 'Ubicación',
      message: 'Envíame un mensaje',
      name: 'Nombre',
      nameInput: 'Tu nombre',
      emailInput: 'Tu correo',
      messageInput: 'Tu mensaje',
      send: 'Enviar',
      colombia: 'Montería, Colombia'
    },
    footer: {
      copyrightHolder: 'María Belén Hernández Caro',
      rights: 'Todos los derechos reservados'
    }
  },
  en: {
    nav: {
      home: 'Home',
      experience: 'Experience',
      about: 'About',
      achievements: 'Achievements',
      contact: 'Contact'
    },
    header: {
      title: 'María Belén Hernández Caro',
      subtitle: 'International Business Student | Customer Service Specialist and Leadership Expert',
      bio: 'Sixth-semester International Business student with exceptional communication and leadership skills. Experience in customer service, sales and English teaching.'
    },
    about: {
      title: 'About Me',
      profile: 'Professional Profile',
      profileText: 'Sixth-semester International Business student with a dynamic, proactive profile and outstanding communication and leadership skills. Excellent public speaking ability that allows me to convey ideas and projects with clarity and effectiveness.',
      competencies: 'Areas of Competence',
      commerce: 'Commerce and Business',
      commerceText: 'International commerce, global business, market analysis, intercultural negotiation',
      management: 'Management and Strategy',
      managementText: 'Organizational management, economic analysis, event planning',
      interpersonal: 'Interpersonal Skills',
      interpersonalText: 'Team leadership, effective communication, adaptability and resilience'
    },
    experience: {
      title: 'Work Experience',
      salesAdvisor: 'Sales Advisor and Customer Service',
      company1: 'Cero Pecado (Dessert Island)',
      company1Current: 'June 2026',
      company1Desc: 'Direct customer service with personalized advice. Execution of cross-selling strategies to achieve sales goals. Cash management and quality control to ensure an exceptional shopping experience and foster customer loyalty.',
      englishTeacher: 'English Teacher (Freelance)',
      company2: 'Private Education for Children and Adults',
      company2Current: 'Present',
      company2Desc: 'Design and execution of personalized academic programs, implementation of dynamic methodologies.',
      logistics: 'Logistics and Event Organization Assistant',
      company3: 'Various Projects',
      company3Desc: 'Coordination of operational activities and comprehensive logistics support for events.'
    },
    education: {
      title: 'Academic Background',
      degree: 'Bachelor\'s Degree in International Business',
      semester: '6th Semester in Progress'
    },
    skills: {
      title: 'Skills and Strengths',
      professional: 'Professional Skills',
      personal: 'Personal Strengths',
      languages: 'Languages',
      spanish: 'Spanish - Native',
      english: 'English - Advanced (C1/C2)'
    },
    achievements: {
      title: 'Achievements and Certificates',
      certificates: 'My Certificates'
    },
    contact: {
      title: 'Contact',
      phone: 'Phone',
      email: 'Email',
      location: 'Location',
      message: 'Send me a message',
      name: 'Name',
      nameInput: 'Your name',
      emailInput: 'Your email',
      messageInput: 'Your message',
      send: 'Send',
      colombia: 'Montería, Colombia'
    },
    footer: {
      copyrightHolder: 'María Belén Hernández Caro',
      rights: 'All rights reserved'
    }
  }
};

export const getTranslation = (language, key) => {
  const keys = key.split('.');
  let value = translations[language];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};