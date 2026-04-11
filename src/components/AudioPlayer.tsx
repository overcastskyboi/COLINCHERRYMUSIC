import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useState } from 'react';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-6 pointer-events-none">
      <div className="max-w-5xl mx-auto bg-black/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 flex items-center justify-between gap-6 pointer-events-auto shadow-2xl">
        {/* Track Info */}
        <div className="flex items-center gap-4 min-w-[180px]">
          <div className="w-14 h-14 bg-white/5 rounded-xl overflow-hidden flex-shrink-0 shadow-lg border border-white/5">
             <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=100" alt="Dark Ether" className="w-full h-full object-cover" />
          </div>
          <div className="overflow-hidden">
            <h4 className="text-sm font-bold truncate tracking-tight">Dark Ether</h4>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mt-0.5">Colin Cherry</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-3 flex-grow max-w-lg">
          <div className="flex items-center gap-8">
            <button className="text-white/30 hover:text-white transition-colors"><SkipBack size={20} fill="currentColor" /></button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl"
            >
              {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" className="ml-1" />}
            </button>
            <button className="text-white/30 hover:text-white transition-colors"><SkipForward size={20} fill="currentColor" /></button>
          </div>
          <div className="w-full flex items-center gap-3 px-4">
            <span className="text-[10px] font-mono text-white/20">01:42</span>
            <div className="h-1 flex-grow bg-white/5 rounded-full overflow-hidden relative cursor-pointer group">
              <div className="absolute top-0 left-0 h-full w-[45%] bg-white/80 rounded-full transition-all group-hover:bg-white"></div>
            </div>
            <span className="text-[10px] font-mono text-white/20">03:28</span>
          </div>
        </div>

        {/* Extra / Volume */}
        <div className="hidden sm:flex items-center gap-4 min-w-[120px] justify-end">
          <Volume2 size={18} className="text-white/30" />
          <div className="w-24 h-1 bg-white/5 rounded-full relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-[65%] bg-white/30 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
