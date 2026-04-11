import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <PageTransition>
      <div className="relative h-[85vh] flex items-center justify-center overflow-hidden -mt-24">
        {/* Cinematic Backdrop */}
        <div className="absolute inset-0 z-0 scale-110">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1514525253361-bee0483307a0?auto=format&fit=crop&q=80&w=1920" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-50 contrast-125 saturate-50"
          />
        </div>

        <div className="relative z-20 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-7xl md:text-[12rem] font-black tracking-tighter mb-4 leading-none">
              COLIN CHERRY
            </h1>
            <p className="text-sm md:text-xl text-white/40 mb-12 uppercase tracking-[0.5em] font-bold">
              Indianapolis Alternative &bull; Midwest Noir
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="group relative px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-sm rounded-full overflow-hidden hover:scale-105 transition-all">
                <span className="relative z-10 flex items-center gap-3">
                  <Play size={18} fill="currentColor" /> Stream Latest
                </span>
                <div className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </button>
              <Link to="/music" className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white font-black uppercase tracking-widest text-sm rounded-full hover:bg-white/10 hover:border-white/20 transition-all">
                <span className="flex items-center gap-3">
                  Explore Music <ArrowRight size={18} />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Featured Artwork Section */}
      <section className="max-w-7xl mx-auto px-6 py-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-white/5 blur-2xl rounded-3xl group-hover:bg-white/10 transition-colors"></div>
              <div className="relative glass aspect-square overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1200" 
                  alt="Featured Release" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div className="space-y-2">
              <span className="text-white/30 uppercase tracking-[0.3em] text-xs font-black">Featured Single</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">DARK ETHER</h2>
            </div>
            <p className="text-xl text-white/50 leading-relaxed font-medium">
              A collision of industrial texture and Midwest atmosphere. "Dark Ether" explores the quiet tension of Indianapolis nights through a lens of heavy bass and haunting melodies.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              {['Spotify', 'Apple Music', 'YouTube', 'SoundCloud'].map(p => (
                <span key={p} className="px-5 py-2 glass text-[10px] uppercase font-black tracking-widest text-white/40 hover:text-white transition-colors cursor-pointer">
                  {p}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;
