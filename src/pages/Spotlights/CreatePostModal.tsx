import React, { useState } from 'react';
import { X, Upload, Hash, Image } from 'lucide-react';
import { CreateSpotlightPostData } from '../../types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateSpotlightPostData) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [media, setMedia] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit({
        content: content.trim(),
        tags,
        media: media.length > 0 ? media : undefined,
      });
      
      // Reset form
      setContent('');
      setTags([]);
      setTagInput('');
      setMedia([]);
      onClose();
    }
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setMedia(prev => [...prev, ...newFiles].slice(0, 3)); // Limit to 3 files
    }
  };

  const removeMedia = (index: number) => {
    setMedia(prev => prev.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Create New Post</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              What's happening?
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share something with the team..."
              className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-grey-500 focus:border-transparent resize-none"
              rows={4}
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleTagKeyPress}
              placeholder="Add tags and press Enter"
              className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-grey-500 focus:border-transparent"
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full"
                    className="inline-flex items-center gap-1 px-2 py-1 bg-grey-200 text-grey-800 text-sm rounded-full"
                  >
                    <Hash className="w-3 h-3" />
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-indigo-500 hover:text-indigo-700"
                      className="ml-1 text-grey-600 hover:text-grey-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Media Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Media (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleMediaUpload}
                  className="hidden"
                  id="media-upload"
                />
                <label
                  htmlFor="media-upload"
                  className="cursor-pointer flex flex-col items-center gap-2 text-slate-600 hover:text-slate-800"
                >
                  <Upload className="w-8 h-8" />
                  <span>Click to upload photos or videos</span>
                  <span className="text-sm text-slate-500">Max 3 files</span>
                </label>
              </div>

              {/* Media Preview */}
              {media.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {media.map((file, index) => (
                    <div key={index} className="relative">
                      <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center">
                        {file.type.startsWith('image/') ? (
                          <Image className="w-8 h-8 text-slate-400" />
                        ) : (
                          <span className="text-xs text-slate-500">Video</span>
                        )}
                      </div>
                      <button
                        type="button" 
                        onClick={() => removeMedia(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
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
              disabled={!content.trim()}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              className="px-4 py-2 text-sm text-white bg-black hover:bg-grey-800 rounded-lg"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};