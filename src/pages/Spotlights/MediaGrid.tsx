import React from 'react';
import { Play } from 'lucide-react';

interface MediaItem {
  type: 'image' | 'video';
  url: string;
  alt?: string;
}

interface MediaGridProps {
  media: MediaItem[];
  onMediaClick: (index: number) => void;
}

export const MediaGrid: React.FC<MediaGridProps> = ({ media, onMediaClick }) => {
  if (!media || media.length === 0) return null;

  const getGridClass = (count: number) => {
    switch (count) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-2';
      case 3:
        return 'grid-cols-2';
      case 4:
        return 'grid-cols-2';
      default:
        return 'grid-cols-3';
    }
  };

  const getItemClass = (index: number, total: number) => {
    // Special layout for 3 items: first item spans 2 columns
    if (total === 3 && index === 0) {
      return 'col-span-2';
    }
    return '';
  };

  return (
   <div className={`grid gap-4 ${getGridClass(media.length)}`}>
  {media.map((item, index) => (
    <div
      key={index}
      className={`relative group cursor-pointer overflow-hidden rounded-lg bg-gray-100 ${getItemClass(index, media.length)}`}
      style={{ maxHeight: '700px' }}
      onClick={() => onMediaClick(index)}
    >
      {item.type === 'image' ? (
        <img
          src={item.url}
          alt={item.alt || 'Post media'}
          className="w-full max-h-[700px] object-contain mx-auto bg-white"
        />
      ) : (
        <>
          <video
            src={item.url}
            className="w-full max-h-[700px] object-contain mx-auto bg-black"
            muted
            preload="metadata"
          />
          {/* Video Play Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-all duration-300">
            <div className="p-3 bg-white bg-opacity-90 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-200">
              <Play className="w-6 h-6 text-gray-800 ml-0.5" />
            </div>
          </div>
        </>
      )}

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />

      {/* Media Type Indicator */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="px-2 py-1 bg-black bg-opacity-60 text-white text-xs rounded-full">
          {item.type === 'video' ? 'Video' : 'Image'}
        </div>
      </div>
    </div>
  ))}
</div>

  );
};