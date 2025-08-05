import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ArrowLeft, 
  Plus, 
  Shield, 
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Play,
  Edit,
  Trash2,
  X,
  Upload,
  Search
} from 'lucide-react';

const categories = [
  'Security',
  'Health & Safety', 
  'Professional Development',
  'HR & Compliance',
  'Finance',
  'Technology'
];

const levels = ['Beginner', 'Intermediate', 'Advanced'];

// Helper function to get YouTube thumbnail
const getYouTubeThumbnail = (url: string): string => {
  const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId[1]}/maxresdefault.jpg`;
  }
  return '';
};

// Helper function to get Google Drive thumbnail
const getGoogleDriveThumbnail = (url: string): string => {
  const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
  if (driveMatch) {
    const fileId = driveMatch[1];
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`;
  }
  return '';
};

// Helper function to get video thumbnail
const getVideoThumbnail = (url: string): string => {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return getYouTubeThumbnail(url);
  } else if (url.includes('drive.google.com')) {
    return getGoogleDriveThumbnail(url);
  }
  return '';
};

// Helper function to handle file upload and create object URL
const handleImageUpload = (file: File): string => {
  return URL.createObjectURL(file);
};
// Carousel Component
function AwarenessCarousel({ 
  campaigns, 
  onEdit, 
  onDelete, 
  canManage 
}: { 
  campaigns: any[], 
  onEdit: (campaign: any) => void,
  onDelete: (id: string) => void,
  canManage: boolean 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  React.useEffect(() => {
    if (campaigns.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % campaigns.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [campaigns.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + campaigns.length) % campaigns.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % campaigns.length);
  };

  if (campaigns.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-100 text-center">
        <Shield className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <p className="text-slate-500 text-lg">No awareness campaigns available</p>
      </div>
    );
  }

  const currentCampaign = campaigns[currentIndex];

  return (
    <div className="relative w-full max-w-4xl mx-auto"> 
      <div className="relative h-100 overflow-hidden rounded-xl shadow-lg bg-white border border-slate-100">
        <img
          src={currentCampaign.imageUrl}
          alt={currentCampaign.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            {/* <h3 className="text-2xl font-bold mb-2">{currentCampaign.title}</h3> */} 
          </div>
        </div>

        {/* Management Controls */}
        {canManage && (
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={() => onEdit(currentCampaign)}
              className="p-2 bg-black bg-opacity-50 text-white rounded-lg hover:bg-opacity-70 transition-all"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(currentCampaign.id)}
              className="p-2 bg-black bg-opacity-50 text-white rounded-lg hover:bg-opacity-70 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Navigation Arrows */}
      {campaigns.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {campaigns.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {campaigns.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-red-600' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Training Video Card Component
interface TrainingVideoCardProps {
  video: any;
  onEdit: (video: any) => void;
  onDelete: (id: string) => void;
  canManage: boolean;
}

function TrainingVideoCard({ 
  video, 
  onEdit, 
  onDelete, 
  canManage 
}: TrainingVideoCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleVideoClick = () => {
    if (video.videoUrl) {
      window.open(video.videoUrl, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 overflow-hidden group">
      <div className="relative">
        <img
          src={video.thumbnailUrl || 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400'}
          alt={video.videoTitle}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400';
          }}
        />
        <div 
          className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center cursor-pointer"
          onClick={handleVideoClick}
        >
          <div className="bg-white/90 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Play className="w-6 h-6 text-red-600" />
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(video.level)}`}>
            {video.level}
          </span>
        </div>

        {/* Management Controls */}
        {canManage && (
          <div className="absolute top-3 left-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(video);
              }}
              className="p-2 bg-black bg-opacity-50 text-white rounded-lg hover:bg-opacity-70 transition-all"
            >
              <Edit className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(video.id);
              }}
              className="p-2 bg-black bg-opacity-50 text-white rounded-lg hover:bg-opacity-70 transition-all"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {video.category}
          </span>
        </div>
        
        <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-red-600 transition-colors">
          {video.videoTitle}
        </h3>
        
        <p className="text-slate-600 text-sm line-clamp-2">
          {video.videoDescription}
        </p>
      </div>
    </div>
  );
}

export default function TrainingAwareness() {
  const { trainingMaterials, addTrainingMaterial, updateTrainingMaterial, deleteTrainingMaterial } = useApp();
  const { user } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterLevel, setFilterLevel] = useState('');

  const canManage = user?.role === 'admin' || user?.role === 'support';

  // Separate materials by type
  const awarenessCampaigns = trainingMaterials.filter(m => m.type === 'awareness-campaign' && m.isActive);
  
  // Filter training videos based on search and filters
  const trainingVideos = trainingMaterials.filter(m => {
    if (m.type !== 'training-video' || !m.isActive) return false;
    
    const matchesSearch = !searchQuery || 
      m.videoTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.videoDescription?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !filterCategory || m.category === filterCategory;
    const matchesLevel = !filterLevel || m.level === filterLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleEdit = (material: any) => {
    setEditingMaterial(material);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      deleteTrainingMaterial(id);
    }
  };

  return (
    <div className="space-y-8">
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
            <h1 className="text-3xl font-bold text-slate-900">Training & Awareness</h1>
            <p className="text-slate-600 mt-1">Company awareness campaigns and training resources</p>
          </div>
        </div>
        
        {canManage && (
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-grey-800 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Material</span>
          </button>
        )}
      </div>

      {/* Awareness Campaigns Section */}
      <section>
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-slate-900">Awareness Campaigns</h2>
          </div>
        </div>
        
        <AwarenessCarousel
          campaigns={awarenessCampaigns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          canManage={canManage}
        />
      </section>

      {/* Training Videos Section */}
      <section>
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-slate-900">Training Videos</h2>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search training videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="lg:w-48">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            {/* Level Filter */}
            <div className="lg:w-48">
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">All Levels</option>
                {levels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Results Count */}
          <div className="mt-4 text-sm text-slate-600">
            Showing {trainingVideos.length} training video{trainingVideos.length !== 1 ? 's' : ''}
            {(searchQuery || filterCategory || filterLevel) && (
              <span>
                {' '}matching your filters
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilterCategory('');
                    setFilterLevel('');
                  }}
                  className="ml-2 text-red-600 hover:text-red-700 font-medium"
                >
                  Clear all
                </button>
              </span>
            )}
          </div>
        </div>
        {trainingVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingVideos.map((video) => (
              <TrainingVideoCard
                key={video.id}
                video={video}
                onEdit={handleEdit}
                onDelete={handleDelete}
                canManage={canManage}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-100 text-center">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">
              {searchQuery || filterCategory || filterLevel 
                ? 'No training videos found matching your filters' 
                : 'No training videos available'
              }
            </p>
            {(searchQuery || filterCategory || filterLevel) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterCategory('');
                  setFilterLevel('');
                }}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </section>

      {/* Add/Edit Material Modal */}
      {(showAddModal || editingMaterial) && (
        <MaterialModal
          material={editingMaterial}
          onClose={() => {
            setShowAddModal(false);
            setEditingMaterial(null);
          }}
          onSubmit={(data) => {
            if (editingMaterial) {
              updateTrainingMaterial(editingMaterial.id, data);
            } else {
              addTrainingMaterial(data);
            }
            setShowAddModal(false);
            setEditingMaterial(null);
          }}
        />
      )}
    </div>
  );
}

function MaterialModal({ 
  material, 
  onClose, 
  onSubmit 
}: { 
  material?: any, 
  onClose: () => void, 
  onSubmit: (data: any) => void 
}) {
  const { user } = useAuth();
  const isEditing = !!material;
  const [step, setStep] = useState(isEditing ? 2 : 1);
  const [materialType, setMaterialType] = useState<'awareness-campaign' | 'training-video'>(
    material?.type || 'awareness-campaign'
  );

  const [formData, setFormData] = useState({
    // Awareness fields
    title: material?.title || '',
    // Training fields
    category: material?.category || 'Security',
    level: material?.level || 'Beginner',
    videoTitle: material?.videoTitle || '',
    videoDescription: material?.videoDescription || '',
    videoUrl: material?.videoUrl || '',
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(material?.imageUrl || '');
  React.useEffect(() => {
    if (materialType === 'awareness-campaign') {
      setStep(isEditing ? 2 : 1);
    } else {
      setStep(isEditing ? 2 : 1);
    }
  }, [materialType, isEditing]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submissionData: any = {
      type: materialType,
      createdBy: user?.name || 'Unknown',
      isActive: true,
    };

    if (materialType === 'awareness-campaign') {
      submissionData.title = formData.title;
      submissionData.imageUrl = selectedImage ? URL.createObjectURL(selectedImage) : material?.imageUrl || '';
    } else {
      submissionData.category = formData.category;
      submissionData.level = formData.level;
      submissionData.videoTitle = formData.videoTitle;
      submissionData.videoDescription = formData.videoDescription;
      submissionData.videoUrl = formData.videoUrl;
      submissionData.thumbnailUrl = getVideoThumbnail(formData.videoUrl);
    }

    onSubmit(submissionData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">
              {isEditing ? 'Edit Material' : 'Add New Material'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>

        {step === 1 && !isEditing && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Choose Material Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setMaterialType('awareness-campaign');
                  setStep(2);
                }}
                className="p-6 border-2 border-slate-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all text-left"
              >
                <Shield className="w-8 h-8 text-red-600 mb-3" />
                <h4 className="font-semibold text-slate-900 mb-2">Awareness Campaign</h4>
                <p className="text-slate-600 text-sm">Create awareness posters and campaigns</p>
              </button>
              
              <button
                onClick={() => {
                  setMaterialType('training-video');
                  setStep(2);
                }}
                className="p-6 border-2 border-slate-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all text-left"
              >
                <BookOpen className="w-8 h-8 text-red-600 mb-3" />
                <h4 className="font-semibold text-slate-900 mb-2">Training Video</h4>
                <p className="text-slate-600 text-sm">Add training videos and tutorials</p>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {materialType === 'awareness-campaign' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Campaign Image *
                  </label>
                  <div className="space-y-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      required={!isEditing}
                    />
                    {imagePreview && (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg border border-slate-200"
                        />
                        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                          Preview
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Level *
                    </label>
                    <select
                      value={formData.level}
                      onChange={(e) => setFormData({...formData, level: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      {levels.map((level) => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.videoTitle}
                    onChange={(e) => setFormData({...formData, videoTitle: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.videoDescription}
                    onChange={(e) => setFormData({...formData, videoDescription: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    rows={3}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Video URL * (YouTube or Google Drive)
                  </label>
                  <input
                    type="url"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="https://youtube.com/watch?v=... or https://drive.google.com/..."
                    required
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Thumbnail will be automatically generated from the video URL
                  </p>
                </div>
              </>
            )}
            
            <div className="flex justify-end space-x-3 pt-4">
              {step === 2 && !isEditing && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Back
                </button>
              )}
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
                {isEditing ? 'Update' : 'Add'} Material
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}