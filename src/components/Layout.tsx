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
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] opacity-20 animate-fog">
          <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-white/[0.03] blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[30%] right-[15%] w-[50%] h-[50%] bg-white/[0.02] blur-[150px] rounded-full"></div>
        </div>
        
        {/* Deep Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-white/[0.01] blur-[160px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-white/[0.01] blur-[160px] rounded-full"></div>
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
