import { useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { Check, Globe, Info, Network, RotateCw, Shield, ShieldCheck, Users } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { NetworkNode } from './NetworkNode';
import { ConnectionLine } from './ConnectionLine';
import { Dialog, EASE, SURFACE } from './Dialog';

interface FlowVisualizerProps {
  activeFlow: 'public' | 'internal' | null;
  onClose: () => void;
}

// Le trajet se joue une fois, le bouton « Rejouer » le relance.
const DRAW = 0.5;
// Les nœuds du trajet sont alignés sur un rail : l'axe passe au centre de leur icône
const RAIL = 'ml-[34px]';

function Reveal({ at, children }: { at: number; children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: at, duration: SURFACE, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Draw({ at, axis = 'y', className = '', children }: { at: number; axis?: 'x' | 'y'; className?: string; children: ReactNode }) {
  const from = axis === 'y' ? { scaleY: 0 } : { scaleX: 0 };
  const to = axis === 'y' ? { scaleY: 1 } : { scaleX: 1 };
  return (
    <motion.span
      className={`block ${className}`}
      style={{ originX: 0, originY: 0 }}
      initial={from}
      animate={to}
      transition={{ delay: at, duration: DRAW, ease: EASE }}
    >
      {children}
    </motion.span>
  );
}

export function FlowVisualizer({ activeFlow, onClose }: FlowVisualizerProps) {
  const { t } = useLanguage();
  const [run, setRun] = useState(0);

  return (
    <Dialog
      open={activeFlow !== null}
      title={activeFlow === 'public' ? t('publicFlowTitle') : t('internalFlowTitle')}
      onClose={onClose}
    >
      <div key={`${activeFlow}-${run}`}>
        {activeFlow === 'public' ? <PublicFlow /> : <InternalFlow />}
      </div>

      <div className="mt-6 flex justify-end">
        <button type="button" onClick={() => setRun((r) => r + 1)} className="yk-btn yk-btn--ghost yk-btn--sm">
          <span className="yk-btn__icon"><RotateCw /></span>
          {t('replay')}
        </button>
      </div>
    </Dialog>
  );
}

function FlowNote({ at, ok, html }: { at: number; ok?: boolean; html: string }) {
  return (
    <Reveal at={at}>
      <div className="yk-alert mt-6">
        <span className={`yk-marker ${ok ? 'yk-marker--ok' : 'yk-marker--info'} yk-alert__marker`} aria-hidden="true">
          {ok ? <Check /> : <Info />}
        </span>
        <p className="ta-note m-0 border-0 p-0" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Reveal>
  );
}

function PublicFlow() {
  const { t } = useLanguage();
  return (
    <>
      <ol className="m-0 list-none p-0">
        <li>
          <Reveal at={0}>
            <NetworkNode icon={<Globe />} title={t('internet')} subtitle={t('publicUserLabel')} />
          </Reveal>
          <Draw at={0.2} className={RAIL}><ConnectionLine type="public" length="36px" /></Draw>
        </li>
        <li>
          <Reveal at={0.7}>
            <NetworkNode icon={<Shield />} title={t('wafEdgeB')} subtitle={t('secureFiltering')} filter />
          </Reveal>
          {/* WAF vers Traefik local : TLS, certificat de la PKI interne */}
          <div className="flex items-center">
            <Draw at={0.9} className={RAIL}><ConnectionLine type="public" length="40px" /></Draw>
            <Reveal at={0.9}><p className="ta-label ml-5 text-yk-ink-3">{t('pkiTls')}</p></Reveal>
          </div>
        </li>
        <li>
          <Reveal at={1.4}>
            <NetworkNode icon={<Network />} title={t('localTraefik2')} subtitle={t('server2Sidecar')} />
          </Reveal>
        </li>
      </ol>
      <FlowNote at={1.8} html={t('directPath')} />
    </>
  );
}

function InternalFlow() {
  const { t } = useLanguage();
  return (
    <>
      <ol className="m-0 list-none p-0">
        <li>
          <Reveal at={0}>
            <NetworkNode icon={<Users />} title={t('user')} subtitle={t('lanVpn')} />
          </Reveal>
          <Draw at={0.2} className={RAIL}><ConnectionLine type="internal" length="36px" /></Draw>
        </li>
        <li>
          <Reveal at={0.7}>
            <NetworkNode icon={<Network />} title={t('centralTraefik')} subtitle={t('internalProxy')} />
          </Reveal>
          {/* Contrôle d'identité : branche latérale, le trajet attend la validation */}
          <div className="relative py-3 pl-14">
            <Draw at={1.8} className="absolute bottom-0 left-[34px] top-0">
              <ConnectionLine type="internal" length="100%" />
            </Draw>
            <div className="relative">
              <Draw at={0.9} axis="x" className="absolute -left-[20px] top-1/2">
                <ConnectionLine type="auth" orientation="horizontal" length="20px" />
              </Draw>
              <Reveal at={1.2}>
                <NetworkNode icon={<ShieldCheck />} title={t('authentik')} subtitle={t('ssoAuth')} />
              </Reveal>
            </div>
            <Reveal at={1.5}>
              <p className="ta-label mt-3">
                <span className="yk-marker yk-marker--ok yk-marker--sm" aria-hidden="true"><Check /></span>
                {t('identityValidation')}
              </p>
            </Reveal>
          </div>
          {/* Traefik central vers Traefik local : TLS, certificat de la PKI interne */}
          <div className="flex items-center">
            <Draw at={2.3} className={RAIL}><ConnectionLine type="internal" length="40px" /></Draw>
            <Reveal at={2.3}><p className="ta-label ml-5 text-yk-ink-3">{t('pkiTls')}</p></Reveal>
          </div>
        </li>
        <li>
          <Reveal at={2.7}>
            <NetworkNode icon={<Network />} title={t('localTraefik1')} subtitle={t('server1Sidecar')} />
          </Reveal>
        </li>
      </ol>
      <FlowNote at={3} ok html={t('securePath')} />
    </>
  );
}
