import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  FileText, 
  ExternalLink,
  Calendar,
  User,
  Edit,
  Trash2
} from 'lucide-react';

export default function OtherDocuments() {
  const { otherDocuments, addOtherDocument, deleteOtherDocument } = useApp();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Filter documents
  const filteredDocuments = otherDocuments.filter(doc => {
    const matchesSearch = doc.documentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleDelete = (id: string, documentName: string) => {
    if (window.confirm(`Are you sure you want to delete "${documentName}"?`)) {
      deleteOtherDocument(id);
    }
  };

  const canManageDocuments = user?.role === 'admin' || user?.role === 'support';

  return (
    <div className="space-y-6">
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
            <h1 className="text-3xl font-bold text-slate-900">Company Documents</h1>
            <p className="text-slate-600 mt-1">Company forms, templates, policies, and important documents</p>
          </div>
        </div>
        
        {canManageDocuments && (
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-grey-800 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Document</span>
          </button>
        )}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="mt-4 text-sm text-slate-600">
          Showing {filteredDocuments.length} of {otherDocuments.length} documents
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-slate-900">Document Name</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-900">Description</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-900">Created By</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-900">Created Date</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-900">File</th>
                {canManageDocuments && (
                  <th className="text-left py-4 px-6 font-semibold text-slate-900">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredDocuments.map((document) => (
                <tr key={document.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <span className="font-medium text-slate-900">{document.documentName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-slate-600 line-clamp-2">{document.description}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-900">{document.createdBy}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-900">
                        {new Date(document.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <a
                      href={document.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Open</span>
                    </a>
                  </td>
                  {canManageDocuments && (
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleDelete(document.id, document.documentName)}
                          className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                          title="Delete Document"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDocuments.length === 0 && (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">
              {searchQuery
                ? 'No documents found matching your search.'
                : 'No documents available.'
              }
            </p>
          </div>
        )}
      </div>

      {/* Add Document Modal */}
      {showAddForm && (
        <AddDocumentModal onClose={() => setShowAddForm(false)} />
      )}
    </div>
  );
}

function AddDocumentModal({ onClose }: { onClose: () => void }) {
  const { addOtherDocument } = useApp();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    documentName: '',
    description: '',
    fileUrl: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submissionData = {
      ...formData,
      createdBy: user?.name || 'Unknown'
    };
    
    addOtherDocument(submissionData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Add New Document</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Document Name *
            </label>
            <input
              type="text"
              value={formData.documentName}
              onChange={(e) => setFormData({...formData, documentName: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Google Drive Link *
            </label>
            <input
              type="url"
              value={formData.fileUrl}
              onChange={(e) => setFormData({...formData, fileUrl: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://drive.google.com/file/d/..."
              required
            />
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
              Add Document
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}