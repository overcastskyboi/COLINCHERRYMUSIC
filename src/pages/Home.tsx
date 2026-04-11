import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import { Instagram, Music2, Facebook, Music, ArrowRight, Calendar, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const upcomingReleases = [
    { title: 'ROSE', date: 'APRIL 24', link: 'https://distrokid.com/hyperfollow/colincherry/rose?ref=release' },
    { title: 'HOLDING ON', date: 'MAY 8', link: 'https://distrokid.com/hyperfollow/colincherry/holding-on?ref=release' },
    { title: 'DIFFERENT', date: 'MAY 22', link: 'https://distrokid.com/hyperfollow/colincherry/different?ref=release' },
  ];

  const socials = [
    { icon: <Instagram size={18} />, href: 'https://instagram.com/thecolincherry' },
    { icon: <Music size={18} />, href: 'https://tiktok.com/@thecolincherry' },
    { icon: <Facebook size={18} />, href: 'https://facebook.com/thecolincherry' },
    { icon: <Music2 size={18} />, href: 'https://soundcloud.com/thecolincherry' },
  ];

  return (
    <PageTransition>
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-32 pb-40">
        {/* Brand Watermark */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
           <img 
             src="/LOGO_TEXTURED.png" 
             alt="" 
             className="w-[120%] max-w-none opacity-[0.03] grayscale contrast-150 scale-110"
           />
        </div>

        <div className="relative z-20 text-center max-w-5xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-7xl md:text-[12rem] font-display uppercase tracking-tighter mb-8 leading-none">
              COLIN CHERRY
            </h1>
            
            <div className="flex justify-center gap-6 mb-16">
              {socials.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 glass hover:bg-white/10 transition-all text-white/40 hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Featured Embeds */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24 w-full max-w-4xl mx-auto">
              <div className="glass p-1 shadow-2xl overflow-hidden rounded-xl h-[352px]">
                <iframe 
                  src="https://open.spotify.com/embed/artist/2lCz91g9DugcZhbtvMnaUN?utm_source=generator&theme=0" 
                  width="100%" 
                  height="352" 
                  frameBorder="0" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                  className="rounded-xl"
                ></iframe>
              </div>
              <div className="glass p-1 shadow-2xl overflow-hidden rounded-xl h-[352px]">
                <iframe 
                  allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" 
                  frameBorder="0" 
                  height="352" 
                  style={{ width: '100%', maxWidth: '100%', overflow: 'hidden', borderRadius: '12px' }} 
                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" 
                  src="https://embed.music.apple.com/us/artist/colin-cherry/1639040887"
                ></iframe>
              </div>
            </div>

            {/* Release Schedule */}
            <div className="max-w-2xl mx-auto text-left space-y-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-8 flex items-center gap-4">
                Release Schedule <span className="h-px flex-grow bg-white/5"></span>
              </h3>
              <div className="space-y-4">
                {upcomingReleases.map((release, i) => (
                  <a 
                    key={i}
                    href={release.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-6 glass hover:bg-white/5 transition-all group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="text-white/20 group-hover:text-white transition-colors">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <h4 className="text-xl font-black uppercase tracking-tight leading-none mb-1">{release.title}</h4>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-white/20">{release.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-white/20 group-hover:text-white transition-all">
                      Pre-Save <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="max-w-4xl mx-auto px-6 py-40 text-center">
        <div className="glass p-12 md:p-20 relative overflow-hidden group">
           {/* Inner watermark */}
           <img 
             src="/LOGO_TEXTURED.png" 
             alt="" 
             className="absolute inset-0 w-full h-full object-contain opacity-[0.02] scale-150 grayscale pointer-events-none group-hover:scale-125 transition-transform duration-1000"
           />
           
           <div className="relative z-10 max-w-md mx-auto space-y-8">
              <h3 className="text-3xl font-black uppercase tracking-tighter">Join the list.</h3>
              <p className="text-white/30 text-sm">No spam, just drops. Get notified about new releases and visual experiences.</p>
              <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  className="bg-white/5 border border-white/10 px-6 py-4 rounded-lg flex-grow focus:outline-none focus:border-white/30 transition-colors text-[10px] font-bold tracking-widest text-white"
                />
                <button className="bg-white text-black px-8 py-4 rounded-lg font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
                  Join <Send size={14} />
                </button>
              </form>
           </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="text-2xl md:text-3xl text-white/30 leading-relaxed font-light tracking-wide italic">
            Architecting atmosphere.
          </p>
        </motion.div>
      </section>
    </PageTransition>
  );
};

export default Home;
