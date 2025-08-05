import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { Search, ArrowLeft, ExternalLink, Tag, Plus, Edit, Trash2, Calendar } from 'lucide-react';

const categoryInfo = {
  policies: {
    title: 'Policies & Benefits',
    description: 'Company policies, benefits, and HR information'
  },
  'it-systems': {
    title: 'IT Systems & Software',
    description: 'Software issues, system access, and applications'
  },
  hardware: {
    title: 'Hardware & Devices',
    description: 'Laptops, phones, printers, and other equipment'
  },
  network: {
    title: 'Network & Connectivity',
    description: 'WiFi, VPN, internet, and network troubleshooting'
  }
};

export default function FAQCategory() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { faqs, addFaq, updateFaq, deleteFaq } = useApp();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingFaq, setEditingFaq] = useState<any>(null);

  const category = categoryInfo[categoryId as keyof typeof categoryInfo];
  const categoryFaqs = faqs.filter(faq => faq.category === categoryId);
  
  const filteredFaqs = categoryFaqs.filter(faq =>
    faq.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (!category) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Category Not Found</h1>
        <Link to="/" className="text-blue-600 hover:text-blue-700">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const canManage = user?.role === 'admin' || user?.role === 'support';

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteFaq(id);
    }
  };

  const handleEdit = (faq: any) => {
    setEditingFaq(faq);
  };

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
          <h1 className="text-3xl font-bold text-slate-900">{category.title}</h1>
          <p className="text-slate-600 mt-1">{category.description}</p>
        </div>
        </div>
        
        {canManage && (
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-grey-800 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add FAQ</span>
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search FAQs in this category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-grey-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* FAQ Results */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            {searchQuery ? 'Search Results' : 'All FAQs'}
          </h2>
          <span className="text-sm text-slate-500">
            {filteredFaqs.length} FAQ{filteredFaqs.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="block p-6 border border-slate-200 rounded-lg hover:border-grey-300 hover:bg-grey-50 transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Link to={`/faq/${categoryId}/${faq.id}`} className="block">
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-black mb-2">
                      {faq.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {faq.content}
                    </p>
                    </Link>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span className="text-xs text-slate-500">
                          {new Date(faq.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                      {faq.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Link to={`/faq/${categoryId}/${faq.id}`}>
                      <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-black" />
                    </Link>
                    {canManage && (
                      <>
                        <button 
                          onClick={() => handleEdit(faq)}
                          className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(faq.id, faq.title)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">
                {searchQuery 
                  ? `No FAQs found matching "${searchQuery}"` 
                  : 'No FAQs available in this category yet'
                }
              </p>
              <Link 
                to="/" 
                className="inline-block mt-4 text-black hover:text-grey-600"
              >
                Browse other categories
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Add FAQ Modal */}
      {showAddForm && <FAQModal onClose={() => setShowAddForm(false)} categoryId={categoryId} />}
      
      {/* Edit FAQ Modal */}
      {editingFaq && (
        <FAQModal 
          faq={editingFaq}
          onClose={() => setEditingFaq(null)} 
          categoryId={categoryId}
        />
      )}
    </div>
  );
}

const categories = [
  { id: 'policies', title: 'Policies & Benefits' },
  { id: 'it-systems', title: 'IT Systems & Software' },
  { id: 'hardware', title: 'Hardware & Devices' },
  { id: 'network', title: 'Network & Connectivity' }
];

function FAQModal({ faq, onClose, categoryId }: { faq?: any; onClose: () => void; categoryId?: string }) {
  const { addFaq, updateFaq } = useApp();
  const isEditing = !!faq;
  
  const [formData, setFormData] = useState({
    title: faq?.title || '',
    content: faq?.content || '',
    category: faq?.category || categoryId || 'policies' as any,
    tags: faq?.tags ? faq.tags.join(', ') : ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submissionData = {
      title: formData.title,
      content: formData.content,
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };
    
    if (isEditing) {
      updateFaq(faq.id, submissionData);
    } else {
      addFaq(submissionData);
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            {isEditing ? 'Edit FAQ' : 'Add New FAQ'}
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
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value as any})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Content *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={6}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g. password, login, reset"
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
              {isEditing ? 'Update FAQ' : 'Add FAQ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}