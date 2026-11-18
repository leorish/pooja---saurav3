import React from 'react';
import { Music, VolumeX } from 'lucide-react';

interface MusicControlProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const MusicControl: React.FC<MusicControlProps> = ({ isPlaying, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isPlaying ? 'Pause romantic background music' : 'Play romantic background music'}
      title={isPlaying ? 'Mute music' : 'Play music'}
      className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[#B2945E]/70 bg-[#F8EEDB]/92 text-[#7B6134] shadow-[0_6px_20px_rgba(73,48,39,0.16)] backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:border-[#B2945E] hover:bg-[#581F2A] hover:text-[#F5E8D0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B2945E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5E8D0]"
    >
      {isPlaying ? (
        <Music className="h-4 w-4" aria-hidden="true" />
      ) : (
        <VolumeX className="h-4 w-4 opacity-75" aria-hidden="true" />
      )}
    </button>
  );
};
