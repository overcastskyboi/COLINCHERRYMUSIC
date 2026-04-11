import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import { Download, Mail, Instagram, Twitter, Music as MusicIcon } from 'lucide-react';

const EPK = () => {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-24 items-start pt-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full lg:w-2/5 sticky top-32"
          >
            <div className="glass aspect-[3/4] overflow-hidden shadow-2xl relative group">
              <img 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1200" 
                alt="Colin Cherry Press Shot" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                 <h2 className="text-4xl font-black tracking-tighter uppercase">Colin Cherry</h2>
                 <p className="text-white/50 uppercase tracking-widest text-[10px] font-bold">Official Press Photo 2024</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
               <button className="flex items-center justify-center gap-3 py-4 glass text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                 <Download size={14} /> Hi-Res Images
               </button>
               <button className="flex items-center justify-center gap-3 py-4 glass text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                 <Download size={14} /> Press Release
               </button>
            </div>
          </motion.div>
          
          <div className="w-full lg:w-3/5 space-y-16">
            <header>
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase mb-6 leading-none">EPK</h1>
              <p className="text-2xl text-white/40 font-serif italic border-l-4 border-white/10 pl-8">
                "The Midwest sound isn't just a place, it's a mood."
              </p>
            </header>

            <section className="space-y-8">
              <h3 className="text-xs uppercase tracking-[0.4em] font-black text-white/30 flex items-center gap-4">
                Biography <span className="h-[1px] flex-grow bg-white/5"></span>
              </h3>
              <div className="space-y-6 text-xl text-white/60 leading-relaxed font-medium">
                <p>
                  Based in Indianapolis, Colin Cherry is an architect of atmosphere. Blending the heavy, industrial textures of the city with the raw emotion of early alternative music, he creates a sonic landscape that is both visceral and hauntingly beautiful.
                </p>
                <p>
                  With a background in systems administration and a deep connection to American Traditional tattoo aesthetics, Colin's work is defined by precision and grit. Every track is a calculated exploration of light and shadow, digital and analog, chaos and control.
                </p>
              </div>
            </section>

            <section className="space-y-8">
              <h3 className="text-xs uppercase tracking-[0.4em] font-black text-white/30 flex items-center gap-4">
                Details <span className="h-[1px] flex-grow bg-white/5"></span>
              </h3>
              <div className="grid grid-cols-2 gap-8">
                <div className="p-8 glass space-y-2">
                  <span className="text-[10px] uppercase tracking-widest font-black text-white/20">Location</span>
                  <p className="text-2xl font-black uppercase">Indianapolis, IN</p>
                </div>
                <div className="p-8 glass space-y-2">
                  <span className="text-[10px] uppercase tracking-widest font-black text-white/20">Genres</span>
                  <p className="text-2xl font-black uppercase">Alt / Midwest Noir</p>
                </div>
              </div>
            </section>

            <section className="space-y-12 pb-12">
              <h3 className="text-xs uppercase tracking-[0.4em] font-black text-white/30 flex items-center gap-4">
                Connect <span className="h-[1px] flex-grow bg-white/5"></span>
              </h3>
              <div className="flex flex-col gap-6">
                <a href="mailto:press@thecolincherry.com" className="group flex items-center justify-between p-8 glass hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-6">
                    <Mail className="text-white/20 group-hover:text-white transition-colors" />
                    <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter">press@thecolincherry.com</span>
                  </div>
                  <ArrowRight className="text-white/20 group-hover:translate-x-2 transition-all" />
                </a>
                
                <div className="flex gap-4">
                  {[
                    { icon: <Instagram size={20} />, label: 'Instagram' },
                    { icon: <Twitter size={20} />, label: 'Twitter' },
                    { icon: <MusicIcon size={20} />, label: 'SoundCloud' }
                  ].map((social, i) => (
                    <button key={i} className="flex-grow flex items-center justify-center gap-3 py-6 glass hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-widest">
                      {social.icon} {social.label}
                    </button>
                  ))}
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
