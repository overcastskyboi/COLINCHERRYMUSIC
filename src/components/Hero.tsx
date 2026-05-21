import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  latestDropTitle: string;
  artworkUrl: string;
  routingLink: string;
}

const Hero = ({ 
  latestDropTitle = "LONELY", 
  artworkUrl = "/lonely.png", 
  routingLink = "#" 
}: HeroProps = { 
  latestDropTitle: "LONELY", 
  artworkUrl: "/lonely.png", 
  routingLink: "#" 
}) => {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Full-bleed Artwork Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${artworkUrl})` }}
      />
      
      {/* Atmospheric Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/40 to-[#0a0a0a]" />

      {/* Centered Content */}
      <div className="relative z-20 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 mb-6">Latest Release</h2>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-10">{latestDropTitle}</h1>
          <a 
            href={routingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full font-black uppercase text-[12px] tracking-widest hover:scale-105 active:scale-95 transition-all"
          >
            Stream Now <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
