import { useState, useEffect } from 'react'
import { useLanguage } from './context/LanguageContext.jsx'
import { getTranslation } from './translations/translations.js'
import { useUser } from '@clerk/clerk-react'
import Header from './components/Header.jsx'
import Home from './Home.jsx'
import AboutMyBestie from './AboutMyBestie.jsx'
import BestieAchievements from './BestieAchievements.jsx'
import Contact from './Contact.jsx'
import Experience from './Experience.jsx'
import Login from './login.tsx'
import AI from './AI.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const { language } = useLanguage()
  const t = (key) => getTranslation(language, key)
  const { user, isSignedIn, isLoaded } = useUser()

  // Función para sincronizar usuario con MongoDB
  const syncUser = async (clerkUser) => {
    try {
      const response = await fetch('https://bestieportfolio.onrender.com/api/users/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clerkId: clerkUser.id,
          email: clerkUser.primaryEmailAddress?.emailAddress,
          name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
        }),
      });

      if (response.ok) {
        console.log('✅ Usuario sincronizado con MongoDB');
      }
    } catch (error) {
      console.error('Error sincronizando usuario:', error);
    }
  };

  // Sincronizar usuario con MongoDB cuando inicia sesión
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      syncUser(user);
    }
  }, [isLoaded, isSignedIn, user]);

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />
      case 'about':
        return <AboutMyBestie />
      case 'experience':
        return <Experience />
      case 'achievements':
        return <BestieAchievements />
      case 'contact':
        return <Contact />
      case 'login':
        return <Login />
      case 'ai':
        return <AI embedded={true} />
      default:
        return <Home onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-transparent text-light-text-primary dark:text-dark-text-primary">
      <Header 
        onNavigate={setCurrentPage} 
        activeSection={currentPage}
      />
      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        {renderPage()}
      </main>
      <footer className="border-t border-light-border bg-white/70 px-6 py-8 text-center dark:border-dark-primary/15 dark:bg-dark-bg-primary/90 lg:px-8">
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
          © {new Date().getFullYear()} {t('footer.copyrightHolder')}. {t('footer.rights')}.
        </p>
      </footer>
    </div>
  )
}

export default App