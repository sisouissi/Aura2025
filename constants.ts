
import { FileText, Users, Activity, Dna, AlertCircle } from 'lucide-react';
import { Tab } from './types';

export const TABS: Tab[] = [
  { id: 'stage1', label: 'Stades cI (T1-T2aN0)', icon: FileText, color: 'blue' },
  { id: 'stage2-3', label: 'Stades cII-cIIIB (Résécables)', icon: Users, color: 'green' },
  { id: 'stage3advanced', label: 'Stades IIIA-C (Non Résécables d\'emblée)', icon: Activity, color: 'orange' },
  { id: 'apex', label: 'Tumeurs de l\'apex (Pancoast)', icon: AlertCircle, color: 'red' },
  { id: 'stage4-nonepi', label: 'Stade IV Non-Épidermoïde (Sans mutation)', icon: Dna, color: 'purple' },
  { id: 'stage4-epi', label: 'Stade IV Épidermoïde (Sans mutation)', icon: Dna, color: 'indigo' },
  { id: 'stage4-second', label: 'Stade IV - Seconde Ligne (Après progression)', icon: Activity, color: 'pink' },
  { id: 'egfr', label: 'Mutations EGFR (Stades avancés/métastatiques)', icon: Dna, color: 'emerald' },
  { id: 'alk', label: 'Réarrangements ALK (Stades avancés/métastatiques)', icon: Dna, color: 'cyan' },
  { id: 'other-mutations', label: 'Autres Mutations Ciblables (Stades avancés/métastatiques)', icon: Dna, color: 'amber' }
];
