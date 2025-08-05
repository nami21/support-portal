import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface MediaItem {
  type: 'image' | 'video';
  url: string;
  alt?: string;
}

interface MediaLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  media: MediaItem[];
  initialIndex: number;
}

export const MediaLightbox: React.FC<MediaLightboxProps> = ({
  isOpen,
  onClose,
  media,
  initialIndex
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case ' ':
          if (currentMedia.type === 'video') {
            e.preventDefault();
            toggleVideoPlayback();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const currentMedia = media[currentIndex];
  const hasMultiple = media.length > 1;

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
    setIsPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
    setIsPlaying(false);
  };

  const toggleVideoPlayback = () => {
    if (videoRef) {
      if (isPlaying) {
        videoRef.pause();
      } else {
        videoRef.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoRef = (ref: HTMLVideoElement | null) => {
    setVideoRef(ref);
    if (ref) {
      ref.addEventListener('play', () => setIsPlaying(true));
      ref.addEventListener('pause', () => setIsPlaying(false));
      ref.addEventListener('ended', () => setIsPlaying(false));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
      />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all duration-200"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation Arrows */}
      {hasMultiple && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all duration-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all duration-200"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Media Content */}
      <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
        {currentMedia.type === 'image' ? (
          <img
            src={currentMedia.url}
            alt={currentMedia.alt || 'Media content'}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
        ) : (
          <div className="relative">
            <video
              ref={handleVideoRef}
              src={currentMedia.url}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              controls
              autoPlay
            />
            
            {/* Custom Play/Pause Overlay */}
            <button
              onClick={toggleVideoPlayback}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 rounded-lg"
            >
              <div className="p-4 bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200">
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <Play className="w-8 h-8 text-white ml-1" />
                )}
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Media Counter */}
      {hasMultiple && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black bg-opacity-50 text-white text-sm rounded-full">
          {currentIndex + 1} of {media.length}
        </div>
      )}

      {/* Thumbnail Navigation */}
      {hasMultiple && media.length <= 10 && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto">
          {media.map((item, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentIndex 
                  ? 'border-white shadow-lg' 
                  : 'border-transparent opacity-60 hover:opacity-80'
              }`}
            >
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt={item.alt || 'Thumbnail'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <Play className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};