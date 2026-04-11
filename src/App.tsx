import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Discography from './pages/Discography';
import Visuals from './pages/Visuals';
import Booking from './pages/Booking';
import { AnimatePresence } from 'framer-motion';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <Router>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discography" element={<Discography />} />
            <Route path="/visuals" element={<Visuals />} />
            <Route path="/booking" element={<Booking />} />
          </Routes>
        </AnimatePresence>
      </Layout>
      <SpeedInsights />
    </Router>
  );
}

export default App;
