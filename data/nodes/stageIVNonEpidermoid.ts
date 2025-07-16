
import { NodeData } from '../../types';

const COMMON_RECS_IV_NON_EPI_HIGH_PDL1_PS01 = {
  title: 'Traitement de première ligne - PD-L1 ≥ 50%, PS 0-1',
  items: [
    { title: 'Immunothérapie en monothérapie (préférentiel)', detailsArray: [{text: '• Atezolizumab²<br>• Cemiplimab²<br>• Pembrolizumab²<br><em>² Poursuivie jusqu\'à progression, toxicité inacceptable, ou jusqu\'à 2 ans</em>'}] },
    { title: 'Alternative : Platine-Pemetrexed¹-Pembrolizumab²', detailsArray: [{text: 'Association chimiothérapie-immunothérapie'}] },
  ],
  accentColorClass: 'border-l-sky-600',
  backgroundColorClass: 'bg-sky-50',
  titleColorClass: 'text-sky-800',
  textColorClass: 'text-slate-700',
};

const COMMON_RECS_IV_NON_EPI_CI_IMMUNO_PS01 = {
  isMainWarningBox: true,
  warningStrongText: "Si contre-indication à l'immunothérapie :",
  items: [
    {
      title: 'Chimiothérapie seule',
      detailsArray: [{text: '• Cisplatine pemetrexed¹<br>• Cisplatine vinorelbine<br>• Cisplatine docetaxel<br>• Cisplatine gemcitabine¹<br>• Carboplatine paclitaxel<br>• Ajout de bevacizumab*¹ (option)<br><em>¹ Suivi d\'une maintenance de continuation après 4 cycles</em>'}]
    }
  ],
  accentColorClass: 'border-l-amber-500',
  backgroundColorClass: 'bg-amber-50',
  textColorClass: 'text-amber-700',
};

const COMMON_RECS_IV_NON_EPI_LOW_PDL1_PS01 = {
    title: 'Traitement de première ligne - PD-L1 < 50%, PS 0-1',
    items: [
      { title: 'Traitement de choix', detailsArray: [{text: '<strong>Platine-Pemetrexed¹-Pembrolizumab²</strong><br>Association chimiothérapie-immunothérapie'}] },
    ],
    accentColorClass: 'border-l-sky-600',
    backgroundColorClass: 'bg-sky-50',
    titleColorClass: 'text-sky-800',
    textColorClass: 'text-slate-700',
};

const COMMON_RECS_IV_NON_EPI_PS2 = {
    title: 'Traitement de première ligne - PS 2',
    items: [
        { title: 'Chimiothérapie adaptée', detailsArray: [{text: '• Carboplatine paclitaxel (J1/22 ou hebdo)<br>• Carboplatine pemetrexed<br>• Carboplatine gemcitabine'}] },
    ],
    accentColorClass: 'border-l-sky-600',
    backgroundColorClass: 'bg-sky-50',
    titleColorClass: 'text-sky-800',
    textColorClass: 'text-slate-700',
};

const COMMON_RECS_IV_NON_EPI_AGE70 = {
    title: 'Traitement de première ligne - Âge ≥ 70 ans',
    items: [
        { title: 'Chimiothérapie adaptée à l\'âge', detailsArray: [{text: '• Carboplatine – paclitaxel hebdomadaire<br><em>Protocole adapté pour les patients âgés</em>'}] },
    ],
    accentColorClass: 'border-l-sky-600',
    backgroundColorClass: 'bg-sky-50',
    titleColorClass: 'text-sky-800',
    textColorClass: 'text-slate-700',
};

const COMMON_RECS_IV_PS_GT2 = {
    title: 'Soins de support',
    items: [{ detailsArray: [{text: 'Prise en charge palliative et soins de confort pour les patients PS > 2'}] }],
    accentColorClass: 'border-l-red-500',
    backgroundColorClass: 'bg-red-50',
    titleColorClass: 'text-red-800',
    textColorClass: 'text-slate-700',
};

export const STAGE_IV_NON_EPIDERMOID_NODES: Record<string, NodeData> = {
  'IV-non-epidermoid_entry': {
    id: 'IV-non-epidermoid_entry',
    recommendationBlocks: [{
      isMainWarningBox: true,
      warningStrongText: "Cancers NON-ÉPIDERMOÏDES de stade cIV SANS altération ciblable",
      items:[{detailsArray: [{text:"Traitement de première ligne"}]}],
      accentColorClass: 'border-l-amber-500',
      backgroundColorClass: 'bg-amber-50',
      textColorClass: 'text-amber-700',
    }],
    question: {
      text: 'Quel est le taux de PD-L1 ?',
      options: [
        { label: 'PD-L1 ≥ 50%', nextNodeId: 'IV-non-epi_pdl1_high_ps_q', breadcrumbLabel: 'PD-L1 ≥ 50%' },
        { label: 'PD-L1 < 50%', nextNodeId: 'IV-non-epi_pdl1_low_ps_q', breadcrumbLabel: 'PD-L1 < 50%' },
      ],
    },
  },
  'IV-non-epi_pdl1_high_ps_q': {
    id: 'IV-non-epi_pdl1_high_ps_q',
    question: {
      text: "Quel est l'état général du patient ?",
      options: [
        { label: 'PS 0-1', nextNodeId: 'IV-non-epi_pdl1_high_ps01', breadcrumbLabel: 'PS 0-1' },
        { label: 'PS 2', nextNodeId: 'IV-non-epi_pdl1_high_ps2', breadcrumbLabel: 'PS 2' },
        { label: 'Âge ≥ 70 ans', nextNodeId: 'IV-non-epi_pdl1_high_age70', breadcrumbLabel: 'Âge ≥70 ans' },
        { label: 'PS > 2', nextNodeId: 'IV-non-epi_ps_gt2', breadcrumbLabel: 'PS > 2' },
      ],
    },
  },
  'IV-non-epi_pdl1_low_ps_q': {
    id: 'IV-non-epi_pdl1_low_ps_q',
    question: {
      text: "Quel est l'état général du patient ?",
      options: [
        { label: 'PS 0-1', nextNodeId: 'IV-non-epi_pdl1_low_ps01', breadcrumbLabel: 'PS 0-1' },
        { label: 'PS 2', nextNodeId: 'IV-non-epi_pdl1_low_ps2', breadcrumbLabel: 'PS 2' },
        { label: 'Âge ≥ 70 ans', nextNodeId: 'IV-non-epi_pdl1_low_age70', breadcrumbLabel: 'Âge ≥70 ans' },
        { label: 'PS > 2', nextNodeId: 'IV-non-epi_ps_gt2', breadcrumbLabel: 'PS > 2' },
      ],
    },
  },
  'IV-non-epi_ps_gt2': {
    id: 'IV-non-epi_ps_gt2',
    recommendationBlocks: [COMMON_RECS_IV_PS_GT2],
  },
  'IV-non-epi_pdl1_high_ps01': {
    id: 'IV-non-epi_pdl1_high_ps01',
    recommendationBlocks: [
        COMMON_RECS_IV_NON_EPI_HIGH_PDL1_PS01,
        COMMON_RECS_IV_NON_EPI_CI_IMMUNO_PS01
    ],
  },
  'IV-non-epi_pdl1_high_ps2': {
    id: 'IV-non-epi_pdl1_high_ps2',
    recommendationBlocks: [
      { ...COMMON_RECS_IV_NON_EPI_PS2, title: 'Traitement de première ligne - PD-L1 ≥ 50%, PS 2'},
      {
        title: 'Options',
        items: [
            { detailsArray: [{text: '• Atezolizumab²<br>• Cemiplimab²<br>• Pembrolizumab²<br>• Monothérapie par gemcitabine, vinorelbine<br>• Ajout de bevacizumab¹'}] },
        ],
        accentColorClass: 'border-l-sky-600',
        backgroundColorClass: 'bg-sky-50',
        titleColorClass: 'text-sky-800',
        textColorClass: 'text-slate-700',
      }
    ],
  },
  'IV-non-epi_pdl1_high_age70': {
    id: 'IV-non-epi_pdl1_high_age70',
    recommendationBlocks: [
      { ...COMMON_RECS_IV_NON_EPI_AGE70, title: 'Traitement de première ligne - PD-L1 ≥ 50%, Âge ≥ 70 ans'},
      {
        title: 'Si PS 0-1',
        items: [ { detailsArray: [{text: '• Atezolizumab, cemiplimab ou pembrolizumab²<br>• Patients sélectionnés avec PS 0-1 : Carboplatine-pemetrexed¹-pembrolizumab²'}]} ],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
      },
      {
        title: 'Options',
        items: [ { detailsArray: [{text: '• Monothérapie par gemcitabine, vinorelbine<br>• Autres doublets à base de platine<br>• Ajout de bevacizumab¹'}]} ],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
      }
    ],
  },
    'IV-non-epi_pdl1_low_ps01': {
    id: 'IV-non-epi_pdl1_low_ps01',
    recommendationBlocks: [
      COMMON_RECS_IV_NON_EPI_LOW_PDL1_PS01,
      { ...COMMON_RECS_IV_NON_EPI_CI_IMMUNO_PS01, 
        items: [{
          ...COMMON_RECS_IV_NON_EPI_CI_IMMUNO_PS01.items[0],
          detailsArray: [{text: COMMON_RECS_IV_NON_EPI_CI_IMMUNO_PS01.items[0].detailsArray[0].text + '<br><em>*Option : Double maintenance de continuation par bevacizumab-pemetrexed jusqu\'à progression ou toxicité inacceptable</em>'}]
        }]
      }
    ],
  },
  'IV-non-epi_pdl1_low_ps2': {
    id: 'IV-non-epi_pdl1_low_ps2',
    recommendationBlocks: [
      { ...COMMON_RECS_IV_NON_EPI_PS2, title: 'Traitement de première ligne - PD-L1 < 50%, PS 2'},
      {
        title: 'Options',
        items: [ { detailsArray: [{text: '• Monothérapie par gemcitabine, vinorelbine<br>• Ajout bevacizumab¹'}]} ],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
      }
    ],
  },
  'IV-non-epi_pdl1_low_age70': {
    id: 'IV-non-epi_pdl1_low_age70',
    recommendationBlocks: [
      { ...COMMON_RECS_IV_NON_EPI_AGE70, title: 'Traitement de première ligne - PD-L1 < 50%, Âge ≥ 70 ans'},
      {
        title: 'Patients sélectionnés avec PS 0-1',
        items: [ { detailsArray: [{text: 'Carboplatine-pemetrexed¹-pembrolizumab²'}]} ],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
      },
      {
        title: 'Options',
        items: [ { detailsArray: [{text: '• Monothérapie par gemcitabine, vinorelbine<br>• Autres doublets à base de platine<br>• Ajout de bevacizumab¹'}]} ],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
      }
    ],
  },
};
