import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
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
      setIsLoading(false);
    }
  }, [user]);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        loadFaqs(),
        loadAnnouncements(),
        loadSystemUpdates(),
        loadOtherDocuments(),
        loadTrainingMaterials(),
      ]);
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
  const loadFaqs = async () => {
    if (!isSupabaseConfigured) {
      // Use localStorage data in demo mode
      setFaqs(dataService.getFaqs());
      return;
    }
    
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading FAQs:', error);
      return;
    }

    setFaqs(data || []);
  };

  const addFaq = async (faqData: Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!canManage()) {
      throw new Error('Only admins and support can add FAQs');
    }

    if (!isSupabaseConfigured) {
      // Use localStorage in demo mode
      const newFaq = dataService.addFaq(faqData);
      setFaqs(prev => [newFaq, ...prev]);
      return;
    }

    const { data, error } = await supabase
      .from('faqs')
      .insert([faqData])
      .select()
      .single();

    if (error) {
      console.error('Error adding FAQ:', error);
      throw error;
    }

    setFaqs(prev => [data, ...prev]);
  };

  const updateFaq = async (id: string, faqData: Partial<FAQ>) => {
    if (!canManage()) {
      throw new Error('Only admins and support can update FAQs');
    }

    if (!isSupabaseConfigured) {
      // Use localStorage in demo mode
      const updatedFaq = dataService.updateFaq(id, faqData);
      if (updatedFaq) {
        setFaqs(prev => prev.map(faq => faq.id === id ? updatedFaq : faq));
      }
      return;
    }

    const { data, error } = await supabase
      .from('faqs')
      .update({ ...faqData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating FAQ:', error);
      throw error;
    }

    setFaqs(prev => prev.map(faq => faq.id === id ? data : faq));
  };

  const deleteFaq = async (id: string) => {
    if (!canManage()) {
      throw new Error('Only admins and support can delete FAQs');
    }

    if (!isSupabaseConfigured) {
      // Use localStorage in demo mode
      const success = dataService.deleteFaq(id);
      if (success) {
        setFaqs(prev => prev.filter(faq => faq.id !== id));
      }
      return;
    }

    const { error } = await supabase
      .from('faqs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting FAQ:', error);
      throw error;
    }

    setFaqs(prev => prev.filter(faq => faq.id !== id));
  };

  // Announcement Management
  const loadAnnouncements = async () => {
    if (!isSupabaseConfigured) {
      setAnnouncements(dataService.getAnnouncements());
      return;
    }
    
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading announcements:', error);
      return;
    }

    setAnnouncements(data || []);
  };

  const addAnnouncement = async (announcementData: Omit<Announcement, 'id' | 'createdAt'>) => {
    if (!canManage()) {
      throw new Error('Only admins and support can add announcements');
    }

    if (!isSupabaseConfigured) {
      const newAnnouncement = dataService.addAnnouncement(announcementData);
      setAnnouncements(prev => [newAnnouncement, ...prev]);
      return;
    }

    const { data, error } = await supabase
      .from('announcements')
      .insert([announcementData])
      .select()
      .single();

    if (error) {
      console.error('Error adding announcement:', error);
      throw error;
    }

    setAnnouncements(prev => [data, ...prev]);
  };

  const updateAnnouncement = async (id: string, announcementData: Partial<Announcement>) => {
    if (!canManage()) {
      throw new Error('Only admins and support can update announcements');
    }

    if (!isSupabaseConfigured) {
      const updatedAnnouncement = dataService.updateAnnouncement(id, announcementData);
      if (updatedAnnouncement) {
        setAnnouncements(prev => prev.map(announcement => 
          announcement.id === id ? updatedAnnouncement : announcement
        ));
      }
      return;
    }

    const { data, error } = await supabase
      .from('announcements')
      .update(announcementData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating announcement:', error);
      throw error;
    }

    setAnnouncements(prev => prev.map(announcement => 
      announcement.id === id ? data : announcement
    ));
  };

  const deleteAnnouncement = async (id: string) => {
    if (!canManage()) {
      throw new Error('Only admins and support can delete announcements');
    }

    if (!isSupabaseConfigured) {
      const success = dataService.deleteAnnouncement(id);
      if (success) {
        setAnnouncements(prev => prev.filter(announcement => announcement.id !== id));
      }
      return;
    }

    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting announcement:', error);
      throw error;
    }

    setAnnouncements(prev => prev.filter(announcement => announcement.id !== id));
  };

  // System Update Management
  const loadSystemUpdates = async () => {
    if (!isSupabaseConfigured) {
      setSystemUpdates(dataService.getSystemUpdates());
      return;
    }
    
    const { data, error } = await supabase
      .from('system_updates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading system updates:', error);
      return;
    }

    setSystemUpdates(data || []);
  };

  const addSystemUpdate = async (updateData: Omit<SystemUpdate, 'id' | 'createdAt'>) => {
    if (!canManage()) {
      throw new Error('Only admins and support can add system updates');
    }

    if (!isSupabaseConfigured) {
      const newUpdate = dataService.addSystemUpdate(updateData);
      setSystemUpdates(prev => [newUpdate, ...prev]);
      return;
    }

    const { data, error } = await supabase
      .from('system_updates')
      .insert([updateData])
      .select()
      .single();

    if (error) {
      console.error('Error adding system update:', error);
      throw error;
    }

    setSystemUpdates(prev => [data, ...prev]);
  };

  const updateSystemUpdate = async (id: string, updateData: Partial<SystemUpdate>) => {
    if (!canManage()) {
      throw new Error('Only admins and support can update system updates');
    }

    if (!isSupabaseConfigured) {
      const updatedUpdate = dataService.updateSystemUpdate(id, updateData);
      if (updatedUpdate) {
        setSystemUpdates(prev => prev.map(update => 
          update.id === id ? updatedUpdate : update
        ));
      }
      return;
    }

    const { data, error } = await supabase
      .from('system_updates')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating system update:', error);
      throw error;
    }

    setSystemUpdates(prev => prev.map(update => 
      update.id === id ? data : update
    ));
  };

  const deleteSystemUpdate = async (id: string) => {
    if (!canManage()) {
      throw new Error('Only admins and support can delete system updates');
    }

    if (!isSupabaseConfigured) {
      const success = dataService.deleteSystemUpdate(id);
      if (success) {
        setSystemUpdates(prev => prev.filter(update => update.id !== id));
      }
      return;
    }

    const { error } = await supabase
      .from('system_updates')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting system update:', error);
      throw error;
    }

    setSystemUpdates(prev => prev.filter(update => update.id !== id));
  };

  // Other Document Management
  const loadOtherDocuments = async () => {
    if (!isSupabaseConfigured) {
      setOtherDocuments(dataService.getOtherDocuments());
      return;
    }
    
    const { data, error } = await supabase
      .from('other_documents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading other documents:', error);
      return;
    }

    setOtherDocuments(data || []);
  };

  const addOtherDocument = async (documentData: Omit<OtherDocument, 'id' | 'createdAt'>) => {
    if (!canManage()) {
      throw new Error('Only admins and support can add documents');
    }

    if (!isSupabaseConfigured) {
      const newDocument = dataService.addOtherDocument(documentData);
      setOtherDocuments(prev => [newDocument, ...prev]);
      return;
    }

    const { data, error } = await supabase
      .from('other_documents')
      .insert([documentData])
      .select()
      .single();

    if (error) {
      console.error('Error adding document:', error);
      throw error;
    }

    setOtherDocuments(prev => [data, ...prev]);
  };

  const updateOtherDocument = async (id: string, documentData: Partial<OtherDocument>) => {
    if (!canManage()) {
      throw new Error('Only admins and support can update documents');
    }

    if (!isSupabaseConfigured) {
      const updatedDocument = dataService.updateOtherDocument(id, documentData);
      if (updatedDocument) {
        setOtherDocuments(prev => prev.map(doc => doc.id === id ? updatedDocument : doc));
      }
      return;
    }

    const { data, error } = await supabase
      .from('other_documents')
      .update(documentData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating document:', error);
      throw error;
    }

    setOtherDocuments(prev => prev.map(doc => doc.id === id ? data : doc));
  };

  const deleteOtherDocument = async (id: string) => {
    if (!canManage()) {
      throw new Error('Only admins and support can delete documents');
    }

    if (!isSupabaseConfigured) {
      const success = dataService.deleteOtherDocument(id);
      if (success) {
        setOtherDocuments(prev => prev.filter(doc => doc.id !== id));
      }
      return;
    }

    const { error } = await supabase
      .from('other_documents')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting document:', error);
      throw error;
    }

    setOtherDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  // Training Material Management
  const loadTrainingMaterials = async () => {
    if (!isSupabaseConfigured) {
      setTrainingMaterials(dataService.getTrainingMaterials());
      return;
    }
    
    const { data, error } = await supabase
      .from('training_materials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading training materials:', error);
      return;
    }

    setTrainingMaterials(data || []);
  };

  const addTrainingMaterial = async (materialData: Omit<TrainingMaterial, 'id' | 'createdAt'>) => {
    if (!canManage()) {
      throw new Error('Only admins and support can add training materials');
    }

    if (!isSupabaseConfigured) {
      const newMaterial = dataService.addTrainingMaterial(materialData);
      setTrainingMaterials(prev => [newMaterial, ...prev]);
      return;
    }

    const { data, error } = await supabase
      .from('training_materials')
      .insert([materialData])
      .select()
      .single();

    if (error) {
      console.error('Error adding training material:', error);
      throw error;
    }

    setTrainingMaterials(prev => [data, ...prev]);
  };

  const updateTrainingMaterial = async (id: string, materialData: Partial<TrainingMaterial>) => {
    if (!canManage()) {
      throw new Error('Only admins and support can update training materials');
    }

    if (!isSupabaseConfigured) {
      const updatedMaterial = dataService.updateTrainingMaterial(id, materialData);
      if (updatedMaterial) {
        setTrainingMaterials(prev => prev.map(material => material.id === id ? updatedMaterial : material));
      }
      return;
    }

    const { data, error } = await supabase
      .from('training_materials')
      .update(materialData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating training material:', error);
      throw error;
    }

    setTrainingMaterials(prev => prev.map(material => material.id === id ? data : material));
  };

  const deleteTrainingMaterial = async (id: string) => {
    if (!canManage()) {
      throw new Error('Only admins and support can delete training materials');
    }

    if (!isSupabaseConfigured) {
      const success = dataService.deleteTrainingMaterial(id);
      if (success) {
        setTrainingMaterials(prev => prev.filter(material => material.id !== id));
      }
      return;
    }

    const { error } = await supabase
      .from('training_materials')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting training material:', error);
      throw error;
    }

    setTrainingMaterials(prev => prev.filter(material => material.id !== id));
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