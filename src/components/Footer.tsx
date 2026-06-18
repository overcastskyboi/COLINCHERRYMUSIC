import { Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  const socials = [
    { 
      name: 'Instagram', 
      icon: <Instagram size={20} />, 
      href: 'https://instagram.com/thecolincherry'
    },
    { 
      name: 'TikTok', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12.525.02c1.31.036 2.512.512 3.518 1.227v3.13c-.176-.034-.343-.065-.514-.11-2.504-.671-4.412-2.539-5.188-4.938-.03-.1-.073-.19-.146-.373v10.59c0 5.147-4.172 9.319-9.319 9.319-5.147 0-9.319-4.172-9.319-9.319 0-5.147 4.172-9.319 9.319-9.319.463 0 .926.034 1.381.101v3.167c-.5-.149-1-.224-1.5-.224-3.407 0-6.167 2.76-6.167 6.167s2.76 6.167 6.167 6.167 6.167-2.76 6.167-6.167V0h3.13z" />
        </svg>
      ), 
      href: 'https://tiktok.com/@thecolincherry'
    },
    { 
      name: 'Facebook', 
      icon: <Facebook size={20} />, 
      href: 'https://facebook.com/thecolincherry'
    },
    { 
      name: 'SoundCloud', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M11.563 17.125c-.014 0-.027 0-.041-.001V8.11c.014-.001.027-.001.041-.001.196 0 .382.032.556.091v8.834a1.986 1.986 0 0 1-.556.091zm-2.344-.121c-.014 0-.028 0-.042 0V8.51c.014-.001.028-.001.042-.001.214 0 .417.038.605.107v8.402a2.33 2.33 0 0 1-.605.107zm-2.344-.34c-.014 0-.028 0-.042 0v-6.12c.014-.001.028-.001.042-.001.233 0 .452.046.653.129v5.862a2.71 2.71 0 0 1-.653.13zm-2.343-.84c-.015 0-.029 0-.043-.001v-3.41c.014-.001.028-.001.043-.001.252 0 .489.058.702.162v3.088a3.134 3.134 0 0 1-.702.162zM2.188 14.5c-.015 0-.03 0-.045-.001V13.5c.015 0 .03 0 .045-.001.272 0 .508.076.72.212v.576a3.63 3.63 0 0 1-.72.213zm20.312-1.375c0 2.209-1.791 4-4 4h-5.625c-.014 0-.027 0-.041-.001V8.11c.014-.001.027-.001.041-.001 1.454 0 2.723.776 3.436 1.936.314-.153.667-.241 1.041-.241 1.283 0 2.323.974 2.422 2.221.688.285 1.166.96 1.166 1.75z" />
        </svg>
      ), 
      href: 'https://soundcloud.com/thecolincherry'
    },
    { 
      name: 'Spotify', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.508 17.302c-.216.354-.675.466-1.028.249-2.856-1.746-6.451-2.141-10.685-1.173-.406.092-.814-.16-.906-.565-.092-.406.16-.814.565-.906 4.634-1.059 8.604-.604 11.8 1.347.353.217.465.676.249 1.029l.005.019zm1.469-3.262c-.272.44-.847.578-1.287.306-3.269-2.008-8.253-2.592-12.118-1.418-.496.147-1.022-.135-1.169-.631-.147-.496.135-1.022.631-1.169 4.416-1.341 9.913-.688 13.65 1.611.439.272.577.847.305 1.287l-.012.014zm.127-3.41c-3.921-2.328-10.374-2.543-14.133-1.403-.601.182-1.237-.162-1.419-.763-.182-.601.162-1.237.763-1.419 4.305-1.306 11.428-1.058 15.921 1.611.54.32.714 1.015.394 1.555-.32.539-1.015.714-1.555.394l-.071-.075z" />
        </svg>
      ), 
      href: 'https://open.spotify.com/artist/2lCz91g9DugcZhbtvMnaUN'
    },
    { 
      name: 'Apple Music', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm2.143 13.82c-.31.258-.727.41-1.143.41a1.867 1.867 0 0 1-1.857-1.857c0-1.025.832-1.857 1.857-1.857.294 0 .58.07.822.203V8.895l-3.429.742V15c-.31.258-.727.41-1.143.41a1.867 1.867 0 0 1-1.857-1.857c0-1.025.832-1.857 1.857-1.857.294 0 .58.07.822.203V8.125c0-.46.33-.846.784-.928l4.286-.928c.516-.112.984.28.984.806v6.786c0 .416-.215.802-.557 1.059z"/>
        </svg>
      ), 
      href: 'https://music.apple.com/us/artist/colin-cherry/1639040887'
    },
  ];

  return (
    <footer className="relative z-10 w-full py-12 px-6 border-t border-white/5 bg-[#0a0a0a]/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/55">
          &copy; {new Date().getFullYear()} Colin Cherry. All Rights Reserved.
        </div>
        
        <div className="flex items-center gap-8">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white hover:scale-110 transition-all duration-300"
              title={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
        
        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/55">
          {/* Empty spacer or status check placeholder */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
