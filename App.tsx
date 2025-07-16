import React, { useState, useCallback, useEffect } from 'react';
import { STAGES, ALL_NODES } from './data/decisionTree';
import { Stage, NodeData, DecisionOption, BreadcrumbEntry } from './types';
import { StageSelector } from './components/StageSelector';
import { Breadcrumb } from './components/Breadcrumb';
import { NodeDisplay } from './components/NodeDisplay';
import { AIAssistantButton } from './components/AIAssistantButton';
import { AIAssistant } from './components/AIAssistant';

export const App = (): JSX.Element => {
  const [activeStageId, setActiveStageId] = useState<string | null>(null);
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
  const [decisionPath, setDecisionPath] = useState<BreadcrumbEntry[]>([]);
  const [currentNodeData, setCurrentNodeData] = useState<NodeData | null>(null);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);


  useEffect(() => {
    if (currentNodeId) {
      setCurrentNodeData(ALL_NODES[currentNodeId] || null);
    } else {
      setCurrentNodeData(null);
    }
  }, [currentNodeId]);

  const handleSelectStage = useCallback((stageId: string, initialNodeId: string, stageLabel: string) => {
    setActiveStageId(stageId);
    setCurrentNodeId(initialNodeId);
    setDecisionPath([{ nodeId: stageId, label: stageLabel }]);
  }, []);

  const handleOptionClick = useCallback((option: DecisionOption) => {
    if (ALL_NODES[option.nextNodeId]) {
      setCurrentNodeId(option.nextNodeId);
      setDecisionPath(prevPath => [...prevPath, { nodeId: option.nextNodeId, label: option.breadcrumbLabel }]);
    } else {
      console.warn(`Node with id "${option.nextNodeId}" not found. Ending path.`);
    }
  }, []);

  const resetApp = useCallback(() => {
    setActiveStageId(null);
    setCurrentNodeId(null);
    setDecisionPath([]);
    setCurrentNodeData(null);
  }, []);
  
  const closeAIAssistant = useCallback(() => setIsAIAssistantOpen(false), []);
  const openAIAssistant = useCallback(() => setIsAIAssistantOpen(true), []);

  const IntroductoryContent = (): JSX.Element => (
    <div className="p-6 md:p-10 text-slate-700 animate-fadeIn">
      <h2 className="text-2xl md:text-3xl font-semibold text-sky-700 mb-6">
        Bienvenue à l'Application d'Aide au Diagnostic et Traitement du CBNPC
      </h2>
      <p className="mb-4 text-lg">
        Cette application est un outil interactif conçu pour guider les professionnels de santé à travers les complexités du diagnostic et du traitement du Cancer Bronchique Non à Petites Cellules (CBNPC).
      </p>
      <p className="mb-4">
        Elle s'appuie sur les <strong className="font-semibold">Référentiels Auvergne Rhône-Alpes en Oncologie Thoracique 2025</strong>, fruit d'un travail collaboratif d'experts de la région, coordonné par l'association ARISTOT. Ces référentiels visent à harmoniser et optimiser la prise en charge des patients.
      </p>
      <div className="mt-6 p-4 border-l-4 border-red-500 bg-red-50 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-red-700 mb-2">Avertissement Important</h3>
        <p className="text-red-600">
          Cette application est proposée à titre <strong className="font-semibold">pédagogique et informatif</strong>. Elle est destinée à servir d'aide-mémoire et de support à la décision clinique.
        </p>
        <p className="mt-2 text-red-600">
          Elle <strong className="font-semibold">ne se substitue en aucun cas</strong> à l'avis médical expert, au jugement clinique d'un professionnel de santé qualifié, ou aux discussions et décisions prises en Réunion de Concertation Pluridisciplinaire (RCP). Toute décision thérapeutique doit être individualisée et prise par un médecin en tenant compte du contexte clinique global et spécifique de chaque patient.
        </p>
      </div>
      <p className="mt-6 text-sm text-slate-500">
        Pour commencer, vous pouvez soit sélectionner un stade clinique dans la barre latérale pour parcourir l'arbre décisionnel, soit poser directement votre question à notre assistant IA en cliquant sur l'icône en bas à droite. Ses réponses sont basées exclusivement sur les référentiels.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 text-white p-6 md:p-8 text-center shadow-md sticky top-0 z-40">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">Application d'aide au Diagnostic et Traitement du CBNPC</h1>
        <a
          href="https://referentiels-aristot.com/wp-content/uploads/01_CBNPC_2025.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm md:text-base text-sky-100 hover:text-white hover:underline transition-colors duration-200 mt-2 block"
        >
          Basée sur les Référentiels Auvergne Rhône-Alpes en Oncologie Thoracique 2025
        </a>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-1/3 lg:w-1/4 bg-white p-4 md:p-6 border-r border-slate-200 shadow-lg md:min-h-screen md:sticky md:top-[calc(6rem+1px)] self-start overflow-y-auto z-30"> {/* Adjusted top for increased header padding and subtitle margin. */}
          <StageSelector stages={STAGES} onSelectStage={handleSelectStage} activeStageId={activeStageId} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {!currentNodeId ? (
            <IntroductoryContent />
          ) : (
            <>
              {decisionPath.length > 0 && <Breadcrumb path={decisionPath} />}
              {currentNodeData && (
                <div className="mt-4">
                  <NodeDisplay node={currentNodeData} onOptionClick={handleOptionClick} />
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {currentNodeId && (
        <button
          onClick={resetApp}
          className="fixed bottom-24 right-6 md:bottom-28 md:right-10 py-3 px-6 bg-red-600 text-white rounded-full font-semibold cursor-pointer shadow-xl hover:bg-red-700 hover:-translate-y-0.5 transform transition-all duration-300 z-40 flex items-center gap-2"
          aria-label="Recommencer la navigation"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          Recommencer
        </button>
      )}

      <AIAssistantButton onClick={openAIAssistant} />
      <AIAssistant 
        isOpen={isAIAssistantOpen} 
        onClose={closeAIAssistant}
        currentNodeData={currentNodeData}
        decisionPath={decisionPath}
      />

      <footer className="text-center py-4 bg-slate-100 text-sm text-slate-600 border-t border-slate-200">
        <p>&copy; {new Date().getFullYear()} Application d'Aide au Diagnostic et Traitement du CBNPC, développée par Dr Zouhair Souissi.</p>
      </footer>
    </div>
  );
};