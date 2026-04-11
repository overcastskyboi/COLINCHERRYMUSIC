import { Instagram, Facebook, Music2, Music } from 'lucide-react';

const Footer = () => {
  const socials = [
    { name: 'Instagram', icon: <Instagram size={20} />, href: 'https://instagram.com/thecolincherry' },
    { name: 'TikTok', icon: <Music size={20} />, href: 'https://tiktok.com/@thecolincherry' },
    { name: 'Facebook', icon: <Facebook size={20} />, href: 'https://facebook.com/thecolincherry' },
    { name: 'SoundCloud', icon: <Music2 size={20} />, href: 'https://soundcloud.com/thecolincherry' },
  ];

  return (
    <footer className="relative z-10 w-full py-12 px-6 border-t border-white/5 bg-[#0a0a0a]/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
          &copy; {new Date().getFullYear()} Colin Cherry. All Rights Reserved.
        </div>
        
        <div className="flex items-center gap-8">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 hover:text-white transition-all transform hover:scale-110"
              title={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
        
        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
          Midwest Noir
        </div>
      </div>
    </footer>
  );
};

export default Footer;
