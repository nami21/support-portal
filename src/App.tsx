import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Chatbot from './components/Chatbot';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ContactSupport from './pages/ContactSupport';
import Announcements from './pages/Announcements';
import SystemUpdates from './pages/SystemUpdates';
import FAQCategory from './pages/FAQCategory';
import FAQDetail from './pages/FAQDetail';
import AboutUs from './pages/about-us/AboutUs';
import OtherDocuments from './pages/documents/OtherDocuments';
import TrainingAwareness from './pages/training/TrainingAwareness';
import UnassignedRole from './pages/UnassignedRole';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import {SpotlightsPage} from './pages/Spotlights/SpotlightsPage';

function AppContent() {
  const { user, isLoading } = useAuth();
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is not logged in, only show login page
  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    );
  }

  // If user is unassigned, only show unassigned page
  if (user.role === 'unassigned') {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<UnassignedRole />} />
        </Routes>
      </Router>
    );
  }

  // Show full app for authenticated users
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard onToggleChat={() => setIsChatOpen(!isChatOpen)} />} />
          <Route path="spotlights" element={<SpotlightsPage />} />
          <Route path="contact-support" element={<ContactSupport />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="system-updates" element={<SystemUpdates />} />
          <Route path="faq/:categoryId" element={<FAQCategory />} />
          <Route path="faq/:categoryId/:faqId" element={<FAQDetail onOpenChat={() => setIsChatOpen(true)} />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="documents" element={<OtherDocuments />} />
          <Route path="training" element={<TrainingAwareness />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="help" element={<ContactSupport />} />
        </Route>
      </Routes>
      <Chatbot 
        isOpen={isChatOpen} 
        onToggle={setIsChatOpen} 
      />
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;