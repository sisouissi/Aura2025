
import { NodeData } from '../../types';

export const STAGE_IV_EGFR_NODES: Record<string, NodeData> = {
  'IV-EGFR_entry': {
    id: 'IV-EGFR_entry',
    recommendationBlocks: [{
      isMainWarningBox: true,
      warningStrongText: "STADES MÉTASTATIQUES AVEC MUTATION ACTIVATRICE DE L'EGFR",
      items:[{detailsArray: [{text:"Traitement de première ligne selon le type de mutation"}]}],
      accentColorClass: 'border-l-amber-500', backgroundColorClass: 'bg-amber-50', textColorClass: 'text-amber-700',
    }],
    question: {
      text: 'Quel type de mutation EGFR ?',
      options: [
        { label: 'G719X, L861Q, S768I, mutations combinées', nextNodeId: 'IV-EGFR_rare', breadcrumbLabel: 'Mutations rares' },
        { label: 'L858R et Del-19', nextNodeId: 'IV-EGFR_common', breadcrumbLabel: 'L858R/Del-19' },
        { label: 'T790M', nextNodeId: 'IV-EGFR_T790M', breadcrumbLabel: 'T790M' },
        { label: "Insertion dans l'exon 20", nextNodeId: 'IV-EGFR_exon20', breadcrumbLabel: 'Insertion exon 20' },
      ],
    },
  },
  'IV-EGFR_rare': {
    id: 'IV-EGFR_rare',
    recommendationBlocks: [
      {
        title: 'Mutations rares (G719X, L861Q, S768I, mutations combinées)',
        items: [
          { title: 'Traitement de première ligne', detailsArray: [{text: '<strong>Afatinib</strong>'}] },
          { title: 'Option', detailsArray: [{text: '• Osimertinib'}] },
        ],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
      },
    ],
    question: {
      text: 'Évolution sous traitement ?',
      options: [{ label: 'Progression', nextNodeId: 'IV-EGFR_afatinib_progression_q', breadcrumbLabel: 'Progression sous Afatinib' }],
    },
  },
  'IV-EGFR_common': {
    id: 'IV-EGFR_common',
    recommendationBlocks: [
      {
        title: 'Mutations communes (L858R et Del-19)',
        items: [
          { title: 'Traitement de première ligne', detailsArray: [{text: '<strong>Osimertinib</strong>'}] },
          { title: 'Options', detailsArray: [{text: '• Platine-Pemetrexed + osimertinib puis maintenance osimertinib-pemetrexed notamment en cas de métastases cérébrales et chez les PS1<br>• OU Amivantamab + Lazertinib (tolérance)'}] },
        ],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
      },
    ],
    question: {
      text: 'Évolution sous osimertinib ?',
      options: [{ label: 'Progression', nextNodeId: 'IV-EGFR_osimertinib_progression_q', breadcrumbLabel: 'Progression sous Osimertinib' }],
    },
  },
  'IV-EGFR_T790M': { // Assuming T790M de novo
    id: 'IV-EGFR_T790M',
    recommendationBlocks: [
      {
        title: 'Mutation T790M',
        items: [
          { title: 'Traitement', detailsArray: [{text: '<strong>Osimertinib si non donné en 1ère ligne</strong>'}] },
        ],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
      },
    ],
    question: {
      text: 'Évolution sous osimertinib ?',
      options: [{ label: 'Progression', nextNodeId: 'IV-EGFR_osimertinib_progression_q', breadcrumbLabel: 'Progression sous Osimertinib (après T790M)' }],
    },
  },
  'IV-EGFR_exon20': {
    id: 'IV-EGFR_exon20',
    recommendationBlocks: [
      {
        title: "Insertion dans l'exon 20",
        items: [
          { title: 'Option', detailsArray: [{text: 'Carboplatine-Pemetrexed + Amivantamab puis maintenance ami-pemetrexed en AAP'}] },
          { title: 'Alternatives', detailsArray: [{text: '• Traitement identique au CBNPC WT<br>• Essais cliniques'}] },
        ],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
      },
    ],
    question: {
      text: 'Évolution sous traitement ?',
      options: [{ label: 'Progression', nextNodeId: 'IV-EGFR_exon20_progression', breadcrumbLabel: 'Progression (Exon 20)' }],
    },
  },
  'IV-EGFR_afatinib_progression_q': {
    id: 'IV-EGFR_afatinib_progression_q',
    question: {
        text: 'Type de progression ?',
        options: [
            { label: 'Évolution multifocale', nextNodeId: 'IV-EGFR_afa_prog_multifocal', breadcrumbLabel: 'Évolution multifocale (Afatinib)'},
            { label: 'Évolution lente', nextNodeId: 'IV-EGFR_afa_prog_slow', breadcrumbLabel: 'Évolution lente (Afatinib)'},
            { label: 'Évolution oligométastatique', nextNodeId: 'IV-EGFR_afa_prog_oligo', breadcrumbLabel: 'Oligométastatique (Afatinib)'},
        ]
    }
  },
  'IV-EGFR_afa_prog_multifocal': {
    id: 'IV-EGFR_afa_prog_multifocal',
    recommendationBlocks: [{
        title: 'Évolution multifocale après afatinib',
        items: [{ title: 'Re-biopsie recommandée', detailsArray: [{text: 'Re-biopsie (tissus ou sang) pour identifier le mécanisme de résistance'}] }],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
    }],
    question: {
        text: 'Résultat de la re-biopsie ?',
        options: [
            { label: 'Mutation T790M acquise', nextNodeId: 'IV-EGFR_rebiopsy_T790M', breadcrumbLabel: 'T790M acquise'},
            { label: 'Autre mécanisme de résistance', nextNodeId: 'IV-EGFR_rebiopsy_other', breadcrumbLabel: 'Autre résistance'},
        ]
    }
  },
  'IV-EGFR_afa_prog_slow': {
    id: 'IV-EGFR_afa_prog_slow',
    recommendationBlocks: [{
        title: 'Évolution lente après afatinib',
        items: [{ title: 'Option', detailsArray: [{text: "Discuter d'une poursuite de l'ITK si bénéfice clinique"}] }],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
    }],
  },
   'IV-EGFR_afa_prog_oligo': {
    id: 'IV-EGFR_afa_prog_oligo',
    recommendationBlocks: [{
        title: 'Évolution oligométastatique après afatinib',
        items: [{ title: 'Options thérapeutiques', detailsArray: [{text: "• Discuter d'un traitement local du site M+ et poursuite de l'ITK<br>• Éviter la radiothérapie panencéphalique"}] }],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
    }],
  },
  'IV-EGFR_osimertinib_progression_q': {
    id: 'IV-EGFR_osimertinib_progression_q',
    question: {
        text: 'Type de progression ?',
        options: [
            { label: 'Évolution multifocale', nextNodeId: 'IV-EGFR_osi_prog_multifocal', breadcrumbLabel: 'Évolution multifocale (Osimertinib)'},
            { label: 'Évolution lente', nextNodeId: 'IV-EGFR_osi_prog_slow', breadcrumbLabel: 'Évolution lente (Osimertinib)'},
            { label: 'Évolution oligométastatique', nextNodeId: 'IV-EGFR_osi_prog_oligo', breadcrumbLabel: 'Oligométastatique (Osimertinib)'},
        ]
    }
  },
  'IV-EGFR_osi_prog_multifocal': {
    id: 'IV-EGFR_osi_prog_multifocal',
    recommendationBlocks: [{
        title: 'Évolution multifocale après osimertinib',
        items: [
            { title: 'Re-biopsie recommandée', detailsArray: [{text: 'Re-biopsie (tissus ou sang) pour identifier le mécanisme de résistance'}] },
            { title: 'Options thérapeutiques', detailsArray: [{text: '• Essais cliniques<br>• Traitement adapté au mécanisme de résistance identifié<br>• Traitement identique au CBNPC WT (sans immunothérapie)<br>• Option : Carboplatine + Pemetrexed + Amivantamab'}] },
        ],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
    }],
  },
  'IV-EGFR_osi_prog_slow': {
    id: 'IV-EGFR_osi_prog_slow',
    recommendationBlocks: [{
        title: 'Évolution lente après osimertinib',
        items: [{ title: 'Option', detailsArray: [{text: "Discuter d'une poursuite de l'ITK si bénéfice clinique"}] }],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
    }],
  },
  'IV-EGFR_osi_prog_oligo': {
    id: 'IV-EGFR_osi_prog_oligo',
    recommendationBlocks: [{
        title: 'Évolution oligométastatique après osimertinib',
        items: [{ title: 'Options thérapeutiques', detailsArray: [{text: "• Discuter d'un traitement local du site M+ et poursuite de l'ITK<br>• Éviter la radiothérapie panencéphalique"}] }],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
    }],
  },
  'IV-EGFR_rebiopsy_T790M': {
    id: 'IV-EGFR_rebiopsy_T790M',
    recommendationBlocks: [{
        title: 'Mutation T790M acquise',
        items: [{ title: 'Traitement de deuxième ligne', detailsArray: [{text: '<strong>Osimertinib</strong><br><em>Indication spécifique pour T790M acquise après ITK de 1ère/2ème génération</em>'}] }],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
    }],
    question: {
        text: 'Évolution sous osimertinib ?',
        options: [
            { label: 'Progression', nextNodeId: 'IV-EGFR_osimertinib_progression_q', breadcrumbLabel: 'Progression (Osimertinib post T790M)'}
        ]
    }
  },
  'IV-EGFR_rebiopsy_other': {
    id: 'IV-EGFR_rebiopsy_other',
    recommendationBlocks: [{
        title: 'Autre mécanisme de résistance identifié',
        items: [{ title: 'Options thérapeutiques', detailsArray: [{text: '• Essais cliniques<br>• Traitement adapté au mécanisme de résistance identifié<br>• Traitement identique au CBNPC WT (sans immunothérapie)<br>• Option : Carboplatine + Pemetrexed + Amivantamab'}] }],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
    }],
  },
  'IV-EGFR_exon20_progression': {
    id: 'IV-EGFR_exon20_progression',
    recommendationBlocks: [
      {
        title: "Progression après traitement de l'insertion exon 20",
        items: [
          { title: 'Option', detailsArray: [{text: '• Essais cliniques'}] },
          { title: 'Alternative', detailsArray: [{text: 'Idem CBNPC WT sinon'}] },
        ],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
      },
    ],
  },
};
