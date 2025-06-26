
import React from 'react';
import { Stage } from '../types';

interface StageSelectorProps {
  stages: Stage[];
  onSelectStage: (stageId: string, initialNodeId: string, stageLabel: string) => void;
  activeStageId: string | null;
}

const StageSelector = ({ stages, onSelectStage, activeStageId }: StageSelectorProps): JSX.Element => {
  return (
    <div className="mb-6 md:mb-10">
      <h2 className="text-xl font-semibold text-sky-700 mb-4 text-center md:text-left">
        Sélectionnez le stade clinique
      </h2>
      <div className="flex flex-col gap-3"> {/* Increased gap slightly */}
        {stages.map((stage) => (
          <button
            key={stage.id}
            onClick={() => onSelectStage(stage.id, stage.initialNodeId, stage.buttonLabel)}
            className={`
              py-3 px-4 w-full rounded-lg text-sm font-medium cursor-pointer
              transition-all duration-300 ease-in-out text-left
              border 
              focus:outline-none focus:ring-2 focus:ring-offset-1
              ${activeStageId === stage.id
                ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white border-sky-600 shadow-md ring-sky-400'
                : 'bg-slate-50 hover:bg-sky-50 text-slate-700 border-slate-300 hover:border-sky-400 hover:text-sky-700 focus:ring-sky-300'
              }
            `}
            aria-pressed={activeStageId === stage.id}
          >
            {stage.buttonLabel}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StageSelector;