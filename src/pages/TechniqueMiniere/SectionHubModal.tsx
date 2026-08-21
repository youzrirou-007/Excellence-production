import React from 'react';
import { motion } from 'motion/react';
import { 
  Target, 
  Box, 
  Compass, 
  Flame, 
  ShieldCheck, 
  TrendingUp, 
  GraduationCap, 
  ChevronLeft, 
  ArrowRight,
  Layers,
  Crown,
  Sparkles
} from 'lucide-react';
import type { GabaritType, TabType } from './types';
import bannerExcellenceImg from '../../assets/images/Banner excellence.jpg';
import carteKpisImg from '../../assets/images/excellence_cartes.webp';
import { HOLES_DATA, HOLES_DATA_9, HOLES_DATA_12_INTL, HOLES_DATA_9_INTL } from './data';
import { getExplosifsData } from './explosifsCalc';

interface SectionHubModalProps {
  gabarit: GabaritType;
  onSelectTab: (tab: TabType) => void;
  onBack: () => void;
  onOpenFormation?: (gabarit: GabaritType) => void;
}

interface HubActionItem {
  id: TabType | 'formation_direct';
  tabTarget: TabType;
  title: string;
  subtitle: string;
  badge: string;
  icon: React.ElementType;
  iconColor: string;
  bgGlow: string;
  isFormation?: boolean;
}

export const SectionHubModal: React.FC<SectionHubModalProps> = ({
  gabarit,
  onSelectTab,
  onBack,
}) => {
  const getGabaritTitle = () => {
    switch (gabarit) {
      case '12m2':
        return {
          name: '12 m² — Gabarit SMI',
          sub: 'Configuration terrain CHANTIER MINIER (X) • 42 Trous',
          badge: '⚙️ GABARIT STANDARD SMI',
          holes: HOLES_DATA,
        };
      case '12m2_intl':
        return {
          name: '12 m² — Standard International',
          sub: 'Standard Langefors-Kihlström 1963 • 41 Trous',
          badge: '🌍 STANDARD INTERNATIONAL',
          holes: HOLES_DATA_12_INTL,
        };
      case '9m2':
        return {
          name: '9 m² — Traçage SMI',
          sub: 'Optimisation Galerie Réduite • 36 Trous',
          badge: '🔹 TRAÇAGE 9M² SMI',
          holes: HOLES_DATA_9,
        };
      case '9m2_intl':
        return {
          name: '9 m² — Traçage International',
          sub: 'Standard Suédois 1963 • 34 Trous',
          badge: '🌐 TRAÇAGE 9M² INTL',
          holes: HOLES_DATA_9_INTL,
        };
    }
  };

  const info = getGabaritTitle();
  const expl = getExplosifsData(gabarit, '1.8');

  const hubActions: HubActionItem[] = [
    {
      id: 'schema',
      tabTarget: 'schema',
      title: 'Plan de Tir Interactif',
      subtitle: 'Étages de détonation, micro-retards (D0 à D12), foration & répartition spatiale.',
      badge: 'VUE 2D HAUTE PRÉCISION',
      icon: Target,
      iconColor: 'text-amber-400',
      bgGlow: 'from-amber-500/10 to-yellow-500/5',
    },
    {
      id: 'vue3d',
      tabTarget: 'vue3d',
      title: 'VUE 3D Schéma',
      subtitle: 'Perspective isométrique, cône de projection et volume de galerie excavée.',
      badge: 'IMMERSION 3D VOLUMÉTRIQUE',
      icon: Box,
      iconColor: 'text-cyan-400',
      bgGlow: 'from-cyan-500/10 to-blue-500/5',
    },
    {
      id: 'drilling',
      tabTarget: 'drilling',
      title: 'Guide de Forage 3D',
      subtitle: 'Positionnement du Jumbo, angles d’attaque, parallélisme et règles d’évitement.',
      badge: 'GUIDAGE JUMBO & BRAS',
      icon: Compass,
      iconColor: 'text-emerald-400',
      bgGlow: 'from-emerald-500/10 to-teal-500/5',
    },
    {
      id: 'explosifs',
      tabTarget: 'explosifs',
      title: 'Inventaire Explosifs',
      subtitle: 'Répartition cartouches Tovex, métrage mèche, charge ANFO et amorçage.',
      badge: 'CHARGES & PLANS D’AMORÇAGE',
      icon: Flame,
      iconColor: 'text-rose-400',
      bgGlow: 'from-rose-500/10 to-red-500/5',
    },
    {
      id: 'bourrage',
      tabTarget: 'bourrage',
      title: 'Étanchéité & Bourrage',
      subtitle: 'Normes de confinement, qualité du bourrage argile/sable et sécurité anti-soufflage.',
      badge: 'CONFINEMENT & SÉCURITÉ',
      icon: ShieldCheck,
      iconColor: 'text-purple-400',
      bgGlow: 'from-purple-500/10 to-indigo-500/5',
    },
    {
      id: 'calculs',
      tabTarget: 'calculs',
      title: 'Prévisions & Rentabilité',
      subtitle: 'Rendement d’avancement, taux d’arrachement, coûts explosifs et volume abattu.',
      badge: 'MÉTRIQUES ÉCONOMIQUES',
      icon: TrendingUp,
      iconColor: 'text-blue-400',
      bgGlow: 'from-blue-500/10 to-sky-500/5',
    },
    {
      id: 'ingenierie',
      tabTarget: 'ingenierie',
      title: 'Académie SMI & Certification',
      subtitle: 'Diaporama plein écran interactif, simulateur de tir pas-à-pas et certificat officiel.',
      badge: 'FORMATION CONTINUE & CERTIFICAT',
      icon: GraduationCap,
      iconColor: 'text-amber-300',
      bgGlow: 'from-amber-500/20 to-yellow-400/10',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">
      {/* HEADER BANNER WITH GABARIT DETAILS */}
      <div className="p-6 md:p-8 rounded-3xl border border-amber-500/30 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{ backgroundImage: `url(${bannerExcellenceImg})` }}
        />
        
        <div className="relative z-10 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-3 bg-slate-900/80 hover:bg-slate-900 rounded-2xl border border-amber-400/40 transition-all text-amber-300 flex items-center justify-center cursor-pointer group shadow-lg"
            title="Retour à la sélection des sections de galeries"
          >
            <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
          </button>
          
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase text-amber-300 tracking-widest bg-slate-950/80 px-2.5 py-0.5 rounded-lg border border-amber-400/30">
                {info.badge}
              </span>
              <span className="text-[10px] text-amber-200 font-mono font-bold">
                {expl.totalHoles} TROUS • Ø 38-102 mm
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-wider text-white flex items-center gap-2.5 drop-shadow-md">
              <Layers className="w-6 h-6 text-amber-400 shrink-0" />
              {info.name}
            </h1>
            <p className="text-xs text-amber-100/90 font-medium mt-0.5">
              {info.sub}
            </p>
          </div>
        </div>

        {/* Action Directe & Badge */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-slate-900/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#ffd700]/40 shadow-lg text-right hidden sm:block">
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block">ANFO / TOVEX TOTAL</span>
            <span className="text-sm font-black text-amber-300 font-mono">
              {expl.anfoKgTotal} kg / {expl.tovexKgTotal} kg
            </span>
          </div>
          <button
            onClick={() => onSelectTab('schema')}
            className="px-4 py-3 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl flex items-center gap-2 shadow-xl transition-all cursor-pointer"
          >
            Ouvrir Dossier de Tir
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* QUICK SUMMARY BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl shadow-lg border-2 border-amber-500/40 relative overflow-hidden flex flex-col justify-between text-center bg-slate-950">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
            style={{ backgroundImage: `url(${carteKpisImg})`, filter: 'contrast(1.15) brightness(0.95)' }}
          />
          <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />
          <div className="relative z-10 space-y-0.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">SECTION THÉORIQUE</span>
            <div className="text-xl sm:text-2xl font-black text-white drop-shadow-[0_3px_6px_rgba(0,0,0,1)]">
              {gabarit.startsWith('9m2') ? '9.0' : '12.0'} <span className="text-xs font-black text-amber-300">m²</span>
            </div>
            <span className="text-[9px] text-slate-100 font-bold block drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">Profil fer à cheval</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl shadow-lg border-2 border-amber-500/40 relative overflow-hidden flex flex-col justify-between text-center bg-slate-950">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
            style={{ backgroundImage: `url(${carteKpisImg})`, filter: 'contrast(1.15) brightness(0.95)' }}
          />
          <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />
          <div className="relative z-10 space-y-0.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">TOTAL FORATION</span>
            <div className="text-xl sm:text-2xl font-black text-white drop-shadow-[0_3px_6px_rgba(0,0,0,1)]">
              {expl.totalHoles} <span className="text-xs font-black text-amber-300">Trous</span>
            </div>
            <span className="text-[9px] text-slate-100 font-bold block drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">{expl.amorces} Amorces</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl shadow-lg border-2 border-amber-500/40 relative overflow-hidden flex flex-col justify-between text-center bg-slate-950">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
            style={{ backgroundImage: `url(${carteKpisImg})`, filter: 'contrast(1.15) brightness(0.95)' }}
          />
          <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />
          <div className="relative z-10 space-y-0.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">AVANCEMENT VOLÉE</span>
            <div className="text-xl sm:text-2xl font-black text-white drop-shadow-[0_3px_6px_rgba(0,0,0,1)]">
              1.7 / 2.3 <span className="text-xs font-black text-amber-300">m</span>
            </div>
            <span className="text-[9px] text-slate-100 font-bold block drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">Tiges 1.8m ou 2.4m</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl shadow-lg border-2 border-amber-500/40 relative overflow-hidden flex flex-col justify-between text-center bg-slate-950">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
            style={{ backgroundImage: `url(${carteKpisImg})`, filter: 'contrast(1.15) brightness(0.95)' }}
          />
          <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />
          <div className="relative z-10 space-y-0.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">SÉLECTION PAR DÉFAUT</span>
            <div className="text-xl sm:text-2xl font-black text-white drop-shadow-[0_3px_6px_rgba(0,0,0,1)]">
              7 <span className="text-xs font-black text-amber-300">Modules</span>
            </div>
            <span className="text-[9px] text-slate-100 font-bold block drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">Dossier technique complet</span>
          </div>
        </div>
      </div>

      {/* SECTION HUB GRID CARDS */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h2 className="text-base md:text-lg font-black uppercase tracking-wider text-slate-900">
              Choisissez un module pour {info.name}
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Accès direct aux outils métier
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {hubActions.map((action, idx) => {
            const Icon = action.icon;
            const isFeatured = action.id === 'ingenierie' || action.id === 'schema';
            return (
              <motion.div
                key={action.id}
                onClick={() => onSelectTab(action.tabTarget)}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04, duration: 0.25 }}
                whileHover={{ y: -5, scale: 1.015 }}
                className={`group cursor-pointer rounded-3xl p-6 border-2 transition-all relative overflow-hidden flex flex-col justify-between min-h-[200px] shadow-sm hover:shadow-xl ${
                  isFeatured 
                    ? 'border-amber-400/80 bg-gradient-to-br from-amber-50/50 via-white to-white' 
                    : 'border-slate-200 hover:border-amber-400/70 bg-white'
                }`}
              >
                {/* Top colored accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 opacity-80 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="p-3 rounded-2xl bg-slate-950 text-white border border-slate-800 shadow-md group-hover:border-amber-400/60 transition-colors">
                      <Icon className={`w-6 h-6 ${action.iconColor}`} />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 group-hover:bg-amber-50 group-hover:text-amber-800 group-hover:border-amber-200 transition-colors">
                      {action.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-black text-slate-900 group-hover:text-amber-600 transition-colors tracking-tight">
                      {action.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1 line-clamp-2">
                      {action.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-800 group-hover:text-slate-950">
                  <span className="text-[10px] text-amber-600 font-black">Accéder à l'onglet</span>
                  <div className="w-8 h-8 rounded-xl bg-slate-900 group-hover:bg-amber-500 text-white group-hover:text-slate-950 flex items-center justify-center transition-colors shadow-sm">
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
