import { useState } from 'react';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import { Download, Mail, Instagram, Music, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

const EPK = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Form error:', error);
      setStatus('error');
    }
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-24 items-start pt-12">
          {/* Visual Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full lg:w-2/5 lg:sticky lg:top-32"
          >
            <div className="glass aspect-[3/4] overflow-hidden shadow-2xl relative group">
              <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white/10 uppercase font-black tracking-widest text-xs">
                Press Photo 01
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                 <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">Colin Cherry</h2>
                 <p className="text-white/50 uppercase tracking-widest text-[10px] font-bold mt-2">Indianapolis, IN</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
               <button className="flex items-center justify-center gap-3 py-4 glass text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                 <Download size={14} /> Hi-Res Assets
               </button>
               <button className="flex items-center justify-center gap-3 py-4 glass text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                 <Download size={14} /> Tech Rider
               </button>
            </div>
          </motion.div>
          
          {/* Info Side */}
          <div className="w-full lg:w-3/5 space-y-20">
            <header>
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase mb-6 leading-none">EPK</h1>
              <p className="text-2xl text-white/40 font-serif italic border-l-4 border-white/10 pl-8 leading-relaxed">
                "The Midwest sound isn't just a place, it's a mood."
              </p>
            </header>

            <section className="space-y-8">
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 flex items-center gap-4">
                Biography <span className="h-[1px] flex-grow bg-white/5"></span>
              </h3>
              <div className="space-y-6 text-xl text-white/50 leading-relaxed font-medium">
                <p>
                  Colin Cherry is an architect of atmosphere. Blending industrial textures with raw alternative emotion, he creates a sonic landscape that is both visceral and calculated.
                </p>
                <p>
                  Based in Indianapolis, his work explores the quiet tension of the Midwest through heavy bass and haunting melodies. Defined by precision and grit, every track is an exploration of light and shadow.
                </p>
              </div>
            </section>

            <section className="space-y-8">
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 flex items-center gap-4">
                Inquiries <span className="h-[1px] flex-grow bg-white/5"></span>
              </h3>
              
              <div className="glass p-8 md:p-12">
                {status === 'success' ? (
                  <div className="text-center py-12 space-y-4">
                    <CheckCircle2 size={48} className="mx-auto text-white/40" />
                    <h4 className="text-2xl font-black uppercase tracking-tighter">Message Sent</h4>
                    <p className="text-white/30 text-sm">We'll get back to you shortly.</p>
                    <button 
                      onClick={() => setStatus('idle')}
                      className="mt-8 text-[10px] font-black uppercase tracking-widest border-b border-white/20 hover:border-white transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-2">Name</label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-2">Email</label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-2">Message</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white resize-none"
                      ></textarea>
                    </div>
                    
                    {status === 'error' && (
                      <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-widest">
                        <AlertCircle size={14} /> Failed to send. Please try again.
                      </div>
                    )}

                    <button
                      disabled={status === 'loading'}
                      className="w-full bg-white text-black py-5 rounded-lg font-black uppercase tracking-[0.3em] text-[10px] hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all flex items-center justify-center gap-3"
                    >
                      {status === 'loading' ? 'Sending...' : (
                        <>Send Inquiry <ArrowRight size={14} /></>
                      )}
                    </button>
                  </form>
                )}
              </div>

              <div className="flex flex-wrap gap-4 pt-8">
                <a href="mailto:press@thecolincherry.com" className="flex-grow glass p-6 flex items-center justify-center gap-3 hover:bg-white/5 transition-colors group">
                  <Mail size={18} className="text-white/20 group-hover:text-white transition-colors" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/20 group-hover:text-white transition-colors">Direct Email</span>
                </a>
                <a href="https://instagram.com/thecolincherry" target="_blank" rel="noopener noreferrer" className="flex-grow glass p-6 flex items-center justify-center gap-3 hover:bg-white/5 transition-colors group">
                  <Instagram size={18} className="text-white/20 group-hover:text-white transition-colors" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/20 group-hover:text-white transition-colors">@thecolincherry</span>
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default EPK;
