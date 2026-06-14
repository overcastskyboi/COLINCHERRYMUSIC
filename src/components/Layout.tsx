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
      {/* Global Grain Overlay */}
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] bg-grain mix-blend-overlay"></div>
      
      {/* Atmospheric Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Fog Layers */}
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] opacity-40 animate-fog">
          {/* Indigo/Violet Glow */}
          <div className="absolute top-[10%] left-[5%] w-[50%] h-[50%] bg-indigo-500/[0.07] blur-[130px] rounded-full"></div>
          {/* Fuchsia/Pink Glow */}
          <div className="absolute bottom-[20%] right-[10%] w-[50%] h-[50%] bg-fuchsia-500/[0.06] blur-[140px] rounded-full"></div>
          {/* Cyan Accents */}
          <div className="absolute top-[40%] right-[20%] w-[35%] h-[35%] bg-cyan-500/[0.04] blur-[120px] rounded-full"></div>
        </div>
        
        {/* Deep Ambient Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-purple-900/[0.05] blur-[160px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-900/[0.05] blur-[160px] rounded-full"></div>
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
