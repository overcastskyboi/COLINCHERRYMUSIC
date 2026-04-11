import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Discography from './pages/Discography';
import Lyrics from './pages/Lyrics';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <Router>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/music" element={<Discography />} />
            <Route path="/lyrics" element={<Lyrics />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </Router>
  );
}

export default App;
