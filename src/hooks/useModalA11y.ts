import { useEffect, useRef } from 'react';

/** Closes on Escape and locks body scroll while `isOpen` is true. */
export function useModalA11y(isOpen: boolean, onClose: () => void) {
  // Keep the latest callback in a ref so callers can pass an inline arrow without the
  // effect tearing down and re-locking the page scroll on every render.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);
}
