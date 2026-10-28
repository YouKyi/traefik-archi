import { Cloud, Lock, Shield, Server, Users, User, Activity, Network, ShieldCheck, MousePointerClick } from 'lucide-react';
import { NetworkNode } from './components/NetworkNode';
import { ConnectionLine } from './components/ConnectionLine';
import { FlowVisualizer } from './components/FlowVisualizer';
import { DetailPanel } from './components/DetailPanel';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { EASE, SURFACE } from './components/Dialog';
import { useCallback, useState, type ReactNode } from 'react';
import { motion, MotionConfig } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import type { DetailId } from '../i18n/details';
import lockup from '../assets/lockup-a-compact.svg?raw';

// Le schéma se dessine une fois, à son arrivée dans l'écran : chaque bloc monte
// d'un cran, puis ses traits se tracent (variantes « hidden » / « shown »).
const inView = { initial: 'hidden', whileInView: 'shown', viewport: { once: true, amount: 0.15 } } as const;
const rise = (order: number) => ({
  hidden: { opacity: 0, y: 12 },
  shown: { opacity: 1, y: 0, transition: { delay: order * 0.08, duration: SURFACE, ease: EASE } },
});

function Zone({ icon, title, lead, order, children }: { icon: ReactNode; title: string; lead: string; order: number; children: ReactNode }) {
  return (
    <motion.section {...inView} variants={rise(order)} className="ta-zone flex flex-col lg:pb-0">
      <h2 className="ta-label">{icon}{title}</h2>
      <p className="ta-zone__lead" dangerouslySetInnerHTML={{ __html: lead }} />
      <div className="flex flex-1 flex-col items-center">{children}</div>
    </motion.section>
  );
}

// Sortie d'une zone vers les machines de services. L'étiquette ouvre le détail
// de la liaison ; sur grand écran le trait descend jusqu'au bord de la zone.
function ZoneExit({ type, label, detail, reveal, onSelect }: {
  type: 'public' | 'internal';
  label: string;
  detail: string;
  reveal: number;
  onSelect: () => void;
}) {
  return (
    <>
      <ConnectionLine type={type} reveal={reveal} className="min-h-6 flex-1" />
      <button type="button" aria-haspopup="dialog" onClick={onSelect} className="ta-hop my-[10px]">
        <span>{label}</span>
        <span className="ta-hop__detail">{detail}</span>
      </button>
      <ConnectionLine type={type} length="24px" reveal={reveal + 0.3} className="hidden lg:block" />
    </>
  );
}

export default function App() {
  const { t } = useLanguage();
  const [activeFlow, setActiveFlow] = useState<'public' | 'internal' | null>(null);
  const [detail, setDetail] = useState<DetailId | null>(null);
  const closeFlowVisualization = useCallback(() => setActiveFlow(null), []);
  const closeDetail = useCallback(() => setDetail(null), []);

  const legend = [
    { type: 'public', icon: <Shield />, title: t('publicFlowLegend'), desc: t('publicFlowDesc') },
    { type: 'internal', icon: <Lock />, title: t('internalFlowLegend'), desc: t('internalFlowDesc') },
    { type: 'restricted', icon: <Server />, title: t('finalFlowLegend'), desc: t('finalFlowDesc') },
  ] as const;

  return (
    <MotionConfig reducedMotion="user">
      <FlowVisualizer activeFlow={activeFlow} onClose={closeFlowVisualization} />
      <DetailPanel id={detail} onClose={closeDetail} />

      <header className="sticky top-0 z-40 px-4 pt-3 sm:px-6">
        <div className="yk-nav mx-auto max-w-[1180px] justify-between">
          <span className="yk-nav__sheen" aria-hidden="true" />
          <span className="ta-lockup" dangerouslySetInnerHTML={{ __html: lockup }} />
          <LanguageSwitcher />
        </div>
      </header>

      <section className="ta-seuil">
        <div className="mx-auto grid max-w-[1180px] gap-6 px-4 pb-8 pt-8 sm:px-6 sm:pt-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center lg:gap-10">
          <div>
            <p className="ta-kicker">Traefik · BunkerWeb · Authentik</p>
            <h1 className="ta-title">{t('title')}</h1>
            <p className="ta-lead">{t('subtitle')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={() => setActiveFlow('public')}
                className="yk-btn yk-btn--secondary yk-btn--lg"
              >
                <span className="yk-btn__icon"><Shield /></span>
                {t('visualizePublicFlow')}
              </button>
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={() => setActiveFlow('internal')}
                className="yk-btn yk-btn--secondary yk-btn--lg"
              >
                <span className="yk-btn__icon"><Lock /></span>
                {t('visualizeInternalFlow')}
              </button>
            </div>
          </div>

          <aside className="yk-card yk-card--ink">
            <div className="yk-card__body flex gap-4">
              <ShieldCheck className="mt-1 size-6 flex-none text-yk-on-ink-soft" aria-hidden="true" />
              <div>
                <h2 className="yk-card__title text-[18px]">{t('zeroTrustPrinciple')}</h2>
                <p className="yk-card__text m-0" dangerouslySetInnerHTML={{ __html: t('zeroTrustDesc') }} />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <main className="mx-auto max-w-[1180px] px-4 pb-16 sm:px-6">
        <p className="ta-label mb-4 text-yk-ink-3"><MousePointerClick />{t('clickHint')}</p>

        {/* Double entrée : chaque zone a son point d'entrée et descend vers les
            machines de services. Le flux public n'emprunte jamais le Traefik central. */}
        <div className="grid gap-5 lg:grid-cols-2">
          {/* WAN : le seul tracé orange du schéma, le flux exposé à Internet */}
          <Zone icon={<Cloud />} title={t('wanZone')} lead={t('publicFlowInfo')} order={0}>
            <NetworkNode icon={<User />} title={t('publicUser')} subtitle={t('internetAccess')} className="w-full sm:max-w-sm" />
            <ConnectionLine type="public" length="32px" reveal={0.3} />
            <div className="mt-[6px] grid w-full gap-3 sm:grid-cols-2">
              <NetworkNode icon={<Shield />} title={t('wafEdgeA')} subtitle={t('bunkerWebSiteA')} filter onSelect={() => setDetail('waf')} />
              <NetworkNode icon={<Shield />} title={t('wafEdgeB')} subtitle={t('bunkerWebSiteB')} filter onSelect={() => setDetail('waf')} />
            </div>
            <ZoneExit type="public" label={t('toLocalTraefiks')} detail={t('pkiTls')} reveal={0.6} onSelect={() => setDetail('tlsWaf')} />
          </Zone>

          {/* LAN : passage obligé par le Traefik central et Authentik */}
          <Zone icon={<Lock />} title={t('lanZone')} lead={t('internalFlowInfo')} order={1}>
            <NetworkNode icon={<Users />} title={t('internalUser')} subtitle={t('lanVpn')} className="w-full sm:max-w-sm" />
            <ConnectionLine type="internal" reveal={0.38} />
            <div className="ta-stage w-full">
              <h3 className="ta-label"><Activity />{t('centralInfrastructure')}</h3>
              <div className="flex flex-col items-center sm:flex-row">
                <NetworkNode icon={<Network />} title={t('centralTraefik')} subtitle={t('internalProxy')} onSelect={() => setDetail('central')} className="w-full sm:flex-1" />
                <ConnectionLine type="auth" orientation="responsive" length="20px" reveal={0.5} />
                <NetworkNode icon={<ShieldCheck />} title={t('authentik')} subtitle={t('ssoAuth')} onSelect={() => setDetail('authentik')} className="w-full sm:flex-1" />
              </div>
              <p className="ta-label mt-3 justify-center">{t('identityValidation')}</p>
            </div>
            <ZoneExit type="internal" label={t('toLocalTraefiks')} detail={t('pkiTls')} reveal={0.68} onSelect={() => setDetail('tlsCentral')} />
          </Zone>
        </div>

        {/* Les deux tracés franchissent l'écart jusqu'à la zone des machines */}
        <motion.div {...inView} className="hidden grid-cols-2 gap-5 lg:grid" aria-hidden="true">
          <ConnectionLine type="public" length="20px" reveal={1.1} className="mx-auto" />
          <ConnectionLine type="internal" length="20px" reveal={1.18} className="mx-auto" />
        </motion.div>

        <motion.section {...inView} variants={rise(2)} className="ta-zone mt-5 lg:mt-0">
          <h2 className="ta-label"><Server />{t('serviceMachines')}</h2>
          <div className="grid gap-3 lg:grid-cols-2">
            {[
              { name: t('server1'), proxy: t('localTraefik1'), app: t('appBackend1'), role: t('business') },
              { name: t('server2'), proxy: t('localTraefik2'), app: t('appBackend2'), role: t('showcase') },
            ].map((server) => (
              <div key={server.name} className="ta-host">
                <p className="ta-host__name">{server.name}</p>
                <div className="flex flex-col items-center sm:flex-row">
                  <NetworkNode icon={<Network />} title={server.proxy} subtitle={t('sidecar')} onSelect={() => setDetail('local')} className="w-full sm:flex-1" />
                  <ConnectionLine type="restricted" orientation="responsive" length="20px" reveal={0.4} />
                  <NetworkNode icon={<Server />} title={server.app} subtitle={server.role} onSelect={() => setDetail('backend')} className="w-full sm:flex-1" />
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* La légende accompagne le schéma : la couleur n'est jamais le seul canal */}
        <section aria-labelledby="legend-title" className="yk-card mt-5">
          <div className="yk-card__body">
            <h2 id="legend-title" className="ta-label mb-4 text-yk-ink-3">{t('legend')}</h2>
            <ul className="m-0 grid list-none gap-5 p-0 md:grid-cols-3">
              {legend.map((item) => (
                <li key={item.type} className="grid grid-cols-[48px_minmax(0,1fr)] gap-x-4">
                  <ConnectionLine type={item.type} orientation="horizontal" length="48px" className="mt-[11px]" />
                  <div>
                    <h3 className="ta-legend__title">{item.icon}{item.title}</h3>
                    <p className="yk-card__text m-0" dangerouslySetInnerHTML={{ __html: item.desc }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}
