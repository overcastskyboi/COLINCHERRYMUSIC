import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import { Download, Mail, Instagram, Music } from 'lucide-react';

const EPK = () => {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-24 items-start pt-12">
          {/* Visual Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full lg:w-2/5 sticky top-32"
          >
            <div className="glass aspect-[3/4] overflow-hidden shadow-2xl relative group">
              <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
              {/* Placeholder for high-res press shot */}
              <div className="absolute inset-0 flex items-center justify-center text-white/10 uppercase font-black tracking-widest text-xs">
                Press Photo 01
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                 <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">Colin Cherry</h2>
                 <p className="text-white/50 uppercase tracking-widest text-[10px] font-bold mt-2">Indianapolis, IN</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
               <button className="flex items-center justify-center gap-3 py-4 glass text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                 <Download size={14} /> Hi-Res Assets
               </button>
               <button className="flex items-center justify-center gap-3 py-4 glass text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                 <Download size={14} /> Tech Rider
               </button>
            </div>
          </motion.div>
          
          {/* Info Side */}
          <div className="w-full lg:w-3/5 space-y-20">
            <header>
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase mb-6 leading-none">EPK</h1>
              <p className="text-2xl text-white/40 font-serif italic border-l-4 border-white/10 pl-8 leading-relaxed">
                "The Midwest sound isn't just a place, it's a mood."
              </p>
            </header>

            <section className="space-y-8">
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 flex items-center gap-4">
                Biography <span className="h-[1px] flex-grow bg-white/5"></span>
              </h3>
              <div className="space-y-6 text-xl text-white/50 leading-relaxed font-medium">
                <p>
                  Colin Cherry is an architect of atmosphere. Blending industrial textures with raw alternative emotion, he creates a sonic landscape that is both visceral and calculated.
                </p>
                <p>
                  Based in Indianapolis, his work explores the quiet tension of the Midwest through heavy bass and haunting melodies. Defined by precision and grit, every track is an exploration of light and shadow.
                </p>
              </div>
            </section>

            <section className="space-y-8">
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 flex items-center gap-4">
                Stats & Genres <span className="h-[1px] flex-grow bg-white/5"></span>
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-8 glass space-y-2">
                  <span className="text-[9px] uppercase tracking-widest font-black text-white/20">Genre</span>
                  <p className="text-2xl font-black uppercase">Midwest Noir</p>
                </div>
                <div className="p-8 glass space-y-2">
                  <span className="text-[9px] uppercase tracking-widest font-black text-white/20">Focus</span>
                  <p className="text-2xl font-black uppercase">Atmospheric Alt</p>
                </div>
              </div>
            </section>

            <section className="space-y-8 pb-20">
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 flex items-center gap-4">
                Inquiries <span className="h-[1px] flex-grow bg-white/5"></span>
              </h3>
              <div className="space-y-4">
                <a href="mailto:press@thecolincherry.com" className="group flex items-center justify-between p-10 glass hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-6">
                    <Mail className="text-white/20 group-hover:text-white transition-colors" />
                    <span className="text-2xl md:text-4xl font-black uppercase tracking-tighter">press@thecolincherry.com</span>
                  </div>
                  <ArrowRight className="text-white/20 group-hover:translate-x-2 transition-all" />
                </a>
                <div className="flex gap-4">
                   <div className="flex-grow glass p-6 flex items-center justify-center gap-3">
                      <Instagram size={18} className="text-white/20" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/20">@thecolincherry</span>
                   </div>
                   <div className="flex-grow glass p-6 flex items-center justify-center gap-3">
                      <Music size={18} className="text-white/20" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Official Spotify</span>
                   </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default EPK;
