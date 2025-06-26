
import { NodeData, RecommendationBlock, QuestionPayload } from '../../types';

export const STAGE_CI_NODES: Record<string, NodeData> = {
  'cI_entry': {
    id: 'cI_entry',
    question: {
      text: 'Le patient est-il opérable ?',
      options: [
        { label: 'Patient opérable', nextNodeId: 'cI_operable_yes', breadcrumbLabel: 'Patient opérable' },
        { label: 'Patient inopérable', nextNodeId: 'cI_operable_no', breadcrumbLabel: 'Patient inopérable' },
      ],
    },
  },
  'cI_operable_yes': {
    id: 'cI_operable_yes',
    recommendationBlocks: [
      {
        title: 'Traitement chirurgical recommandé',
        items: [
          {
            title: 'Intervention principale',
            detailsArray: [
                {text: '<strong>Lobectomie avec curage ganglionnaire</strong><br>OU<br><strong>Segmentectomie</strong> pour les tumeurs &lt; 2cm sous certaines conditions'}
            ],
          },
        ],
        accentColorClass: 'border-l-sky-600',
        backgroundColorClass: 'bg-sky-50',
        titleColorClass: 'text-sky-800',
        textColorClass: 'text-slate-700',
      },
    ],
    question: {
      text: "Résultat de l'exérèse ?",
      options: [
        { label: 'Exérèse complète', nextNodeId: 'cI_resection_complete', breadcrumbLabel: 'Exérèse complète' },
        { label: 'Exérèse incomplète', nextNodeId: 'cI_resection_incomplete', breadcrumbLabel: 'Exérèse incomplète' },
      ],
    },
  },
  'cI_operable_no': {
    id: 'cI_operable_no',
    recommendationBlocks: [
      {
        title: 'Traitement recommandé pour patient inopérable',
        items: [
          {
            title: 'Radiothérapie stéréotaxique',
            detailsArray: [{text: 'Traitement de choix pour les patients inopérables au stade cI'}],
          },
          {
            detailsArray: [{text: '• Thermo-ablation (dans certains cas sélectionnés)', isOptionLabel: true}],
          },
        ],
        accentColorClass: 'border-l-sky-600',
        backgroundColorClass: 'bg-sky-50',
        titleColorClass: 'text-sky-800',
        textColorClass: 'text-slate-700',
      },
    ],
  },
  'cI_resection_complete': {
    id: 'cI_resection_complete',
    question: {
      text: 'Quel est le stade pathologique ?',
      options: [
        { label: 'pTis, pT1a-c N0 (Stade pIA)', nextNodeId: 'cI_patho_pIA', breadcrumbLabel: 'pIA' },
        { label: 'pT2a, N0 (Stade pIB)', nextNodeId: 'cI_patho_pIB', breadcrumbLabel: 'pIB' },
        { label: 'Découverte pN1/N2 post-op', nextNodeId: 'cI_patho_pN1N2', breadcrumbLabel: 'pN1/N2 post-op' },
      ],
    },
  },
  'cI_resection_incomplete': {
    id: 'cI_resection_incomplete',
    question: {
      text: 'Type de résection incomplète ?',
      options: [
        { label: 'R1', nextNodeId: 'cI_incomplete_R1', breadcrumbLabel: 'R1' },
        { label: 'R2', nextNodeId: 'cI_incomplete_R2', breadcrumbLabel: 'R2' },
      ],
    },
  },
  'cI_patho_pIA': {
    id: 'cI_patho_pIA',
    recommendationBlocks: [
      {
        title: 'Surveillance',
        items: [{ detailsArray: [{text: 'Surveillance clinique et radiologique régulière'}] }],
        accentColorClass: 'border-l-sky-600',
        backgroundColorClass: 'bg-sky-50',
        titleColorClass: 'text-sky-800',
        textColorClass: 'text-slate-700',
      },
    ],
  },
  'cI_patho_pIB': {
    id: 'cI_patho_pIB',
    question: {
      text: "Présence d'une mutation EGFR (Del19, L858R) ?",
      options: [
        { label: 'Oui', nextNodeId: 'cI_pIB_EGFR_yes', breadcrumbLabel: 'EGFR muté' },
        { label: 'Non', nextNodeId: 'cI_pIB_EGFR_no', breadcrumbLabel: 'EGFR non muté' },
      ],
    },
  },
  'cI_patho_pN1N2': {
    id: 'cI_patho_pN1N2',
    recommendationBlocks: [
      {
        title: 'Référence au stade correspondant',
        items: [{ detailsArray: [{text: "Se référer à l'algorithme du stade clinique correspondant à la découverte ganglionnaire"}] }],
        accentColorClass: 'border-l-sky-600',
        backgroundColorClass: 'bg-sky-50',
        titleColorClass: 'text-sky-800',
        textColorClass: 'text-slate-700',
      },
    ],
  },
  'cI_pIB_EGFR_yes': {
    id: 'cI_pIB_EGFR_yes',
    recommendationBlocks: [
      {
        title: 'Traitement adjuvant - EGFR muté',
        items: [
          {
            title: 'Osimertinib',
            detailsArray: [{text: 'Durée : 3 ans<br>Indication : Mutations EGFR Del19 ou L858R'}],
          },
        ],
        accentColorClass: 'border-l-sky-600',
        backgroundColorClass: 'bg-sky-50',
        titleColorClass: 'text-sky-800',
        textColorClass: 'text-slate-700',
      },
    ],
  },
  'cI_pIB_EGFR_no': {
    id: 'cI_pIB_EGFR_no',
    recommendationBlocks: [
      {
        title: 'Discussion en RCP',
        items: [
          {
            detailsArray: [{text: "Discussion en Réunion de Concertation Pluridisciplinaire pour décider de la surveillance ou d'un traitement adjuvant"}],
          },
        ],
        accentColorClass: 'border-l-sky-600',
        backgroundColorClass: 'bg-sky-50',
        titleColorClass: 'text-sky-800',
        textColorClass: 'text-slate-700',
      },
    ],
  },
  'cI_incomplete_R1': {
    id: 'cI_incomplete_R1',
    recommendationBlocks: [
      {
        title: 'Discussion en RCP',
        items: [
          {
            detailsArray: [{text: 'Discussion en Réunion de Concertation Pluridisciplinaire pour évaluer les options thérapeutiques'}],
          },
        ],
        accentColorClass: 'border-l-sky-600',
        backgroundColorClass: 'bg-sky-50',
        titleColorClass: 'text-sky-800',
        textColorClass: 'text-slate-700',
      },
    ],
  },
  'cI_incomplete_R2': {
    id: 'cI_incomplete_R2',
    recommendationBlocks: [
      {
        title: 'Radio-chimiothérapie',
        items: [{ detailsArray: [{text: 'Référence au protocole de traitement du stade IIIA'}] }],
        accentColorClass: 'border-l-sky-600',
        backgroundColorClass: 'bg-sky-50',
        titleColorClass: 'text-sky-800',
        textColorClass: 'text-slate-700',
      },
    ],
  },
};
