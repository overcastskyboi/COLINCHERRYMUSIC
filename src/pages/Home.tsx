import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Music, Disc } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <PageTransition>
      <div className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
        {/* Visual Focus */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1514525253361-bee0483307a0?auto=format&fit=crop&q=80&w=1920" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-20 contrast-125 grayscale"
          />
        </div>

        <div className="relative z-20 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-7xl md:text-[14rem] font-display uppercase tracking-tighter mb-4 leading-none">
              COLIN CHERRY
            </h1>
            <p className="text-sm md:text-lg text-white/30 mb-12 uppercase tracking-[0.8em] font-black">
              Emo-Rap / Alt-Pop &bull; Indianapolis
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <a 
                href="https://open.spotify.com/artist/2lCz91g9DugcZhbtvMnaUN" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-4 px-10 py-5 glass hover:bg-white/10 transition-all"
              >
                <Play size={16} fill="currentColor" />
                <span className="text-[10px] uppercase font-black tracking-[0.3em]">Stream Latest</span>
              </a>
              <Link to="/discography" className="group flex items-center gap-4 px-10 py-5 bg-white text-black hover:scale-105 transition-all">
                <Disc size={16} fill="currentColor" />
                <span className="text-[10px] uppercase font-black tracking-[0.3em]">Discography <ArrowRight size={14} className="inline ml-2 group-hover:translate-x-1 transition-transform" /></span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-6 py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tighter">The Vision</h2>
            <div className="h-1 w-20 bg-white/10"></div>
            <p className="text-xl text-white/40 leading-relaxed font-medium">
              Architecting atmosphere through the lens of Midwest noir. Colin Cherry blends industrial textures with raw alternative emotion, creating a sonic landscape that is both visceral and calculated.
            </p>
            <div className="flex gap-10">
              <div className="space-y-2">
                 <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/20">Based In</h4>
                 <p className="text-lg font-black uppercase">Indianapolis, IN</p>
              </div>
              <div className="space-y-2">
                 <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/20">Focus</h4>
                 <p className="text-lg font-black uppercase">Atmospheric Alt</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass aspect-[3/4] overflow-hidden grayscale group"
          >
            <img 
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1200" 
              alt="Colin Cherry Press Shot" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 group-hover:grayscale-0"
            />
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;
