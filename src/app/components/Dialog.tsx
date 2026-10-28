import { useEffect, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

// Mouvement youkyi : décélération exponentielle, aucune boucle infinie
export const EASE = [0.16, 1, 0.3, 1] as const;
export const SURFACE = 0.26;

interface DialogProps {
  open: boolean;
  title: ReactNode;
  // Étiquette mono au-dessus du titre (nature de l'élément)
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
}

// Panneau modal commun : fermeture par Échap ou clic hors panneau, focus posé
// sur « Fermer » à l'ouverture et rendu à l'élément d'origine à la fermeture.
export function Dialog({ open, title, subtitle, onClose, children }: DialogProps) {
  const { t } = useLanguage();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      previous?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: SURFACE, ease: EASE }}
          className="ta-scrim fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: SURFACE, ease: EASE }}
            className="ta-dialog relative max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                {subtitle && <p className="ta-node__sub mb-2 mt-0">{subtitle}</p>}
                <h2 id="dialog-title" className="ta-dialog__title">{title}</h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="yk-btn yk-btn--ghost yk-btn--icon -mr-2 -mt-1"
                aria-label={t('closeButton')}
              >
                <span className="yk-btn__icon"><X /></span>
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
