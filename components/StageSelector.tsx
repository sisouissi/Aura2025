
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
      <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center md:text-left">
        Sélectionnez le stade clinique
      </h2>
      <div className="flex flex-col gap-2.5">
        {stages.map((stage) => (
          <button
            key={stage.id}
            onClick={() => onSelectStage(stage.id, stage.initialNodeId, stage.buttonLabel)}
            className={`
              py-2.5 px-4 w-full rounded-md text-sm font-medium cursor-pointer 
              transition-all duration-200 ease-in-out text-left
              border 
              ${activeStageId === stage.id
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-transparent shadow-md ring-2 ring-offset-1 ring-indigo-400'
                : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-300 hover:border-slate-400 focus:ring-2 focus:ring-indigo-300'
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