
import { Question, Answers } from '../types';

export const getQuestions = (tab: string): Question[] => {
  const questionSets: { [key: string]: Question[] } = {
    'stage1': [
      {
        key: 'operability',
        question: 'Le patient est-il opérable selon l\'évaluation multidisciplinaire ?',
        options: [
          { value: 'operable', label: '✅ Opérable (bon état général, fonction respiratoire suffisante, absence de comorbidités majeures)' },
          { value: 'inoperable', label: '❌ Inopérable (comorbidités, fonction respiratoire insuffisante, refus patient)' }
        ]
      },
      {
        key: 'surgery_result',
        question: 'Quel est le résultat anatomopathologique de la chirurgie ?',
        condition: (answers: Answers) => answers.operability === 'operable',
        options: [
          { value: 'complete_pIA', label: '🟢 Exérèse complète R0 - pTis, pT1a-c N0 (Stade pIA)' },
          { value: 'complete_pIB', label: '🟡 Exérèse complète R0 - pT2a N0 (Stade pIB)' },
          { value: 'incomplete_R1', label: '🟠 Exérèse incomplète R1 (résidu microscopique)' },
          { value: 'incomplete_R2', label: '🔴 Exérèse incomplète R2 (résidu macroscopique)' },
          { value: 'node_discovery', label: '⚠️ Découverte ganglions pN1/N2 post-opératoire' }
        ]
      },
      {
        key: 'egfr_mutation',
        question: 'Y a-t-il une mutation EGFR sensibilisante (Del19, L858R) ?',
        condition: (answers: Answers) => answers.surgery_result === 'complete_pIB',
        options: [
          { value: 'yes', label: '✅ Oui - Mutation EGFR Del19 ou L858R confirmée' },
          { value: 'no', label: '❌ Non / Statut inconnu / Autre mutation EGFR' }
        ]
      }
    ],
    
    'stage2-3': [
      {
        key: 'resectability',
        question: 'Quelle est l\'évaluation de résécabilité après bilan multidisciplinaire ?',
        options: [
          { value: 'resectable', label: '🟢 Résécable et opérable (T1-3, N0-1 résécables)' },
          { value: 'unresectable_stage2', label: '🟡 Non opérable - Stade II (comorbidités, fonction respiratoire)' },
          { value: 'unresectable_stage3', label: '🔴 Non éligible à la chirurgie - Stade III (N2-3, T4)' }
        ]
      },
      {
        key: 'molecular_profile',
        question: 'Quel est le profil moléculaire tumoral ?',
        condition: (answers: Answers) => answers.resectability === 'resectable',
        options: [
          { value: 'pdl1_low', label: '🔵 PDL1 <1% + EGFR/ALK sauvages' },
          { value: 'pdl1_high', label: '🟢 PDL1 ≥ 1% + EGFR/ALK sauvages' },
          { value: 'egfr_mutated', label: '🧬 Mutation EGFR Del19/L858R' },
          { value: 'alk_rearranged', label: '🧬 Réarrangement ALK' }
        ]
      }
    ],

    'stage3advanced': [
      {
        key: 'performance_status',
        question: 'Quel est le performance status (PS) et l\'âge du patient ?',
        options: [
          { value: 'ps0_1_young', label: '🟢 PS 0-1 et âge ≤ 70 ans (option jusqu\'à 75 ans)' },
          { value: 'ps2_old', label: '🟡 PS 2 ou âge > 70 ans' }
        ]
      },
      {
        key: 'treatment_response',
        question: 'Quelle est l\'évolution après radio-chimiothérapie ?',
        condition: (answers: Answers) => !!answers.performance_status, // Check if previous question was answered
        options: [
          { value: 'non_progressive', label: '✅ Non progressif et PS ≤ 1 (éligible maintenance)' },
          { value: 'progressive', label: '📈 Progression de maladie (discussion en RCP)' }
        ]
      },
      {
        key: 'molecular_status',
        question: 'Quel est le statut moléculaire pour la maintenance ?',
        condition: (answers: Answers) => answers.treatment_response === 'non_progressive',
        options: [
          { value: 'egfr_alk_wt', label: '🔵 EGFR et ALK sauvages (ou PDL1<1% et inconnus pour Durvalumab)' },
          { value: 'egfr_mutated', label: '🧬 Mutation EGFR Del19/L858R' }
        ]
      }
    ],

    'apex': [
      {
        key: 'nodal_status',
        question: 'Quel est le statut ganglionnaire de la tumeur de Pancoast (Apex) ?',
        options: [
          { value: 'cN0_1', label: '🟢 cN0-1 (pas d\'envahissement ganglionnaire majeur)' },
          { value: 'cN2_3', label: '🔴 cN2-3 (envahissement ganglionnaire médiastinal)' }
        ]
      },
      {
        key: 'resectability_post_rt',
        question: 'Après radio-chimiothérapie d\'induction (46Gy), la tumeur est-elle résécable ?',
        condition: (answers: Answers) => answers.nodal_status === 'cN0_1',
        options: [
          { value: 'resectable', label: '✅ Oui, résécable' },
          { value: 'unresectable', label: '❌ Non, non résécable' }
        ]
      }
    ],

    'stage4-nonepi': [
      {
        key: 'pdl1_status',
        question: 'Quel est le taux d\'expression PD-L1 (TPS) ?',
        options: [
          { value: 'high', label: '🟢 PD-L1 ≥ 50% (forte expression)' },
          { value: 'low', label: '🔵 PD-L1 < 50% (faible expression)' }
        ]
      },
      {
        key: 'performance_status',
        question: 'Quel est le performance status (PS) et l\'âge du patient ?',
        options: [
          { value: 'ps0_1', label: '🟢 PS 0-1' },
          { value: 'ps2_age_ge70', label: '🟡 PS 2 ou Âge ≥ 70 ans' },
          { value: 'ps_gt2', label: '🔴 PS > 2' }
        ]
      }
    ],

    'stage4-epi': [
       {
        key: 'pdl1_status',
        question: 'Quel est le taux d\'expression PD-L1 (TPS) ?',
        options: [
          { value: 'high', label: '🟢 PD-L1 ≥ 50% (forte expression)' },
          { value: 'low', label: '🔵 PD-L1 < 50% (faible expression)' }
        ]
      },
      {
        key: 'performance_status',
        question: 'Quel est le performance status (PS) et l\'âge du patient ?',
        options: [
          { value: 'ps0_1', label: '🟢 PS 0-1' },
          { value: 'ps2_age_ge70', label: '🟡 PS 2 ou Âge ≥ 70 ans' },
          { value: 'ps_gt2', label: '🔴 PS > 2' }
        ]
      }
    ],

    'stage4-second': [
      {
        key: 'performance_status',
        question: 'Quel est le performance status actuel du patient (PS) ?',
        options: [
          { value: 'ps0_2', label: '🟢 PS 0-2 (éligible à un traitement)' },
          { value: 'ps_gt2', label: '🔴 PS > 2 (soins de support)' }
        ]
      },
      {
        key: 'first_line_treatment_type',
        question: 'Quel était le type de traitement de première ligne ?',
        condition: (answers: Answers) => answers.performance_status === 'ps0_2',
        options: [
          { value: 'chemo_immuno', label: '💊+🛡️ Chimiothérapie + Immunothérapie' },
          { value: 'immuno_alone', label: '🛡️ Immunothérapie seule' },
          { value: 'chemo_alone', label: '💊 Chimiothérapie seule' }
        ]
      },
      {
        key: 'histology',
        question: 'Quelle est l\'histologie tumorale ? (Si 1ère ligne = Chimiothérapie seule OU Immunothérapie seule)',
        condition: (answers: Answers) => (answers.performance_status === 'ps0_2' && (answers.first_line_treatment_type === 'chemo_alone' || answers.first_line_treatment_type === 'immuno_alone')),
        options: [
          { value: 'non_epidermoid', label: '🔵 Non-épidermoïde (adénocarcinome, grandes cellules)' },
          { value: 'epidermoid', label: '🟤 Épidermoïde' }
        ]
      },
      {
        key: 'pdl1_status_second_line',
        question: 'PDL1 ≥ 1% ? (Si 1ère ligne = Chimiothérapie seule)',
        condition: (answers: Answers) => answers.performance_status === 'ps0_2' && answers.first_line_treatment_type === 'chemo_alone',
        options: [
          { value: 'yes', label: '✅ Oui, PDL1 ≥ 1%' },
          { value: 'no', label: '❌ Non, PDL1 < 1%' }
        ]
      },
       {
        key: 'cmet_ihc',
        question: 'Statut cMET surexprimé (IHC) ?',
        condition: (answers: Answers) => answers.performance_status === 'ps0_2',
        options: [
          { value: 'positive', label: '✅ Positif' },
          { value: 'negative_unknown', label: '❌ Négatif ou Inconnu' }
        ]
      }
    ],

    'egfr': [
      {
        key: 'mutation_type',
        question: 'Quel type de mutation EGFR a été identifiée ?',
        options: [
          { value: 'del19_l858r', label: '🟢 Del19 ou L858R (mutations sensibilisantes classiques)' },
          { value: 't790m', label: '🔴 T790M (mutation de résistance)' },
          { value: 'other_sensitizing', label: '🟡 G719X, L861Q, S768I, mutations combinées (multiples)' },
          { value: 'exon20_insertion', label: '🔴 Insertion dans l\'exon 20' }
        ]
      },
      {
        key: 'treatment_context',
        question: 'Dans quel contexte thérapeutique (pour Del19/L858R ou T790M) ?',
        condition: (answers: Answers) => answers.mutation_type === 'del19_l858r' || answers.mutation_type === 't790m',
        options: [
          { value: 'first_line', label: '1️⃣ Première ligne métastatique' },
          { value: 'progression_on_tki', label: '📈 Progression sous ITK EGFR (Osimertinib ou autre)' }
        ]
      },
      {
        key: 'progression_type_egfr',
        question: 'Quel type de progression sous ITK EGFR ?',
        condition: (answers: Answers) => (answers.mutation_type === 'del19_l858r' || answers.mutation_type === 'other_sensitizing') && answers.treatment_context === 'progression_on_tki',
        options: [
          { value: 'oligometastatic', label: '🎯 Oligométastatique (≤3 sites, discussion traitement local)' },
          { value: 'slow', label: '🐌 Lente (discussion poursuite ITK si bénéfice)' },
          { value: 'multifocal', label: '⚡ Multifocale/franche (re-biopsie, adaptation traitement)' }
        ]
      }
    ],

    'alk': [
      {
        key: 'treatment_phase',
        question: 'Phase de traitement pour réarrangement ALK ?',
        options: [
          { value: 'first_line', label: '1️⃣ Première ligne métastatique' },
          { value: 'resistance_progression', label: '📈 Résistance/Progression sous ITK ALK' }
        ]
      },
      {
        key: 'resistance_type_alk',
        question: 'Type de résistance/progression ?',
        condition: (answers: Answers) => answers.treatment_phase === 'resistance_progression',
        options: [
          { value: 'primary_resistance', label: '⚡ Résistance primaire (vérifier observance, interactions)' },
          { value: 'acquired_resistance', label: '📈 Résistance acquise (après réponse initiale)' }
        ]
      },
      {
        key: 'previous_tki_alk',
        question: 'Quel ITK ALK était utilisé avant la progression (si résistance acquise) ?',
        condition: (answers: Answers) => answers.resistance_type_alk === 'acquired_resistance',
        options: [
          { value: 'alectinib_brigatinib', label: '💊 Alectinib ou Brigatinib' },
          { value: 'lorlatinib', label: '💊 Lorlatinib' },
          { value: 'other_tki', label: '💊 Autre ITK ALK de 1ère/2ème génération' }
        ]
      },
      {
        key: 'progression_pattern_alk',
        question: 'Quel est le mode de progression (si résistance acquise) ?',
        condition: (answers: Answers) => answers.resistance_type_alk === 'acquired_resistance',
        options: [
          { value: 'oligometastatic', label: '🎯 Oligométastatique (traitement local + poursuite ITK)' },
          { value: 'slow', label: '🐌 Évolution lente (poursuite ITK si bénéfice clinique)' },
          { value: 'multifocal', label: '⚡ Évolution multifocale (Rebiopsie / ADN circulant si disponible)' }
        ]
      }
    ],

    'other-mutations': [
      {
        key: 'mutation_type',
        question: 'Quelle altération moléculaire rare a été identifiée ?',
        options: [
          { value: 'ros1', label: '🧬 Réarrangement ROS1' },
          { value: 'ret', label: '🧬 Réarrangement RET' },
          { value: 'ntrk', label: '🧬 Fusion NTRK1/2/3' },
          { value: 'kras_g12c', label: '🧬 Mutation KRAS G12C' },
          { value: 'met_exon14', label: '🧬 Saut d\'exon 14 de MET (METex14)' },
          { value: 'her2', label: '🧬 Mutation HER2 (ERBB2)' }
          // BRAF V600E non listé dans les arbres decisionnels principaux, mais pourrait être ajouté.
        ]
      }
    ]
  };
  
  return questionSets[tab] || [];
};
