import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useModalA11y } from '../hooks/useModalA11y';

interface LyricModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  lyrics: string;
  themeColor: string;
}

const LyricModal = ({ isOpen, onClose, title, lyrics, themeColor }: LyricModalProps) => {
  useModalA11y(isOpen, onClose);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-[#0a0a0a] border border-white/10 p-8 md:p-12 w-full max-w-[600px] relative rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <h2
              className="text-3xl font-black uppercase tracking-tighter mb-8"
              style={{ color: themeColor }}
            >
              {title}
            </h2>
            <div className="font-lyric text-base md:text-lg leading-relaxed tracking-wide text-white/90 max-h-[60vh] overflow-y-auto">
              {lyrics.split(/\n\s*\n/).map((stanza, i) => {
                const lines = stanza.split('\n');
                return (
                  <p key={i} className="mb-5 last:mb-0">
                    {lines.map((line, j) => (
                      <span key={j}>
                        {line}
                        {j < lines.length - 1 ? <br /> : null}
                      </span>
                    ))}
                  </p>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LyricModal;
