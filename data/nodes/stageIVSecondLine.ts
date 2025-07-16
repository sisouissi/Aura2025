
import { NodeData } from '../../types';

export const STAGE_IV_SECOND_LINE_NODES: Record<string, NodeData> = {
  'IV-second-line_entry': {
    id: 'IV-second-line_entry',
    recommendationBlocks: [{
      isMainWarningBox: true,
      warningStrongText: "SECONDE LIGNE de CBNPC DE STADE cIV",
      items:[{detailsArray: [{text:"Tous types histologiques"}]}],
      accentColorClass: 'border-l-amber-500', backgroundColorClass: 'bg-amber-50', textColorClass: 'text-amber-700',
    }],
    question: {
      text: "Quel est l'état général du patient ?",
      options: [
        { label: 'PS 0-2', nextNodeId: 'IV-second-line_ps0-2', breadcrumbLabel: 'PS 0-2' },
        { label: 'PS > 2', nextNodeId: 'IV-second-line_ps_gt2', breadcrumbLabel: 'PS > 2' },
      ],
    },
  },
  'IV-second-line_ps_gt2': {
    id: 'IV-second-line_ps_gt2',
    recommendationBlocks: [{
      title: 'Soins de support',
      items: [{ detailsArray: [{text: 'Prise en charge palliative et soins de confort pour les patients PS > 2'}] }],
      accentColorClass: 'border-l-red-500', backgroundColorClass: 'bg-red-50', titleColorClass: 'text-red-800', textColorClass: 'text-slate-700',
    }],
  },
  'IV-second-line_ps0-2': {
    id: 'IV-second-line_ps0-2',
    question: {
      text: 'Quel traitement a été reçu en première ligne ?',
      options: [
        { label: 'Chimiothérapie + immunothérapie', nextNodeId: 'IV-second-line_after_chemo_immuno', breadcrumbLabel: 'Chimio + immunothérapie' },
        { label: 'Immunothérapie seule', nextNodeId: 'IV-second-line_after_immuno_only_ps_q', breadcrumbLabel: 'Immunothérapie seule' },
        { label: 'Chimiothérapie seule', nextNodeId: 'IV-second-line_after_chemo_only', breadcrumbLabel: 'Chimiothérapie seule' },
      ],
    },
  },
  'IV-second-line_after_chemo_immuno': {
    id: 'IV-second-line_after_chemo_immuno',
    recommendationBlocks: [
      {
        title: 'Après chimiothérapie + immunothérapie en 1ère ligne',
        items: [
          { title: 'Carcinome Non-Épidermoïde', detailsArray: [{text: '• Pemetrexed<br>• Paclitaxel-bevacizumab'}] },
          { title: 'Toutes histologies', detailsArray: [{text: '• Docetaxel<br>• Essais cliniques<br>• Toute autre molécule après avis de la RCP'}] },
        ],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
      },
    ],
    question: {
        text: "Le patient a-t-il une surexpression de cMET (IHC) ?",
        options: [
            { label: 'Oui - cMET surexprimé', nextNodeId: 'IV-second-line_cMET_yes', breadcrumbLabel: 'cMET surexprimé' },
            { label: 'Non', nextNodeId: 'IV-second-line_cMET_no', breadcrumbLabel: 'cMET non surexprimé' },
        ]
    }
  },
  'IV-second-line_cMET_yes': {
    id: 'IV-second-line_cMET_yes',
     recommendationBlocks: [ // First, repeat the previous recommendations
      {
        title: 'Après chimiothérapie + immunothérapie en 1ère ligne',
        items: [
          { title: 'Carcinome Non-Épidermoïde', detailsArray: [{text: '• Pemetrexed<br>• Paclitaxel-bevacizumab'}] },
          { title: 'Toutes histologies', detailsArray: [{text: '• Docetaxel<br>• Essais cliniques<br>• Toute autre molécule après avis de la RCP'}] },
        ],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
      },
      { // Then add the cMET specific recommendation
        title: 'Option pour cMET surexprimé',
        items: [
          { title: 'Teliso-V en AAC', detailsArray: [{text: "Anticorps conjugué anti-cMET disponible en Autorisation d'Accès Compassionnel (AAC)"}] },
        ],
        accentColorClass: 'border-l-sky-500', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
      },
    ],
  },
  'IV-second-line_cMET_no': { // If cMET no, just means no additional option, the previous recommendation stands.
    id: 'IV-second-line_cMET_no',
     recommendationBlocks: [
      {
        title: 'Après chimiothérapie + immunothérapie en 1ère ligne (cMET non surexprimé)',
        items: [
          { title: 'Carcinome Non-Épidermoïde', detailsArray: [{text: '• Pemetrexed<br>• Paclitaxel-bevacizumab'}] },
          { title: 'Toutes histologies', detailsArray: [{text: '• Docetaxel<br>• Essais cliniques<br>• Toute autre molécule après avis de la RCP'}] },
        ],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
      },
    ],
  },
  'IV-second-line_after_immuno_only_ps_q': {
    id: 'IV-second-line_after_immuno_only_ps_q',
    question: {
      text: "Quel est l'état général du patient ?",
      options: [
        { label: 'PS 0-1', nextNodeId: 'IV-second-line_after_immuno_ps01', breadcrumbLabel: 'PS 0-1' },
        { label: 'PS 2', nextNodeId: 'IV-second-line_after_immuno_ps2', breadcrumbLabel: 'PS 2' },
        { label: 'Âge ≥ 70 ans', nextNodeId: 'IV-second-line_after_immuno_age70_q', breadcrumbLabel: 'Âge ≥70 ans' },
      ],
    },
  },
  'IV-second-line_after_chemo_only': {
    id: 'IV-second-line_after_chemo_only',
    recommendationBlocks: [
      {
        title: 'Après chimiothérapie seule en 1ère ligne',
        items: [
          { title: 'Immunothérapie', detailsArray: [{text: '• Atezolizumab<br>• Nivolumab<br>• Pembrolizumab si PDL1 ≥ 1%'}] },
        ],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
      },
    ],
  },
  'IV-second-line_after_immuno_ps01': {
    id: 'IV-second-line_after_immuno_ps01',
    recommendationBlocks: [
      {
        title: 'Après immunothérapie seule - PS 0-1',
        items: [
          { title: 'Toutes histologies', detailsArray: [{text: '• Cisplatine vinorelbine<br>• Cisplatine docetaxel<br>• Cisplatine gemcitabine¹<br>• Carboplatine paclitaxel'}] },
          { title: 'Carcinome Non-Épidermoïde', detailsArray: [{text: '• Cisplatine pemetrexed¹<br>  + bevacizumab*¹<br><br><em>¹ Suivie d\'une maintenance de continuation après 4 cycles de platine jusqu\'à progression ou toxicité inacceptable (en option pour gemcitabine)</em><br><em>*Option : Double maintenance de continuation par bevacizumab-pemetrexed jusqu\'à progression ou toxicité inacceptable</em>'}] },
        ],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
      },
    ],
  },
  'IV-second-line_after_immuno_ps2': {
    id: 'IV-second-line_after_immuno_ps2',
    recommendationBlocks: [
      {
        title: 'Après immunothérapie seule - PS 2',
        items: [
          { title: 'Toutes histologies', detailsArray: [{text: '• Carboplatine paclitaxel (J1/22 ou hebdo)<br>• Carboplatine gemcitabine'}] },
          { title: 'Carcinome Non-Épidermoïde', detailsArray: [{text: '• Carboplatine pemetrexed'}] },
          { title: 'Options', detailsArray: [{text: '• Monothérapie par gemcitabine, vinorelbine<br>• Ajout bevacizumab¹²<br><em>¹ Suivie d\'une maintenance de continuation après 4 cycles de platine jusqu\'à progression ou toxicité inacceptable (en option pour gemcitabine)</em><br><em>² Uniquement dans les non-épidermoïdes</em>'}] },
        ],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
      },
    ],
  },
  'IV-second-line_after_immuno_age70_q': {
    id: 'IV-second-line_after_immuno_age70_q',
    recommendationBlocks: [
        {
            title: 'Après immunothérapie seule - Âge ≥ 70 ans',
            items: [], // No specific items, title serves as context
            accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
        }
    ],
    question: {
        text: 'Choisir entre deux options thérapeutiques :',
        options: [
            {label: 'Immunothérapie', nextNodeId: 'IV-second-line_after_immuno_age70_opt_immuno', breadcrumbLabel: 'Immunothérapie (≥70a)'},
            {label: 'Chimiothérapie', nextNodeId: 'IV-second-line_after_immuno_age70_opt_chemo', breadcrumbLabel: 'Chimiothérapie (≥70a)'}
        ]
    }
  },
  'IV-second-line_after_immuno_age70_opt_immuno': {
    id: 'IV-second-line_after_immuno_age70_opt_immuno',
    recommendationBlocks: [
      {
        title: 'Immunothérapie pour patients ≥ 70 ans (après immunothérapie seule en 1L)',
        items: [
          { detailsArray: [{text: '• Atezolizumab<br>• Nivolumab<br>• Pembrolizumab si PDL1 ≥ 1%'}] },
        ],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
      },
    ],
  },
  'IV-second-line_after_immuno_age70_opt_chemo': {
    id: 'IV-second-line_after_immuno_age70_opt_chemo',
    recommendationBlocks: [
      {
        title: 'Chimiothérapie pour patients ≥ 70 ans (après immunothérapie seule en 1L)',
        items: [
          { title: 'Protocole principal', detailsArray: [{text: '• Carboplatine – paclitaxel hebdomadaire'}] },
          { title: 'Toutes histologies', detailsArray: [{text: '• Carboplatine paclitaxel (J1/22 ou hebdo)<br>• Carboplatine gemcitabine'}] },
          { title: 'Carcinome Non-Épidermoïde', detailsArray: [{text: '• Carboplatine pemetrexed'}] },
          { title: 'Options', detailsArray: [{text: '• Monothérapie<br>• Autres doublets à base de platine<br>• Ajout bevacizumab¹²<br><br><em>¹ Suivie d\'une maintenance de continuation après 4 cycles de platine jusqu\'à progression ou toxicité inacceptable (en option pour gemcitabine)</em><br><em>² Uniquement dans les non-épidermoïdes</em>'}] },
        ],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
      },
    ],
  }
};
