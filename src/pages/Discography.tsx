import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import { Music, ExternalLink } from 'lucide-react';

const releases = [
  { title: 'Dark Ether', type: 'Single', year: '2024', id: 'dark-ether' },
  { title: 'Neon Nights', type: 'EP', year: '2023', id: 'neon-nights' },
];

const Discography = () => {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-24 text-center max-w-2xl mx-auto">
          <h1 className="text-6xl md:text-9xl font-display uppercase tracking-tighter mb-6 leading-none">Music</h1>
          <p className="text-[10px] uppercase tracking-[0.5em] font-black text-white/20">The Sonic Record</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start mb-32">
          {/* Main Embed */}
          <div className="glass p-1 shadow-2xl">
            <iframe 
              src="https://open.spotify.com/embed/artist/2lCz91g9DugcZhbtvMnaUN?utm_source=generator&theme=0" 
              width="100%" 
              height="352" 
              frameBorder="0" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              className="spotify-embed"
            ></iframe>
          </div>
          
          <div className="space-y-12">
            <h3 className="text-3xl font-display uppercase tracking-tight flex items-center gap-4">
              <Music className="text-white/20" /> Latest Catalog
            </h3>
            <div className="space-y-6">
              {releases.map((release, i) => (
                <div key={i} className="flex items-center justify-between py-6 border-b border-white/5 group hover:border-white/20 transition-all cursor-pointer">
                  <div>
                    <h4 className="text-2xl font-black uppercase tracking-tight group-hover:text-white transition-colors">{release.title}</h4>
                    <p className="text-[10px] uppercase font-black tracking-widest text-white/20">{release.type} &bull; {release.year}</p>
                  </div>
                  <ExternalLink size={20} className="text-white/10 group-hover:text-white transition-all" />
                </div>
              ))}
            </div>
            
            <div className="pt-8 flex gap-6">
               <a 
                 href="https://open.spotify.com/artist/2lCz91g9DugcZhbtvMnaUN" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex-grow py-5 glass text-center text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
               >
                 Spotify
               </a>
               <a 
                 href="https://music.apple.com/us/artist/colin-cherry/1639040887" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex-grow py-5 glass text-center text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
               >
                 Apple Music
               </a>
            </div>
          </div>
        </div>

        {/* Feature Artwork / EPK Context */}
        <div className="relative aspect-[21/9] w-full glass overflow-hidden grayscale contrast-125 mb-32">
           <img 
             src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1920" 
             alt="Vibe" 
             className="w-full h-full object-cover opacity-40"
           />
           <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-5xl md:text-8xl font-display uppercase tracking-widest opacity-20">MIDWEST NOIR</h2>
           </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Discography;
