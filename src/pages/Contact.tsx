import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <header className="mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-6 uppercase">Contact</h1>
            <div className="h-1 w-24 bg-white mb-8"></div>
            <p className="text-white/40 max-w-xl text-lg font-medium leading-relaxed uppercase tracking-widest">
              Direct inquiries for booking, press, and collaborations.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="space-y-12">
             <div className="glass p-12 space-y-8">
               <div className="flex items-center gap-6">
                 <div className="w-12 h-12 glass flex items-center justify-center text-white/40">
                   <Mail size={20} />
                 </div>
                 <div>
                    <h4 className="text-[10px] uppercase font-black tracking-[0.3em] text-white/30">General / Press</h4>
                    <p className="text-xl font-black uppercase tracking-tight">press@thecolincherry.com</p>
                 </div>
               </div>
               
               <div className="flex items-center gap-6">
                 <div className="w-12 h-12 glass flex items-center justify-center text-white/40">
                   <MapPin size={20} />
                 </div>
                 <div>
                    <h4 className="text-[10px] uppercase font-black tracking-[0.3em] text-white/30">Location</h4>
                    <p className="text-xl font-black uppercase tracking-tight">Indianapolis, IN</p>
                 </div>
               </div>
             </div>

             <p className="text-xl text-white/40 font-medium leading-relaxed italic border-l-4 border-white/5 pl-8">
               "For all creative inquiries, please include a brief overview of the project and relevant deadlines."
             </p>
          </div>

          <div className="glass p-12">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                   <label className="text-[10px] uppercase font-black tracking-widest text-white/20 ml-2">Your Name</label>
                   <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/30 transition-colors" />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] uppercase font-black tracking-widest text-white/20 ml-2">Email Address</label>
                   <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/30 transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] uppercase font-black tracking-widest text-white/20 ml-2">Subject</label>
                 <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/30 transition-colors" />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] uppercase font-black tracking-widest text-white/20 ml-2">Message</label>
                 <textarea rows={6} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-white/30 transition-colors resize-none"></textarea>
              </div>
              <button className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.3em] text-sm rounded-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4">
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
