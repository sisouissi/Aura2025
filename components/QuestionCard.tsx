
import React from 'react';
import { QuestionPayload, DecisionOption } from '../types';

interface QuestionCardProps {
  questionPayload: QuestionPayload;
  onOptionClick: (option: DecisionOption) => void;
}

const QuestionCard = ({ questionPayload, onOptionClick }: QuestionCardProps): JSX.Element | null => {
  if (!questionPayload) {
    return null;
  }

  return (
    <div className="bg-slate-50 rounded-xl p-6 md:p-8 mb-8 shadow-lg border border-slate-200">
      <div className="question text-xl font-semibold text-gray-700 mb-6">
        {questionPayload.text}
      </div>
      <div className="options flex flex-col sm:flex-row sm:flex-wrap gap-3">
        {questionPayload.options.map((option) => (
          <button
            key={option.nextNodeId}
            onClick={() => onOptionClick(option)}
            className="
              py-3 px-5 border-2 border-slate-300 rounded-lg 
              bg-white text-slate-700 text-base font-medium cursor-pointer
              transition-all duration-300 ease-in-out
              hover:border-purple-600 hover:text-purple-600 hover:-translate-y-0.5 hover:shadow-md
              flex-grow sm:flex-grow-0 sm:basis-auto min-w-[120px] text-left sm:text-center
            "
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;