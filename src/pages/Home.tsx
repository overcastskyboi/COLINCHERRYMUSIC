import { useState, useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';
import { ArrowRight, Send, Disc, FileText, Clock, Calendar } from 'lucide-react';
import { RELEASE_DATA, upcomingReleases } from '../config/releaseData';
import { lyricQuotes } from '../config/lyricQuotes';
import { featuredSingles } from '../config/featuredSingles';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import SocialLinks from '../components/SocialLinks';
import { AppleMusicIcon } from '../components/icons/BrandIcons';

// The lead-up singles ahead of the album, in release order, for the roadmap timeline.
const roadmap = [
  { label: 'Rose', date: 'Apr 24' },
  { label: 'Holding On', date: 'May 8' },
  { label: 'Guilty Conscience', date: 'May 22' },
  { label: 'Different', date: 'Jun 5' },
  { label: 'More Lonely', date: 'Jun 19', isCurrent: true },
  { label: 'Garfield Park', date: 'Aug 1', isFuture: true },
];

const Home = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, completed: false });
  const [quote] = useState(() => lyricQuotes[Math.floor(Math.random() * lyricQuotes.length)]);
  const [featured] = useState(() => featuredSingles[Math.floor(Math.random() * featuredSingles.length)]);

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

  return (
    <PageTransition>
      <Helmet>
        <title>Colin Cherry | Official Artist Site & Hub</title>
        <meta name="description" content="Explore the atmospheric and visceral soundscapes of Indianapolis artist Colin Cherry. Stream official releases, view lyrics, and explore the catalog." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.thecolincherry.com/" />
        <meta property="og:title" content="Colin Cherry — Garfield Park" />
        <meta property="og:description" content="New album out August 1, 2026. Pre-save on Spotify and pre-order on Apple Music now." />
        <meta property="og:image" content="https://www.thecolincherry.com/garfield-park.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Colin Cherry — Garfield Park" />
        <meta name="twitter:description" content="New album out August 1, 2026." />
        <meta name="twitter:image" content="https://www.thecolincherry.com/garfield-park.jpg" />
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
             src="/logo-textured.png"
             alt=""
             loading="lazy"
             decoding="async"
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
              <div className="md:col-span-2 glass p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group border border-white/5 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-500 min-h-[200px] md:min-h-[220px] bg-black/20">
                <div className="absolute top-0 right-0 w-48 h-full opacity-15 group-hover:opacity-30 transition-opacity pointer-events-none">
                  <img src={moreLonelyArt} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover grayscale scale-110 group-hover:scale-100 transition-transform duration-700" />
                </div>
                <div className="relative z-10 space-y-4">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-cyan-400">Out Now</span>
                  <h3 className="text-4xl font-black uppercase tracking-tighter">{RELEASE_DATA.nextUp.title}</h3>
                  <p className="text-white/70 text-xs md:text-sm max-w-md leading-relaxed">The newest single is streaming everywhere now. Stream it on Spotify and Apple Music.</p>
                </div>
                <div className="relative z-10 flex items-center gap-4 mt-6">
                  <a
                    href={RELEASE_DATA.nextUp.preSaveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white hover:text-[#1DB954] transition-colors w-fit border-b border-white hover:border-[#1DB954] pb-1"
                  >
                    Spotify <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href={RELEASE_DATA.nextUp.appleMusicLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white hover:text-[#FA243C] transition-colors w-fit border-b border-white hover:border-[#FA243C] pb-1"
                  >
                    Apple Music <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

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

              {/* Card 3: Featured Single Stream & Blurb (Spans 2 columns) - rotates a new single + poetic synopsis on every load */}
              <div className="md:col-span-2 glass p-6 md:p-8 flex flex-col justify-between group border border-white/5 hover:border-blue-500/20 hover:shadow-[0_0_35px_rgba(59,130,246,0.08)] transition-all duration-500 min-h-[200px] md:min-h-[220px] bg-black/20">
                <div className="space-y-4">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/70">Featured Single</span>
                  <h3 className="text-2xl font-black uppercase tracking-tighter">{featured.title}</h3>
                  <p className="text-white/90 text-xs md:text-sm leading-relaxed italic max-w-xl">
                    "{featured.synopsis}"
                  </p>
                </div>
                <div className="mt-6 w-full space-y-3">
                  <iframe
                    key={featured.title}
                    src={`https://open.spotify.com/embed/album/${featured.spotifyLink.split('/').pop()}?utm_source=generator&theme=0`}
                    width="100%"
                    height="80"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-xl bg-transparent w-full border border-white/5"
                  ></iframe>
                  {featured.appleMusicLink && (
                    <a
                      href={featured.appleMusicLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/80 hover:text-white hover:border-[#FA243C]/40 hover:bg-[#FA243C]/10 transition-all"
                    >
                      <AppleMusicIcon className="w-3.5 h-3.5 text-[#FA243C]" />
                      Listen on Apple Music
                    </a>
                  )}
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



              {/* Card 8: Lyric Art block (Spans 3 columns, full width) - rotates a new highlight on every load */}
              <div className="md:col-span-3 glass p-8 md:p-12 flex flex-col justify-center items-center text-center border border-white/5 bg-black/40 min-h-[200px] relative overflow-hidden">
                <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/[0.01] blur-3xl rounded-full"></div>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/70 mb-4">Lyric Poetry</span>
                <div className="h-px w-8 bg-white/10 mb-6"></div>
                <p
                  className="font-lyric text-lg md:text-2xl leading-relaxed tracking-wide max-w-2xl"
                  style={{ color: quote.themeColor ? `${quote.themeColor}f2` : 'rgba(255,255,255,0.95)' }}
                >
                  "{quote.lines.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < quote.lines.length - 1 && <br />}
                    </span>
                  ))}"
                </p>
                <span className="text-[8px] font-black uppercase tracking-widest text-white/75 mt-6">
                  — {quote.song}
                </span>
              </div>

              {/* Card 9: Connect & Socials (Full width horizontal bar) */}
              <div className="md:col-span-3 glass p-6 flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/5 hover:border-white/15 transition-all duration-500 bg-black/20">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/50">Follow Along</span>
                <SocialLinks className="flex items-center gap-6 sm:gap-8" linkClassName="text-white/60 transition-all hover:scale-110" />
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
                <div className="space-y-4 max-w-2xl w-full">
                  <div className="flex items-center gap-2 text-white/70">
                    <Calendar size={14} />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">Roadmap & Journey</span>
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter">Garfield Park</h3>

                  {/* Timeline Visualizer */}
                  <div className="relative pt-6 pb-2 pr-2 overflow-x-auto">
                    <div className="relative min-w-[560px] sm:min-w-0">
                      <div className="absolute top-[7px] left-2 right-2 h-[2px] bg-white/15 z-0"></div>
                      <div className="flex justify-between items-start relative z-10">
                        {roadmap.map((point) => (
                          <div key={point.label} className="text-center px-1 flex-1">
                            <div className="flex justify-center">
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${point.isCurrent ? 'bg-cyan-400' : point.isFuture ? 'border border-white/10 bg-[#0a0a0a]' : 'bg-white/25'}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${point.isCurrent ? 'bg-[#0a0a0a]' : point.isFuture ? 'bg-white/20' : 'bg-[#0a0a0a]'}`}></div>
                              </div>
                            </div>
                            <p className={`text-[9px] sm:text-[10px] font-black uppercase tracking-wider mt-2 ${point.isCurrent ? 'text-cyan-400' : point.isFuture ? 'text-white/80' : 'text-white/55'}`}>
                              {point.isCurrent ? 'Out Now' : point.date}
                            </p>
                            <p className="text-[7px] sm:text-[8px] font-medium text-white/70 uppercase tracking-widest leading-tight">{point.label}</p>
                          </div>
                        ))}
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
