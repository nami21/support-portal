import React from 'react';
import { SpotlightPost, SpotlightUser } from '../../types';

interface EmojiReactionsProps {
  post: Post;
  currentUser: User;
  onReact: (postId: string, emoji: string) => void;
}

const availableEmojis = ['👍', '❤️', '🎉', '👏', '💯', '🚀', '🤝', '✅', '🎯', '💪'];

export const EmojiReactions: React.FC<EmojiReactionsProps> = ({
  post,
  currentUser,
  onReact
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const pickerRef = React.useRef<HTMLDivElement>(null);

  // Close picker when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  const handleEmojiClick = (emoji: string) => {
    onReact(post.id, emoji);
    setShowEmojiPicker(false);
  };

  const getReactionCount = (emoji: string) => {
    return post.reactions[emoji]?.length || 0;
  };

  const hasUserReacted = (emoji: string) => {
    return post.reactions[emoji]?.includes(currentUser.id) || false;
  };

  const activeReactions = Object.entries(post.reactions).filter(
    ([, users]) => users.length > 0
  );

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Existing reactions */}
      {activeReactions.map(([emoji, users]) => (
        <button
          key={emoji}
          onClick={() => handleEmojiClick(emoji)}
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
            hasUserReacted(emoji)
              ? 'bg-grey-200 text-black border-grey-300'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          } border hover:scale-105 active:scale-95`}
        >
          <span className="text-base">{emoji}</span>
          <span className="text-xs">{users.length}</span>
        </button>
      ))}


      {/* Add reaction button */}
      <div className="relative" ref={pickerRef}>
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 text-gray-500 hover:text-gray-700 relative ${
            showEmojiPicker 
              ? 'bg-grey-200 text-black ring-2 ring-grey-300' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <span className="text-lg">+</span>

          
          {/* Horizontal Emoji picker - Click based */}
          {showEmojiPicker && (
            <div 
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-full shadow-lg px-3 py-2 flex gap-1 z-20 animate-in fade-in-0 zoom-in-95 duration-200"
            >
              {availableEmojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleEmojiClick(emoji)}
                  className="w-8 h-8 flex items-center justify-center text-lg hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </button>
      </div>
    </div>
  );
};