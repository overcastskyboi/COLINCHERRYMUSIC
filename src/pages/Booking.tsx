import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Instagram, Twitter } from 'lucide-react';

const Booking = () => {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-24 text-center">
          <h1 className="text-6xl md:text-9xl font-display uppercase tracking-tighter mb-6 leading-none">Booking</h1>
          <p className="text-[10px] uppercase tracking-[0.5em] font-black text-white/20">Inquiries & Press</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start pt-12">
          <div className="space-y-16">
             <div className="space-y-6">
                <h3 className="text-4xl font-display uppercase tracking-tight">Direct Contact</h3>
                <p className="text-xl text-white/40 leading-relaxed max-w-md">
                  For booking requests, press inquiries, and all other collaborative proposals.
                </p>
             </div>
             
             <div className="glass p-12 space-y-10">
                <div className="space-y-2">
                   <h4 className="text-[10px] uppercase font-black tracking-widest text-white/20">Booking / Press</h4>
                   <a href="mailto:press@thecolincherry.com" className="text-2xl font-black uppercase tracking-tight hover:text-white/60 transition-all block">
                     press@thecolincherry.com
                   </a>
                </div>
                <div className="space-y-2">
                   <h4 className="text-[10px] uppercase font-black tracking-widest text-white/20">Socials</h4>
                   <div className="flex gap-8 pt-2">
                     <Instagram className="text-white/20 hover:text-white transition-all cursor-pointer" size={20} />
                     <Twitter className="text-white/20 hover:text-white transition-all cursor-pointer" size={20} />
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-all cursor-pointer">SoundCloud</span>
                   </div>
                </div>
             </div>
             
             <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.4em] text-white/10">
                <span>Based in Indy</span>
                <span className="w-1 h-1 bg-white/5 rounded-full"></span>
                <span>Worldwide Delivery</span>
             </div>
          </div>

          <div className="glass p-12">
            <form className="space-y-10">
              <div className="space-y-4">
                 <label className="text-[9px] uppercase font-black tracking-[0.4em] text-white/20 ml-2">Name</label>
                 <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all" />
              </div>
              <div className="space-y-4">
                 <label className="text-[9px] uppercase font-black tracking-[0.4em] text-white/20 ml-2">Email</label>
                 <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all" />
              </div>
              <div className="space-y-4">
                 <label className="text-[9px] uppercase font-black tracking-[0.4em] text-white/20 ml-2">Inquiry Type</label>
                 <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all appearance-none uppercase text-[10px] font-black tracking-widest">
                    <option>General</option>
                    <option>Booking</option>
                    <option>Press</option>
                    <option>Collab</option>
                 </select>
              </div>
              <div className="space-y-4">
                 <label className="text-[9px] uppercase font-black tracking-[0.4em] text-white/20 ml-2">Message</label>
                 <textarea rows={6} className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all resize-none"></textarea>
              </div>
              <button className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.5em] text-xs rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4">
                <ArrowRight size={16} /> Send Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Booking;
