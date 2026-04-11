import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import { Instagram, Music2, Facebook, Music, ArrowRight, Calendar } from 'lucide-react';

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

        {/* Abstract Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[#0a0a0a]"></div>
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-white/[0.01] blur-[150px] rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-white/[0.015] blur-[200px] rounded-full"></div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Home;
