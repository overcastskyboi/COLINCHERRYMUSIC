import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import { ArrowRight, Music, FileText, Instagram, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <PageTransition>
      <div className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
        <div className="relative z-20 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1 className="text-7xl md:text-[14rem] font-display uppercase tracking-tighter mb-12 leading-none">
              COLIN CHERRY
            </h1>
            
            <div className="flex justify-center">
              <Link to="/music" className="group flex items-center gap-4 px-12 py-6 bg-white text-black hover:scale-105 transition-all">
                <span className="text-[11px] uppercase font-black tracking-[0.4em]">
                  Music <ArrowRight size={14} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[#0a0a0a]"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.01] blur-[120px] rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/[0.015] blur-[150px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      {/* Bento Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/music" className="md:col-span-2 glass p-12 flex flex-col justify-between group hover:bg-white/10 transition-all min-h-[300px]">
            <div className="flex justify-between items-start">
              <Music className="text-white/20 group-hover:text-white transition-colors" size={32} />
              <ArrowRight className="text-white/10 group-hover:translate-x-2 transition-all" />
            </div>
            <div>
              <h3 className="text-4xl font-black uppercase tracking-tighter mb-2">Latest Catalog</h3>
              <p className="text-white/30 uppercase tracking-widest text-[10px] font-bold">Listen on Spotify & Apple Music</p>
            </div>
          </Link>

          <Link to="/lyrics" className="glass p-12 flex flex-col justify-between group hover:bg-white/10 transition-all">
            <FileText className="text-white/20 group-hover:text-white transition-colors" size={32} />
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Lyrics</h3>
              <p className="text-white/30 uppercase tracking-widest text-[10px] font-bold">The Written Word</p>
            </div>
          </Link>

          <a href="https://instagram.com/thecolincherry" target="_blank" rel="noopener noreferrer" className="glass p-12 flex flex-col justify-between group hover:bg-white/10 transition-all min-h-[250px]">
            <Instagram className="text-white/20 group-hover:text-white transition-colors" size={32} />
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Instagram</h3>
              <p className="text-white/30 uppercase tracking-widest text-[10px] font-bold">Daily Updates</p>
            </div>
          </a>

          <div className="md:col-span-2 glass p-12 flex flex-col justify-center min-h-[250px]">
            <div className="max-w-md">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Join the list.</h3>
              <p className="text-white/30 text-sm mb-8">No spam, just drops. Get notified about new releases and visual experiences.</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  className="bg-white/5 border border-white/10 px-6 py-4 rounded-lg flex-grow focus:outline-none focus:border-white/30 transition-colors text-[10px] font-bold tracking-widest"
                />
                <button className="bg-white text-black px-8 py-4 rounded-lg font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                  Join <Send size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-40 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="text-2xl md:text-3xl text-white/30 leading-relaxed font-light tracking-wide italic">
            Architecting atmosphere. Midwest Noir.
          </p>
        </motion.div>
      </section>
    </PageTransition>
  );
};

export default Home;
