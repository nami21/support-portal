import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, Zap, Calendar, Search, Filter, Eye, Plus, Edit, Trash2 } from 'lucide-react';

// Helper function to convert Google Drive share link to thumbnail
const getGoogleDriveThumbnail = (url: string): string => {
  // Check if it's a Google Drive share link
  const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
  if (driveMatch) {
    const fileId = driveMatch[1];
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w600`;
  }
  return url; // Return original URL if not a Google Drive link
};

export default function SystemUpdates() {
  const { systemUpdates, addSystemUpdate, updateSystemUpdate, deleteSystemUpdate } = useApp();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUpdate, setEditingUpdate] = useState<any>(null);

  const filteredUpdates = systemUpdates.filter(update => {
    const matchesSearch = update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         update.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !filterType || update.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleImageClick = (imageUrl: string) => {
    window.open(imageUrl, '_blank');
  };

  const canManage = user?.role === 'admin' || user?.role === 'support';

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteSystemUpdate(id);
    }
  };

  const handleEdit = (update: any) => {
    setEditingUpdate(update);
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
          <h1 className="text-3xl font-bold text-slate-900">System Updates</h1>
          <p className="text-slate-600 mt-1">Latest system updates and maintenance information</p>
        </div>
        </div>
        
        {canManage && (
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-grey-800 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Update</span>
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
                placeholder="Search updates..."
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
              <option value="information">Information</option>
              <option value="advisory">Advisory</option>
              <option value="maintenance">Maintenance</option>
              <option value="security">Security</option>
            </select>
          </div>
        </div>
      </div>

      {/* Updates List */}
      <div className="space-y-6">
        {filteredUpdates.map((update) => {
          const thumbnailUrl = getGoogleDriveThumbnail(update.imageUrl);
          
          return (
            <div key={update.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <div className="flex flex-col lg:flex-row lg:space-x-6">
                {/* Image */}
                <div className="lg:w-1/2 mb-4 lg:mb-0">
                  <div className="relative group">
                    <img 
                      src={thumbnailUrl} 
                      alt={update.title}
                      className="w-full h-100 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handleImageClick(update.imageUrl)}
                      onError={(e) => {
                        // Fallback to original URL if thumbnail fails
                        const target = e.target as HTMLImageElement;
                        if (target.src !== update.imageUrl) {
                          target.src = update.imageUrl;
                        }
                      }}
                    />
                    <div className="absolute inset-0 pointer-events-none bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="lg:w-1/2">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Zap className="w-5 h-5 text-black" />
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        update.type === 'security' ? 'bg-grey-100 text-black' :
                        update.type === 'maintenance' ? 'bg-grey-200 text-grey-800' :
                        update.type === 'advisory' ? 'bg-grey-100 text-grey-700' :
                        'bg-grey-100 text-grey-700'
                      }`}>
                        {update.type.charAt(0).toUpperCase() + update.type.slice(1)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        update.severity === 'high' ? 'bg-grey-100 text-black' :
                        update.severity === 'medium' ? 'bg-grey-200 text-grey-800' :
                        'bg-grey-100 text-grey-700'
                      }`}>
                        {update.severity} priority
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-sm text-slate-500">
                      {new Date(update.date).toLocaleDateString()}
                      </div>
                      {canManage && (
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleEdit(update)}
                            className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(update.id, update.title)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold text-slate-900 mb-3">{update.title}</h2>
                  <p className="text-slate-600 mb-4">{update.description}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-slate-500">
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">Classification:</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        update.classification === 'internal' ? 'bg-grey-100 text-grey-700' : 'bg-grey-200 text-grey-800'
                      }`}>
                        {update.classification}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">Status:</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        update.status === 'active' ? 'bg-grey-100 text-grey-700' :
                        update.status === 'resolved' ? 'bg-gray-100 text-gray-700' :
                        'bg-grey-200 text-grey-800'
                      }`}>
                        {update.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        {filteredUpdates.length === 0 && (
          <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-100 text-center">
            <Zap className="w-12 h-12 text-grey-400 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">
              {searchQuery || filterType 
                ? 'No updates found matching your filters.' 
                : 'No system updates available.'
              }
            </p>
          </div>
        )}
      </div>

      {/* Add Update Modal */}
      {showAddForm && <UpdateModal onClose={() => setShowAddForm(false)} />}
      
      {/* Edit Update Modal */}
      {editingUpdate && (
        <UpdateModal 
          update={editingUpdate}
          onClose={() => setEditingUpdate(null)} 
        />
      )}
    </div>
  );
}

function UpdateModal({ update, onClose }: { update?: any; onClose: () => void }) {
  const { addSystemUpdate, updateSystemUpdate } = useApp();
  const isEditing = !!update;
  
  const [formData, setFormData] = useState({
    title: update?.title || '',
    description: update?.description || '',
    type: update?.type || 'information' as any,
    classification: update?.classification || 'internal' as any,
    severity: update?.severity || 'medium' as any,
    status: update?.status || 'active' as any,
    date: update?.date ? update.date.split('T')[0] : '',
    imageUrl: update?.imageUrl || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submissionData = {
      ...formData,
      date: new Date(formData.date).toISOString()
    };
    
    if (isEditing) {
      updateSystemUpdate(update.id, submissionData);
    } else {
      addSystemUpdate(submissionData);
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            {isEditing ? 'Edit System Update' : 'Add New System Update'}
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
                <option value="information">Information</option>
                <option value="advisory">Advisory</option>
                <option value="maintenance">Maintenance</option>
                <option value="security">Security</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Classification *
              </label>
              <select
                value={formData.classification}
                onChange={(e) => setFormData({...formData, classification: e.target.value as any})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="internal">Internal</option>
                <option value="external">External</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Severity *
              </label>
              <select
                value={formData.severity}
                onChange={(e) => setFormData({...formData, severity: e.target.value as any})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="active">Active</option>
                <option value="resolved">Resolved</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Date *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
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
              Image URL * (Google Drive links supported)
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="https://drive.google.com/file/d/... or https://example.com/image.jpg"
              required
            />
            <p className="text-xs text-slate-500 mt-1">
              For Google Drive: Share the file and paste the share link. Thumbnails will be generated automatically.
            </p>
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
              {isEditing ? 'Update System Update' : 'Add Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}