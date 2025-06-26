
export interface BreadcrumbEntry {
  nodeId: string;
  label: string;
}

export interface TreatmentItemDetail {
  text: string; // Can contain HTML for bold, br
  isOptionLabel?: boolean; // e.g., "Option :"
}

export interface TreatmentItem {
  title?: string;
  detailsArray: TreatmentItemDetail[]; // Changed from string to allow more structured details
  isNestedWarning?: boolean;
  nestedWarningStrongText?: string;
  nestedWarningText?: string;
}

export interface RecommendationBlock {
  title?: string;
  items: TreatmentItem[];
  isMainWarningBox?: boolean;
  warningStrongText?: string; // For the strong text in main warning box style
  accentColorClass?: string;
  backgroundColorClass?: string;
  titleColorClass?: string;
  textColorClass?: string; // For the main text color in this block
}

export interface DecisionOption {
  label: string;
  nextNodeId: string;
  breadcrumbLabel: string;
}

export interface QuestionPayload {
  text: string;
  options: DecisionOption[];
}

export interface NodeData {
  id: string;
  recommendationBlocks?: RecommendationBlock[];
  question?: QuestionPayload;
}

export interface Stage {
  id: string;
  buttonLabel: string;
  initialNodeId: string;
}

export type DecisionTree = Record<string, NodeData>;
