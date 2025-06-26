
import { NodeData } from '../../types';

export const APEX_TUMORS_NODES: Record<string, NodeData> = {
  'apex_entry': {
    id: 'apex_entry',
    recommendationBlocks: [
      {
        isMainWarningBox: true,
        warningStrongText: "Tumeurs de l'apex (T3, T4 / PS 0-2)",
        items: [{ detailsArray: [{text: "Tumeurs de Pancoast-Tobias avec envahissement du sulcus supérieur"}] }],
        accentColorClass: 'border-l-amber-500',
        backgroundColorClass: 'bg-amber-50',
        textColorClass: 'text-amber-700',
      }
    ],
    question: {
      text: 'Quel est le statut ganglionnaire ?',
      options: [
        { label: 'cN0/1', nextNodeId: 'apex_cN0-1', breadcrumbLabel: 'cN0/1' },
        { label: 'cN2-3 irradiable', nextNodeId: 'apex_cN2-3', breadcrumbLabel: 'cN2-3 irradiable' },
      ],
    },
  },
  'apex_cN0-1': {
    id: 'apex_cN0-1',
    question: {
      text: 'La tumeur est-elle résécable ?',
      options: [
        { label: 'OUI - Résécable', nextNodeId: 'apex_resectable_yes', breadcrumbLabel: 'Résécable' },
        { label: 'Inconnu', nextNodeId: 'apex_resectable_unknown', breadcrumbLabel: 'Statut inconnu' },
      ],
    },
  },
  'apex_cN2-3': {
    id: 'apex_cN2-3',
    recommendationBlocks: [
      {
        title: 'Référence aux algorithmes stades IIIA-IIIC',
        items: [{ detailsArray: [{text: "Pour les tumeurs de l'apex avec cN2-3 irradiable, se référer aux algorithmes des stades IIIA-IIIC"}] }],
        accentColorClass: 'border-l-sky-600',
        backgroundColorClass: 'bg-sky-50',
        titleColorClass: 'text-sky-800',
        textColorClass: 'text-slate-700',
      },
    ],
  },
  'apex_resectable_yes': {
    id: 'apex_resectable_yes',
    recommendationBlocks: [
      {
        title: 'Options thérapeutiques pour tumeur résécable',
        items: [
          { title: 'Option : Chimio-immunothérapie préopératoire', detailsArray: [{text: '3 cycles de nivolumab et chimiothérapie à base de sels de platine en AAP'}] },
          { title: 'Chirurgie', detailsArray: [{text: 'Résection chirurgicale après traitement néoadjuvant (si applicable)'}] },
        ],
        accentColorClass: 'border-l-sky-600',
        backgroundColorClass: 'bg-sky-50',
        titleColorClass: 'text-sky-800',
        textColorClass: 'text-slate-700',
      },
      {
        isMainWarningBox: true,
        warningStrongText: "En l'absence de traitement pré-opératoire :",
        items: [{detailsArray: [{text: 'Chimiothérapie adjuvante : Cisplatine + Vinorelbine x4 cycles'}]}],
        accentColorClass: 'border-l-amber-500',
        backgroundColorClass: 'bg-amber-50',
        textColorClass: 'text-amber-700',
      }
    ],
  },
  'apex_resectable_unknown': {
    id: 'apex_resectable_unknown',
    recommendationBlocks: [
      {
        title: "Traitement d'induction",
        items: [
          { title: 'Radiothérapie 46 Gy', detailsArray: [{text: 'Avec chimiothérapie concomitante'}] },
        ],
        accentColorClass: 'border-l-sky-600',
        backgroundColorClass: 'bg-sky-50',
        titleColorClass: 'text-sky-800',
        textColorClass: 'text-slate-700',
      },
    ],
    question: {
      text: "Après traitement d'induction, la tumeur est-elle résécable ?",
      options: [
        { label: 'OUI - Devenue résécable', nextNodeId: 'apex_post_induction_resectable_yes', breadcrumbLabel: 'Devenue résécable' },
        { label: 'NON - Toujours non résécable', nextNodeId: 'apex_post_induction_resectable_no', breadcrumbLabel: 'Non résécable' },
      ],
    },
  },
  'apex_post_induction_resectable_yes': {
    id: 'apex_post_induction_resectable_yes',
    recommendationBlocks: [
      {
        title: "Chirurgie après traitement d'induction",
        items: [
          { title: 'Résection chirurgicale', detailsArray: [{text: "Chirurgie de la tumeur de l'apex après radiothérapie d'induction"}] },
          { detailsArray: [{text: '• Poursuite chimiothérapie<br>• Poursuite radiothérapie', isOptionLabel: true}] },
        ],
        accentColorClass: 'border-l-sky-600',
        backgroundColorClass: 'bg-sky-50',
        titleColorClass: 'text-sky-800',
        textColorClass: 'text-slate-700',
      },
    ],
  },
  'apex_post_induction_resectable_no': {
    id: 'apex_post_induction_resectable_no',
    recommendationBlocks: [
      {
        title: 'Options pour tumeur non résécable',
        items: [
          { title: 'Traitements possibles', detailsArray: [{text: '• Poursuite radiothérapie<br>• Poursuite chimiothérapie<br>• 2ème ligne chimiothérapie'}] },
        ],
        accentColorClass: 'border-l-sky-600',
        backgroundColorClass: 'bg-sky-50',
        titleColorClass: 'text-sky-800',
        textColorClass: 'text-slate-700',
      },
    ],
  },
};
