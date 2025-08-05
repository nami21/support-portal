import React from 'react';
import { Clock, Hash, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { SpotlightPost, SpotlightUser } from '../../types';
import { EmojiReactions } from './EmojiReactions';
import { MediaGrid } from './MediaGrid';
import { MediaLightbox } from './MediaLightbox';

interface PostCardProps {
  post: SpotlightPost;
  currentUser: SpotlightUser;
  onReact: (postId: string, emoji: string) => void;
  onEdit: (post: SpotlightPost) => void;
  onDelete: (postId: string) => void;
  canEdit: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  currentUser, 
  onReact, 
  onEdit, 
  onDelete, 
  canEdit 
}) => {
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else {
      return 'Just now';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'support':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Admin';
      case 'support':
        return 'Support';
      default:
        return 'Team Member';
    }
  };

  const handleMediaClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleEdit = () => {
    onEdit(post);
    setShowDropdown(false);
  };

  const handleDelete = () => {
    onDelete(post.id);
    setShowDropdown(false);
  };

  // Check if current user can edit/delete this post
  const canEditThisPost = canEdit && (
    currentUser.role === 'admin' || 
    currentUser.role === 'support' || 
    post.author.id === currentUser.id
  );

  return (
    <>
      <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden hover:bg-white hover:shadow-sm transition-all duration-300">
      {/* Header */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-200 shadow-sm"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-900">{post.author.name}</h3>
            </div>
            <div className="flex items-center gap-1 text-sm text-slate-500">
              <Clock className="w-3 h-3" />
              <span>{formatTimestamp(post.timestamp)}</span>
            </div>
          </div>
          </div>

          {/* Post Actions Dropdown */}
          {canEditThisPost && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="p-2 hover:bg-slate-200 rounded-lg transition-colors duration-200 text-slate-500 hover:text-slate-700"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-10 py-1">
                  <button
                    onClick={handleEdit}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors duration-200"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Post
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Post
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 ">
        <p className="text-slate-800 whitespace-pre-wrap leading-relaxed mb-3">
          {post.content}
        </p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 text-sm rounded-full hover:bg-slate-200 transition-colors duration-200"
              >
                <Hash className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

                {/* Media */}
        {post.media && post.media.length > 0 && (
          <div className="mb-4"> 
            <MediaGrid
              media={post.media}
              onMediaClick={handleMediaClick}
            />
          </div>
        )}


        {/* Reactions */}
        <EmojiReactions
          post={post}
          currentUser={currentUser}
          onReact={onReact}
        />
      </div>
    </div>

      {/* Media Lightbox */}
      {post.media && (
        <MediaLightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          media={post.media}
          initialIndex={lightboxIndex}
        />
      )}
    </>
  );
};