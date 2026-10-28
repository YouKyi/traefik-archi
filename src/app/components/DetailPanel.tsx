import { motion } from 'motion/react';
import { useLanguage } from '../../i18n/LanguageContext';
import { details, type DetailId } from '../../i18n/details';
import { Dialog, EASE, SURFACE } from './Dialog';

interface DetailPanelProps {
  id: DetailId | null;
  onClose: () => void;
}

export function DetailPanel({ id, onClose }: DetailPanelProps) {
  const { language } = useLanguage();
  const detail = id ? details[language][id] : null;

  return (
    <Dialog open={detail !== null} title={detail?.title} subtitle={detail?.kind} onClose={onClose}>
      {detail && (
        <>
          <p className="ta-zone__lead">{detail.lead}</p>
          <dl className="ta-specs">
            {detail.rows.map(([label, value], i) => (
              <motion.div
                key={label}
                className="ta-specs__row"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.04, duration: SURFACE, ease: EASE }}
              >
                <dt>{label}</dt>
                <dd dangerouslySetInnerHTML={{ __html: value }} />
              </motion.div>
            ))}
          </dl>
        </>
      )}
    </Dialog>
  );
}
