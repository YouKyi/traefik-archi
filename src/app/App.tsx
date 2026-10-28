import { Cloud, Lock, Shield, Server, Users, User, Activity, Network, ShieldCheck, ArrowRight } from 'lucide-react';
import { NetworkNode } from './components/NetworkNode';
import { ConnectionLine } from './components/ConnectionLine';
import { FlowVisualizer } from './components/FlowVisualizer';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useCallback, useState, type ReactNode } from 'react';
import { MotionConfig } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import lockup from '../assets/lockup-a-compact.svg?raw';

function Zone({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <section className="ta-zone flex flex-col">
      <h2 className="ta-label">{icon}{title}</h2>
      {children}
    </section>
  );
}

export default function App() {
  const { t } = useLanguage();
  const [activeFlow, setActiveFlow] = useState<'public' | 'internal' | null>(null);
  const closeFlowVisualization = useCallback(() => setActiveFlow(null), []);

  const legend = [
    { type: 'public', icon: <Shield />, title: t('publicFlowLegend'), desc: t('publicFlowDesc') },
    { type: 'internal', icon: <Lock />, title: t('internalFlowLegend'), desc: t('internalFlowDesc') },
    { type: 'restricted', icon: <Server />, title: t('finalFlowLegend'), desc: t('finalFlowDesc') },
  ] as const;

  return (
    <MotionConfig reducedMotion="user">
      <FlowVisualizer activeFlow={activeFlow} onClose={closeFlowVisualization} />

      <header className="sticky top-0 z-40 px-4 pt-3 sm:px-6">
        <div className="yk-nav mx-auto max-w-[1180px] justify-between">
          <span className="yk-nav__sheen" aria-hidden="true" />
          <span className="ta-lockup" dangerouslySetInnerHTML={{ __html: lockup }} />
          <LanguageSwitcher />
        </div>
      </header>

      <section className="ta-seuil">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-4 pb-10 pt-12 sm:px-6 sm:pb-12 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-end">
          <div>
            <p className="ta-kicker">Traefik · BunkerWeb · Authentik</p>
            <h1 className="ta-title">{t('title')}</h1>
            <p className="ta-lead">{t('subtitle')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
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

          {/* La légende se lit avant le schéma : la couleur n'est jamais le seul canal */}
          <aside aria-labelledby="legend-title" className="yk-card">
            <div className="yk-card__body">
              <h2 id="legend-title" className="ta-label mb-5 text-yk-ink-3">{t('legend')}</h2>
              <ul className="m-0 grid list-none gap-5 p-0">
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
          </aside>
        </div>
      </section>

      <main className="mx-auto max-w-[1180px] space-y-5 px-4 pb-20 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-2">
          {/* WAN : le seul tracé orange du schéma, le flux exposé à Internet. Il descend
              toute la zone jusqu'aux Traefik locaux : il contourne l'infrastructure centrale */}
          <Zone icon={<Cloud />} title={t('wanZone')}>
            <div className="flex flex-1 flex-col items-center">
              <NetworkNode
                icon={<User />}
                title={t('publicUser')}
                subtitle={t('internetAccess')}
                badge={t('public')}
                exposed
                className="w-full sm:max-w-sm"
              />
              <ConnectionLine type="public" length="32px" />
              <div className="mt-[6px] grid w-full gap-3 sm:grid-cols-2">
                <NetworkNode icon={<Shield />} title={t('wafEdgeA')} subtitle={t('bunkerWebSiteA')} filter />
                <NetworkNode icon={<Shield />} title={t('wafEdgeB')} subtitle={t('bunkerWebSiteB')} filter />
              </div>
              <ConnectionLine type="public" className="min-h-8 flex-1" />
              <p className="ta-label my-[10px] text-yk-ink-3">{t('bypassCentral')}</p>
              <ConnectionLine type="public" className="min-h-8 flex-1" />
              <p className="ta-label mt-[10px] justify-center text-center">
                {t('publicExit')}
                <ArrowRight className="hidden lg:block" aria-hidden="true" />
              </p>
            </div>
            <p className="ta-note" dangerouslySetInnerHTML={{ __html: t('publicFlowInfo') }} />
          </Zone>

          {/* LAN : passage obligé par le Traefik central et Authentik */}
          <Zone icon={<Lock />} title={t('lanZone')}>
            <div className="flex flex-col items-center">
              <NetworkNode
                icon={<Users />}
                title={t('internalUser')}
                subtitle={t('lanVpn')}
                badge={t('internal')}
                className="w-full sm:max-w-sm"
              />
              <ConnectionLine type="internal" />

              <div className="ta-stage w-full">
                <h3 className="ta-label"><Activity />{t('centralInfrastructure')}</h3>
                <div className="flex flex-col items-center sm:flex-row">
                  <NetworkNode
                    icon={<Network />}
                    title={t('centralTraefik')}
                    subtitle={t('internalProxy')}
                    badge={t('central')}
                    className="w-full sm:flex-1"
                  />
                  <ConnectionLine type="auth" orientation="responsive" length="20px" />
                  <NetworkNode icon={<ShieldCheck />} title={t('authentik')} subtitle={t('ssoAuth')} className="w-full sm:flex-1" />
                </div>
                <p className="ta-label mt-3 justify-center">{t('identityValidation')}</p>
              </div>

              <ConnectionLine type="internal" />

              <div className="ta-stage w-full">
                <h3 className="ta-label"><Server />{t('serviceMachines')}</h3>
                <div className="grid gap-3">
                  {[
                    { name: t('server1'), proxy: t('localTraefik1'), app: t('appBackend1'), role: t('business') },
                    { name: t('server2'), proxy: t('localTraefik2'), app: t('appBackend2'), role: t('showcase') },
                  ].map((server) => (
                    <div key={server.name} className="ta-host">
                      <p className="ta-host__name">{server.name}</p>
                      <div className="flex flex-col items-center sm:flex-row">
                        <NetworkNode icon={<Network />} title={server.proxy} subtitle={t('sidecar')} className="w-full sm:flex-1" />
                        <ConnectionLine type="restricted" orientation="responsive" length="20px" />
                        <NetworkNode icon={<Server />} title={server.app} subtitle={server.role} className="w-full sm:flex-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="ta-note" dangerouslySetInnerHTML={{ __html: t('internalFlowInfo') }} />
          </Zone>
        </div>

        <section className="yk-card yk-card--ink">
          <div className="yk-card__body flex gap-4 sm:px-8 sm:py-7">
            <ShieldCheck className="mt-1 size-6 flex-none text-yk-on-ink-soft" aria-hidden="true" />
            <div>
              <h2 className="yk-card__title text-[20px]">{t('zeroTrustPrinciple')}</h2>
              <p className="yk-card__text m-0" dangerouslySetInnerHTML={{ __html: t('zeroTrustDesc') }} />
            </div>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}
