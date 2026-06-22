import { useLanguage } from './context/LanguageContext.jsx';
import { getTranslation } from './translations/translations.js';

function AboutMyBestie() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  return (
    <div className="space-y-14">
      <section className="rounded-[2rem] border border-light-border bg-white/80 p-8 shadow-soft-light sm:p-10 dark:border-dark-primary/15 dark:bg-dark-card dark:text-dark-text-primary dark:shadow-soft">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-light-secondary dark:text-dark-text-secondary">{t('about.profile')}</p>
            <h1 className="mt-4 text-3xl font-semibold text-pink-700 dark:text-dark-text-primary sm:text-4xl">{t('about.title')}</h1>
          </div>
          <div className="rounded-3xl border border-light-border bg-white/70 px-5 py-4 text-sm text-light-primary dark:border-dark-primary/15 dark:bg-dark-bg-secondary/70 dark:text-dark-text-secondary">
            {language === 'es' ? 'Perfil profesional con impacto' : 'Impactful professional profile'}
          </div>
        </div>
        <p className="mt-6 max-w-3xl text-base leading-8 text-light-text-secondary dark:text-dark-text-secondary">{t('about.profileText')}</p>
      </section>

      
      <section className="rounded-[2rem] border border-light-border bg-white/80 p-8 shadow-soft-light sm:p-10 dark:border-dark-primary/15 dark:bg-dark-card dark:text-dark-text-primary dark:shadow-soft">
        <h2 className="text-3xl font-semibold text-pink-700 dark:text-dark-text-primary">
          {language === 'es' ? 'Áreas de competencia' : 'Areas of competence'}
        </h2>
        
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <article className="rounded-3xl border border-light-border bg-white/80 p-8 shadow-soft-light transition hover:-translate-y-1 hover:shadow-card-light dark:border-dark-primary/15 dark:bg-dark-card dark:text-dark-text-primary dark:shadow-card">
            <h3 className="text-base font-semibold text-pink-700 dark:text-dark-text-primary">{t('about.commerce')}</h3>
            <p className="mt-4 text-light-text-secondary dark:text-dark-text-secondary">{t('about.commerceText')}</p>
          </article>
          <article className="rounded-3xl border border-light-border bg-white/80 p-8 shadow-soft-light transition hover:-translate-y-1 hover:shadow-card-light dark:border-dark-primary/15 dark:bg-dark-card dark:text-dark-text-primary dark:shadow-card">
            <h3 className="text-base font-semibold text-pink-700 dark:text-dark-text-primary">{t('about.management')}</h3>
            <p className="mt-4 text-light-text-secondary dark:text-dark-text-secondary">{t('about.managementText')}</p>
          </article>
          <article className="rounded-3xl border border-light-border bg-white/80 p-8 shadow-soft-light transition hover:-translate-y-1 hover:shadow-card-light dark:border-dark-primary/15 dark:bg-dark-card dark:text-dark-text-primary dark:shadow-card">
            <h3 className="text-base font-semibold text-pink-700 dark:text-dark-text-primary">{t('about.interpersonal')}</h3>
            <p className="mt-4 text-light-text-secondary dark:text-dark-text-secondary">{t('about.interpersonalText')}</p>
          </article>
        </div>
      </section>

      <section className="rounded-[2rem] border border-light-border bg-white/80 p-8 shadow-soft-light sm:p-10 dark:border-dark-primary/15 dark:bg-dark-card dark:text-dark-text-primary dark:shadow-soft">
        <h2 className="text-3xl font-semibold text-pink-700 dark:text-dark-text-primary">
          {language === 'es' ? 'Experiencia laboral' : 'Work experience'}
        </h2>
        <div className="mt-8 space-y-6">
          <article className="rounded-3xl border border-light-border bg-white/80 p-6 shadow-soft-light md:p-8 dark:border-dark-primary/15 dark:bg-dark-card dark:text-dark-text-primary dark:shadow-card">
            <h3 className="text-xl font-semibold text-pink-700 dark:text-dark-text-primary">{t('experience.salesAdvisor')}</h3>
            <p className="mt-2 text-sm uppercase tracking-[0.25em] text-light-secondary dark:text-dark-secondary">{t('experience.company1')} · {t('experience.company1Current')}</p>
            <p className="mt-4 text-light-text-secondary dark:text-dark-text-secondary">{t('experience.company1Desc')}</p>
          </article>
          <article className="rounded-3xl border border-light-border bg-white/80 p-6 shadow-soft-light md:p-8 dark:border-dark-primary/15 dark:bg-dark-card dark:text-dark-text-primary dark:shadow-card">
            <h3 className="text-xl font-semibold text-pink-700 dark:text-dark-text-primary">{t('experience.englishTeacher')}</h3>
            <p className="mt-2 text-sm uppercase tracking-[0.25em] text-light-secondary dark:text-dark-secondary">{t('experience.company2')} · {t('experience.company2Current')}</p>
            <p className="mt-4 text-light-text-secondary dark:text-dark-text-secondary">{t('experience.company2Desc')}</p>
          </article>
          <article className="rounded-3xl border border-light-border bg-white/80 p-6 shadow-soft-light md:p-8 dark:border-dark-primary/15 dark:bg-dark-card dark:text-dark-text-primary dark:shadow-card">
            <h3 className="text-xl font-semibold text-pink-700 dark:text-dark-text-primary">{t('experience.logistics')}</h3>
            <p className="mt-2 text-sm uppercase tracking-[0.25em] text-light-secondary dark:text-dark-secondary">{t('experience.company3')}</p>
            <p className="mt-4 text-light-text-secondary dark:text-dark-text-secondary">{t('experience.company3Desc')}</p>
          </article>
        </div>
      </section>

      <section className="rounded-[2rem] border border-light-border bg-white/80 p-8 shadow-soft-light sm:p-10 dark:border-dark-primary/15 dark:bg-dark-card dark:text-dark-text-primary dark:shadow-soft">
        <h2 className="text-3xl font-semibold text-pink-700 dark:text-dark-text-primary">
          {language === 'es' ? 'Formación académica' : 'Academic education'}
        </h2>
        <div className="mt-8 rounded-3xl border border-light-border bg-white/80 p-6 shadow-soft-light md:p-8 dark:border-dark-primary/15 dark:bg-dark-card dark:text-dark-text-primary dark:shadow-card">
          <h3 className="text-xl font-semibold text-pink-700 dark:text-dark-text-primary">{t('education.degree')}</h3>
          <p className="mt-2 text-light-text-secondary dark:text-dark-text-secondary">{t('education.semester')}</p>
        </div>
      </section>
    </div>
  );
}

export default AboutMyBestie;