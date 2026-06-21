import { useState, useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';
import { Instagram, ArrowRight, Send, Disc, FileText, Clock, Calendar } from 'lucide-react';
import { RELEASE_DATA, upcomingReleases } from '../config/releaseData';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Home = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, completed: false });

  // Handle newsletter signup
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  // Countdown timer logic targeting August 1, 2026
  useEffect(() => {
    const targetTime = new Date(RELEASE_DATA.rollout.countdownTarget || "2026-08-01T00:00:00-04:00").getTime();
    
    const calculateTime = () => {
      const now = Date.now();
      const difference = targetTime - now;
      
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, completed: true });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds, completed: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const albumReleaseDate = new Date(RELEASE_DATA.rollout.countdownTarget || "2026-08-01T00:00:00-04:00").getTime();
  const daysToAlbum = Math.max(0, Math.ceil((albumReleaseDate - Date.now()) / (1000 * 60 * 60 * 24)));

  // More Lonely is already out — pull its own art rather than the next unreleased album track
  const moreLonelyArt = upcomingReleases.find(r => r.title === RELEASE_DATA.nextUp.title)?.art || RELEASE_DATA.rollout.coverArt;

  const socials = [
    { name: 'Instagram', icon: <Instagram size={20} />, href: 'https://instagram.com/thecolincherry', color: 'hover:text-[#E4405F]' },
    {
      name: 'TikTok',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12.525.02c1.31.036 2.512.512 3.518 1.227v3.13c-.176-.034-.343-.065-.514-.11-2.504-.671-4.412-2.539-5.188-4.938-.03-.1-.073-.19-.146-.373v10.59c0 5.147-4.172 9.319-9.319 9.319-5.147 0-9.319-4.172-9.319-9.319 0-5.147 4.172-9.319 9.319-9.319.463 0 .926.034 1.381.101v3.167c-.5-.149-1-.224-1.5-.224-3.407 0-6.167 2.76-6.167 6.167s2.76 6.167 6.167 6.167 6.167-2.76 6.167-6.167V0h3.13z" />
        </svg>
      ),
      href: 'https://tiktok.com/@thecolincherry', color: 'hover:text-[#00f2ea]'
    },
    {
      name: 'SoundCloud',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M11.563 17.125c-.014 0-.027 0-.041-.001V8.11c.014-.001.027-.001.041-.001.196 0 .382.032.556.091v8.834a1.986 1.986 0 0 1-.556.091zm-2.344-.121c-.014 0-.028 0-.042 0V8.51c.014-.001.028-.001.042-.001.214 0 .417.038.605.107v8.402a2.33 2.33 0 0 1-.605.107zm-2.344-.34c-.014 0-.028 0-.042 0v-6.12c.014-.001.028-.001.042-.001.233 0 .452.046.653.129v5.862a2.71 2.71 0 0 1-.653.13zm-2.343-.84c-.015 0-.029 0-.043-.001v-3.41c.014-.001.028-.001.043-.001.252 0 .489.058.702.162v3.088a3.134 3.134 0 0 1-.702.162zM2.188 14.5c-.015 0-.03 0-.045-.001V13.5c.015 0 .03 0 .045-.001.272 0 .508.076.72.212v.576a3.63 3.63 0 0 1-.72.213zm20.312-1.375c0 2.209-1.791 4-4 4h-5.625c-.014 0-.027 0-.041-.001V8.11c.014-.001.027-.001.041-.001 1.454 0 2.723.776 3.436 1.936.314-.153.667-.241 1.041-.241 1.283 0 2.323.974 2.422 2.221.688.285 1.166.96 1.166 1.75z" />
        </svg>
      ),
      href: 'https://soundcloud.com/thecolincherry', color: 'hover:text-[#FF3300]'
    },
    {
      name: 'Spotify',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.508 17.302c-.216.354-.675.466-1.028.249-2.856-1.746-6.451-2.141-10.685-1.173-.406.092-.814-.16-.906-.565-.092-.406.16-.814.565-.906 4.634-1.059 8.604-.604 11.8 1.347.353.217.465.676.249 1.029l.005.019zm1.469-3.262c-.272.44-.847.578-1.287.306-3.269-2.008-8.253-2.592-12.118-1.418-.496.147-1.022-.135-1.169-.631-.147-.496.135-1.022.631-1.169 4.416-1.341 9.913-.688 13.65 1.611.439.272.577.847.305 1.287l-.012.014zm.127-3.41c-3.921-2.328-10.374-2.543-14.133-1.403-.601.182-1.237-.162-1.419-.763-.182-.601.162-1.237.763-1.419 4.305-1.306 11.428-1.058 15.921 1.611.54.32.714 1.015.394 1.555-.32.539-1.015.714-1.555.394l-.071-.075z" />
        </svg>
      ),
      href: 'https://open.spotify.com/artist/2lCz91g9DugcZhbtvMnaUN', color: 'hover:text-[#1DB954]'
    },
    {
      name: 'Apple Music',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm2.143 13.82c-.31.258-.727.41-1.143.41a1.867 1.867 0 0 1-1.857-1.857c0-1.025.832-1.857 1.857-1.857.294 0 .58.07.822.203V8.895l-3.429.742V15c-.31.258-.727.41-1.143.41a1.867 1.867 0 0 1-1.857-1.857c0-1.025.832-1.857 1.857-1.857.294 0 .58.07.822.203V8.125c0-.46.33-.846.784-.928l4.286-.928c.516-.112.984.28.984.806v6.786c0 .416-.215.802-.557 1.059z"/>
        </svg>
      ),
      href: 'https://music.apple.com/us/artist/colin-cherry/1639040887', color: 'hover:text-[#FC3C44]'
    },
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Colin Cherry | Official Artist Site & Hub</title>
        <meta name="description" content="Explore the atmospheric and visceral soundscapes of Indianapolis artist Colin Cherry. Stream official releases, view lyrics, and explore the catalog." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.thecolincherry.com/" />
        <meta property="og:title" content="Colin Cherry — Garfield Park" />
        <meta property="og:description" content="New album out August 1, 2026. Pre-save on Spotify and pre-order on Apple Music now." />
        <meta property="og:image" content="https://www.thecolincherry.com/Garfield Park.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Colin Cherry — Garfield Park" />
        <meta name="twitter:description" content="New album out August 1, 2026." />
        <meta name="twitter:image" content="https://www.thecolincherry.com/Garfield Park.jpg" />
      </Helmet>

      <Hero
        latestDropTitle={RELEASE_DATA.rollout.albumTitle}
        artworkUrl={RELEASE_DATA.rollout.coverArt}
        spotifyLink={RELEASE_DATA.rollout.spotifyPreSaveLink}
        appleMusicLink={RELEASE_DATA.rollout.appleMusicPreOrderLink}
        subtitle={`Upcoming Album • Out in ${daysToAlbum} Days`}
        spotifyBtnText="Spotify Pre-Save"
        appleMusicBtnText="iTunes Pre-Order"
        backgroundPhotoUrl="/garfield-park-house.jpg"
      />

      <div className="relative flex flex-col items-center justify-center px-6 overflow-hidden pt-12 pb-40">
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
            <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/60 text-center mb-16 mt-6">
              Artist Hub & Archive
            </h2>

            {/* Restructured Bento Grid Navigation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left mb-24 w-full">
              
              {/* Card 1: More Lonely — Out Now (Spans 2 columns) - Blue/Cyan Glow */}
              <a
                href={RELEASE_DATA.nextUp.preSaveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="md:col-span-2 glass p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group border border-white/5 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-500 min-h-[200px] md:min-h-[220px] bg-black/20"
              >
                <div className="absolute top-0 right-0 w-48 h-full opacity-15 group-hover:opacity-30 transition-opacity pointer-events-none">
                  <img src={moreLonelyArt} alt="" className="w-full h-full object-cover grayscale scale-110 group-hover:scale-100 transition-transform duration-700" />
                </div>
                <div className="relative z-10 space-y-4">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-cyan-400">Out Now</span>
                  <h3 className="text-4xl font-black uppercase tracking-tighter">{RELEASE_DATA.nextUp.title}</h3>
                  <p className="text-white/70 text-xs md:text-sm max-w-md leading-relaxed">The newest single is streaming everywhere now. Stream it on Spotify and Apple Music.</p>
                </div>
                <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white mt-6 group-hover:text-cyan-400 transition-colors w-fit border-b border-white group-hover:border-cyan-400 pb-1 z-10">
                  Stream Now <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              {/* Card 2: Music Catalog (Spans 1 column) - Indigo Glow */}
              <Link to="/music" className="glass p-6 md:p-8 flex flex-col justify-between group border border-white/5 hover:border-indigo-500/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] transition-all duration-500 min-h-[200px] md:min-h-[220px] bg-black/20">
                <div className="flex justify-between items-start text-white/70 group-hover:text-indigo-400 transition-colors">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/70 group-hover:text-indigo-400">Discography</span>
                  <Disc size={20} className="group-hover:rotate-45 transition-transform duration-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Music</h3>
                  <p className="text-white/75 text-xs leading-relaxed">Explore all releases, tracks, and view high-fidelity song lyrics.</p>
                </div>
                <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/80 group-hover:text-white transition-colors w-fit">
                  View Catalog <ArrowRight size={12} />
                </span>
              </Link>

              {/* Card 3: "Different" Single Stream & Blurb (Spans 2 columns) - Custom Glow */}
              <div className="md:col-span-2 glass p-6 md:p-8 flex flex-col justify-between group border border-white/5 hover:border-blue-500/20 hover:shadow-[0_0_35px_rgba(59,130,246,0.08)] transition-all duration-500 min-h-[200px] md:min-h-[220px] bg-black/20">
                <div className="space-y-4">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/70">Featured Single</span>
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Different</h3>
                  <p className="text-white/90 text-xs md:text-sm leading-relaxed italic max-w-xl">
                    "A haunting exploration of emotional distance and half-confessions. Written and recorded late night in the home studio, utilizing analog synths to capture the feeling of cold isolation."
                  </p>
                </div>
                <div className="mt-6 w-full">
                  <iframe 
                    src={RELEASE_DATA.currentSingle.spotifyLink.includes('/track/')
                      ? `https://open.spotify.com/embed/track/${RELEASE_DATA.currentSingle.spotifyTrackId}?utm_source=generator&theme=0`
                      : `https://open.spotify.com/embed/album/${RELEASE_DATA.currentSingle.spotifyTrackId}?utm_source=generator&theme=0`
                    } 
                    width="100%" 
                    height="80" 
                    frameBorder="0" 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                    className="rounded-xl bg-transparent w-full border border-white/5"
                  ></iframe>
                </div>
              </div>


              {/* Card 5: EPK Hub (Spans 1 column) - Fuchsia Glow */}
              <Link to="/epk" className="glass p-6 md:p-8 flex flex-col justify-between group border border-white/5 hover:border-fuchsia-500/30 hover:shadow-[0_0_30px_rgba(217,70,239,0.1)] transition-all duration-500 min-h-[200px] md:min-h-[220px] bg-black/20">
                <div className="flex justify-between items-start text-white/70 group-hover:text-fuchsia-400 transition-colors">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em]">Industry</span>
                  <FileText size={20} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase tracking-tighter">EPK</h3>
                  <p className="text-white/75 text-xs leading-relaxed">Access press assets, biography, and professional contact details.</p>
                </div>
                <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/80 group-hover:text-white transition-colors w-fit">
                  Press Hub &rarr;
                </span>
              </Link>



              {/* Card 8: Lyric Art block (Spans 3 columns, full width) - Custom Glass Typography */}
              <div className="md:col-span-3 glass p-8 md:p-12 flex flex-col justify-center items-center text-center border border-white/5 bg-black/40 min-h-[200px] relative overflow-hidden">
                <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/[0.01] blur-3xl rounded-full"></div>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/70 mb-4">Lyric Poetry</span>
                <div className="h-px w-8 bg-white/10 mb-6"></div>
                <p className="text-lg md:text-2xl text-white/95 leading-relaxed font-light italic tracking-wide font-display max-w-2xl">
                  "When I grew up I got more lonely,<br />
                  no new friends, I got me only.<br />
                  Lost someone that I held so closely,<br />
                  and lost myself on the day she told me."
                </p>
                <span className="text-[8px] font-black uppercase tracking-widest text-white/75 mt-6">
                  — More Lonely (Out Now)
                </span>
              </div>

              {/* Card 9: Connect & Socials (Full width horizontal bar) */}
              <div className="md:col-span-3 glass p-6 flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/5 hover:border-white/15 transition-all duration-500 bg-black/20">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/50">Follow Along</span>
                <div className="flex items-center gap-6 sm:gap-8">
                  {socials.map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.name}
                      className={`text-white/60 transition-all hover:scale-110 ${social.color}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/50">@thecolincherry</span>
              </div>

              {/* Card 10: "The Archive" Email Capture (Spans 3 columns) - Rose/Cult Glow */}
              <div className="md:col-span-3 glass p-6 md:p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group border border-white/5 hover:border-rose-500/20 hover:shadow-[0_0_40px_rgba(244,63,94,0.06)] transition-all duration-500 bg-black/20">
                <div className="space-y-3 max-w-xl">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-rose-400">Be part of the beginning</span>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">The Archive</h3>
                  <p className="text-white/70 text-xs md:text-sm leading-relaxed">
                    Sign up for exclusive first access to raw acoustic demos, voice notes, and the personal stories behind the tracks. No spam. Just access to the atmosphere.
                  </p>
                </div>
                
                <div className="w-full md:w-auto md:min-w-[340px]">
                  {subscribed ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-[10px] font-black uppercase tracking-widest text-rose-400 border border-rose-500/20 bg-rose-500/5 px-6 py-4 rounded-lg text-center"
                    >
                      You have entered the Archive.
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full">
                      <input 
                        type="email" 
                        required
                        placeholder="EMAIL ADDRESS" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/5 border border-white/15 px-4 py-3.5 rounded-lg focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all text-[10px] font-bold tracking-widest text-white w-full sm:flex-grow"
                      />
                      <button type="submit" className="bg-white text-black px-6 py-3.5 rounded-lg font-black uppercase text-[10px] tracking-widest hover:bg-rose-400 hover:text-black hover:shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all flex items-center justify-center gap-2">
                        Access <Send size={12} />
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Card 11: Timeline & Countdown (Spans 3 columns) - Blue/White Glow */}
              <div className="md:col-span-3 glass p-6 md:p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border border-white/5 bg-black/20">
                <div className="space-y-4 max-w-md w-full">
                  <div className="flex items-center gap-2 text-white/70">
                    <Calendar size={14} />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">Roadmap & Journey</span>
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter">Garfield Park Tease</h3>
                  
                  {/* Timeline Visualizer */}
                  <div className="relative pt-6 pb-2 pr-4">
                    <div className="absolute top-[34px] left-2 right-2 h-[2px] bg-white/15 z-0"></div>
                    <div className="flex justify-between items-center relative z-10">
                      <div className="text-left pr-3">
                        <div className="w-4 h-4 rounded-full bg-cyan-400 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a]"></div>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-wider text-cyan-400 mt-2">Out Now</p>
                        <p className="text-[8px] font-medium text-white/70 uppercase tracking-widest">More Lonely</p>
                      </div>

                      <div className="text-right pl-3">
                        <div className="w-4 h-4 rounded-full border border-white/10 bg-[#0a0a0a] flex items-center justify-center ml-auto">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-wider text-white/80 mt-2">August 1</p>
                        <p className="text-[8px] font-medium text-white/70 uppercase tracking-widest">Garfield Park</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full md:w-auto md:min-w-[340px] p-6 glass rounded-2xl border border-white/5 bg-black/30 text-center">
                  <div className="flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-[0.25em] text-white/75 mb-2">
                    <Clock size={12} />
                    <span>Countdown to Garfield Park</span>
                  </div>
                  
                  {timeLeft.completed ? (
                    <div className="text-lg font-black uppercase tracking-widest text-cyan-400">
                      The Event is Live
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                        <div className="text-2xl md:text-3xl font-black text-white">{timeLeft.days}</div>
                        <div className="text-[7px] font-black uppercase tracking-wider text-white/75 mt-1">Days</div>
                      </div>
                      <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                        <div className="text-2xl md:text-3xl font-black text-white">{timeLeft.hours}</div>
                        <div className="text-[7px] font-black uppercase tracking-wider text-white/75 mt-1">Hours</div>
                      </div>
                      <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                        <div className="text-2xl md:text-3xl font-black text-white">{timeLeft.minutes}</div>
                        <div className="text-[7px] font-black uppercase tracking-wider text-white/75 mt-1">Mins</div>
                      </div>
                      <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                        <div className="text-2xl md:text-3xl font-black text-white">{timeLeft.seconds}</div>
                        <div className="text-[7px] font-black uppercase tracking-wider text-white/75 mt-1">Secs</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

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
          <p className="text-2xl md:text-3xl text-white/65 leading-relaxed font-light tracking-wide italic">
            Architecting atmosphere.
          </p>
        </motion.div>
      </section>
    </PageTransition>
  );
};

export default Home;
