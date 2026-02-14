import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import NewsPage from './pages/NewsPage';
import PodcastsPage from './pages/PodcastsPage';
import EventsPage from './pages/EventsPage';
import EventRegistrationPage from './pages/EventRegistrationPage';
import AboutPage from './pages/AboutPage';
import WhitePapersPage from './pages/WhitePapersPage';
import ResourceDetailPage from './pages/ResourceDetailPage';
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';
import DirectoryPage from './pages/DirectoryPage';
import SupplierProfilePage from './pages/SupplierProfilePage';
import UserDashboard from './pages/UserDashboard';
import PressReleasePage from './pages/PressReleasePage';
import CertificationsPage from './pages/CertificationsPage';

type View = 'home' | 'directory' | 'news' | 'podcasts' | 'events' | 'event-register' | 'about' | 'whitepapers' | 'resource-detail' | 'login' | 'join' | 'profile' | 'dashboard' | 'press-release' | 'certifications';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [viewParams, setViewParams] = useState<any>({});
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleNavigate = (page: string, params: any = {}) => {
    if (page === 'logout') {
        setIsLoggedIn(false);
        setCurrentView('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    if (page === 'profile' && params.id) {
        setViewParams({ id: params.id });
    } else if (page === 'news' && params.articleId) {
        setViewParams({ articleId: params.articleId });
    } else if (page === 'resource-detail' && params.id) {
        setViewParams({ id: params.id });
    } else if (page === 'event-register' && params.id) {
        setViewParams({ id: params.id });
    } else {
        setViewParams(params);
    }

    if (page === 'dashboard' && params.isNewUser) {
       setIsLoggedIn(true);
    }
    
    setCurrentView(page.toLowerCase() as View);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'directory':
        return <DirectoryPage onNavigate={handleNavigate} isLoggedIn={isLoggedIn} initialCategory={viewParams.category} />;
      case 'profile':
        return <SupplierProfilePage id={viewParams.id} onNavigate={handleNavigate} isLoggedIn={isLoggedIn} />;
      case 'news':
        return <NewsPage onNavigate={handleNavigate} initialArticleId={viewParams.articleId} />;
      case 'podcasts':
        return <PodcastsPage />;
      case 'events':
        return <EventsPage onNavigate={handleNavigate} initialFilter={viewParams.filter} />;
      case 'event-register':
        return <EventRegistrationPage id={viewParams.id} onNavigate={handleNavigate} isLoggedIn={isLoggedIn} />;
      case 'about':
        return <AboutPage />;
      case 'whitepapers':
        return <WhitePapersPage isLoggedIn={isLoggedIn} onNavigate={handleNavigate} />;
      case 'resource-detail':
        return <ResourceDetailPage id={viewParams.id} onNavigate={handleNavigate} isLoggedIn={isLoggedIn} />;
      case 'login':
        return <LoginPage onNavigate={(page) => {
            setIsLoggedIn(true);
            handleNavigate('dashboard'); 
        }} />;
      case 'dashboard':
        return isLoggedIn ? (
            <UserDashboard onNavigate={handleNavigate} initialData={viewParams} /> 
        ) : (
            <LoginPage onNavigate={() => { setIsLoggedIn(true); handleNavigate('dashboard'); }} />
        );
      case 'join':
        return <JoinPage onNavigate={handleNavigate} />;
      case 'press-release':
        return <PressReleasePage onNavigate={handleNavigate} />;
      case 'certifications':
        return <CertificationsPage onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="bg-bone min-h-screen relative font-sans text-ink selection:bg-retro-orange selection:text-white cursor-none">
      <CustomCursor />
      
      <Header onNavigate={handleNavigate} currentView={currentView} isLoggedIn={isLoggedIn} />
      
      <main className="min-h-screen">
        {renderView()}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
