
import { NodeData, RecommendationBlock } from '../../types';

export const STAGE_CII_CIIIB_NODES: Record<string, NodeData> = {
  'cII-cIIIB_entry': {
    id: 'cII-cIIIB_entry',
    question: {
      text: 'Le patient est-il résécable et opérable ?',
      options: [
        { label: 'Résécable et opérable', nextNodeId: 'cII-cIIIB_resectable', breadcrumbLabel: 'Résécable et opérable' },
        { label: 'Non opérable (Stades II)', nextNodeId: 'cII-cIIIB_non_operable_II', breadcrumbLabel: 'Non opérable (Stade II)' },
        { label: 'Non éligible à la chirurgie (Stades III)', nextNodeId: 'cII-cIIIB_non_eligible_III', breadcrumbLabel: 'Non éligible chirurgie (Stade III)' },
      ],
    },
  },
  'cII-cIIIB_resectable': {
    id: 'cII-cIIIB_resectable',
    question: {
      text: 'Statut moléculaire du patient ?',
      options: [
        { label: 'PDL1 < 1% (EGFR/ALK WT)', nextNodeId: 'cII-cIIIB_PDL1_low', breadcrumbLabel: 'PDL1 < 1%' },
        { label: 'PDL1 ≥ 1% (EGFR et ALK WT)', nextNodeId: 'cII-cIIIB_PDL1_high', breadcrumbLabel: 'PDL1 ≥ 1%' },
        { label: 'EGFR Del19/L858R', nextNodeId: 'cII-cIIIB_EGFR', breadcrumbLabel: 'EGFR Del19/L858R' },
        { label: 'ALK réarrangé', nextNodeId: 'cII-cIIIB_ALK', breadcrumbLabel: 'ALK réarrangé' },
      ],
    },
  },
  'cII-cIIIB_non_operable_II': {
    id: 'cII-cIIIB_non_operable_II',
    recommendationBlocks: [
      {
        title: 'Radiothérapie en conditions stéréotaxiques',
        items: [{ detailsArray: [{text: 'Traitement recommandé pour les stades II non opérables'}] }],
        accentColorClass: 'border-l-sky-600',
        backgroundColorClass: 'bg-sky-50',
        titleColorClass: 'text-sky-800',
        textColorClass: 'text-slate-700',
      },
    ],
  },
  'cII-cIIIB_non_eligible_III': {
    id: 'cII-cIIIB_non_eligible_III',
    recommendationBlocks: [
      {
        title: 'Référence algorithme stades III',
        items: [{ detailsArray: [{text: "Se référer à l'algorithme spécifique des stades III non éligibles à la chirurgie"}] }],
        accentColorClass: 'border-l-sky-600',
        backgroundColorClass: 'bg-sky-50',
        titleColorClass: 'text-sky-800',
        textColorClass: 'text-slate-700',
      },
    ],
  },
  'cII-cIIIB_PDL1_low': {
    id: 'cII-cIIIB_PDL1_low',
    recommendationBlocks: [
      {
        title: 'Traitement pour PDL1 < 1%',
        items: [
          {
            title: 'Option : Chimiothérapie préopératoire',
            detailsArray: [{text: 'Suivie de chirurgie'}],
          },
        ],
        accentColorClass: 'border-l-sky-600',
        backgroundColorClass: 'bg-sky-50',
        titleColorClass: 'text-sky-800',
        textColorClass: 'text-slate-700',
      },
      {
        isMainWarningBox: true,
        warningStrongText: 'En l\'absence de traitement pré-opératoire :',
        items: [],
        accentColorClass: 'border-l-amber-500',
        backgroundColorClass: 'bg-amber-50',
        textColorClass: 'text-amber-700',
      },
      {
        title: 'Chimiothérapie adjuvante',
        items: [
          { detailsArray: [{text: '• Cisplatine + Vinorelbine x4 cycles'}] },
          { detailsArray: [{text: '• Cisplatine-pemetrexed 4 cycles dans les non-épidermoïdes', isOptionLabel: true}] },
          { detailsArray: [{text: '• Carboplatine-paclitaxel si CI au cisplatine vinorelbine', isOptionLabel: true}] },
        ],
        accentColorClass: 'border-l-sky-600',
        backgroundColorClass: 'bg-sky-50',
        titleColorClass: 'text-sky-800',
        textColorClass: 'text-slate-700',
      },
    ],
  },
    'cII-cIIIB_PDL1_high': {
    id: 'cII-cIIIB_PDL1_high',
    recommendationBlocks: [
      {
        title: 'Traitement pour PDL1 ≥ 1%',
        items: [
          {
            title: 'Chimio-immunothérapie préopératoire',
            detailsArray: [{text: '3 cycles de nivolumab et chimiothérapie à base de sels de platine en AAP<br>Suivie de chirurgie'}],
          },
        ],
        accentColorClass: 'border-l-sky-600',
        backgroundColorClass: 'bg-sky-50',
        titleColorClass: 'text-sky-800',
        textColorClass: 'text-slate-700',
      },
      {
        isMainWarningBox: true,
        warningStrongText: 'En l\'absence de traitement pré-opératoire :',
        items:[],
        accentColorClass: 'border-l-amber-500',
        backgroundColorClass: 'bg-amber-50',
        textColorClass: 'text-amber-700',
      },
      {
        title: 'Chimiothérapie adjuvante',
        items: [
          { detailsArray: [{text: '• Cisplatine + Vinorelbine x4'}]},
          { detailsArray: [{text: '• Cisplatine-pemetrexed 4 cycles dans les non-épidermoïdes', isOptionLabel: true}]},
          { detailsArray: [{text: '• Carboplatine-paclitaxel si CI au cisplatine vinorelbine', isOptionLabel: true}]},
        ],
        accentColorClass: 'border-l-sky-600',
        backgroundColorClass: 'bg-sky-50',
        titleColorClass: 'text-sky-800',
        textColorClass: 'text-slate-700',
      },
    ],
  },
  'cII-cIIIB_EGFR': {
    id: 'cII-cIIIB_EGFR',
    recommendationBlocks: [
      {
        title: 'Traitement pour EGFR Del19/L858R',
        items: [
          { title: 'Option : Chimiothérapie préopératoire', detailsArray: [{text: 'Suivie de chirurgie'}] },
          { title: 'Traitement adjuvant', detailsArray: [{text: '<strong>Osimertinib 3 ans</strong>'}] },
        ],
        accentColorClass: 'border-l-sky-600',
        backgroundColorClass: 'bg-sky-50',
        titleColorClass: 'text-sky-800',
        textColorClass: 'text-slate-700',
      },
       {
        isMainWarningBox: true,
        warningStrongText: 'En l\'absence de traitement pré-opératoire :',
        items:[],
        accentColorClass: 'border-l-amber-500',
        backgroundColorClass: 'bg-amber-50',
        textColorClass: 'text-amber-700',
      },
      {
        title: 'Chimiothérapie adjuvante',
        items: [
          { detailsArray: [{text: '• Cisplatine + Vinorelbine x4'}] },
          { detailsArray: [{text: '• Cisplatine-pemetrexed 4 cycles dans les non-épidermoïdes', isOptionLabel: true}] },
          { detailsArray: [{text: '• Carboplatine-paclitaxel si CI au cisplatine vinorelbine', isOptionLabel: true}] },
        ],
        accentColorClass: 'border-l-sky-600',
        backgroundColorClass: 'bg-sky-50',
        titleColorClass: 'text-sky-800',
        textColorClass: 'text-slate-700',
      },
    ],
  },
  'cII-cIIIB_ALK': {
    id: 'cII-cIIIB_ALK',
    recommendationBlocks: [
      {
        title: 'Traitement pour ALK réarrangé',
        items: [
          { title: 'Chirurgie', detailsArray: [{text: 'Résection chirurgicale'}] },
          { title: 'Traitement adjuvant', detailsArray: [{text: '<strong>Alectinib 2 ans</strong>'}] },
        ],
        accentColorClass: 'border-l-sky-600',
        backgroundColorClass: 'bg-sky-50',
        titleColorClass: 'text-sky-800',
        textColorClass: 'text-slate-700',
      },
    ],
  },
};
