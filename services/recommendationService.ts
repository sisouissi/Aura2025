
import { Answers, RecommendationResult } from '../types';

export const calculateStage1Recommendation = (answers: Answers): RecommendationResult => {
  if (!answers.operability) return { isComplete: false };
  
  if (answers.operability === 'inoperable') {
    return {
      isComplete: true,
      title: "Patient inopérable - Stade cI",
      treatment: "Radiothérapie stéréotaxique (SBRT)",
      alternatives: ["Option : Thermo-ablation si contre-indication à la SBRT ou refus"],
      notes: ["Technique de choix : 3-5 fractions.", "Surveillance post-traitement à 3 mois, puis tous les 6 mois pendant 2 ans, puis annuel."],
      posology: "SBRT : ex: 54Gy en 3 fr, 60Gy en 5 fr, ou 48Gy en 4 fr."
    };
  }
  
  if (answers.operability === 'operable') {
    if (!answers.surgery_result) return { isComplete: false };
    
    const baseSurgeryNote = "Chirurgie : lobectomie avec curage ganglionnaire OU segmentectomie pour les tumeurs de moins de 2cm et sous certaines conditions.";

    switch(answers.surgery_result) {
      case 'complete_pIA':
        return {
          isComplete: true,
          title: "Exérèse complète - pTis, pT1a-c N0 (Stade pIA)",
          treatment: "Surveillance",
          notes: [baseSurgeryNote, "Pas d'indication de traitement adjuvant.", "Scanner thoracique tous les 6 mois pendant 2 ans, puis annuel."],
          followUp: "Surveillance : scanner thoracique à 6, 12, 18, 24 mois puis annuel."
        };
      case 'complete_pIB':
        if (!answers.egfr_mutation) return { isComplete: false };
        if (answers.egfr_mutation === 'yes') {
          return {
            isComplete: true,
            title: "Exérèse complète - pT2a,N0 (Stade pIB) avec mutation EGFR",
            treatment: "Osimertinib pendant 3 ans",
            notes: [baseSurgeryNote, "Uniquement pour mutation EGFR Del19 ou L858R confirmée.", "Surveillance des effets secondaires (cutanés, digestifs, pneumopathie)."],
            posology: "Osimertinib 80 mg per os 1 fois/jour pendant 3 ans."
          };
        } else {
          return {
            isComplete: true,
            title: "Exérèse complète - pT2a,N0 (Stade pIB) sans mutation EGFR activatrice",
            treatment: "Surveillance",
            notes: [baseSurgeryNote, "Discussion RCP si doute sur les marges ou autres facteurs de risque.", "Pas d'indication de chimiothérapie adjuvante systématique."],
            followUp: "Surveillance standard post-chirurgie."
          };
        }
      case 'incomplete_R1':
        return {
          isComplete: true,
          title: "Exérèse incomplète R1 (résidu microscopique)",
          treatment: "Discussion en RCP multidisciplinaire",
          alternatives: ["Re-intervention chirurgicale si techniquement possible et patient éligible.", "Radiothérapie adjuvante sur le lit tumoral.", "Radio-chimiothérapie si envahissement ganglionnaire associé (reprendre algorithme stade IIIA)."],
          notes: [baseSurgeryNote, "Évaluation de la faisabilité d'une reprise chirurgicale est prioritaire."]
        };
      case 'incomplete_R2':
        return {
          isComplete: true,
          title: "Exérèse incomplète R2 (résidu macroscopique)",
          treatment: "Radio-chimiothérapie concomitante",
          notes: [baseSurgeryNote, "Orientation similaire au traitement des stades IIIA non résécables d'emblée.", "Dose de radiothérapie : 60-66 Gy."],
          posology: "Radiothérapie 60-66 Gy + chimiothérapie concomitante à base de sels de platine."
        };
      case 'node_discovery':
        return {
          isComplete: true,
          title: "Découverte pN1/N2 post-opératoire",
          treatment: "Cf. stade correspondant (restadification pathologique)",
          notes: [baseSurgeryNote, "Reprendre l'algorithme selon le nouveau stade pathologique (ex: stade IIB, IIIA).", "Bilan d'extension complémentaire si non réalisé pré-op (TEP-scanner).", "Chimiothérapie adjuvante souvent indiquée, voire radio-chimiothérapie." ]
        };
    }
  }
  
  return { isComplete: false };
};

export const calculateStage2_3Recommendation = (answers: Answers): RecommendationResult => {
  if (!answers.resectability) return { isComplete: false };
  
  if (answers.resectability === 'unresectable_stage2') {
    return {
      isComplete: true,
      title: "Non opérable (Stades II)",
      treatment: "Radiothérapie en conditions stéréotaxiques (SBRT)",
      notes: ["Si SBRT non possible, discuter radiothérapie conformationnelle hypofractionnée ou normofractionnée.", "Évaluation gériatrique si patient âgé."],
      posology: "SBRT : e.g., 54-60 Gy en 3-5 fractions. Adapter selon volume et localisation."
    };
  }
  
  if (answers.resectability === 'unresectable_stage3') {
    return {
      isComplete: true,
      title: "Non éligibles à la chirurgie (Stades III)",
      treatment: "La prise en charge pour ce cas est détaillée dans la section des stades IIIA-C.",
      redirectToTabId: 'stage3advanced',
      treatmentActionLabel: "Consulter Stades IIIA-C",
      notes: ["Prise en charge en RCP multidisciplinaire.", "Recherche systématique de mutations EGFR, ALK, PD-L1."]
    };
  }

  if (answers.resectability === 'resectable') {
    if (!answers.molecular_profile) return { isComplete: false };

    const commonNotesResectable = ["Chirurgie : Lobectomie ou pneumonectomie avec curage ganglionnaire médiastinal complet."];
    const adjuvantChemo = "Chimiothérapie adjuvante : Cisplatine + Vinorelbine x4 cycles (si non réalisée en néoadjuvant et si patient éligible). Options : cisplatine-pemetrexed (non-épidermoïdes), carboplatine-paclitaxel (si CI au cisplatine).";
    const neoadjuvantChemoOption = "Option Chimiothérapie pré-opératoire : 3-4 cycles doublet platine, puis réévaluation.";

    switch(answers.molecular_profile) {
      case 'pdl1_low': // PDL1 <1% (EGFR/ALK WT)
        return {
          isComplete: true,
          title: "PDL1 <1% (EGFR/ALK WT) - Résécable et opérable",
          treatment: "Chirurgie puis Chimiothérapie adjuvante.",
          alternatives: [neoadjuvantChemoOption],
          notes: [...commonNotesResectable, adjuvantChemo],
          posology: "Adjuvant: Cisplatine 75-80 mg/m² J1 + Vinorelbine 25-30 mg/m² J1,J8, tous les 21 jours, 4 cycles."
        };
      case 'pdl1_high': // PDL1 ≥ 1% (EGFR et ALK WT)
        return {
          isComplete: true,
          title: "PDL1 ≥1% (EGFR et ALK WT) - Résécable et opérable",
          treatment: "Chimio-immunothérapie préopératoire puis chirurgie.",
          alternatives: ["En l'absence de traitement pré-opératoire : Chirurgie puis Chimiothérapie adjuvante (discussion immunothérapie adjuvante selon AMM et RCP)."],
          notes: [...commonNotesResectable, "Chimio-immunothérapie préopératoire : 3 cycles de nivolumab + chimiothérapie à base de sels de platine en AAP.", "Réévaluation imagerie post-induction avant chirurgie."],
          posology: "Nivolumab 360 mg J1 + chimiothérapie (e.g. cisplatine/carboplatine + paclitaxel/pemetrexed) Q3W x 3 cycles."
        };
      case 'egfr_mutated': // EGFR Del19/L858R
        return {
          isComplete: true,
          title: "EGFR Del19/L858R - Résécable et opérable",
          treatment: "Chirurgie puis Osimertinib adjuvant pendant 3 ans.",
          alternatives: [neoadjuvantChemoOption + " (discutée, bénéfice incertain avant ITK)."],
          notes: [...commonNotesResectable, "Osimertinib uniquement pour mutations Del19 et L858R.", "Surveillance régulière des effets secondaires."],
          posology: "Osimertinib 80 mg/jour per os pendant 3 ans."
        };
      case 'alk_rearranged': // ALK réarrangé
        return {
          isComplete: true,
          title: "ALK réarrangé - Résécable et opérable",
          treatment: "Chirurgie puis Alectinib adjuvant pendant 2 ans.",
          alternatives: [neoadjuvantChemoOption + " (discutée)."],
          notes: [...commonNotesResectable, "Alectinib validé en adjuvant (étude ALINA).", "Surveillance hépatique, musculaire (CPK)."],
          posology: "Alectinib 600 mg x 2/jour per os pendant 2 ans."
        };
    }
  }
  
  return { isComplete: false };
};


export const calculateStage3AdvancedRecommendation = (answers: Answers): RecommendationResult => {
  if (!answers.performance_status) return { isComplete: false };
  
  let initialTreatment = "";
  if (answers.performance_status === 'ps0_1_young') {
    initialTreatment = "Association radio-chimiothérapie concomitante : cisplatine-vinorelbine ou carboplatine-paclitaxel + radiothérapie 60-66 Gy.";
  } else if (answers.performance_status === 'ps2_old') {
    initialTreatment = "Association radio-chimiothérapie séquentielle : chimiothérapie (carboplatine-paclitaxel) puis radiothérapie 60-66 Gy.";
  } else {
    return { isComplete: false }; 
  }

  if (!answers.treatment_response) {
     return { 
        isComplete: true, // Partial recommendation (initial phase)
        title: `Stades IIIA-IIIB non éligibles chirurgie et IIIC (TNM8) - Phase initiale (${answers.performance_status === 'ps0_1_young' ? 'PS 0/1, Age ≤70ans' : 'PS 2 ou Age >70ans'})`,
        treatment: initialTreatment,
        notes: ["Réévaluation après radio-chimiothérapie pour décision de maintenance.", "Bilan PS et tolérance primordial."]
      };
  }

  if (answers.treatment_response === 'progressive') {
    return {
      isComplete: true,
      title: "Progression après radio-chimiothérapie",
      treatment: "Discussion en RCP pour traitement de seconde ligne.",
      notes: [initialTreatment, "Bilan d'imagerie complet. Recherche de nouvelles cibles moléculaires si possible."]
    };
  }
  
  if (answers.treatment_response === 'non_progressive') {
    if(!answers.molecular_status) return { isComplete: false };
    
    if (answers.molecular_status === 'egfr_alk_wt') { // EGFR et ALK WT
      return {
        isComplete: true,
        title: "Non progressif après radio-chimiothérapie et PS≤1 - EGFR et ALK WT",
        treatment: "Durvalumab 12 mois (CPC pour les PDL1<1% et inconnus).",
        alternatives: ["Surveillance si contre-indication ou refus du Durvalumab."],
        notes: [initialTreatment, "Débuter Durvalumab dans les 1-42 jours post-RT.", "Surveillance des toxicités immunitaires."],
        posology: "Durvalumab 10 mg/kg IV toutes les 2 semaines, ou 1500mg Q4W, pendant 12 mois."
      };
    } else if (answers.molecular_status === 'egfr_mutated') { // EGFR Del19/L858R
      return {
        isComplete: true,
        title: "Non progressif après radio-chimiothérapie et PS≤1 - EGFR Del19/L858R",
        treatment: "Osimertinib jusque progression ou toxicité.",
        notes: [initialTreatment, "Basé sur l'étude LAURA.", "Surveillance spécifique liée à l'Osimertinib."],
        posology: "Osimertinib 80 mg/jour per os."
      };
    }
  }
  
  return { isComplete: false };
};


export const calculateApexRecommendation = (answers: Answers): RecommendationResult => {
  if (!answers.nodal_status) return { isComplete: false };
  const baseTitle = "Tumeurs de l'apex (T3, T4 / PS 0-2)";

  if (answers.nodal_status === 'cN0_1') { // Résécable ? (après radio-chimiothérapie)
    const inductionTherapy = "Radio-chimiothérapie 46 Gy concomitante.";
    if (!answers.resectability_post_rt) {
        return { 
            isComplete: true, // Partial: initial plan for cN0/1
            title: `${baseTitle} - cN0/1 Résécable ? - Phase d'induction`,
            treatment: inductionTherapy,
            notes: ["Réévaluation de la résécabilité après induction.", "Option si OUI: Chimio-immunothérapie préopératoire (3 cycles nivo + chimio AAP), puis chirurgie, puis chimiothérapie adjuvante (cisplatine+vinorelbine x4) si pas de traitement préopératoire."]
        };
    }
    if (answers.resectability_post_rt === 'resectable') { // OUI
      return {
        isComplete: true,
        title: `${baseTitle} - cN0/1 Résécable après induction`,
        treatment: "Chirurgie.",
        notes: [inductionTherapy + " effectuée.", "Chimiothérapie adjuvante : Cisplatine + Vinorelbine x4 (si pas de traitement pré-opératoire)."],
        alternatives: ["Options si chirurgie finalement non réalisée: Poursuite radiothérapie, Poursuite chimiothérapie, 2ème ligne chimiothérapie."]
      };
    } else { // NON
      return {
        isComplete: true,
        title: `${baseTitle} - cN0/1 Non résécable après induction`,
        treatment: "Options: Poursuite radiothérapie, Poursuite chimiothérapie, 2ème ligne chimiothérapie.",
        notes: [inductionTherapy + " effectuée.", "Discussion en RCP pour la meilleure stratégie de consolidation/sauvetage."]
      };
    }
  }
  
  if (answers.nodal_status === 'cN2_3') { // Irradiable
    return {
      isComplete: true,
      title: `${baseTitle} - cN2-3 Irradiable`,
      treatment: "La prise en charge pour ce cas est détaillée dans la section des stades IIIA-C.",
      redirectToTabId: 'stage3advanced',
      treatmentActionLabel: "Consulter Stades IIIA-C",
      notes: ["Généralement traités comme des stades IIIA/IIIC non résécables d'emblée.", "Prise en charge en RCP multidisciplinaire."]
    };
  }
  
  return { isComplete: false };
};

export const calculateStage4NonEpiRecommendation = (answers: Answers): RecommendationResult => {
  if (!answers.pdl1_status || !answers.performance_status) return { isComplete: false };
  const baseTitle = "CBNPC Non-Épidermoïde Stade IV sans altération ciblable - 1ère ligne";

  if (answers.performance_status === 'ps_gt2') {
    return { isComplete: true, title: `${baseTitle} (PS > 2)`, treatment: "Soins de support.", notes: ["Aucun traitement anticancéreux systémique recommandé."] };
  }

  const commonNotes = [
    "1. Suivie d'une maintenance de continuation après 4 cycles de platine jusqu'à progression ou toxicité inacceptable (en option pour gemcitabine).",
    "2. Poursuivie jusqu'à progression, toxicité inacceptable, ou jusque 2 ans.",
    "*Option: Double maintenance de continuation par bevacizumab-pemetrexed jusqu'à progression ou toxicité inacceptable."
  ];

  if (answers.pdl1_status === 'high') { // PD-L1 >= 50%
    if (answers.performance_status === 'ps0_1') {
      return {
        isComplete: true,
        title: `${baseTitle} (PD-L1 ≥ 50%, PS 0-1)`,
        treatment: "Atezolizumab² OU Cemiplimab² OU Pembrolizumab².",
        alternatives: ["Platine-Pemetrexed¹-Pembrolizumab² (si contre-indication à la monothérapie IO ou progression rapide crainte)."],
        posology: "Ex: Pembrolizumab 200mg Q3W ou 400mg Q6W.",
        notes: commonNotes
      };
    }
    if (answers.performance_status === 'ps2_age_ge70') {
       return {
        isComplete: true,
        title: `${baseTitle} (PD-L1 ≥ 50%, PS 2 ou Age ≥ 70ans)`,
        treatment: "Pembrolizumab² (si éligible).",
        alternatives: [
            "Si contre-indication au Pembrolizumab ou non éligible:",
            "- Carboplatine – paclitaxel hebdomadaire",
            "- Si PS 0-1 (pour Age >=70ans): Atezolizumab, Cemiplimab ou Pembrolizumab².",
            "- Patients sélectionnés avec PS 0-1 (pour Age>=70ans): Carboplatine-pemetrexed¹-pembrolizumab²."
        ],
        notes: commonNotes,
        posology: "Adapter la chimiothérapie à la tolérance."
      };
    }
  }

  if (answers.pdl1_status === 'low') { // PD-L1 < 50%
    if (answers.performance_status === 'ps0_1') {
      return {
        isComplete: true,
        title: `${baseTitle} (PD-L1 < 50%, PS 0-1)`,
        treatment: "Platine-Pemetrexed¹-Pembrolizumab².",
        alternatives: [
            "- cisplatine pemetrexed¹",
            "- cisplatine vinorelbine",
            "- cisplatine docetaxel",
            "- cisplatine gemcitabine¹",
            "- carboplatine paclitaxel",
            "- Ajout de bevacizumab*¹ (si non-épidermoïde et éligible)"
        ],
        notes: commonNotes,
        posology: "Ex: Pembrolizumab 200mg + Carboplatine AUC 5 + Pemetrexed 500mg/m² Q3W x4 cycles, puis maintenance Pembrolizumab + Pemetrexed."
      };
    }
    if (answers.performance_status === 'ps2_age_ge70') {
      return {
        isComplete: true,
        title: `${baseTitle} (PD-L1 < 50%, PS 2 ou Age ≥ 70ans)`,
        treatment: "Carboplatine – paclitaxel hebdomadaire.",
        alternatives: [
          "- carboplatine pemetrexed",
          "- carboplatine gemcitabine",
          "- Patients sélectionnés avec PS 0-1 (pour Age>=70ans): Carboplatine-pemetrexed¹-pembrolizumab²."
        ],
        notes: ["Monothérapie par gemcitabine, vinorelbine ou Ajout bevacizumab¹ si PS2.", commonNotes[0], commonNotes[1]].filter(Boolean) as string[],
        posology: "Adapter la chimiothérapie à la tolérance."
      };
    }
  }
  return { isComplete: false };
};


export const calculateStage4EpiRecommendation = (answers: Answers): RecommendationResult => {
  if (!answers.pdl1_status || !answers.performance_status) return { isComplete: false };
  const baseTitle = "CBNPC Épidermoïde Stade IV sans altération ciblable - 1ère ligne";

  if (answers.performance_status === 'ps_gt2') {
    return { isComplete: true, title: `${baseTitle} (PS > 2)`, treatment: "Soins de support.", notes: ["Aucun traitement anticancéreux systémique recommandé."] };
  }
  
  const commonNotes = [
    "1. Suivie d'une maintenance de continuation après 4 cycles de platine jusqu'à progression ou toxicité inacceptable (en option pour gemcitabine).",
    "2. Poursuivie jusqu'à progression, toxicité inacceptable, ou jusque 2 ans."
  ];

  if (answers.pdl1_status === 'high') { // PD-L1 >= 50%
    if (answers.performance_status === 'ps0_1') {
      return {
        isComplete: true,
        title: `${baseTitle} (PD-L1 ≥ 50%, PS 0-1)`,
        treatment: "Atezolizumab² OU Cemiplimab² OU Pembrolizumab².",
        alternatives: ["Carboplatine-paclitaxel-pembrolizumab² (si contre-indication à la monothérapie IO)."],
        posology: "Ex: Pembrolizumab 200mg Q3W ou 400mg Q6W.",
        notes: commonNotes
      };
    }
    if (answers.performance_status === 'ps2_age_ge70') {
      return {
        isComplete: true,
        title: `${baseTitle} (PD-L1 ≥ 50%, PS 2 ou Age ≥ 70ans)`,
        treatment: "Pembrolizumab² (si éligible).",
        alternatives: [
            "Si contre-indication au Pembrolizumab ou non éligible:",
            "- Carboplatine - paclitaxel hebdomadaire",
            "- Si PS 0-1 (pour Age >=70ans): Atezolizumab, Cemiplimab ou Pembrolizumab².",
            "- Patients sélectionnés avec PS 0-1 (pour Age>=70ans): Carboplatine-paclitaxel-pembrolizumab²."
        ],
        notes: commonNotes,
        posology: "Adapter la chimiothérapie à la tolérance."
      };
    }
  }

  if (answers.pdl1_status === 'low') { // PD-L1 < 50%
    if (answers.performance_status === 'ps0_1') {
      return {
        isComplete: true,
        title: `${baseTitle} (PD-L1 < 50%, PS 0-1)`,
        treatment: "Carboplatine-paclitaxel-Pembrolizumab².",
        alternatives: [
            "- cisplatine vinorelbine",
            "- cisplatine docetaxel",
            "- cisplatine gemcitabine¹",
            "- carboplatine paclitaxel"
        ],
        notes: commonNotes,
        posology: "Ex: Pembrolizumab 200mg + Carboplatine AUC 5-6 + Paclitaxel 175-200mg/m² Q3W x4 cycles, puis maintenance Pembrolizumab."
      };
    }
    if (answers.performance_status === 'ps2_age_ge70') {
      return {
        isComplete: true,
        title: `${baseTitle} (PD-L1 < 50%, PS 2 ou Age ≥ 70ans)`,
        treatment: "Carboplatine - paclitaxel hebdomadaire.",
        alternatives: [
            "- carboplatine gemcitabine",
            "- Patients sélectionnés avec PS 0-1 (pour Age >=70ans): Carboplatine-paclitaxel-pembrolizumab²."
        ],
        notes: ["Monothérapie par gemcitabine, vinorelbine si PS2.", commonNotes[0], commonNotes[1]].filter(Boolean) as string[],
        posology: "Adapter la chimiothérapie à la tolérance."
      };
    }
  }
  return { isComplete: false };
};


export const calculateStage4SecondRecommendation = (answers: Answers): RecommendationResult => {
  if (!answers.performance_status) return { isComplete: false };
  const baseTitle = "CBNPC Stade IV - Seconde ligne";

  if (answers.performance_status === 'ps_gt2') {
    return { isComplete: true, title: `${baseTitle} (PS > 2)`, treatment: "Soins de support.", notes: ["Aucun traitement anticancéreux systémique recommandé."] };
  }

  if (!answers.first_line_treatment_type || !answers.cmet_ihc) return { isComplete: false };
  
  const commonNotes = [
    "1. Suivie d'une maintenance de continuation après 4 cycles de platine jusqu'à progression ou toxicité inacceptable (en option pour gemcitabine).",
    "2. Uniquement dans les non-épidermoïdes.",
    "*Option: Double maintenance de continuation par bevacizumab-pemetrexed jusqu'à progression ou toxicité inacceptable."
  ];
  
  let mainTreatment = "Traitement à discuter en RCP.";
  const alternatives: string[] = [];

  if (answers.cmet_ihc === 'positive') {
    alternatives.push("Option: Teliso-V en AAC (si CMET surexprimé IHC).");
  }

  if (answers.first_line_treatment_type === 'chemo_immuno') { // Chimiothérapie + Immunothérapie en 1L
    if (answers.histology === 'non_epidermoid') {
      mainTreatment = "C. Non-Epidermoïdes: -pemetrexed, -paclitaxel-bevacizumab.";
      alternatives.push("Toutes histologies: -docetaxel, -essais cliniques, -toute autre molécule après avis de la RCP.");
    } else { // épidermoïde
      mainTreatment = "Toutes histologies: -docetaxel, -essais cliniques, -toute autre molécule après avis de la RCP.";
    }
  } else if (answers.first_line_treatment_type === 'immuno_alone') { // Immunothérapie seule en 1L
    if (!answers.histology) return { isComplete: false };
    if (answers.histology === 'non_epidermoid') {
      mainTreatment = "Toutes histologies: -cisplatine vinorelbine, -cisplatine docetaxel, -cisplatine gemcitabine¹, -carboplatine paclitaxel. C. Non-Epidermoïdes: -cisplatine pemetrexed¹ + bevacizumab*¹.";
    } else { // épidermoïde
       mainTreatment = "Toutes histologies: -cisplatine vinorelbine, -cisplatine docetaxel, -cisplatine gemcitabine¹, -carboplatine paclitaxel.";
    }
     alternatives.push("Monothérapie par gemcitabine, vinorelbine", "Ajout bevacizumab¹²");

  } else if (answers.first_line_treatment_type === 'chemo_alone') { // Chimiothérapie seule en 1L
    if (!answers.pdl1_status_second_line) return { isComplete: false };
    mainTreatment = "-atezolizumab, -nivolumab.";
    if (answers.pdl1_status_second_line === 'yes') {
      mainTreatment += " -pembrolizumab si PDL1 ≥ 1%.";
    }
    if (answers.performance_status === 'ps0_2' && parseInt(answers.age || "0") >= 70) { 
        alternatives.push("-carboplatine - paclitaxel hebdomadaire");
        alternatives.push("Options: -Monothérapie, -Autres doublet à base de platine, -Ajout bevacizumab¹²");
    }
  }
  
  return {
    isComplete: true,
    title: `${baseTitle} (PS 0-2)`,
    treatment: mainTreatment,
    alternatives: alternatives.length > 0 ? alternatives : undefined,
    notes: commonNotes,
    posology: "Adapter selon protocole choisi et tolérance."
  };
};


export const calculateEGFRRecommendation = (answers: Answers): RecommendationResult => {
  if (!answers.mutation_type) return { isComplete: false };
  const baseTitle = "Stades Métastatiques avec Mutation Activatrice de l'EGFR";

  if (answers.mutation_type === 'del19_l858r') {
    if (!answers.treatment_context) return { isComplete: false };
    if (answers.treatment_context === 'first_line') {
      return {
        isComplete: true,
        title: `${baseTitle} - Del19/L858R - 1ère ligne`,
        treatment: "Osimertinib.",
        alternatives: ["Options: -Platine-Pemetrexed + osimertinib puis maintenance osimertinib-pemetrexed (notamment en cas de métastases cérébrales et chez les PS1).", "-OU Amivantamab + Lazertinib (tolérance)."],
        posology: "Osimertinib 80 mg/jour.",
        notes: ["Surveillance des effets secondaires (diarrhée, rash, pneumopathie)."]
      };
    } else if (answers.treatment_context === 'progression_on_tki') {
      if (!answers.progression_type_egfr) return { isComplete: false };
      const commonProgNotes = ["Re-biopsie (tissus ou sang) recommandée pour identifier mécanisme de résistance."];
      if (answers.progression_type_egfr === 'multifocal') {
        return {
          isComplete: true,
          title: `${baseTitle} - Del19/L858R - Progression multifocale`,
          treatment: "-Essais cliniques. -Traitement adapté au mécanisme de résistance identifié. -Traitement identique au CBNPC WT (sans immunothérapie).",
          alternatives: ["Option: Carboplatine + Pemetrexed + Amivantamab."],
          notes: commonProgNotes
        };
      } else if (answers.progression_type_egfr === 'slow') {
        return { isComplete: true, title: `${baseTitle} - Del19/L858R - Evolution lente`, treatment: "-Discuter d'une poursuite de l'ITK si bénéfice clinique.", notes: commonProgNotes };
      } else if (answers.progression_type_egfr === 'oligometastatic') {
        return { isComplete: true, title: `${baseTitle} - Del19/L858R - Evolution oligométastatique`, treatment: "-Discuter d'un traitement local du site M+ et poursuite de l'ITK. -Eviter la radiothérapie panencéphalique.", notes: commonProgNotes };
      }
    }
  }

  if (answers.mutation_type === 't790m') {
     if (!answers.treatment_context) return { isComplete: false };
    return {
      isComplete: true,
      title: `${baseTitle} - Mutation T790M`,
      treatment: "Osimertinib si non donné en 1ère ligne.",
      notes: ["Si Osimertinib déjà utilisé, se référer à la progression sous Osimertinib (branche Del19/L858R)."]
    };
  }

  if (answers.mutation_type === 'other_sensitizing') { 
    return {
      isComplete: true,
      title: `${baseTitle} - Mutations rares (G719X, L861Q, S768I, combinées)`,
      treatment: "Afatinib.",
      alternatives: ["Option: Osimertinib."],
      notes: ["En cas de progression, gestion similaire à la progression sous ITK pour Del19/L858R (oligométastatique, lente, multifocale) avec discussion de changement d'ITK ou chimiothérapie."]
    };
  }

  if (answers.mutation_type === 'exon20_insertion') {
    return {
      isComplete: true,
      title: `${baseTitle} - Insertion dans l'exon 20`,
      treatment: "Option: Carboplatine-Pemetrexed + Amivantamab puis maintenance ami-pemetrexed en AAP.",
      alternatives: ["Traitement identique au CBNPC WT.", "Essais cliniques."],
      notes: ["En cas de progression: Essais cliniques ou Idem CBNPC WT sinon."]
    };
  }
  
  return { isComplete: false };
};


export const calculateALKRecommendation = (answers: Answers): RecommendationResult => {
  if (!answers.treatment_phase) return { isComplete: false };
  const baseTitle = "Stades Métastatiques avec Réarrangement ALK";

  if (answers.treatment_phase === 'first_line') {
    return {
      isComplete: true,
      title: `${baseTitle} - 1ère ligne`,
      treatment: "Lorlatinib.",
      alternatives: ["Alectinib ou Brigatinib en cas de contre-indication ou toxicité au Lorlatinib."],
      posology: "Lorlatinib 100 mg/jour.",
      notes: ["Surveillance des effets secondaires (hyperlipidémie, troubles cognitifs)."]
    };
  }

  if (answers.treatment_phase === 'resistance_progression') {
    if (!answers.resistance_type_alk) return { isComplete: false };

    if (answers.resistance_type_alk === 'primary_resistance') {
      return {
        isComplete: true,
        title: `${baseTitle} - Résistance primaire`,
        treatment: "Vérifier Observance & interactions (dont thérapies non conventionnelles).",
        notes: ["Discuter re-biopsie / ADN circulant. Changement d'ITK ou chimiothérapie à discuter en RCP."]
      };
    }

    if (answers.resistance_type_alk === 'acquired_resistance') {
      if (!answers.previous_tki_alk || !answers.progression_pattern_alk) return { isComplete: false };
      
      const commonNotesProg = ["Rebiopsie / ADN Circulant (Ne permet pas de détecter les fusions ou transformation histologique)."];
      let tkiAfterProg = "Traitement adapté au mécanisme de résistance après avis en RCP.";

      if (answers.previous_tki_alk === 'alectinib_brigatinib' || answers.previous_tki_alk === 'other_tki') {
        tkiAfterProg = "Lorlatinib.";
      }

      if (answers.progression_pattern_alk === 'oligometastatic') {
        return { isComplete: true, title: `${baseTitle} - Progression oligométastatique`, treatment: "-Discuter d'un traitement local du site M+ et poursuite de l'ITK. -Eviter la radiothérapie pan-encéphalique.", notes: commonNotesProg };
      } else if (answers.progression_pattern_alk === 'slow') {
        return { isComplete: true, title: `${baseTitle} - Evolution lente`, treatment: "-Discuter d'une poursuite de l'ITK si bénéfice clinique.", notes: commonNotesProg };
      } else if (answers.progression_pattern_alk === 'multifocal') {
        let mainRec = "";
        const alternativesRec: string[] = [];
        if (answers.previous_tki_alk === 'alectinib_brigatinib' || answers.previous_tki_alk === 'other_tki') {
            mainRec = "Lorlatinib.";
            alternativesRec.push("-Traitement adapté au mécanisme de résistance après avis en RCP.");
        } else { // après Lorlatinib
            mainRec = "-Traitement adapté au mécanisme de résistance après avis en RCP.";
            alternativesRec.push("-Chimiothérapie : doublet à base de sels de platine et pemetrexed +/- bevacizumab et sans immunothérapie.");
            alternativesRec.push("-Essais cliniques.");
            alternativesRec.push("-Toute autre après avis d'une RCP.");
        }
        return { isComplete: true, title: `${baseTitle} - Evolution multifocale (après ${answers.previous_tki_alk})`, treatment: mainRec, alternatives: alternativesRec, notes: commonNotesProg };
      }
    }
  }
  
  return { isComplete: false };
};

export const calculateOtherMutationsRecommendation = (answers: Answers): RecommendationResult => {
  if (!answers.mutation_type) return { isComplete: false };
  const baseTitle = "Stades Métastatiques - Autres Altérations Moléculaires Rares";

  switch (answers.mutation_type) {
    case 'ros1':
      return {
        isComplete: true,
        title: `${baseTitle} - Réarrangement ROS1`,
        treatment: "Entrectinib ou Crizotinib en 1ère ligne.",
        alternatives: ["Lorlatinib ou Repotrectinib en lignes ultérieures ou si progression cérébrale."],
        notes: ["Surveillance hépatique et visuelle (Crizotinib), neurologique (Entrectinib)."]
      };
    case 'ret':
      return {
        isComplete: true,
        title: `${baseTitle} - Réarrangement RET`,
        treatment: "Selpercatinib ou Pralsetinib en 1ère ligne.",
        notes: ["Surveillance QTc, hypertension, fonctions thyroïdiennes."]
      };
    case 'ntrk':
      return {
        isComplete: true,
        title: `${baseTitle} - Fusion NTRK1/2/3`,
        treatment: "Larotrectinib ou Entrectinib.",
        notes: ["Traitement agnostique. Surveillance neurologique (Entrectinib)."]
      };
    case 'kras_g12c':
      return {
        isComplete: true,
        title: `${baseTitle} - Mutation KRAS G12C`,
        treatment: "Sotorasib ou Adagrasib (après progression sous chimio-immunothérapie).",
        alternatives: ["Chimio-immunothérapie en 1ère ligne (standard)."],
        notes: ["ITK spécifiques en lignes ultérieures. Surveillance hépatique."]
      };
    case 'met_exon14': 
      return {
        isComplete: true,
        title: `${baseTitle} - Saut d'exon 14 de MET`,
        treatment: "Capmatinib ou Tepotinib.",
        notes: ["Surveillance œdèmes périphériques, pneumopathie interstitielle."]
      };
    case 'her2': 
      return {
        isComplete: true,
        title: `${baseTitle} - Mutation HER2 (ERBB2)`,
        treatment: "Trastuzumab Deruxtecan (T-DXd) en AAP (souvent après échec d'une 1ère ligne).",
        alternatives: ["Chimiothérapie + Trastuzumab (hors AMM CBNPC mais utilisé).", "Essais cliniques."],
        notes: ["Surveillance pour pneumopathie interstitielle (T-DXd)."]
      };
    default:
      return { isComplete: false };
  }
};