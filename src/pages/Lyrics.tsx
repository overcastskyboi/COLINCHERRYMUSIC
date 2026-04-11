import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';

const lyricsData = [
  {
    title: "Dark Ether",
    text: `
      Neon signs in the rearview mirror
      The Midwest nights are getting clearer
      Calculated chaos in my veins
      Systems failing, break the chains
      
      (Chorus)
      In the dark ether, I find my peace
      Atmospheric tension, sweet release
      From the 317 to the void beyond
      The digital heart has grown so fond
    `
  },
  {
    title: "Neon Nights",
    text: `
      Static on the line, air is getting thin
      Wondering where the dream ends and life begins
      Industrial textures, grit and bone
      Building empires on a throne of chrome
      
      (Chorus)
      Neon nights are all we have
      Walking down the empty path
      Flicker once then fade to grey
      Midwest noir is here to stay
    `
  }
];

const Lyrics = () => {
  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-24 text-center">
          <h1 className="text-6xl md:text-9xl font-display uppercase tracking-tighter mb-6 leading-none">Lyrics</h1>
          <p className="text-[10px] uppercase tracking-[0.5em] font-black text-white/20">The Written Word</p>
        </header>

        <div className="space-y-32">
          {lyricsData.map((track, i) => (
            <motion.section
              key={track.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group"
            >
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-12 border-b border-white/5 pb-4 group-hover:border-white/20 transition-colors">
                {track.title}
              </h2>
              <pre className="font-mono text-sm md:text-lg leading-relaxed text-white/40 group-hover:text-white/60 transition-colors whitespace-pre-wrap">
                {track.text.trim()}
              </pre>
            </motion.section>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Lyrics;
