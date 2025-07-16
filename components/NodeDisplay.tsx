
import React from 'react';
import { NodeData, DecisionOption } from '../types';
import { RecommendationCard } from './RecommendationCard';
import { QuestionCard } from './QuestionCard';

interface NodeDisplayProps {
  node: NodeData | null;
  onOptionClick: (option: DecisionOption) => void;
}

export const NodeDisplay = ({ node, onOptionClick }: NodeDisplayProps): JSX.Element | null => {
  if (!node) {
    return null;
  }

  return (
    <div className="animate-fadeIn">
      {node.recommendationBlocks && <RecommendationCard blocks={node.recommendationBlocks} />}
      {node.question && <QuestionCard questionPayload={node.question} onOptionClick={onOptionClick} />}
    </div>
  );
};
