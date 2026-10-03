import { Link } from 'react-router-dom';
import SocialLinks from './SocialLinks';

const Footer = () => {
  return (
    <footer className="relative z-10 w-full py-12 px-6 border-t border-white/5 bg-[#0a0a0a]/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/55">
          &copy; {new Date().getFullYear()} Colin Cherry. All Rights Reserved.
        </div>

        <SocialLinks />

        <Link
          to="/epk"
          className="text-[10px] font-black uppercase tracking-[0.4em] text-white/55 hover:text-white transition-colors"
        >
          Press Kit
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
