import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Discography from './pages/Discography';
import EPK from './pages/EPK';
import Store from './pages/Store';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <Router>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/music" element={<Discography />} />
            <Route path="/epk" element={<EPK />} />
            <Route path="/store" element={<Store />} />
          </Routes>
        </AnimatePresence>
        <Analytics />
        <SpeedInsights />
      </Layout>
    </Router>
  );
}

export default App;
