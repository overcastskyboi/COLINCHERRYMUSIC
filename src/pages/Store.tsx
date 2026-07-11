import PageTransition from '../components/PageTransition';
import { Helmet } from 'react-helmet-async';
import { Instagram, ShoppingBag } from 'lucide-react';

// Merch is not live yet. Rather than send visitors to a dead/broken cart flow,
// the store page is a holding page with a way to stay connected in the meantime.
const socials = [
  { name: 'Instagram', href: 'https://instagram.com/thecolincherry', icon: <Instagram size={20} />, color: 'hover:text-[#E4405F]' },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/itscolincherry',
    color: 'hover:text-[#1877F2]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/thecolincherry',
    color: 'hover:text-[#FF0000]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'Spotify',
    href: 'https://open.spotify.com/artist/2lCz91g9DugcZhbtvMnaUN',
    color: 'hover:text-[#1DB954]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.508 17.302c-.216.354-.675.466-1.028.249-2.856-1.746-6.451-2.141-10.685-1.173-.406.092-.814-.16-.906-.565-.092-.406.16-.814.565-.906 4.634-1.059 8.604-.604 11.8 1.347.353.217.465.676.249 1.029l.005.019zm1.469-3.262c-.272.44-.847.578-1.287.306-3.269-2.008-8.253-2.592-12.118-1.418-.496.147-1.022-.135-1.169-.631-.147-.496.135-1.022.631-1.169 4.416-1.341 9.913-.688 13.65 1.611.439.272.577.847.305 1.287l-.012.014zm.127-3.41c-3.921-2.328-10.374-2.543-14.133-1.403-.601.182-1.237-.162-1.419-.763-.182-.601.162-1.237.763-1.419 4.305-1.306 11.428-1.058 15.921 1.611.54.32.714 1.015.394 1.555-.32.539-1.015.714-1.555.394l-.071-.075z" />
      </svg>
    ),
  },
];

const Store = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Colin Cherry | Store</title>
        <meta name="description" content="The Colin Cherry merch store is coming soon. Follow along for updates on Garfield Park vinyl, cassettes, and more." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-6 py-32 text-center flex flex-col items-center">
        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-8 text-white/60">
          <ShoppingBag size={32} />
        </div>

        <h1 className="text-6xl md:text-8xl font-display uppercase tracking-tighter mb-6 leading-none">Store</h1>
        <p className="text-[10px] uppercase tracking-[0.5em] font-black text-white/60 mb-8">Coming Soon</p>

        <p className="text-white/75 text-sm md:text-base leading-relaxed max-w-xl mb-12">
          Merchandise — including Garfield Park vinyl and cassettes — will launch here alongside the album rollout.
          In the meantime, follow along on socials so you don't miss the drop.
        </p>

        <div className="glass p-6 flex items-center gap-6 sm:gap-8 border border-white/5">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              title={social.name}
              className={`text-white/60 transition-all hover:scale-110 ${social.color}`}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Store;
