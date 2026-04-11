import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';

const releases = [
  { title: 'Dark Ether', type: 'Single', year: '2024', cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=800' },
  { title: 'Neon Nights', type: 'EP', year: '2023', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800' },
  { title: 'Midwest Melancholy', type: 'Album', year: '2023', cover: 'https://images.unsplash.com/photo-1459749411177-042180ce673b?auto=format&fit=crop&q=80&w=800' },
  { title: 'Vapor Trails', type: 'Single', year: '2022', cover: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3c?auto=format&fit=crop&q=80&w=800' },
  { title: 'Shattered Glass', type: 'Single', year: '2022', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800' },
  { title: 'Static', type: 'EP', year: '2021', cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800' },
];

const Music = () => {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-24 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-6 uppercase">Discography</h1>
            <div className="h-1 w-24 bg-white mb-8"></div>
            <p className="text-white/40 max-w-xl text-lg font-medium leading-relaxed">
              The complete sonic record. From early analog experiments to heavy digital landscapes.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {releases.map((release, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square glass overflow-hidden mb-6 shadow-2xl">
                <img 
                  src={release.cover} 
                  alt={release.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-6 backdrop-blur-sm">
                  <button className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-2xl">
                    <Play size={24} fill="currentColor" className="ml-1" />
                  </button>
                  <button className="w-16 h-16 bg-white/10 border border-white/20 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all shadow-2xl">
                    <ExternalLink size={24} />
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-black uppercase tracking-tight">{release.title}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase font-black tracking-[0.2em] text-white/30">{release.type}</span>
                  <span className="w-1 h-1 bg-white/10 rounded-full"></span>
                  <span className="text-[10px] uppercase font-black tracking-[0.2em] text-white/30">{release.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Music;
