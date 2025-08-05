import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { dataService } from '../lib/storage';
import { useAuth } from './AuthContext';
import { FAQ, Announcement, SystemUpdate, Ticket, ChatMessage, User, OtherDocument, TrainingMaterial } from '../types';

interface AppContextType {
  // FAQ Management
  faqs: FAQ[];
  addFaq: (faq: Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateFaq: (id: string, faq: Partial<FAQ>) => Promise<void>;
  deleteFaq: (id: string) => Promise<void>;
  
  // Announcement Management
  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'createdAt'>) => Promise<void>;
  updateAnnouncement: (id: string, announcement: Partial<Announcement>) => Promise<void>;
  deleteAnnouncement: (id: string) => Promise<void>;
  
  // System Update Management
  systemUpdates: SystemUpdate[];
  addSystemUpdate: (update: Omit<SystemUpdate, 'id' | 'createdAt'>) => Promise<void>;
  updateSystemUpdate: (id: string, update: Partial<SystemUpdate>) => Promise<void>;
  deleteSystemUpdate: (id: string) => Promise<void>;
  
  // User Management
  tickets: Ticket[];
  createTicket: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Promise<void>;
  
  // Other Document Management
  otherDocuments: OtherDocument[];
  addOtherDocument: (document: Omit<OtherDocument, 'id' | 'createdAt'>) => Promise<void>;
  updateOtherDocument: (id: string, document: Partial<OtherDocument>) => Promise<void>;
  deleteOtherDocument: (id: string) => Promise<void>;
  
  // Training Material Management
  trainingMaterials: TrainingMaterial[];
  addTrainingMaterial: (material: Omit<TrainingMaterial, 'id' | 'createdAt'>) => Promise<void>;
  updateTrainingMaterial: (id: string, material: Partial<TrainingMaterial>) => Promise<void>;
  deleteTrainingMaterial: (id: string) => Promise<void>;
  
  // Chat
  chatMessages: ChatMessage[];
  addChatMessage: (message: Omit<ChatMessage, 'id'>) => Promise<void>;
  clearChat: () => void;
  
  // Loading states
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [systemUpdates, setSystemUpdates] = useState<SystemUpdate[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [otherDocuments, setOtherDocuments] = useState<OtherDocument[]>([]);
  const [trainingMaterials, setTrainingMaterials] = useState<TrainingMaterial[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to check if user is admin
  const isAdmin = () => user?.role === 'admin';
  const isSupport = () => user?.role === 'support' || user?.role === 'admin';
  const isAdminOrCTO = () => user?.role === 'admin' || (user?.role === 'admin' && user?.jobTitle?.includes('CTO'));

  // Load data when user is authenticated
  useEffect(() => {
    if (user) {
      loadAllData();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      // Load all data from localStorage
      setFaqs(dataService.getFaqs());
      setAnnouncements(dataService.getAnnouncements());
      setSystemUpdates(dataService.getSystemUpdates());
      setTickets(dataService.getTickets());
      setOtherDocuments(dataService.getOtherDocuments());
      setTrainingMaterials(dataService.getTrainingMaterials());
      
      if (user) {
        setChatMessages(dataService.getChatMessages(user.id));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // FAQ Management
  const addFaq = async (faqData: Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!isAdmin()) {
      throw new Error('Only admins can add FAQs');
    }

    const newFaq = dataService.addFaq(faqData);
    setFaqs(prev => [newFaq, ...prev.filter(f => f.id !== newFaq.id)]);
  };

  const updateFaq = async (id: string, faqData: Partial<FAQ>) => {
    if (!isAdmin()) {
      throw new Error('Only admins can update FAQs');
    }

    const updatedFaq = dataService.updateFaq(id, faqData);
    if (updatedFaq) {
      setFaqs(prev => prev.map(faq => faq.id === id ? updatedFaq : faq));
    }
  };

  const deleteFaq = async (id: string) => {
    if (!isAdmin()) {
      throw new Error('Only admins can delete FAQs');
    }

    const success = dataService.deleteFaq(id);
    if (success) {
      setFaqs(prev => prev.filter(faq => faq.id !== id));
    }
  };

  // Announcement Management
  const addAnnouncement = async (announcementData: Omit<Announcement, 'id' | 'createdAt'>) => {
    if (!isAdmin()) {
      throw new Error('Only admins can add announcements');
    }

    const newAnnouncement = dataService.addAnnouncement(announcementData);
    setAnnouncements(prev => [newAnnouncement, ...prev.filter(a => a.id !== newAnnouncement.id)]);
  };

  const updateAnnouncement = async (id: string, announcementData: Partial<Announcement>) => {
    if (!isAdmin()) {
      throw new Error('Only admins can update announcements');
    }

    const updatedAnnouncement = dataService.updateAnnouncement(id, announcementData);
    if (updatedAnnouncement) {
      setAnnouncements(prev => prev.map(announcement => 
        announcement.id === id ? updatedAnnouncement : announcement
      ));
    }
  };

  const deleteAnnouncement = async (id: string) => {
    if (!isAdmin()) {
      throw new Error('Only admins can delete announcements');
    }

    const success = dataService.deleteAnnouncement(id);
    if (success) {
      setAnnouncements(prev => prev.filter(announcement => announcement.id !== id));
    }
  };

  // System Update Management
  const addSystemUpdate = async (updateData: Omit<SystemUpdate, 'id' | 'createdAt'>) => {
    if (!isAdmin()) {
      throw new Error('Only admins can add system updates');
    }

    const newUpdate = dataService.addSystemUpdate(updateData);
    setSystemUpdates(prev => [newUpdate, ...prev.filter(u => u.id !== newUpdate.id)]);
  };

  const updateSystemUpdate = async (id: string, updateData: Partial<SystemUpdate>) => {
    if (!isAdmin()) {
      throw new Error('Only admins can update system updates');
    }

    const updatedUpdate = dataService.updateSystemUpdate(id, updateData);
    if (updatedUpdate) {
      setSystemUpdates(prev => prev.map(update => 
        update.id === id ? updatedUpdate : update
      ));
    }
  };

  const deleteSystemUpdate = async (id: string) => {
    if (!isAdmin()) {
      throw new Error('Only admins can delete system updates');
    }

    const success = dataService.deleteSystemUpdate(id);
    if (success) {
      setSystemUpdates(prev => prev.filter(update => update.id !== id));
    }
  };

  // Ticket Management
  const createTicket = async (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const newTicket = dataService.addTicket(ticketData);
    setTickets(prev => [newTicket, ...prev.filter(t => t.id !== newTicket.id)]);
  };

  // Other Document Management
  const addOtherDocument = async (documentData: Omit<OtherDocument, 'id' | 'createdAt'>) => {
    if (!isSupport()) {
      throw new Error('Only admin and support users can add documents');
    }

    const newDocument = dataService.addOtherDocument(documentData);
    setOtherDocuments(prev => [newDocument, ...prev.filter(d => d.id !== newDocument.id)]);
  };

  const updateOtherDocument = async (id: string, documentData: Partial<OtherDocument>) => {
    if (!isSupport()) {
      throw new Error('Only admin and support users can update documents');
    }

    const updatedDocument = dataService.updateOtherDocument(id, documentData);
    if (updatedDocument) {
      setOtherDocuments(prev => prev.map(doc => doc.id === id ? updatedDocument : doc));
    }
  };

  const deleteOtherDocument = async (id: string) => {
    if (!isSupport()) {
      throw new Error('Only admin and support users can delete documents');
    }

    const success = dataService.deleteOtherDocument(id);
    if (success) {
      setOtherDocuments(prev => prev.filter(doc => doc.id !== id));
    }
  };

  // Training Material Management
  const addTrainingMaterial = async (materialData: Omit<TrainingMaterial, 'id' | 'createdAt'>) => {
    if (!isSupport()) {
      throw new Error('Only admin and support users can add training materials');
    }

    const newMaterial = dataService.addTrainingMaterial(materialData);
    setTrainingMaterials(prev => [newMaterial, ...prev.filter(m => m.id !== newMaterial.id)]);
  };

  const updateTrainingMaterial = async (id: string, materialData: Partial<TrainingMaterial>) => {
    if (!isSupport()) {
      throw new Error('Only admin and support users can update training materials');
    }

    const updatedMaterial = dataService.updateTrainingMaterial(id, materialData);
    if (updatedMaterial) {
      setTrainingMaterials(prev => prev.map(material => material.id === id ? updatedMaterial : material));
    }
  };

  const deleteTrainingMaterial = async (id: string) => {
    if (!isSupport()) {
      throw new Error('Only admin and support users can delete training materials');
    }

    const success = dataService.deleteTrainingMaterial(id);
    if (success) {
      setTrainingMaterials(prev => prev.filter(material => material.id !== id));
    }
  };

  // Chat Management
  const addChatMessage = async (messageData: Omit<ChatMessage, 'id'>) => {
    if (!user) return;

    const newMessage = dataService.addChatMessage(messageData, user.id);
    setChatMessages(prev => [...prev, newMessage]);
  };

  const clearChat = () => {
    if (!user) return;
    
    dataService.clearChatMessages(user.id);
    setChatMessages([]);
  };


  return (
    <AppContext.Provider value={{
      faqs, addFaq, updateFaq, deleteFaq,
      announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement,
      systemUpdates, addSystemUpdate, updateSystemUpdate, deleteSystemUpdate,
      tickets, createTicket,
      otherDocuments, addOtherDocument, updateOtherDocument, deleteOtherDocument,
      trainingMaterials, addTrainingMaterial, updateTrainingMaterial, deleteTrainingMaterial,
      chatMessages, addChatMessage, clearChat,
      isLoading
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}