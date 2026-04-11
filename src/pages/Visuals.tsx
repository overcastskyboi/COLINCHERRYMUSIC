import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';

const videos = [
  { title: 'Dark Ether', category: 'Official Music Video', thumb: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1200' },
  { title: 'Live in Indy', category: 'Performance', thumb: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=1200' },
];

const Visuals = () => {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-24 text-center">
          <h1 className="text-6xl md:text-9xl font-display uppercase tracking-tighter mb-6 leading-none">Visuals</h1>
          <p className="text-[10px] uppercase tracking-[0.5em] font-black text-white/20">The Aesthetic Experience</p>
        </header>

        <div className="space-y-40">
          {videos.map((video, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="aspect-video w-full glass overflow-hidden relative cursor-pointer shadow-2xl">
                <img 
                  src={video.thumb} 
                  alt={video.title} 
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/10 transition-all">
                  <PlayCircle size={100} strokeWidth={1} className="text-white/60 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div>
                   <h3 className="text-4xl md:text-6xl font-display uppercase tracking-tight mb-2 leading-none">{video.title}</h3>
                   <span className="text-[10px] uppercase font-black tracking-[0.4em] text-white/20">{video.category}</span>
                </div>
                <button className="px-12 py-5 border border-white/5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">
                  Watch on YouTube
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Visuals;
