import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Sparkles, ArrowLeft, ChevronRight, X } from 'lucide-react';
import { SpotlightPost, SpotlightUser, CreateSpotlightPostData, CalendarEvent } from '../../types';
import { mockPosts, mockEvents } from '../../lib/mockData';
import { PostCard } from './PostCard';
import { CreatePostModal } from './CreatePostModal';
import { EditPostModal } from './EditPostModal';
import { CalendarWidget } from './CalendarWidget';
import { MotivationalQuote } from './MotivationalQuote';

export const SpotlightsPage: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<SpotlightPost[]>(mockPosts);
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  const [currentUser] = useState<SpotlightUser>({
    id: user?.id || 'current-user',
    name: user?.name || 'Current User',
    avatar: '',
    role: user?.role === 'admin' ? 'admin' : user?.role === 'support' ? 'support' : 'user'
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<SpotlightPost | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const canCreatePost = user?.role === 'admin' || user?.role === 'support';

  const handleCreatePost = (data: CreateSpotlightPostData) => {
    const newPost: SpotlightPost = {
      id: `post-${Date.now()}`,
      author: currentUser,
      content: data.content,
      tags: data.tags,
      media: data.media?.map(file => ({
        type: file.type.startsWith('image/') ? 'image' : 'video',
        url: URL.createObjectURL(file),
        alt: file.name,
      })),
      timestamp: new Date(),
      reactions: {},
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const handleEditPost = (postId: string, content: string, tags: string[]) => {
    setPosts(prev => prev.map(post => post.id === postId ? { ...post, content, tags } : post));
  };

  const handleDeletePost = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(prev => prev.filter(post => post.id !== postId));
    }
  };

  const openEditModal = (post: SpotlightPost) => {
    setEditingPost(post);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingPost(null);
    setIsEditModalOpen(false);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const handleAddEvent = (newEvent: Omit<CalendarEvent, 'id'>) => {
    const event: CalendarEvent = {
      ...newEvent,
      id: `event-${Date.now()}`,
    };
    setEvents(prev => [...prev, event]);
  };

  const handleReaction = (postId: string, emoji: string) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          const currentReactions = post.reactions[emoji] || [];
          const hasReacted = currentReactions.includes(currentUser.id);
          return {
            ...post,
            reactions: {
              ...post.reactions,
              [emoji]: hasReacted
                ? currentReactions.filter(id => id !== currentUser.id)
                : [...currentReactions, currentUser.id],
            },
          };
        }
        return post;
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-0">
          <div className="flex items-center space-x-4">
            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg"
            >
              <ChevronRight  className="w-5 h-5 text-slate-600" />
            </button>
            <Link to="/" className="hidden md:block p-2 hover:bg-slate-100 rounded-lg">
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Team Spotlights</h1>
              <p className="text-slate-600 mt-1">
                {canCreatePost
                  ? 'Share updates, achievements, and team highlights'
                  : 'View team updates, achievements, and highlights'}
              </p>
            </div>
          </div>
          {canCreatePost && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-grey-800 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New Post</span>
            </button>
          )}
        </div>

        {/* Sidebar for mobile */}
        <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold text-slate-800">Tools</h2>
            <button onClick={() => setIsSidebarOpen(false)}>
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>
          <div className="p-4 space-y-6 overflow-y-auto h-full">
            <CalendarWidget
              events={events}
              onEventClick={handleEventClick}
              onAddEvent={handleAddEvent}
            />
            <MotivationalQuote />
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="flex">
          {/* Left Column - desktop only */}
          <div className="hidden md:block w-[400px] flex-shrink-0 sticky top-0 self-start h-screen overflow-y-auto p-6 space-y-6 bg-white border-r border-slate-200">
            <CalendarWidget
              events={events}
              onEventClick={handleEventClick}
              onAddEvent={handleAddEvent}
            />
            <MotivationalQuote />
          </div>

          {/* Right Column - scrollable */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100">
              <div className="divide-y divide-slate-200">
                {posts.length === 0 ? (
                  <div className="p-12 text-center">
                    <Sparkles className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">No posts yet</h3>
                    <p className="text-slate-600 mb-4">
                      {canCreatePost ? 'Be the first to share something!' : 'No team updates yet.'}
                    </p>
                    {canCreatePost && (
                      <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-grey-800 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Create First Post</span>
                      </button>
                    )}
                  </div>
                ) : (
                  posts.map(post => (
                    <div key={post.id} className="p-6">
                      <PostCard
                        post={post}
                        currentUser={currentUser}
                        onReact={handleReaction}
                        onEdit={openEditModal}
                        onDelete={handleDeletePost}
                        canEdit={canCreatePost}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        {canCreatePost && (
          <CreatePostModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSubmit={handleCreatePost}
          />
        )}

        <EditPostModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSubmit={handleEditPost}
          post={editingPost}
        />
      </div>
    </div>
  );
};
