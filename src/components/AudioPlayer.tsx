import { Play, Pause, SkipBack, SkipForward, Music } from 'lucide-react';
import { useState } from 'react';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-6 pointer-events-none">
      <div className="max-w-4xl mx-auto bg-black/90 backdrop-blur-3xl border border-white/5 rounded-3xl p-4 flex items-center justify-between gap-6 pointer-events-auto shadow-2xl">
        {/* Simple Info */}
        <div className="flex items-center gap-4 min-w-[150px]">
          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white/20">
             <Music size={20} />
          </div>
          <div className="overflow-hidden">
            <h4 className="text-[11px] font-black uppercase tracking-tight truncate">Dark Ether</h4>
            <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] mt-0.5">Colin Cherry</p>
          </div>
        </div>

        {/* Essential Controls */}
        <div className="flex flex-col items-center gap-3 flex-grow max-w-sm">
          <div className="flex items-center gap-8">
            <button className="text-white/20 hover:text-white transition-colors"><SkipBack size={18} /></button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
            >
              {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
            </button>
            <button className="text-white/20 hover:text-white transition-colors"><SkipForward size={18} /></button>
          </div>
          <div className="w-full h-[1px] bg-white/5 relative">
            <div className="absolute top-0 left-0 h-full w-[35%] bg-white/30"></div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[10px] font-black text-white/20 tracking-widest min-w-[100px] justify-end">
          01:24 / 03:45
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
