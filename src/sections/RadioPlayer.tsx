import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface RadioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  streamUrl?: string;
}

export default function RadioPlayer({ isPlaying, setIsPlaying, streamUrl }: RadioPlayerProps) {
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio visualizer bars
  const bars = [15, 25, 35, 45, 35, 25, 15];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Auto-play blocked
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const defaultStreamUrl = 'http://51.77.72.72:5932/stream';

  return (
    <div className="bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="text-center">
                <div className="text-[10px] font-bold text-sky-600">RADYO</div>
                <div className="text-xl font-black text-red-600">YOL</div>
              </div>
            </div>
            <div className="flex items-center text-white">
              <Volume2 className="w-5 h-5 mr-2" />
              <span className="font-medium">Radyo Yol Türkülerin Susmayan Sesi</span>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center space-x-4">
            {/* Play Button */}
            <button
              onClick={togglePlay}
              className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 text-sky-600" />
              ) : (
                <Play className="w-7 h-7 text-sky-600 ml-1" />
              )}
            </button>

            {/* Volume Control */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-white hover:text-sky-200"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-24 h-2 bg-white/30 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Audio Visualizer */}
            <div className="hidden sm:flex items-end space-x-1 h-10">
              {bars.map((height, index) => (
                <div
                  key={index}
                  className={`w-2 bg-yellow-400 rounded-t transition-all duration-300 ${
                    isPlaying ? 'sound-bar' : ''
                  }`}
                  style={{
                    height: isPlaying ? undefined : `${height}px`,
                    animationDelay: `${index * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Now Playing */}
          <div className="flex items-center bg-white/20 rounded-lg px-4 py-2">
            <div className="w-10 h-10 bg-gray-300 rounded flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.369 4.369 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
              </svg>
            </div>
            <div>
              <div className="text-white text-sm font-medium">Canlı Yayın</div>
              <div className="text-white/80 text-xs">Radyo Yol</div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={streamUrl || defaultStreamUrl}
        preload="none"
      />
    </div>
  );
}
