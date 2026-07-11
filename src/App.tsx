import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import Layout from './components/Layout';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Code-split each route so the homepage no longer ships Store/EPK/Discography + their JSON.
const Home = lazy(() => import('./pages/Home'));
const Discography = lazy(() => import('./pages/Discography'));
const EPK = lazy(() => import('./pages/EPK'));
const Store = lazy(() => import('./pages/Store'));

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      {/* The `key` is what lets AnimatePresence detect navigation and run exit animations. */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/music" element={<Discography />} />
        <Route path="/epk" element={<EPK />} />
        <Route path="/store" element={<Store />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    // reducedMotion="user" makes ALL Framer animations respect the OS "reduce motion" setting.
    <MotionConfig reducedMotion="user">
      <Router>
        <Layout>
          <Suspense fallback={<div className="min-h-screen" />}>
            <AnimatedRoutes />
          </Suspense>
          <Analytics />
          <SpeedInsights />
        </Layout>
      </Router>
    </MotionConfig>
  );
}

export default App;
