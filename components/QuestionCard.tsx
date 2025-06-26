
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
    <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 mb-8 shadow-xl border border-slate-200">
      <div className="question text-xl md:text-2xl font-semibold text-sky-700 mb-8">
        {questionPayload.text}
      </div>
      <div className="options flex flex-col sm:flex-row sm:flex-wrap gap-4"> {/* Increased gap */}
        {questionPayload.options.map((option) => (
          <button
            key={option.nextNodeId}
            onClick={() => onOptionClick(option)}
            className="
              py-3 px-6 border-2 rounded-lg
              bg-slate-100 text-slate-700 text-base font-medium cursor-pointer
              transition-all duration-300 ease-in-out
              border-slate-300 
              hover:bg-sky-500 hover:text-white hover:border-sky-500 
              transform hover:-translate-y-1 hover:shadow-lg
              focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2
              flex-grow sm:flex-grow-0 sm:basis-auto min-w-[140px] text-center
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