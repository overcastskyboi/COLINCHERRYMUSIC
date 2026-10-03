import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SocialLinks from '../components/SocialLinks';
import { BIO_FULL, BIO_META, BIO_TAGLINE, GENRES, INFLUENCES } from '../config/bio';
import { CURRENT_RELEASE, PREVIOUS_RELEASE } from '../config/releaseData';

const SITE = 'https://www.thecolincherry.com';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: 'easeOut' },
} as const;

const About = () => {
  const releases = [CURRENT_RELEASE, PREVIOUS_RELEASE];

  return (
    <PageTransition>
      <Helmet>
        <title>About Colin Cherry | Indianapolis Alternative Pop & Emo Rap Artist</title>
        <meta name="description" content={BIO_META} />
        <link rel="canonical" href={`${SITE}/about`} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={`${SITE}/about`} />
        <meta property="og:title" content="About Colin Cherry" />
        <meta property="og:description" content={BIO_META} />
        <meta property="og:image" content={`${SITE}/press-photo.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Colin Cherry" />
        <meta name="twitter:description" content={BIO_META} />
        <meta name="twitter:image" content={`${SITE}/press-photo.png`} />
      </Helmet>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="mb-16 md:mb-24 text-center max-w-2xl mx-auto">
          <h1 className="text-6xl md:text-9xl font-display uppercase tracking-tighter mb-6 leading-none">About</h1>
          <p className="text-[10px] uppercase tracking-[0.5em] font-black text-white/60">{BIO_TAGLINE}</p>
        </header>

        <div className="grid lg:grid-cols-[minmax(0,360px)_1fr] gap-12 lg:gap-20 items-start">
          {/* Photo + quick facts */}
          <motion.aside {...fadeUp} className="space-y-8 lg:sticky lg:top-40">
            <figure className="glass overflow-hidden aspect-[4/5] relative">
              <img
                src="/press-photo.png"
                alt="Colin Cherry in the studio"
                width={960}
                height={1200}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#0a0a0a]/90 to-transparent">
                <p className="text-3xl font-black uppercase tracking-tighter leading-none">Colin Cherry</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 mt-2">Indianapolis, IN</p>
              </figcaption>
            </figure>

            <dl className="space-y-5 text-sm">
              <div>
                <dt className="text-[9px] font-black uppercase tracking-[0.3em] text-white/45 mb-1.5">Genre</dt>
                <dd className="text-white/85">{GENRES.join(' · ')}</dd>
              </div>
              <div>
                <dt className="text-[9px] font-black uppercase tracking-[0.3em] text-white/45 mb-1.5">Influences</dt>
                <dd className="text-white/85">{INFLUENCES.join(', ')}</dd>
              </div>
              <div>
                <dt className="text-[9px] font-black uppercase tracking-[0.3em] text-white/45 mb-1.5">Previously</dt>
                <dd className="text-white/85">August Elliott, CCher</dd>
              </div>
            </dl>

            <SocialLinks className="flex flex-wrap items-center gap-5" linkClassName="text-white/55 transition-all hover:scale-110" />
          </motion.aside>

          {/* Biography */}
          <article className="space-y-14 max-w-2xl">
            {BIO_FULL.map((section, i) => (
              <motion.section key={section.heading} {...fadeUp} className="space-y-5">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 flex items-center gap-4">
                  {section.heading} <span className="h-px flex-grow bg-white/5" />
                </h2>
                {section.paragraphs.map((para, j) => (
                  <p
                    key={j}
                    className={
                      i === 0 && j === 0
                        ? 'font-editorial text-2xl md:text-[1.9rem] leading-snug text-white/90'
                        : 'text-base md:text-lg leading-relaxed text-white/70'
                    }
                  >
                    {para}
                  </p>
                ))}
              </motion.section>
            ))}

            {/* Releases mentioned in the bio */}
            <motion.section {...fadeUp} className="grid sm:grid-cols-2 gap-5">
              {releases.map(r => (
                <Link
                  key={r.title}
                  to={`/music?release=${encodeURIComponent(r.title)}`}
                  className="group glass p-4 flex gap-4 items-center hover:border-white/20 transition-colors"
                >
                  <img src={r.coverArtSmall} alt={`${r.title} cover art`} loading="lazy" decoding="async" className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: r.accent }}>
                      {r.kind} &middot; {new Date(r.releaseDateISO).getFullYear()}
                    </p>
                    <p className="text-lg font-black uppercase tracking-tight leading-tight line-clamp-2">{r.title}</p>
                    <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-white/50 group-hover:text-white transition-colors mt-1">
                      Lyrics &amp; links <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              ))}
            </motion.section>

            <motion.div {...fadeUp} className="flex flex-wrap gap-6 pt-2">
              <Link to="/music" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white border-b border-white/40 hover:border-white pb-1">
                Full Discography <ArrowRight size={12} />
              </Link>
              <Link to="/epk" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white border-b border-white/20 hover:border-white pb-1 transition-colors">
                Press Kit <ArrowRight size={12} />
              </Link>
            </motion.div>
          </article>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;
