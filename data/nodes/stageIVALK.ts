import { NodeData } from '../../types';

export const STAGE_IV_ALK_NODES: Record<string, NodeData> = {
  'IV-ALK_entry': {
    id: 'IV-ALK_entry',
    recommendationBlocks: [
      {
        isMainWarningBox: true,
        warningStrongText: "STADES METASTATIQUE AVEC REARRANGEMENT DE ALK",
        items:[],
        accentColorClass: 'border-l-amber-500', backgroundColorClass: 'bg-amber-50', textColorClass: 'text-amber-700',
      },
      {
        title: "Traitement de 1ère ligne",
        items: [
          { detailsArray: [{text: "<strong>Lorlatinib</strong><br>(Alectinib ou Brigatinib en cas de contre-indication ou toxicité)"}] },
        ],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
      }
    ],
    question: {
      text: 'Progression ou résistance primaire ?',
      options: [
        { label: 'Progression', nextNodeId: 'IV-ALK_progression_type_q', breadcrumbLabel: 'Progression' },
        { label: 'Résistance primaire', nextNodeId: 'IV-ALK_resistance_primaire', breadcrumbLabel: 'Résistance primaire' },
      ],
    },
  },
  'IV-ALK_resistance_primaire': {
    id: 'IV-ALK_resistance_primaire',
    recommendationBlocks: [
      {
        title: "Résistance primaire",
        items: [
          { detailsArray: [{text: "Vérifier Observance & interactions (dont thérapies non conventionnelles)"}] },
        ],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
      },
    ],
  },
  'IV-ALK_progression_type_q': {
    id: 'IV-ALK_progression_type_q',
    question: {
      text: 'Type de progression ?',
      options: [
        { label: 'Évolution multifocale', nextNodeId: 'IV-ALK_prog_multifocal', breadcrumbLabel: 'Évolution multifocale' },
        { label: 'Évolution lente', nextNodeId: 'IV-ALK_prog_slow', breadcrumbLabel: 'Évolution lente' },
        { label: 'Évolution oligo-métastatique', nextNodeId: 'IV-ALK_prog_oligo', breadcrumbLabel: 'Oligo-métastatique' },
      ],
    },
  },
  'IV-ALK_prog_multifocal': {
    id: 'IV-ALK_prog_multifocal',
    recommendationBlocks: [
      {
        title: "Évolution multifocale",
        items: [
          { detailsArray: [{text: "Rebiopsie / ADN Circulant<sup>¥</sup><br><br><em><sup>¥</sup>Ne permet pas de détecter les fusions ou transformation histologique.</em>"}] },
        ],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
      },
    ],
    question: {
      text: "Après quel traitement de 1ère ligne ?",
      options: [
        { label: 'Après Alectinib ou Brigatinib', nextNodeId: 'IV-ALK_after_alec_briga', breadcrumbLabel: 'Post Alec/Briga' },
        { label: 'Après Lorlatinib', nextNodeId: 'IV-ALK_after_lorla', breadcrumbLabel: 'Post Lorla' },
      ],
    },
  },
  'IV-ALK_prog_slow': {
    id: 'IV-ALK_prog_slow',
    recommendationBlocks: [
      {
        title: "Évolution lente après ITK de 1ère ligne",
        items: [
          { detailsArray: [{text: "Discuter d'une poursuite de l'ITK si bénéfice clinique"}] },
        ],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
      },
    ],
  },
  'IV-ALK_prog_oligo': {
    id: 'IV-ALK_prog_oligo',
    recommendationBlocks: [
      {
        title: "Évolution oligo-métastatique après ITK de 1ère ligne",
        items: [
          { detailsArray: [{text: "Discuter d'un traitement local du site M+ et poursuite de l'ITK<br>Eviter la radiothérapie pan-encéphalique"}] },
        ],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
      },
    ],
  },
  'IV-ALK_after_alec_briga': {
    id: 'IV-ALK_after_alec_briga',
    recommendationBlocks: [
      {
        title: "Progression multifocale après Alectinib ou Brigatinib en 1ère ligne",
        items: [
          { detailsArray: [{text: "Traitement adapté au mécanisme de résistance après avis en RCP<br>Lorlatinib"}] },
        ],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
      },
    ],
  },
  'IV-ALK_after_lorla': {
    id: 'IV-ALK_after_lorla',
    recommendationBlocks: [
      {
        title: "Progression multifocale après Lorlatinib en 1ère ligne",
        items: [
          { detailsArray: [{text: "Traitement adapté au mécanisme de résistance après avis en RCP<br>Chimiothérapie : doublet à base de sels de platine et pemetrexed +/- bevacizumab et sans immunothérapie<br>Essais cliniques<br>Toute autre après avis d'une RCP."}] },
        ],
        accentColorClass: 'border-l-sky-600', backgroundColorClass: 'bg-sky-50', titleColorClass: 'text-sky-800', textColorClass: 'text-slate-700',
      },
    ],
  },
};