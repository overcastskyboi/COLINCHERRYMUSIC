import { ReactNode, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import PreSaveBanner from './PreSaveBanner';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [hasBanner, setHasBanner] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden flex flex-col relative">
      {/* Grain overlay — static, no mix-blend (mix-blend forces full-viewport recompositing). */}
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.025] bg-grain"></div>

      {/* Atmospheric background — two soft glows on their own compositor layer.
          The drift animation moves via transform only (cheap) and is disabled under reduce-motion. */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden [transform:translateZ(0)]">
        <div className="absolute top-[-10%] left-[-5%] w-[55%] h-[55%] bg-indigo-500/[0.06] blur-[80px] rounded-full motion-safe:animate-fog"></div>
        <div className="absolute bottom-[-12%] right-[-5%] w-[55%] h-[55%] bg-fuchsia-500/[0.05] blur-[80px] rounded-full"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header Stack */}
        <header className="fixed top-0 left-0 right-0 z-50 flex flex-col">
          <PreSaveBanner onVisibilityChange={setHasBanner} />
          <Navbar />
        </header>

        <main className={`flex-grow transition-all duration-300 ${hasBanner ? 'pt-32 md:pt-36' : 'pt-20'}`}>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
