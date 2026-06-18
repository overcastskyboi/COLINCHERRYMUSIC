import { motion } from 'framer-motion';

interface AlbumTeaserProps {
  title: string;
  artworkUrl: string;
  isVisible: boolean;
  releaseDate: string;
}

const AlbumTeaser = ({ title, artworkUrl, isVisible, releaseDate }: AlbumTeaserProps) => {
  if (!isVisible) return null;

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-6 py-24"
    >
      <div className="glass p-12 md:p-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="overflow-hidden rounded-lg">
          <img src={artworkUrl} alt={title} className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
        </div>
        <div className="space-y-6">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60">Upcoming Release</h2>
          <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">{title}</h3>
          <p className="text-xl text-white/70 font-light italic">{releaseDate}</p>
          <div className="h-px w-20 bg-white/40"></div>
        </div>
      </div>
    </motion.section>
  );
};

export default AlbumTeaser;
