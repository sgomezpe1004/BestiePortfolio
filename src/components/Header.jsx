import { useLanguage } from '../context/LanguageContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { getTranslation } from '../translations/translations.js';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react';
import { UserIcon } from 'lucide-react';

function Header({ onNavigate, activeSection }) {
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = (key) => getTranslation(language, key);

  const navItems = [
    { key: 'home', label: t('nav.home') },
    { key: 'about', label: t('nav.about') },
    { key: 'experience', label: t('nav.experience') },
    { key: 'achievements', label: t('nav.achievements') },
    { key: 'contact', label: t('nav.contact') },
    { key: 'ai', label: language === 'es' ? 'Asistente de portafolio' : 'Portfolio Assistant' }
  ];

  const btnBase = 'rounded-full border border-light-border bg-white/80 px-4 py-2 text-sm font-medium text-light-text-primary transition hover:bg-light-hover hover:text-light-primary dark:border-dark-primary/15 dark:bg-white/[0.03] dark:text-dark-text-primary dark:hover:-translate-y-0.5 dark:hover:border-dark-primary dark:hover:bg-dark-primary/12';

  return (
    <header className="sticky top-0 z-50 border-b border-light-border bg-white/95 backdrop-blur-xl dark:border-dark-primary/15 dark:bg-dark-bg-primary/85">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <button
          onClick={() => onNavigate('home')}
          className="text-sm font-extrabold uppercase tracking-[0.32em] text-light-primary transition hover:underline dark:text-dark-text-primary"
        >
          MARÍA BELÉN HERNÁNDEZ CARO
        </button>

        <nav className="hidden items-center gap-3 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'border border-light-border bg-light-hover text-light-primary shadow-sm dark:border-dark-primary dark:bg-dark-primary/12 dark:text-dark-text-primary dark:-translate-y-0.5'
                    : 'border border-light-border bg-white/80 text-light-text-primary hover:border-light-border hover:bg-light-hover hover:text-light-primary dark:border-dark-primary/15 dark:bg-white/[0.03] dark:text-dark-text-primary dark:hover:-translate-y-0.5 dark:hover:border-dark-primary dark:hover:bg-dark-primary/12'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={toggleLanguage} className={btnBase} title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}>
            {language === 'es' ? 'ES' : 'EN'}
          </button>
          <button onClick={toggleTheme} className={btnBase} title={theme === 'dark' ? 'Light mode' : 'Dark mode'}>
            {theme === 'dark' ? 'Dark' : 'Light'}
          </button>

          <div className="ml-1">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className={btnBase}>
                  <UserIcon size={18} />
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;