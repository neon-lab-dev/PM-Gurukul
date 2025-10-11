import React from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCw,
  RotateCcw,
  Fullscreen,
  Minus,
  Plus,
} from "lucide-react";

interface ControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  volume: number;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isMuted: boolean;
  onMuteToggle: () => void;
  onSeek: (seconds: number) => void;
  progress: number;
  buffered: number;
  onProgressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  duration: number;
  currentTime: number;
  playbackRate: number;
  className: string;
  onPlaybackRateChange: (rate: number) => void;
  onFullScreen: () => void;
  isFullScreen: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  onPlayPause,
  volume,
  onVolumeChange,
  isMuted,
  onMuteToggle,
  onSeek,
  progress,
  buffered,
  onProgressChange,
  duration,
  currentTime,
  playbackRate,
  className,
  onPlaybackRateChange,
  onFullScreen,
  isFullScreen,
}) => {
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      className={`mt-4 flex flex-col p-4 shadow-custom ${className} bg-black bg-opacity-10 shadow-sm`}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling
            onPlayPause();
          }}
          className="p-2 hover:bg-gray-700 rounded-full transition-custom"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-accent-primary" />
          ) : (
            <Play className="w-6 h-6 text-accent-primary" />
          )}
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              onMuteToggle();
            }}
            className="p-2 hover:bg-gray-700 rounded-full transition-custom"
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6 " />
            ) : (
              <Volume2 className="w-6 h-6" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              onVolumeChange(e);
            }}
            className="w-24 accent-primary-30"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              onPlaybackRateChange(playbackRate - 0.25);
            }}
            className="p-2 hover:bg-gray-700 rounded-full transition-custom"
          >
            <Minus className="w-6 h-6 text-accent-primary" />
          </button>
          <span className="text-sm text-text-secondary font-secondary">
            {playbackRate}x
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              onPlaybackRateChange(playbackRate + 0.25);
            }}
            className="p-2 hover:bg-gray-700 rounded-full transition-custom"
          >
            <Plus className="w-6 h-6 text-accent-primary" />
          </button>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              onSeek(-10);
            }}
            className="p-2 hover:bg-gray-700 rounded-full transition-custom"
          >
            <RotateCcw className="w-6 h-6 text-accent-primary" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              onSeek(10);
            }}
            className="p-2 hover:bg-gray-400 rounded-full transition-custom"
          >
            <RotateCw className="w-6 h-6 text-accent-primary" />
          </button>
          <span className="text-sm text-text-secondary font-secondary">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              onFullScreen();
            }}
            className="p-2 hover:bg-gray-700 rounded-full transition-custom"
          >
            {isFullScreen ? (
              <Minus className="w-6 h-6 text-accent-primary" />
            ) : (
              <Fullscreen className="w-6 h-6 text-accent-primary" />
            )}
          </button>
        </div>
      </div>
      <div className="mt-2 relative w-full bg-gray-300 rounded-full h-2 ">
        <div
          className="absolute bg-gray-200 h-full rounded-full"
          style={{ width: `${buffered * 100}%` }}
        />
        <input
          type="range"
          min="0"
          max="1"
          step="0.001"
          value={progress}
          onChange={(e) => {
            e.stopPropagation(); // Prevent event bubbling
            onProgressChange(e);
          }}
          className="absolute top-0 left-0 w-full h-full appearance-none bg-transparent cursor-pointer  accent-primary-30"
          style={{
            background: `linear-gradient(to right, #1E293B ${
              progress * 100
            }%, transparent ${progress * 100}%)`,
          }}
        />
      </div>
    </div>
  );
};

export default Controls;
