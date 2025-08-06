import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { FAQ, Announcement, SystemUpdate, OtherDocument, TrainingMaterial } from '../types';
import { dataService } from '../lib/storage';

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
  
  // Loading states
  isLoading: boolean;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [systemUpdates, setSystemUpdates] = useState<SystemUpdate[]>([]);
  const [otherDocuments, setOtherDocuments] = useState<OtherDocument[]>([]);
  const [trainingMaterials, setTrainingMaterials] = useState<TrainingMaterial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to check if user is admin/support
  const canManage = () => user?.role === 'admin' || user?.role === 'support';

  // Load data when user is authenticated
  useEffect(() => {
    if (user) {
      loadAllData();
    } else {
      // Reset data when no user
      setFaqs([]);
      setAnnouncements([]);
      setSystemUpdates([]);
      setOtherDocuments([]);
      setTrainingMaterials([]);
      setIsLoading(false);
    }
  }, [user]);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      // Load demo data from localStorage
      const loadedFaqs = dataService.getFaqs();
      const loadedAnnouncements = dataService.getAnnouncements();
      const loadedSystemUpdates = dataService.getSystemUpdates();
      const loadedOtherDocuments = dataService.getOtherDocuments();
      const loadedTrainingMaterials = dataService.getTrainingMaterials();
      
      console.log('Loading demo data:', {
        faqs: loadedFaqs.length,
        announcements: loadedAnnouncements.length,
        systemUpdates: loadedSystemUpdates.length,
        otherDocuments: loadedOtherDocuments.length,
        trainingMaterials: loadedTrainingMaterials.length
      });
      
      setFaqs(loadedFaqs);
      setAnnouncements(loadedAnnouncements);
      setSystemUpdates(loadedSystemUpdates);
      setOtherDocuments(loadedOtherDocuments);
      setTrainingMaterials(loadedTrainingMaterials);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = async () => {
    await loadAllData();
  };

  // FAQ Management
  const addFaq = async (faqData: Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!canManage()) {
      throw new Error('Only admins and support can add FAQs');
    }

    const newFaq = dataService.addFaq(faqData);
    setFaqs(prev => [newFaq, ...prev]);
  };

  const updateFaq = async (id: string, faqData: Partial<FAQ>) => {
    if (!canManage()) {
      throw new Error('Only admins and support can update FAQs');
    }

    const updatedFaq = dataService.updateFaq(id, faqData);
    if (updatedFaq) {
      setFaqs(prev => prev.map(faq => faq.id === id ? updatedFaq : faq));
    }
  };

  const deleteFaq = async (id: string) => {
    if (!canManage()) {
      throw new Error('Only admins and support can delete FAQs');
    }

    const success = dataService.deleteFaq(id);
    if (success) {
      setFaqs(prev => prev.filter(faq => faq.id !== id));
    }
  };

  // Announcement Management
  const addAnnouncement = async (announcementData: Omit<Announcement, 'id' | 'createdAt'>) => {
    if (!canManage()) {
      throw new Error('Only admins and support can add announcements');
    }

    const newAnnouncement = dataService.addAnnouncement(announcementData);
    setAnnouncements(prev => [newAnnouncement, ...prev]);
  };

  const updateAnnouncement = async (id: string, announcementData: Partial<Announcement>) => {
    if (!canManage()) {
      throw new Error('Only admins and support can update announcements');
    }

    const updatedAnnouncement = dataService.updateAnnouncement(id, announcementData);
    if (updatedAnnouncement) {
      setAnnouncements(prev => prev.map(announcement => 
        announcement.id === id ? updatedAnnouncement : announcement
      ));
    }
  };

  const deleteAnnouncement = async (id: string) => {
    if (!canManage()) {
      throw new Error('Only admins and support can delete announcements');
    }

    const success = dataService.deleteAnnouncement(id);
    if (success) {
      setAnnouncements(prev => prev.filter(announcement => announcement.id !== id));
    }
  };

  // System Update Management
  const addSystemUpdate = async (updateData: Omit<SystemUpdate, 'id' | 'createdAt'>) => {
    if (!canManage()) {
      throw new Error('Only admins and support can add system updates');
    }

    const newUpdate = dataService.addSystemUpdate(updateData);
    setSystemUpdates(prev => [newUpdate, ...prev]);
  };

  const updateSystemUpdate = async (id: string, updateData: Partial<SystemUpdate>) => {
    if (!canManage()) {
      throw new Error('Only admins and support can update system updates');
    }

    const updatedUpdate = dataService.updateSystemUpdate(id, updateData);
    if (updatedUpdate) {
      setSystemUpdates(prev => prev.map(update => 
        update.id === id ? updatedUpdate : update
      ));
    }
  };

  const deleteSystemUpdate = async (id: string) => {
    if (!canManage()) {
      throw new Error('Only admins and support can delete system updates');
    }

    const success = dataService.deleteSystemUpdate(id);
    if (success) {
      setSystemUpdates(prev => prev.filter(update => update.id !== id));
    }
  };

  // Other Document Management
  const addOtherDocument = async (documentData: Omit<OtherDocument, 'id' | 'createdAt'>) => {
    if (!canManage()) {
      throw new Error('Only admins and support can add documents');
    }

    const newDocument = dataService.addOtherDocument(documentData);
    setOtherDocuments(prev => [newDocument, ...prev]);
  };

  const updateOtherDocument = async (id: string, documentData: Partial<OtherDocument>) => {
    if (!canManage()) {
      throw new Error('Only admins and support can update documents');
    }

    const updatedDocument = dataService.updateOtherDocument(id, documentData);
    if (updatedDocument) {
      setOtherDocuments(prev => prev.map(doc => doc.id === id ? updatedDocument : doc));
    }
  };

  const deleteOtherDocument = async (id: string) => {
    if (!canManage()) {
      throw new Error('Only admins and support can delete documents');
    }

    const success = dataService.deleteOtherDocument(id);
    if (success) {
      setOtherDocuments(prev => prev.filter(doc => doc.id !== id));
    }
  };

  // Training Material Management
  const addTrainingMaterial = async (materialData: Omit<TrainingMaterial, 'id' | 'createdAt'>) => {
    if (!canManage()) {
      throw new Error('Only admins and support can add training materials');
    }

    const newMaterial = dataService.addTrainingMaterial(materialData);
    setTrainingMaterials(prev => [newMaterial, ...prev]);
  };

  const updateTrainingMaterial = async (id: string, materialData: Partial<TrainingMaterial>) => {
    if (!canManage()) {
      throw new Error('Only admins and support can update training materials');
    }

    const updatedMaterial = dataService.updateTrainingMaterial(id, materialData);
    if (updatedMaterial) {
      setTrainingMaterials(prev => prev.map(material => material.id === id ? updatedMaterial : material));
    }
  };

  const deleteTrainingMaterial = async (id: string) => {
    if (!canManage()) {
      throw new Error('Only admins and support can delete training materials');
    }

    const success = dataService.deleteTrainingMaterial(id);
    if (success) {
      setTrainingMaterials(prev => prev.filter(material => material.id !== id));
    }
  };

  return (
    <AppContext.Provider value={{
      faqs, addFaq, updateFaq, deleteFaq,
      announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement,
      systemUpdates, addSystemUpdate, updateSystemUpdate, deleteSystemUpdate,
      otherDocuments, addOtherDocument, updateOtherDocument, deleteOtherDocument,
      trainingMaterials, addTrainingMaterial, updateTrainingMaterial, deleteTrainingMaterial,
      isLoading,
      refreshData
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