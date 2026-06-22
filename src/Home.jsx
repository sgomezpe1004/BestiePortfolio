import { useLanguage } from './context/LanguageContext.jsx';
import { getTranslation } from './translations/translations.js';

function Home({ onNavigate }) {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  return (
    <div className="space-y-16">
      <section className="grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-pink-100 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-pink-600 dark:border-dark-primary/20 dark:bg-dark-primary/10 dark:text-dark-secondary">
            {language === 'es' ? 'Portafolio profesional' : 'Professional portfolio'}
          </span>
          <h1 className="max-w-3xl text-4xl font-display font-extrabold tracking-tight text-pink-700 dark:text-dark-text-primary sm:text-5xl">
            {t('header.title')}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-light-text-secondary dark:text-dark-text-secondary">
            {t('header.subtitle')}
          </p>
          <p className="max-w-2xl text-base leading-7 text-light-text-secondary dark:text-dark-text-secondary">
            {t('header.bio')}
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="rounded-full bg-gradient-to-r from-light-primary to-light-secondary px-6 py-3 text-sm font-semibold text-white shadow-soft-light transition hover:-translate-y-0.5 hover:opacity-90 dark:from-dark-primary dark:to-dark-secondary dark:hover:shadow-glow"
            >
              {t('contact.title')}
            </button>
            <button
              onClick={() => onNavigate('achievements')}
              className="rounded-full border border-light-border bg-white px-6 py-3 text-sm font-semibold text-light-primary transition hover:-translate-y-0.5 hover:bg-light-hover dark:border-dark-primary/20 dark:bg-white/[0.03] dark:text-dark-text-primary dark:hover:border-dark-primary dark:hover:bg-dark-primary/12"
            >
              {t('achievements.title')}
            </button>
          </div>
        </div>

        <div className="hero-image relative overflow-hidden rounded-[2rem] border border-light-border bg-white/80 shadow-soft-light dark:border-dark-primary/15 dark:bg-dark-card dark:shadow-soft">
          <img
            src="/bestie.jpeg"
            alt="María Belén Hernández Caro"
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="rounded-3xl border border-light-border bg-white/75 p-8 shadow-soft-light transition hover:-translate-y-1 hover:shadow-card-light dark:border-dark-primary/15 dark:bg-dark-card dark:text-dark-text-primary dark:shadow-card dark:hover:border-dark-primary/35 dark:hover:bg-dark-card-hover">
          <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-pink-600 dark:text-dark-secondary">
            {t('contact.phone')}
          </h2>
          <p className="mt-4 text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">+57 302 2584585</p>
        </article>
        <article className="rounded-3xl border border-light-border bg-white/75 p-8 shadow-soft-light transition hover:-translate-y-1 hover:shadow-card-light dark:border-dark-primary/15 dark:bg-dark-card dark:text-dark-text-primary dark:shadow-card dark:hover:border-dark-primary/35 dark:hover:bg-dark-card-hover">
          <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-pink-600 dark:text-dark-secondary">
            {t('contact.email')}
          </h2>
          <p className="mt-4 text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">hdezmaria1004@gmail.com</p>
        </article>
        <article className="rounded-3xl border border-light-border bg-white/75 p-8 shadow-soft-light transition hover:-translate-y-1 hover:shadow-card-light dark:border-dark-primary/15 dark:bg-dark-card dark:text-dark-text-primary dark:shadow-card dark:hover:border-dark-primary/35 dark:hover:bg-dark-card-hover">
          <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-pink-600 dark:text-dark-secondary">
            {t('contact.location')}
          </h2>
          <p className="mt-4 text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">{t('contact.colombia')}</p>
        </article>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">{t('skills.title')}</h2>
          <div className="h-px flex-1 bg-pink-100 dark:bg-dark-primary/20 sm:block" />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-light-border bg-white/80 p-8 shadow-soft-light transition hover:-translate-y-1 hover:shadow-card-light dark:border-dark-primary/15 dark:bg-dark-card dark:text-dark-text-primary dark:shadow-card dark:hover:border-dark-primary/35 dark:hover:bg-dark-card-hover">
            <h3 className="text-base font-semibold text-light-primary dark:text-dark-secondary">{t('skills.languages')}</h3>
            <ul className="mt-4 space-y-2 text-light-text-secondary dark:text-dark-text-secondary">
              <li>{t('skills.spanish')}</li>
              <li>{t('skills.english')}</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-light-border bg-white/80 p-8 shadow-soft-light transition hover:-translate-y-1 hover:shadow-card-light dark:border-dark-primary/15 dark:bg-dark-card dark:text-dark-text-primary dark:shadow-card dark:hover:border-dark-primary/35 dark:hover:bg-dark-card-hover">
            <h3 className="text-base font-semibold text-light-primary dark:text-dark-secondary">{t('skills.professional')}</h3>
            <ul className="mt-4 space-y-2 text-light-text-secondary dark:text-dark-text-secondary">
              <li>Comunicación efectiva / Effective communication</li>
              <li>Oratoria y expresión oral / Public speaking</li>
              <li>Ventas y negociación / Sales & negotiation</li>
              <li>Atención al cliente / Customer service</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-light-border bg-white/80 p-8 shadow-soft-light transition hover:-translate-y-1 hover:shadow-card-light dark:border-dark-primary/15 dark:bg-dark-card dark:text-dark-text-primary dark:shadow-card dark:hover:border-dark-primary/35 dark:hover:bg-dark-card-hover">
            <h3 className="text-base font-semibold text-light-primary dark:text-dark-secondary">{t('skills.personal')}</h3>
            <ul className="mt-4 space-y-2 text-light-text-secondary dark:text-dark-text-secondary">
              <li>Liderazgo / Leadership</li>
              <li>Adaptabilidad / Adaptability</li>
              <li>Aprendizaje rápido / Quick learning</li>
              <li>Resiliencia / Resilience</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;