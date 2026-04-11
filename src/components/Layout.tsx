import { ReactNode } from 'react';
import Navbar from './Navbar';
import AudioPlayer from './AudioPlayer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <Navbar />
      <main className="relative z-10">
        {children}
      </main>
      <AudioPlayer />
      
      {/* Dynamic Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-900/10 blur-[160px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-900/10 blur-[160px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default Layout;
