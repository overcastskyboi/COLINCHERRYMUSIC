import PageTransition from '../components/PageTransition';
import SocialLinks from '../components/SocialLinks';
import { Helmet } from 'react-helmet-async';
import { ShoppingBag } from 'lucide-react';

// Merch is not live yet. Rather than send visitors to a dead/broken cart flow,
// the store page is a holding page with a way to stay connected in the meantime.
const Store = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Colin Cherry | Store</title>
        <meta name="description" content="The Colin Cherry merch store is coming soon. Follow along for updates on physical releases and merch." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-6 py-32 text-center flex flex-col items-center">
        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-8 text-white/60">
          <ShoppingBag size={32} />
        </div>

        <h1 className="text-6xl md:text-8xl font-display uppercase tracking-tighter mb-6 leading-none">Store</h1>
        <p className="text-[10px] uppercase tracking-[0.5em] font-black text-white/60 mb-8">Coming Soon</p>

        <p className="text-white/75 text-sm md:text-base leading-relaxed max-w-xl mb-12">
          Merch is on the way.
          Follow along on socials so you don't miss the drop.
        </p>

        <div className="glass p-6 border border-white/5">
          <SocialLinks className="flex flex-wrap items-center justify-center gap-6 sm:gap-8" linkClassName="text-white/60 transition-all hover:scale-110" />
        </div>
      </div>
    </PageTransition>
  );
};

export default Store;
