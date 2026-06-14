import { useState } from 'react';
import PageTransition from '../components/PageTransition';
import Hero from '../components/Hero';
import AlbumTeaser from '../components/AlbumTeaser';
import { motion } from 'framer-motion';
import { Instagram, Music2, Facebook, Music, ArrowRight, Send, Disc, FileText, Share2 } from 'lucide-react';
import { RELEASE_DATA, upcomingReleases } from '../config/releaseData';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Home = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const socials = [
    { icon: <Instagram size={18} />, href: 'https://instagram.com/thecolincherry', color: 'hover:text-[#E4405F] hover:border-[#E4405F]/50' },
    { icon: <Music size={18} />, href: 'https://tiktok.com/@thecolincherry', color: 'hover:text-[#00f2ea] hover:border-[#00f2ea]/50' },
    { icon: <Facebook size={18} />, href: 'https://facebook.com/thecolincherry', color: 'hover:text-[#1877F2] hover:border-[#1877F2]/50' },
    { icon: <Music2 size={18} />, href: 'https://soundcloud.com/thecolincherry', color: 'hover:text-[#FF3300] hover:border-[#FF3300]/50' },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const now = Date.now();
  const parseReleaseDate = (dateStr: string) => {
    if (dateStr === "PAST RELEASE") return 0;
    const parsed = Date.parse(`${dateStr}, ${new Date().getFullYear()}`);
    return isNaN(parsed) ? 0 : parsed;
  };

  // Only show future or very recent releases in the schedule, ordered chronologically
  const activeSchedule = upcomingReleases
    .filter(release => {
      const releaseTime = parseReleaseDate(release.date);
      // Show if it is in the future, or was released within the last 14 days
      return releaseTime > now || (releaseTime > 0 && now - releaseTime < 14 * 24 * 60 * 60 * 1000);
    })
    .sort((a, b) => parseReleaseDate(a.date) - parseReleaseDate(b.date));

  return (
    <PageTransition>
      <Helmet>
        <title>Colin Cherry | Official Artist Site & Hub</title>
        <meta name="description" content="Explore the atmospheric and visceral soundscapes of Indianapolis artist Colin Cherry. Stream official releases, view lyrics, and explore the catalog." />
      </Helmet>

      <Hero 
        latestDropTitle={RELEASE_DATA.currentSingle.title}
        artworkUrl={RELEASE_DATA.currentSingle.artworkUrl}
        routingLink={RELEASE_DATA.currentSingle.streamLink}
      />

      <AlbumTeaser 
        title={RELEASE_DATA.rollout.albumTitle}
        artworkUrl="/rose.jpg"
        isVisible={RELEASE_DATA.rollout.showTeaser}
        releaseDate={RELEASE_DATA.rollout.targetMonth}
      />

      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-12 pb-40">
        {/* Brand Watermark */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
           <img 
             src="/logo_textured.png" 
             alt="" 
             className="w-[120%] max-w-none opacity-[0.02] grayscale contrast-150 scale-110"
           />
        </div>

        <div className="relative z-20 text-center max-w-5xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-[10rem] font-display uppercase tracking-tighter mb-12 leading-none">
              COLIN CHERRY
            </h1>

            {/* Featured Embeds - Responsive Containment */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-24 w-full max-w-4xl mx-auto">
              <div className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-2xl glass p-1">
                <iframe 
                  src="https://open.spotify.com/embed/artist/2lCz91g9DugcZhbtvMnaUN?utm_source=generator&theme=0" 
                  width="100%" 
                  frameBorder="0" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                  className="w-full aspect-[4/1] md:aspect-[3/1] rounded-xl"
                ></iframe>
              </div>
              <div className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-2xl glass p-1">
                <iframe 
                  allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" 
                  frameBorder="0" 
                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" 
                  src="https://embed.music.apple.com/us/artist/colin-cherry/1639040887"
                  className="w-full aspect-[4/1] md:aspect-[3/1] rounded-xl"
                ></iframe>
              </div>
            </div>

            {/* Bento Grid Navigation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left mb-24 w-full">
              {/* Card 1: Latest Release (Spans 2 columns on desktop) */}
              <div className="md:col-span-2 glass p-8 flex flex-col justify-between relative overflow-hidden group hover:border-white/20 transition-all duration-300 min-h-[220px]">
                <div className="absolute top-0 right-0 w-48 h-full opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                  <img src={RELEASE_DATA.currentSingle.artworkUrl} alt="" className="w-full h-full object-cover grayscale scale-110 group-hover:scale-100 transition-transform duration-700" />
                </div>
                <div className="relative z-10 space-y-4">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Latest Release</span>
                  <h3 className="text-4xl font-black uppercase tracking-tighter">{RELEASE_DATA.currentSingle.title}</h3>
                  <p className="text-white/40 text-xs max-w-md">Stream the new single now on Spotify, Apple Music, and other major platforms.</p>
                </div>
                <a 
                  href={RELEASE_DATA.currentSingle.streamLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white mt-6 group-hover:text-white/70 transition-colors w-fit border-b border-white pb-1"
                >
                  Stream Now <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Card 2: Music Catalog (Spans 1 column) */}
              <Link to="/music" className="glass p-8 flex flex-col justify-between group hover:border-white/20 transition-all duration-300 min-h-[220px]">
                <div className="flex justify-between items-start text-white/40">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em]">Discography</span>
                  <Disc size={20} className="group-hover:rotate-45 transition-transform duration-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Music</h3>
                  <p className="text-white/40 text-xs">Explore all releases, tracks, and view high-fidelity song lyrics.</p>
                </div>
                <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors w-fit">
                  View Catalog <ArrowRight size={12} />
                </span>
              </Link>

              {/* Card 3: EPK Hub (Spans 1 column) */}
              <Link to="/epk" className="glass p-8 flex flex-col justify-between group hover:border-white/20 transition-all duration-300 min-h-[220px]">
                <div className="flex justify-between items-start text-white/40">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em]">Industry</span>
                  <FileText size={20} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase tracking-tighter">EPK</h3>
                  <p className="text-white/40 text-xs">Access press assets, biography, tech rider, and contact details.</p>
                </div>
                <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors w-fit">
                  View Press Hub <ArrowRight size={12} />
                </span>
              </Link>

              {/* Card 4: Mailing List (Spans 2 columns on desktop) */}
              <div className="md:col-span-2 glass p-8 flex flex-col justify-between group hover:border-white/20 transition-all duration-300 min-h-[220px]">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Mailing List</span>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mt-1 mb-2">Join the list</h3>
                  <p className="text-white/40 text-xs max-w-md">No spam, just music drops and official show announcements.</p>
                </div>
                
                {subscribed ? (
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/60 py-4">
                    Thank you. You have been subscribed.
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-2 mt-4 max-w-md w-full">
                    <input 
                      type="email" 
                      required
                      placeholder="EMAIL ADDRESS" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/5 border border-white/10 px-4 py-3 rounded-lg flex-grow focus:outline-none focus:border-white/30 transition-colors text-[10px] font-bold tracking-widest text-white w-full"
                    />
                    <button type="submit" className="bg-white text-black px-6 py-3 rounded-lg font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                      Join <Send size={12} />
                    </button>
                  </form>
                )}
              </div>

              {/* Card 5: Social Connections (Spans 1 column) */}
              <div className="glass p-8 flex flex-col justify-between min-h-[220px]">
                <div className="flex justify-between items-start text-white/40">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em]">Connect</span>
                  <Share2 size={20} />
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {socials.map((social, i) => (
                    <a 
                      key={i} 
                      href={social.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`p-3 glass transition-all flex items-center justify-center text-white/40 ${social.color} hover:bg-white/5`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest text-white/20 mt-4">@thecolincherry</span>
              </div>
            </div>

            {/* Release Schedule */}
            {activeSchedule.length > 0 && (
              <div className="max-w-2xl mx-auto text-left space-y-8 w-full">
                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-8 flex items-center gap-4">
                  Release Schedule <span className="h-px flex-grow bg-white/5"></span>
                </h3>
                <div className="space-y-4">
                  {activeSchedule.map((release, i) => {
                    const isFuture = parseReleaseDate(release.date) > now;
                    return (
                      <a 
                        key={i}
                        href={release.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 md:p-6 glass hover:bg-white/5 transition-all group"
                      >
                        <div className="flex items-center gap-4 md:gap-6">
                          <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 glass overflow-hidden rounded-md">
                            <img 
                              src={release.art} 
                              alt={release.title} 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                              onError={(e) => { e.currentTarget.src = "/rose.jpg"; }}
                            />
                          </div>
                          <div>
                            <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-none mb-1">{release.title}</h4>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-white/20">
                              {release.date} {isFuture ? '— UPCOMING' : '— OUT NOW'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-white/20 group-hover:text-white transition-all">
                          <span className="hidden sm:inline">{isFuture ? 'Pre-Save' : 'Stream Now'}</span> <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

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
