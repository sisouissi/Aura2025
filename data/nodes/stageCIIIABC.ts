
import { NodeData } from '../../types';

export const STAGE_CIIIABC_NODES: Record<string, NodeData> = {
  'cIIIA-B-C_entry': {
    id: 'cIIIA-B-C_entry',
    question: {
      text: "Quel est l'état général du patient ?",
      options: [
        { label: 'PS 0/1 et Âge ≤ 70 ans (option < 75 ans)', nextNodeId: 'cIIIA-B-C_PS01_young', breadcrumbLabel: 'PS 0/1, ≤70 ans' },
        { label: 'PS 2 ou Âge > 70 ans', nextNodeId: 'cIIIA-B-C_PS2_old', breadcrumbLabel: 'PS 2 ou >70 ans' },
      ],
    },
  },
  'cIIIA-B-C_PS01_young': {
    id: 'cIIIA-B-C_PS01_young',
    recommendationBlocks: [
      {
        title: 'Association chimioradiothérapie concomitante',
        items: [
          { title: 'Protocoles recommandés', detailsArray: [{text: '• Cisplatine vinorelbine<br>• Carboplatine paclitaxel'}] },
        ],
        accentColorClass: 'border-l-sky-600',
        backgroundColorClass: 'bg-sky-50',
        titleColorClass: 'text-sky-800',
        textColorClass: 'text-slate-700',
      },
    ],
    question: {
      text: 'Le patient est-il non progressif après radio-chimiothérapie et PS ≤ 1 ?',
      options: [
        { label: 'Oui, non progressif', nextNodeId: 'cIIIA-B-C_postRCT_non_progressive', breadcrumbLabel: 'Non progressif' },
        { label: 'Non, progressif ou PS > 1', nextNodeId: 'cIIIA-B-C_postRCT_progressive', breadcrumbLabel: 'Progressif/PS>1' },
      ],
    },
  },
  'cIIIA-B-C_PS2_old': {
    id: 'cIIIA-B-C_PS2_old',
    recommendationBlocks: [
      {
        title: 'Association chimioradiothérapie séquentielle',
        items: [
          { title: 'Protocole recommandé', detailsArray: [{text: 'Carboplatine paclitaxel'}] },
        ],
        accentColorClass: 'border-l-sky-600',
        backgroundColorClass: 'bg-sky-50',
        titleColorClass: 'text-sky-800',
        textColorClass: 'text-slate-700',
      },
    ],
    question: {
      text: 'Le patient est-il non progressif après radio-chimiothérapie et PS ≤ 1 ?',
      options: [
        { label: 'Oui, non progressif', nextNodeId: 'cIIIA-B-C_postRCT_non_progressive', breadcrumbLabel: 'Non progressif' },
        { label: 'Non, progressif ou PS > 1', nextNodeId: 'cIIIA-B-C_postRCT_progressive', breadcrumbLabel: 'Progressif/PS>1' },
      ],
    },
  },
  'cIIIA-B-C_postRCT_non_progressive': {
    id: 'cIIIA-B-C_postRCT_non_progressive',
    question: {
      text: 'Statut moléculaire ?',
      options: [
        { label: 'EGFR Del19/L858R', nextNodeId: 'cIIIA-B-C_molecular_EGFR', breadcrumbLabel: 'EGFR muté' },
        { label: 'EGFR et ALK WT', nextNodeId: 'cIIIA-B-C_molecular_WT', breadcrumbLabel: 'EGFR/ALK WT' },
      ],
    },
  },
  'cIIIA-B-C_postRCT_progressive': {
    id: 'cIIIA-B-C_postRCT_progressive',
    recommendationBlocks: [
      {
        title: 'Surveillance',
        items: [{ detailsArray: [{text: 'Surveillance clinique et radiologique'}] }],
        accentColorClass: 'border-l-sky-600',
        backgroundColorClass: 'bg-sky-50',
        titleColorClass: 'text-sky-800',
        textColorClass: 'text-slate-700',
      },
    ],
  },
  'cIIIA-B-C_molecular_EGFR': {
    id: 'cIIIA-B-C_molecular_EGFR',
    recommendationBlocks: [
      {
        title: 'Traitement de maintenance - EGFR muté',
        items: [
          { title: 'Osimertinib', detailsArray: [{text: "Jusqu'à progression ou toxicité"}] },
        ],
        accentColorClass: 'border-l-sky-600',
        backgroundColorClass: 'bg-sky-50',
        titleColorClass: 'text-sky-800',
        textColorClass: 'text-slate-700',
      },
    ],
  },
  'cIIIA-B-C_molecular_WT': {
    id: 'cIIIA-B-C_molecular_WT',
    recommendationBlocks: [
      {
        title: 'Traitement de maintenance - EGFR/ALK WT',
        items: [
          { title: 'Durvalumab', detailsArray: [{text: 'Durée : 12 mois<br><em>CPC (Cadre de prescription compassionnel) pour les PDL1 < 1% et inconnus</em>'}] },
        ],
        accentColorClass: 'border-l-sky-600',
        backgroundColorClass: 'bg-sky-50',
        titleColorClass: 'text-sky-800',
        textColorClass: 'text-slate-700',
      },
      {
        isMainWarningBox: true,
        warningStrongText: 'Si contre-indication ou inéligibilité au durvalumab :',
        items:[{detailsArray: [{text: 'Surveillance clinique et radiologique'}]}],
        accentColorClass: 'border-l-amber-500',
        backgroundColorClass: 'bg-amber-50',
        textColorClass: 'text-amber-700',
        titleColorClass: 'text-amber-800'
      },
    ],
  },
};
