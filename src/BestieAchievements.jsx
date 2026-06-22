import { useLanguage } from './context/LanguageContext.jsx';
import { useState, useEffect } from 'react';
import { getTranslation } from './translations/translations.js';

function BestieAchievements() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);

  const openModal = (cert) => {
    setSelectedCert(cert);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedCert(null);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const certificates = [
    {
      id: 1,
      image: '/certificates/certificate1.jpeg',
      name: language === 'es' ? 'Certificado 1' : 'Certificate 1'
    },
    {
      id: 2,
      image: '/certificates/certificate2.jpeg',
      name: language === 'es' ? 'Certificado 2' : 'Certificate 2'
    },
    {
      id: 3,
      image: '/certificates/certificate3.jpeg',
      name: language === 'es' ? 'Certificado 3' : 'Certificate 3'
    }
  ];

  return (
    <div className="space-y-12">
      <header className="rounded-[2rem] border border-light-border bg-white/80 p-8 shadow-soft-light dark:border-dark-primary/15 dark:bg-dark-card dark:shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-light-secondary">{t('achievements.title')}</p>
            <h1 className="mt-3 text-3xl font-semibold text-light-text-primary dark:text-dark-text-primary sm:text-4xl">{language === 'es' ? 'Logros y reconocimientos' : 'Achievements and recognition'}</h1>
          </div>
          <div className="rounded-full border border-light-border bg-white/75 px-4 py-2 text-sm text-light-text-secondary dark:border-dark-primary/15 dark:bg-dark-primary/10 dark:text-dark-text-secondary">
            {language === 'es' ? 'Documentación profesional' : 'Professional credentials'}
          </div>
        </div>
      </header>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-[2rem] border border-light-border bg-white/80 p-8 shadow-soft-light dark:border-dark-primary/15 dark:bg-dark-card dark:text-dark-text-primary dark:shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">{t('achievements.certificates')}</h2>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{language === 'es' ? 'Visualiza los certificados recientes' : 'Browse recent certificates'}</p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
            {certificates.map((cert) => (
              <button
                key={cert.id}
                type="button"
                onClick={() => openModal(cert)}
                className="group overflow-hidden rounded-3xl border border-light-border bg-white transition hover:border-light-primary dark:border-dark-primary/15 dark:bg-dark-card dark:hover:border-dark-primary"
              >
                  <div className="h-80 overflow-hidden bg-light-hover dark:bg-dark-bg-primary">
                    <img src={cert.image} alt={cert.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                  </div>
                  <p className="border-t border-light-border px-4 py-4 text-left text-sm font-medium text-light-text-primary dark:border-dark-primary/15 dark:text-dark-text-primary">{cert.name}</p>
              </button>
            ))}
          </div>
        </div>

          <div className="rounded-[2rem] border border-light-border bg-white/80 p-8 shadow-soft-light dark:border-dark-primary/15 dark:bg-dark-card dark:text-dark-text-primary dark:shadow-card">
          <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">{language === 'es' ? 'Resumen de logros' : 'Summary'}</h2>
          <div className="mt-6 space-y-5">
              <div className="rounded-3xl border border-light-border bg-white/90 p-5 dark:border-dark-primary/15 dark:bg-dark-bg-secondary/85">
                <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary">{language === 'es' ? 'Experiencia comprobada' : 'Proven experience'}</h3>
                <p className="mt-3 text-light-text-secondary dark:text-dark-text-secondary">{language === 'es' ? 'Más de 3 años en atención al cliente y ventas con resultados medibles y satisfacción del cliente.' : 'More than 3 years in customer service and sales with measurable results and high satisfaction.'}</p>
              </div>
              <div className="rounded-3xl border border-light-border bg-white/90 p-5 dark:border-dark-primary/15 dark:bg-dark-bg-secondary/85">
                <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary">{language === 'es' ? 'Educación continua' : 'Continuous education'}</h3>
                <p className="mt-3 text-light-text-secondary dark:text-dark-text-secondary">{language === 'es' ? 'Certificados en negociación intercultural, liderazgo y gestión de proyectos internacionales.' : 'Certificates in intercultural negotiation, leadership, and international project management.'}</p>
              </div>
              <div className="rounded-3xl border border-light-border bg-white/90 p-5 dark:border-dark-primary/15 dark:bg-dark-bg-secondary/85">
                <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary">{language === 'es' ? 'Habilidades destacadas' : 'Standout skills'}</h3>
                <p className="mt-3 text-light-text-secondary dark:text-dark-text-secondary">{language === 'es' ? 'Excelencia en comunicación, liderazgo de equipos y resolución de problemas bajo presión.' : 'Excellence in communication, team leadership, and problem-solving under pressure.'}</p>
              </div>
              <div className="rounded-3xl border border-light-border bg-white/90 p-5 dark:border-dark-primary/15 dark:bg-dark-bg-secondary/85">
                <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary">{language === 'es' ? 'Orientado a resultados' : 'Results oriented'}</h3>
                <p className="mt-3 text-light-text-secondary dark:text-dark-text-secondary">{language === 'es' ? 'Cumplimiento consistente de metas comerciales y de satisfacción de clientes con enfoque en excelencia.' : 'Consistent delivery of commercial targets and customer satisfaction with a focus on excellence.'}</p>
              </div>
          </div>
        </div>
      </section>

      {isOpen && selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-light-primary/20 p-6 backdrop-blur-sm dark:bg-dark-bg-primary/90">
          <div className="relative w-full max-w-6xl overflow-hidden rounded-[2rem] border border-light-border bg-white shadow-card-light dark:border-dark-primary/15 dark:bg-dark-card dark:shadow-2xl">
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              className="absolute right-5 top-5 rounded-full border border-light-border bg-white/90 px-3 py-2 text-light-text-primary transition hover:bg-light-hover hover:text-light-primary dark:border-dark-primary/20 dark:bg-dark-bg-primary/95 dark:text-dark-text-primary dark:hover:bg-dark-card-hover"
            >
              ×
            </button>
              <div className="w-full max-h-[80vh] bg-white/90 dark:bg-dark-bg-primary flex items-center justify-center">
                <img src={selectedCert.image} alt={selectedCert.name} className="max-h-[80vh] w-full object-contain" />
              </div>
            <div className="border-t border-light-border px-8 py-6 text-light-text-secondary dark:border-dark-primary/15 dark:text-dark-text-primary">
              <p className="font-semibold text-light-text-primary dark:text-dark-text-primary">{selectedCert.name}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BestieAchievements;
