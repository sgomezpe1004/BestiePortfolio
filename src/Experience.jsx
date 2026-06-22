import { useLanguage } from './context/LanguageContext.jsx';
import { getTranslation } from './translations/translations.js';

function Experience() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  return (
    <div className="space-y-10">
      <header className="rounded-[2rem] border border-light-border bg-white/80 p-8 shadow-soft-light dark:border-dark-primary/15 dark:bg-dark-card dark:text-dark-text-primary dark:shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-light-secondary dark:text-dark-text-secondary">
              {language === 'es' ? 'Experiencia laboral' : 'Work experience'}
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-light-text-primary dark:text-dark-text-primary sm:text-4xl">
              {t('experience.title')}
            </h1>
          </div>
          <div className="rounded-full border border-light-border bg-white/75 px-4 py-2 text-sm text-light-text-secondary dark:border-dark-primary/15 dark:bg-dark-primary/10 dark:text-dark-text-secondary">
            {language === 'es' ? 'Profesional y enfocado' : 'Professional and focused'}
          </div>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-3">
        <article className="rounded-3xl border border-light-border bg-white/80 p-8 shadow-soft-light transition hover:-translate-y-1 hover:shadow-card-light dark:border-dark-primary/15 dark:bg-dark-card dark:shadow-card">
          <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">{t('experience.salesAdvisor')}</h2>
          <p className="mt-3 text-sm uppercase tracking-[0.25em] text-light-secondary dark:text-dark-secondary">{t('experience.company1')} · {t('experience.company1Current')}</p>
          <p className="mt-5 text-light-text-secondary dark:text-dark-text-secondary">{t('experience.company1Desc')}</p>
        </article>
        <article className="rounded-3xl border border-light-border bg-white/80 p-8 shadow-soft-light transition hover:-translate-y-1 hover:shadow-card-light dark:border-dark-primary/15 dark:bg-dark-card dark:shadow-card">
          <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">{t('experience.englishTeacher')}</h2>
          <p className="mt-3 text-sm uppercase tracking-[0.25em] text-light-secondary dark:text-dark-secondary">{t('experience.company2')} · {t('experience.company2Current')}</p>
          <p className="mt-5 text-light-text-secondary dark:text-dark-text-secondary">{t('experience.company2Desc')}</p>
        </article>
        <article className="rounded-3xl border border-light-border bg-white/80 p-8 shadow-soft-light transition hover:-translate-y-1 hover:shadow-card-light dark:border-dark-primary/15 dark:bg-dark-card dark:shadow-card">
          <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">{t('experience.logistics')}</h2>
          <p className="mt-3 text-sm uppercase tracking-[0.25em] text-light-secondary dark:text-dark-secondary">{t('experience.company3')}</p>
          <p className="mt-5 text-light-text-secondary dark:text-dark-text-secondary">{t('experience.company3Desc')}</p>
        </article>
      </div>
    </div>
  );
}

export default Experience;
