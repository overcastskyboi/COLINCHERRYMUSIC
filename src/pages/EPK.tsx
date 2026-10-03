import { useState } from 'react';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import { Download, Mail, Instagram, ArrowRight, Copy, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BIO_META, BIO_SHORT } from '../config/bio';
import { Helmet } from 'react-helmet-async';
import { CURRENT_RELEASE, PREVIOUS_RELEASE } from '../config/releaseData';

const CONTACT_EMAIL = 'contact@thecolincherry.com';

const EPK = () => {
  const [bioCopied, setBioCopied] = useState(false);

  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      /* clipboard blocked: the address is still selectable */
    }
  };

  const copyBio = async () => {
    try {
      await navigator.clipboard.writeText(BIO_SHORT);
      setBioCopied(true);
      setTimeout(() => setBioCopied(false), 2000);
    } catch {
      /* clipboard blocked: the text is still selectable on the page */
    }
  };


  return (
    <PageTransition>
      <Helmet>
        <title>Colin Cherry | EPK Press Hub & Contact</title>
        <meta name="description" content={`Press kit for Colin Cherry. ${BIO_META}`} />
        <link rel="canonical" href="https://www.thecolincherry.com/epk" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.thecolincherry.com/epk" />
        <meta property="og:title" content="Colin Cherry — EPK & Press" />
        <meta property="og:description" content="Official press kit, bio, and booking contact for Indianapolis alternative pop and emo rap artist Colin Cherry." />
        <meta property="og:image" content="https://www.thecolincherry.com/press-photo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Colin Cherry — EPK & Press" />
        <meta name="twitter:description" content="Official press kit, bio, and booking contact for Indianapolis alternative pop and emo rap artist Colin Cherry." />
        <meta name="twitter:image" content="https://www.thecolincherry.com/press-photo.png" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-24 items-start pt-12">
          {/* Visual Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full lg:w-2/5 lg:sticky lg:top-32"
          >
            <div className="glass aspect-[3/4] overflow-hidden shadow-2xl relative group bg-neutral-900">
              <img 
                src="/press-photo.png"
                alt="Colin Cherry Press Shot" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                onError={(e) => { e.currentTarget.style.opacity = '0'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 z-10">
                 <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">Colin Cherry</h2>
                 <p className="text-white/75 uppercase tracking-widest text-[10px] font-bold mt-2">Indianapolis, IN</p>
              </div>
            </div>
            
            <a
              href="/press/press-assets.zip"
              download
              className="mt-8 flex items-center justify-center gap-3 py-4 glass text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all text-center text-white"
            >
              <Download size={14} /> Download Hi-Res Press Assets
            </a>
          </motion.div>
          
          {/* Info Side */}
          <div className="w-full lg:w-3/5 space-y-20">
            <header>
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase mb-6 leading-none">EPK</h1>
              <p className="text-2xl text-white/70 font-serif italic border-l-4 border-white/10 pl-8 leading-relaxed">
                "The Midwest sound isn't just a place, it's a mood."
              </p>
            </header>

            <section className="space-y-8">
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/60 flex items-center gap-4">
                Biography <span className="h-[1px] flex-grow bg-white/5"></span>
              </h3>
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">{BIO_SHORT}</p>
                <div className="flex flex-wrap items-center gap-6">
                  <button
                    type="button"
                    onClick={copyBio}
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/70 hover:text-white border border-white/15 hover:border-white/40 rounded-full px-4 py-2 transition-colors"
                  >
                    {bioCopied ? <Check size={12} /> : <Copy size={12} />}
                    {bioCopied ? 'Copied' : 'Copy short bio'}
                  </button>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white border-b border-white/20 hover:border-white pb-1 transition-colors"
                  >
                    Read the full bio <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/60 flex items-center gap-4">
                Latest Releases <span className="h-[1px] flex-grow bg-white/5"></span>
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {[CURRENT_RELEASE, PREVIOUS_RELEASE].map(r => (
                  <div key={r.title} className="glass p-4 flex gap-4 items-center">
                    <img src={r.coverArtSmall} alt={`${r.title} cover art`} loading="lazy" decoding="async" className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
                    <div className="min-w-0 space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: r.accent }}>{r.kind} &middot; {r.releaseDate}</p>
                      <p className="text-lg font-black uppercase tracking-tight leading-tight truncate">{r.title}</p>
                      <div className="flex gap-4 text-[9px] font-black uppercase tracking-widest text-white/60">
                        <a href={r.spotifyLink} target="_blank" rel="noopener noreferrer" className="hover:text-[#1DB954]">Spotify</a>
                        <a href={r.appleMusicLink} target="_blank" rel="noopener noreferrer" className="hover:text-[#FA243C]">Apple Music</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-8">
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/60 flex items-center gap-4">
                Contact <span className="h-[1px] flex-grow bg-white/5"></span>
              </h3>
              
              <div className="glass p-8 md:p-12 space-y-8">
                <div className="space-y-3">
                  <p className="text-white/60 text-sm leading-relaxed">
                    Booking, press, features and everything else:
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-2xl md:text-3xl font-black tracking-tight break-all hover:text-[#9DB0E3] transition-colors"
                    >
                      {CONTACT_EMAIL}
                    </a>
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white border border-white/15 hover:border-white/40 rounded-full px-3 py-1.5 transition-colors"
                    >
                      {emailCopied ? <Check size={12} /> : <Copy size={12} />}
                      {emailCopied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Inquiry for Colin Cherry')}`}
                    className="flex items-center justify-center gap-3 bg-white text-black py-5 rounded-lg font-black uppercase tracking-[0.25em] text-[10px] hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    <Mail size={14} /> Email Colin
                  </a>
                  <a
                    href="https://instagram.com/thecolincherry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 glass py-5 rounded-lg font-black uppercase tracking-[0.25em] text-[10px] text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Instagram size={14} /> @thecolincherry
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default EPK;
