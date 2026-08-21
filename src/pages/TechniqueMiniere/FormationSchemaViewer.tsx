import React, { useState } from 'react';
import { HOLES_DATA, HOLES_DATA_9, HOLES_DATA_12_INTL, HOLES_DATA_9_INTL } from './data';
import type { GabaritType, HoleInfo } from './types';

export type FormationBlastStep = 'tous' | 'bouchon' | 'g1' | 'g2' | 'g3' | 'g4' | 'radier_parements' | 'voute';

interface FormationSchemaViewerProps {
  gabarit: GabaritType;
  highlightStep: FormationBlastStep;
  className?: string;
  onSelectHole?: (hole: HoleInfo | null) => void;
}

// Reproduit exactement la logique de SchemaTab.tsx — source de vérité identique, sans dupliquer le composant complet
// Palette officielle par groupe de délai — alignée sur Step5DetonationSequence.tsx
export const STEP_COLORS: Record<FormationBlastStep, string> = {
  tous: '#64748b',
  bouchon: '#facc15',
  g1: '#3b82f6',
  g2: '#ef4444',
  g3: '#06b6d4',
  g4: '#f97316',
  radier_parements: '#8b5cf6',
  voute: '#ffd700',
};

export const STEP_DELAYS_MS: Record<FormationBlastStep, string> = {
  tous: 'Séquence complète (0 - 1000 ms)',
  bouchon: '0 ms (Détonateurs D0 Instantanés)',
  g1: '25 ms (1er Carré LP/MS)',
  g2: '50 ms (2ème Carré)',
  g3: '100 - 150 ms (3ème Carré)',
  g4: '200 - 250 ms (4ème Carré)',
  radier_parements: '350 - 500 ms (Sole & Flancs)',
  voute: '750 - 1000 ms (Couronne finale)',
};

export const getStepGroup = (hole: HoleInfo, gab: GabaritType): FormationBlastStep => {
  if (hole.type === 'vide') return 'tous';
  const is9 = gab.startsWith('9m2');
  if (hole.type === 'charge') return 'bouchon';
  if (hole.type === 'g1') return 'g1';
  if (hole.type === 'g2') return 'g2';
  if (hole.type === 'g3') return 'g3';
  if (!is9 && hole.type === 'g4') return 'g4';
  if (hole.type === 'radier' || hole.type === 'parement') return 'radier_parements';
  return 'voute';
};

export const FormationSchemaViewer: React.FC<FormationSchemaViewerProps> = ({ gabarit, highlightStep, className, onSelectHole }) => {
  const [hoveredHole, setHoveredHole] = useState<HoleInfo | null>(null);

  const holes: HoleInfo[] =
    gabarit === '9m2' ? HOLES_DATA_9 :
    gabarit === '9m2_intl' ? HOLES_DATA_9_INTL :
    gabarit === '12m2_intl' ? HOLES_DATA_12_INTL :
    HOLES_DATA;

  const handleMouseEnter = (hole: HoleInfo) => {
    setHoveredHole(hole);
    if (onSelectHole) onSelectHole(hole);
  };

  const handleMouseLeave = () => {
    setHoveredHole(null);
    if (onSelectHole) onSelectHole(null);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <svg viewBox="0 0 1000 800" className={className || 'w-full h-full max-h-64'}>
        <defs>
          <filter id="glow-shockwave" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Tunnel Section Outline Guide */}
        <path
          d="M 280 620 L 720 620 L 720 380 A 220 220 0 0 0 280 380 Z"
          fill="none"
          stroke="#334155"
          strokeWidth="2"
          strokeDasharray="6,6"
          opacity="0.4"
        />

        {holes.map(hole => {
          const isVide = hole.type === 'vide';
          const stepGroup = getStepGroup(hole, gabarit);
          const isActive = highlightStep === 'tous' || stepGroup === highlightStep;
          const isHovered = hoveredHole?.id === hole.id;
          const isDone = highlightStep !== 'tous' && (() => {
            const order: FormationBlastStep[] = ['bouchon', 'g1', 'g2', 'g3', 'g4', 'radier_parements', 'voute'];
            const activeIdx = order.indexOf(highlightStep);
            const holeIdx = order.indexOf(stepGroup);
            return holeIdx !== -1 && holeIdx < activeIdx;
          })();

          const opacity = isVide ? 0.35 : isActive ? 1 : isDone ? 0.35 : 0.15;
          const stepColor = STEP_COLORS[stepGroup] || STEP_COLORS.tous;
          const fill = isVide ? '#94a3b8' : isActive ? stepColor : '#64748b';
          const radius = isVide ? 8 : (isActive || isHovered) ? 11 : 9;

          return (
            <g
              key={hole.id}
              opacity={opacity}
              className="cursor-pointer transition-all duration-300"
              onMouseEnter={() => handleMouseEnter(hole)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Glowing aura for active holes */}
              {isActive && !isVide && (
                <>
                  <circle
                    cx={hole.x}
                    cy={hole.y}
                    r={26}
                    fill={stepColor}
                    opacity={0.3}
                    filter="url(#glow-shockwave)"
                  />
                  <circle
                    cx={hole.x}
                    cy={hole.y}
                    r={18}
                    fill="none"
                    stroke={stepColor}
                    strokeWidth={1.5}
                    opacity={0.7}
                  />
                </>
              )}

              {/* Hover Highlight Ring */}
              {isHovered && (
                <circle
                  cx={hole.x}
                  cy={hole.y}
                  r={22}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth={2.5}
                  strokeDasharray="4,3"
                />
              )}

              {/* Core Hole Circle */}
              <circle
                cx={hole.x}
                cy={hole.y}
                r={radius}
                fill={fill}
                stroke={isActive || isHovered ? '#ffffff' : '#1e293b'}
                strokeWidth={isActive || isHovered ? 2.5 : 1}
              />

              {/* Label inside Hole */}
              <text
                x={hole.x}
                y={hole.y + 4}
                textAnchor="middle"
                fontSize={isVide ? "11" : "10"}
                fontWeight="900"
                fill={isVide ? "#0f172a" : "#0f172a"}
                pointerEvents="none"
              >
                {hole.label || (isVide ? 'V' : '')}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating Hole Info Inspector Tooltip */}
      {hoveredHole && (
        <div className="absolute bottom-2 left-2 right-2 bg-slate-900/95 backdrop-blur-md text-white p-2.5 rounded-xl border border-amber-400/60 shadow-2xl flex items-center justify-between text-xs z-30 pointer-events-none transition-all">
          <div className="flex items-center gap-2.5">
            <span
              className="w-3.5 h-3.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: hoveredHole.type === 'vide' ? '#94a3b8' : STEP_COLORS[getStepGroup(hoveredHole, gabarit)] }}
            />
            <div>
              <p className="font-black text-amber-300 text-xs leading-tight">
                {hoveredHole.name}
              </p>
              <p className="text-[11px] text-slate-300">
                {hoveredHole.desc || `Étage: ${getStepGroup(hoveredHole, gabarit).toUpperCase()}`}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono bg-slate-800 text-amber-300 px-2 py-1 rounded border border-slate-700 whitespace-nowrap">
            {hoveredHole.type === 'vide' ? 'Ø 102mm Non Chargé' : `Délai: ${hoveredHole.delay || 0}ms`}
          </span>
        </div>
      )}
    </div>
  );
};

