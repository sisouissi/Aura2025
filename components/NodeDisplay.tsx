
import React from 'react';
import { NodeData, DecisionOption } from '../types';
import RecommendationCard from './RecommendationCard';
import QuestionCard from './QuestionCard';

interface NodeDisplayProps {
  node: NodeData | null;
  onOptionClick: (option: DecisionOption) => void;
}

const NodeDisplay = ({ node, onOptionClick }: NodeDisplayProps): JSX.Element | null => {
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

export default NodeDisplay;

// Add fadeIn animation to tailwind config or global styles if not default
// For now, let's use a simple CSS keyframe animation injected via a style tag or rely on App.css.
// Given no CSS files are allowed, it can be added to index.html or done with JS if really needed.
// Or, use Tailwind's animation classes if suitable.
// Let's add simple opacity transition for now using Tailwind.
// The `animate-fadeIn` class would be:
/*
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}
*/
// This should be in index.html in a <style> tag if not using a CSS file.
// Or ensure tailwind.config.js has this animation if using a build step.
// For CDN Tailwind, could add to <style> in index.html.
// For this exercise, assuming it's handled or we rely on simple transitions.