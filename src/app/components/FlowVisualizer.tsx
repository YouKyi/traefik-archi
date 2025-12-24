import { motion, AnimatePresence } from 'motion/react';
import { Shield, Network, Server, X } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface FlowVisualizerProps {
  activeFlow: 'public' | 'internal' | null;
  onClose: () => void;
}

export function FlowVisualizer({ activeFlow, onClose }: FlowVisualizerProps) {
  const { t } = useLanguage();
  return (
    <AnimatePresence>
      {activeFlow && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-slate-900 rounded-2xl border-2 border-slate-700 p-8 max-w-4xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-300 hover:text-white transition-all group"
              aria-label={t('closeButton')}
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {activeFlow === 'public' ? (
              <PublicFlow />
            ) : (
              <InternalFlow />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PublicFlow() {
  const { t } = useLanguage();
  return (
    <div className="space-y-8">
      <h2 className="text-2xl text-center text-red-300 flex items-center justify-center gap-3">
        <Shield className="w-7 h-7" />
        {t('publicFlowTitle')}
      </h2>

      <div className="flex items-center justify-between">
        {/* Step 1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-2xl">
            <span className="text-3xl">🌐</span>
          </div>
          <p className="text-sm text-white mt-3">{t('internet')}</p>
          <p className="text-xs text-slate-400">{t('publicUserLabel')}</p>
        </motion.div>

        {/* Arrow 1 */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex-1 h-1 bg-gradient-to-r from-red-500 to-orange-500 relative mx-4"
          style={{ originX: 0 }}
        >
          <motion.div
            initial={{ left: 0 }}
            animate={{ left: 'calc(100% - 12px)' }}
            transition={{ delay: 0.5, duration: 1.5, repeat: Infinity }}
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"
          />
        </motion.div>

        {/* Step 2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-2xl border-2 border-red-400">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <p className="text-sm text-white mt-3">WAF Edge B</p>
          <p className="text-xs text-slate-400">{t('secureFiltering')}</p>
        </motion.div>

        {/* Arrow 2 */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex-1 h-1 bg-gradient-to-r from-orange-500 to-green-500 relative mx-4"
          style={{ originX: 0 }}
        >
          <motion.div
            initial={{ left: 0 }}
            animate={{ left: 'calc(100% - 12px)' }}
            transition={{ delay: 1.1, duration: 1.5, repeat: Infinity }}
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"
          />
        </motion.div>

        {/* Step 3 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col items-center"
        >
          <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center shadow-2xl border-2 border-green-400">
            <Network className="w-12 h-12 text-white" />
          </div>
          <p className="text-sm text-white mt-3">Traefik Local 2</p>
          <p className="text-xs text-slate-400">{t('server2Sidecar')}</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
        className="p-4 bg-red-950/40 border border-red-500/50 rounded-xl text-center"
      >
        <p className="text-sm text-red-200" dangerouslySetInnerHTML={{ __html: t('directPath') }} />
      </motion.div>
    </div>
  );
}

function InternalFlow() {
  const { t } = useLanguage();
  return (
    <div className="space-y-8">
      <h2 className="text-2xl text-center text-blue-300 flex items-center justify-center gap-3">
        <Network className="w-7 h-7" />
        {t('internalFlowTitle')}
      </h2>

      <div className="space-y-6">
        {/* Row 1: User to Central */}
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl">
              <span className="text-3xl">👤</span>
            </div>
            <p className="text-sm text-white mt-3">{t('user')}</p>
            <p className="text-xs text-slate-400">{t('lanVpn')}</p>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex-1 h-1 bg-gradient-to-r from-blue-500 to-blue-400 relative mx-4"
            style={{ originX: 0 }}
          >
            <motion.div
              initial={{ left: 0 }}
              animate={{ left: 'calc(100% - 12px)' }}
              transition={{ delay: 0.5, duration: 1.5, repeat: Infinity }}
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-2xl border-2 border-blue-400">
              <Network className="w-12 h-12 text-white" />
            </div>
            <p className="text-sm text-white mt-3">{t('centralTraefik')}</p>
            <p className="text-xs text-slate-400">{t('internalProxy')}</p>
          </motion.div>
        </div>

        {/* Authentication Check */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center justify-center gap-4 py-4"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 1.2
            }}
            className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center border-2 border-gray-400"
          >
            <span className="text-2xl">🔐</span>
          </motion.div>
          <div className="text-center">
            <p className="text-sm text-blue-300">{t('identityValidation')}</p>
            <p className="text-xs text-slate-400">{t('ssoAuth')}</p>
          </div>
        </motion.div>

        {/* Row 2: Central to Local */}
        <div className="flex items-center justify-center gap-4">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="w-48 h-1 bg-gradient-to-r from-blue-400 to-green-500 relative"
            style={{ originX: 0 }}
          >
            <motion.div
              initial={{ left: 0 }}
              animate={{ left: 'calc(100% - 12px)' }}
              transition={{ delay: 1.8, duration: 1.5, repeat: Infinity }}
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.1 }}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center shadow-2xl border-2 border-green-400">
              <Network className="w-12 h-12 text-white" />
            </div>
            <p className="text-sm text-white mt-3">Traefik Local 1</p>
            <p className="text-xs text-slate-400">{t('server1Sidecar')}</p>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
        className="p-4 bg-blue-950/40 border border-blue-500/50 rounded-xl text-center"
      >
        <p className="text-sm text-blue-200" dangerouslySetInnerHTML={{ __html: t('securePath') }} />
      </motion.div>
    </div>
  );
}