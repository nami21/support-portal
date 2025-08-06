import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import { initializeDemoData } from './lib/storage';
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

// Initialize demo data on app start
initializeDemoData();

// Protected Route Component
function ProtectedRoutes() {
  const { user, isLoading } = useAuth();
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-grey-50 via-grey-100 to-grey-200">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-grey-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  if (user.role === 'unassigned') {
    return <UnassignedRole />;
  }

  return (
    <AppProvider>
      <Layout>
        <Routes>
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
        </Routes>
      </Layout>
      <Chatbot 
        isOpen={isChatOpen} 
        onToggle={setIsChatOpen} 
      />
    </AppProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ProtectedRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;