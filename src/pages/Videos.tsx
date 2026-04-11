import PageTransition from '../components/PageTransition';
import { PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const videos = [
  { title: 'Dark Ether (Official Video)', id: 'videoId1', thumb: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1200' },
  { title: 'Neon Nights Tour: Live', id: 'videoId2', thumb: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=1200' },
  { title: 'Midwest Melancholy Docs', id: 'videoId3', thumb: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200' },
];

const Videos = () => {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <header className="mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-6 uppercase">Visuals</h1>
            <div className="h-1 w-24 bg-white mb-8"></div>
            <p className="text-white/40 max-w-xl text-lg font-medium leading-relaxed uppercase tracking-widest">
              Cinematic explorations of the Colin Cherry universe.
            </p>
          </motion.div>
        </header>

        <div className="space-y-32">
          {videos.map((video, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="aspect-video w-full glass overflow-hidden relative cursor-pointer">
                <img 
                  src={video.thumb} 
                  alt={video.title} 
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
                  <PlayCircle size={100} className="text-white/80 scale-90 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                   <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-2">{video.title}</h3>
                   <span className="text-[10px] uppercase font-black tracking-[0.5em] text-white/30">Official YouTube Music Video</span>
                </div>
                <button className="px-10 py-4 glass text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
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

export default Videos;
