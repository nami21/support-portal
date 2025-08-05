import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
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

function App() {
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/unassigned" element={<UnassignedRole />} />
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
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/help" element={<ContactSupport />} />

            </Route>
          </Routes>
          <Chatbot 
            isOpen={isChatOpen} 
            onToggle={setIsChatOpen} 
          />
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;