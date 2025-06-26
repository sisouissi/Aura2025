import { Stage } from '../types';

export const STAGES: Stage[] = [
  { id: 'cI', buttonLabel: 'STADES CLINIQUES I', initialNodeId: 'cI_entry' },
  { id: 'cII-cIIIB', buttonLabel: 'STADES CLINIQUES CII à CIIIB (TNM8)', initialNodeId: 'cII-cIIIB_entry' },
  { id: 'cIIIA-B-C', buttonLabel: 'STADES CLINIQUES IIIA-IIIB non éligibles à la chirurgie et IIIC (TNM8)', initialNodeId: 'cIIIA-B-C_entry' },
  { id: 'apex', buttonLabel: "TUMEURS DE l’APEX (T3, T4 / PS 0-2)", initialNodeId: 'apex_entry' },
  { id: 'IV-non-epidermoid', buttonLabel: 'CANCERS NON-EPIDERMOÏDES DE STADE IV sans altération ciblable', initialNodeId: 'IV-non-epidermoid_entry' },
  { id: 'IV-epidermoid', buttonLabel: 'CANCERS EPIDERMOÏDES DE STADE IV sans altération ciblable', initialNodeId: 'IV-epidermoid_entry' },
  { id: 'IV-second-line', buttonLabel: 'CBNPC DE STADE IV de Seconde ligne', initialNodeId: 'IV-second-line_entry' },
  { id: 'IV-EGFR', buttonLabel: 'STADES METASTATIQUES AVEC MUTATION ACTIVATRICE DE L’EGFR', initialNodeId: 'IV-EGFR_entry' },
  { id: 'IV-ALK', buttonLabel: 'STADES METASTATIQUE AVEC REARRANGEMENT DE ALK', initialNodeId: 'IV-ALK_entry' },
];