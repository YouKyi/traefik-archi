import { Cloud, Lock, Shield, Server, Users, User, Activity, ArrowRight, Network } from 'lucide-react';
import { NetworkNode } from './components/NetworkNode';
import { ConnectionLine } from './components/ConnectionLine';
import { FlowVisualizer } from './components/FlowVisualizer';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

export default function App() {
  const { t } = useLanguage();
  const [activeFlow, setActiveFlow] = useState<'public' | 'internal' | null>(null);

  const handleFlowVisualization = (flowType: 'public' | 'internal') => {
    setActiveFlow(flowType);
  };

  const closeFlowVisualization = () => {
    setActiveFlow(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      {/* Language Switcher */}
      <LanguageSwitcher />

      {/* Flow Visualizer Modal */}
      <FlowVisualizer activeFlow={activeFlow} onClose={closeFlowVisualization} />

      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2 text-white">{t('title')}</h1>
          <p className="text-slate-300">{t('subtitle')}</p>
        </div>

        {/* Flow Control Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => handleFlowVisualization('public')}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-lg shadow-lg transition-all flex items-center gap-2"
          >
            <Shield className="w-5 h-5" />
            {t('visualizePublicFlow')}
          </button>
          <button
            onClick={() => handleFlowVisualization('internal')}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-lg shadow-lg transition-all flex items-center gap-2"
          >
            <Lock className="w-5 h-5" />
            {t('visualizeInternalFlow')}
          </button>
        </div>

        {/* Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">

          {/* LEFT SIDE - WAN ZONE */}
          <div className="space-y-6">
            {/* WAN Zone */}
            <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 backdrop-blur-sm border-2 border-red-500/50 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <Cloud className="w-6 h-6 text-red-400" />
                <h2 className="text-xl text-red-300">{t('wanZone')}</h2>
              </div>

              {/* Public User */}
              <div className="mb-8 flex justify-center">
                <NetworkNode
                  icon={<User className="w-6 h-6" />}
                  title={t('publicUser')}
                  subtitle={t('internetAccess')}
                  color="red"
                  badge={t('public')}
                />
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center mb-6">
                <div className="flex flex-col items-center">
                  <div className="w-1 h-12 bg-gradient-to-b from-red-400 to-orange-400 rounded-full"></div>
                  <div className="w-3 h-3 border-4 border-orange-400 border-t-transparent rotate-45 translate-y-[-6px]"></div>
                </div>
              </div>

              {/* WAF Edges */}
              <div className="space-y-4">
                <NetworkNode
                  icon={<Shield className="w-6 h-6" />}
                  title={t('wafEdgeA')}
                  subtitle={t('bunkerWebSiteA')}
                  color="red"
                  size="large"
                />
                <NetworkNode
                  icon={<Shield className="w-6 h-6" />}
                  title={t('wafEdgeB')}
                  subtitle={t('bunkerWebSiteB')}
                  color="red"
                  size="large"
                />
              </div>

              {/* Info Box */}
              <div className="mt-6 p-3 bg-red-950/50 border border-red-500/30 rounded-lg">
                <p className="text-xs text-red-200" dangerouslySetInnerHTML={{ __html: t('publicFlowInfo') }} />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - LAN ZONE */}
          <div className="space-y-6">
            {/* LAN Zone */}
            <div className="bg-gradient-to-br from-blue-900/30 to-green-900/30 backdrop-blur-sm border-2 border-blue-500/50 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl text-blue-300">{t('lanZone')}</h2>
              </div>

              {/* Internal User */}
              <div className="mb-6 flex justify-center">
                <NetworkNode
                  icon={<Users className="w-6 h-6" />}
                  title={t('internalUser')}
                  subtitle={t('lanVpn')}
                  color="blue"
                  badge={t('internal')}
                />
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center mb-6">
                <div className="flex flex-col items-center">
                  <div className="w-1 h-12 bg-gradient-to-b from-blue-400 to-green-400 rounded-full"></div>
                  <div className="w-3 h-3 border-4 border-green-400 border-t-transparent rotate-45 translate-y-[-6px]"></div>
                </div>
              </div>

              {/* Infrastructure Centrale */}
              <div className="mb-6 p-4 bg-blue-950/40 border border-blue-400/30 rounded-xl">
                <h3 className="text-sm text-blue-300 mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  {t('centralInfrastructure')}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <NetworkNode
                    icon={<Network className="w-5 h-5" />}
                    title={t('centralTraefik')}
                    subtitle={t('internalProxy')}
                    color="blue"
                    size="medium"
                    badge={t('central')}
                  />
                  <NetworkNode
                    icon={<Activity className="w-5 h-5" />}
                    title={t('authentik')}
                    subtitle={t('ssoAuth')}
                    color="gray"
                    size="medium"
                  />
                </div>
                <div className="flex justify-center mt-2">
                  <div className="text-xs text-blue-300 px-3 py-1 bg-blue-500/20 rounded-full border border-blue-400/30">
                    {t('identityValidation')}
                  </div>
                </div>
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center mb-6">
                <div className="flex flex-col items-center">
                  <div className="w-1 h-8 bg-gradient-to-b from-green-400 to-emerald-400 rounded-full"></div>
                  <div className="w-3 h-3 border-4 border-emerald-400 border-t-transparent rotate-45 translate-y-[-6px]"></div>
                </div>
              </div>

              {/* Machines de Services */}
              <div className="p-4 bg-green-950/40 border border-green-400/30 rounded-xl">
                <h3 className="text-sm text-green-300 mb-4 flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  {t('serviceMachines')}
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {/* Server 1 */}
                  <div className="p-3 bg-slate-900/60 border border-slate-600 rounded-lg">
                    <div className="text-xs text-slate-400 mb-3">{t('server1')}</div>
                    <div className="flex items-center gap-3">
                      <NetworkNode
                        icon={<Network className="w-4 h-4" />}
                        title={t('localTraefik1')}
                        subtitle={t('sidecar')}
                        color="green"
                        size="small"
                      />
                      <ArrowRight className="w-4 h-4 text-slate-500" />
                      <NetworkNode
                        icon={<Server className="w-4 h-4" />}
                        title={t('appBackend1')}
                        subtitle={t('business')}
                        color="slate"
                        size="small"
                      />
                    </div>
                  </div>

                  {/* Server 2 */}
                  <div className="p-3 bg-slate-900/60 border border-slate-600 rounded-lg">
                    <div className="text-xs text-slate-400 mb-3">{t('server2')}</div>
                    <div className="flex items-center gap-3">
                      <NetworkNode
                        icon={<Network className="w-4 h-4" />}
                        title={t('localTraefik2')}
                        subtitle={t('sidecar')}
                        color="green"
                        size="small"
                      />
                      <ArrowRight className="w-4 h-4 text-slate-500" />
                      <NetworkNode
                        icon={<Server className="w-4 h-4" />}
                        title={t('appBackend2')}
                        subtitle={t('showcase')}
                        color="slate"
                        size="small"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="mt-4 p-3 bg-green-950/50 border border-green-500/30 rounded-lg">
                <p className="text-xs text-green-200" dangerouslySetInnerHTML={{ __html: t('internalFlowInfo') }} />
              </div>
            </div>
          </div>
        </div>

        {/* Legend and Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-red-900/40 to-orange-900/40 border border-red-500/50 backdrop-blur-sm">
            <h4 className="text-sm text-red-300 mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              {t('publicFlowLegend')}
            </h4>
            <p className="text-xs text-red-200" dangerouslySetInnerHTML={{ __html: t('publicFlowDesc') }} />
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-900/40 to-green-900/40 border border-blue-500/50 backdrop-blur-sm">
            <h4 className="text-sm text-blue-300 mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              {t('internalFlowLegend')}
            </h4>
            <p className="text-xs text-blue-200" dangerouslySetInnerHTML={{ __html: t('internalFlowDesc') }} />
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900/40 to-slate-800/40 border border-slate-500/50 backdrop-blur-sm">
            <h4 className="text-sm text-slate-300 mb-2 flex items-center gap-2">
              <Server className="w-4 h-4" />
              {t('finalFlowLegend')}
            </h4>
            <p className="text-xs text-slate-200" dangerouslySetInnerHTML={{ __html: t('finalFlowDesc') }} />
          </div>
        </div>

        {/* Key Principle */}
        <div className="mt-6 p-6 rounded-xl bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border-2 border-purple-500/50 backdrop-blur-sm text-center">
          <h3 className="text-lg text-purple-300 mb-2">{t('zeroTrustPrinciple')}</h3>
          <p className="text-sm text-purple-200" dangerouslySetInnerHTML={{ __html: t('zeroTrustDesc') }} />
        </div>
      </div>
    </div>
  );
}