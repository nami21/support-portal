import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, Bell, Calendar, Users, Search, Filter, FileText, ExternalLink, Plus, Edit, Trash2, X, Upload } from 'lucide-react';

export default function Announcements() {
  const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement } = useApp();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<any>(null);

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         announcement.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !filterType || announcement.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAttachmentClick = (attachment: string) => {
    // Check if it's a URL, if so open it directly
    if (attachment.startsWith('http://') || attachment.startsWith('https://')) {
      window.open(attachment, '_blank');
    } else {
      // For demo purposes, treat as filename and create a demo URL
      const fileUrl = `https://example.com/files/${attachment}`;
      window.open(fileUrl, '_blank');
    }
  };

  const canManage = user?.role === 'admin' || user?.role === 'support';

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteAnnouncement(id);
    }
  };

  const handleEdit = (announcement: any) => {
    setEditingAnnouncement(announcement);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
        <Link 
          to="/" 
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">All Announcements</h1>
          <p className="text-slate-600 mt-1">Stay updated with company news and updates</p>
        </div>
        </div>
        
        {canManage && (
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-grey-800 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Announcement</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-grey-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-grey-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="alert">Alert</option>
              <option value="memo">Memo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <div key={announcement.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-black" />
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  announcement.type === 'alert' ? 'bg-grey-100 text-black' : 'bg-grey-200 text-grey-800'
                }`}>
                  {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  announcement.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {announcement.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-sm text-slate-500">
                {new Date(announcement.createdAt).toLocaleDateString()}
                </div>
                {canManage && (
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleEdit(announcement)}
                      className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(announcement.id, announcement.title)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-slate-900 mb-3">{announcement.title}</h2>
            <p className="text-slate-600 mb-4">{announcement.description}</p>
            
            <div className="flex items-center space-x-6 text-sm text-slate-500">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{announcement.targetAudience}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Valid until {new Date(announcement.validityDate).toLocaleDateString()}</span>
              </div>
            </div>
            
            {announcement.attachments && announcement.attachments.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-sm font-medium text-slate-700 mb-2">Attachments:</p>
                <div className="flex flex-wrap gap-2">
                  {announcement.attachments.map((attachment, index) => {
                    const isUrl = attachment.startsWith('http://') || attachment.startsWith('https://');
                    const displayName = isUrl ? 'View Attachment' : attachment;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleAttachmentClick(attachment)}
                        className="inline-flex items-center px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm"
                      >
                        {isUrl ? (
                          <ExternalLink className="w-4 h-4 mr-2" />
                        ) : (
                          <FileText className="w-4 h-4 mr-2" />
                        )}
                        {displayName}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
        
        {filteredAnnouncements.length === 0 && (
          <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-100 text-center">
            <Bell className="w-12 h-12 text-grey-400 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">
              {searchQuery || filterType 
                ? 'No announcements found matching your filters.' 
                : 'No announcements available.'
              }
            </p>
          </div>
        )}
      </div>

      {/* Add Announcement Modal */}
      {showAddForm && <AnnouncementModal onClose={() => setShowAddForm(false)} />}
      
      {/* Edit Announcement Modal */}
      {editingAnnouncement && (
        <AnnouncementModal 
          announcement={editingAnnouncement}
          onClose={() => setEditingAnnouncement(null)} 
        />
      )}
    </div>
  );
}

function AnnouncementModal({ announcement, onClose }: { announcement?: any; onClose: () => void }) {
  const { addAnnouncement, updateAnnouncement } = useApp();
  const isEditing = !!announcement;
  
  const [formData, setFormData] = useState({
    title: announcement?.title || '',
    description: announcement?.description || '',
    type: announcement?.type || 'memo' as any,
    targetAudience: announcement?.targetAudience || 'All Employees',
    validityDate: announcement?.validityDate ? announcement.validityDate.split('T')[0] : '',
    attachments: announcement?.attachments || [] as string[],
    isActive: announcement?.isActive ?? true
  });

  const [newAttachment, setNewAttachment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submissionData = {
      ...formData,
      validityDate: new Date(formData.validityDate).toISOString()
    };
    
    if (isEditing) {
      updateAnnouncement(announcement.id, submissionData);
    } else {
      addAnnouncement(submissionData);
    }
    
    onClose();
  };

  const addAttachment = () => {
    if (newAttachment.trim()) {
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, newAttachment.trim()]
      }));
      setNewAttachment('');
    }
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            {isEditing ? 'Edit Announcement' : 'Add New Announcement'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="memo">Memo</option>
                <option value="alert">Alert</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Target Audience *
              </label>
              <input
                type="text"
                value={formData.targetAudience}
                onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g. All Employees, IT Department"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Validity Date *
            </label>
            <input
              type="date"
              value={formData.validityDate}
              onChange={(e) => setFormData({...formData, validityDate: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={4}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Attachments (URLs or file names)
            </label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={newAttachment}
                onChange={(e) => setNewAttachment(e.target.value)}
                placeholder="Enter URL or file name"
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={addAttachment}
                className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
              >
                Add
              </button>
            </div>

            {formData.attachments.length > 0 && (
              <div className="space-y-2">
                {formData.attachments.map((attachment, index) => {
                  const isUrl = attachment.startsWith('http://') || attachment.startsWith('https://');
                  
                  return (
                    <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                      <div className="flex items-center space-x-2">
                        {isUrl ? (
                          <ExternalLink className="w-4 h-4 text-blue-500" />
                        ) : (
                          <FileText className="w-4 h-4 text-slate-500" />
                        )}
                        <span className="text-sm text-slate-700">{attachment}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="text-slate-400 hover:text-purple-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
              className="mr-2"
            />
            <label htmlFor="isActive" className="text-sm text-slate-700">
              Active announcement
            </label>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-grey-800 transition-all"
            >
              {isEditing ? 'Update Announcement' : 'Add Announcement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}