
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRight, ChevronLeft, RotateCcw, FileText, Users, Activity, Dna, AlertCircle, Download, Search, Clock, CheckCircle, LucideIcon } from 'lucide-react';
import { TABS } from './constants';
import { getQuestions } from './services/questionService';
import { 
  calculateStage1Recommendation,
  calculateStage2_3Recommendation,
  calculateStage3AdvancedRecommendation,
  calculateApexRecommendation,
  calculateStage4NonEpiRecommendation,
  calculateStage4EpiRecommendation,
  calculateStage4SecondRecommendation,
  calculateEGFRRecommendation,
  calculateALKRecommendation,
  calculateOtherMutationsRecommendation
} from './services/recommendationService';
import { Answers, Question, Recommendation, HistoryItem, Tab, RecommendationResult } from './types';

const NSCLCDiagnosticApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(TABS[0].id);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [consultationHistory, setConsultationHistory] = useState<HistoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const resetFlow = useCallback(() => {
    setCurrentStep(0);
    setAnswers({});
    setRecommendation(null);
  }, []);

  const getCurrentQuestion = useCallback((): Question | undefined => {
    const questions = getQuestions(activeTab);
    let questionIndex = 0;
    let numValidQuestionsPassed = 0;
    while(questionIndex < questions.length && numValidQuestionsPassed <= currentStep) {
        const q = questions[questionIndex];
        if (!q.condition || q.condition(answers)) {
            if (numValidQuestionsPassed === currentStep) {
                return q;
            }
            numValidQuestionsPassed++;
        }
        questionIndex++;
    }
    return undefined;
  }, [activeTab, currentStep, answers]);

  const goToPreviousStep = useCallback(() => {
    if (recommendation) {
      setRecommendation(null); 
      return;
    }

    if (currentStep > 0) {
      const questionBeingLeft = getCurrentQuestion();       
      setCurrentStep(prev => prev - 1); 

      if (questionBeingLeft) {
        const newAnswers = { ...answers };
        delete newAnswers[questionBeingLeft.key];
        setAnswers(newAnswers);
      }
    }
  }, [currentStep, recommendation, answers, getCurrentQuestion, setRecommendation, setCurrentStep, setAnswers]);


  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        goToPreviousStep();
      }
      if (event.key === 'r' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        resetFlow();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [goToPreviousStep, resetFlow]);


  const calculateRecommendation = useCallback((tab: string, currentAnswers: Answers): RecommendationResult => {
    switch (tab) {
      case 'stage1': return calculateStage1Recommendation(currentAnswers);
      case 'stage2-3': return calculateStage2_3Recommendation(currentAnswers);
      case 'stage3advanced': return calculateStage3AdvancedRecommendation(currentAnswers);
      case 'apex': return calculateApexRecommendation(currentAnswers);
      case 'stage4-nonepi': return calculateStage4NonEpiRecommendation(currentAnswers);
      case 'stage4-epi': return calculateStage4EpiRecommendation(currentAnswers);
      case 'stage4-second': return calculateStage4SecondRecommendation(currentAnswers);
      case 'egfr': return calculateEGFRRecommendation(currentAnswers);
      case 'alk': return calculateALKRecommendation(currentAnswers);
      case 'other-mutations': return calculateOtherMutationsRecommendation(currentAnswers);
      default: return { isComplete: false };
    }
  }, []);

  const addToHistory = useCallback((rec: Recommendation, currentAnswers: Answers) => {
    const historyItem: HistoryItem = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      tab: activeTab,
      recommendation: rec,
      answers: { ...currentAnswers }
    };
    setConsultationHistory(prev => [historyItem, ...prev.slice(0, 4)]);
  }, [activeTab]);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
    resetFlow();
  }, [resetFlow]);

  const handleAnswer = useCallback((questionKey: string, answerValue: string) => {
    const newAnswers = { ...answers, [questionKey]: answerValue };
    setAnswers(newAnswers);
    
    const recResult = calculateRecommendation(activeTab, newAnswers);

    if (recResult.isComplete) {
      setRecommendation(recResult);
      addToHistory(recResult, newAnswers);
    } else {
      const questionsForTab = getQuestions(activeTab);
      let nextQuestionExists = false;
      let qIndex = 0;
      let validQPassed = 0;
      while(qIndex < questionsForTab.length && validQPassed <= currentStep + 1) {
          const q = questionsForTab[qIndex];
          if (!q.condition || q.condition(newAnswers)) { 
              if (validQPassed === currentStep + 1) {
                  nextQuestionExists = true;
                  break;
              }
              validQPassed++;
          }
          qIndex++;
      }

      if (nextQuestionExists) {
        setCurrentStep(currentStep + 1);
      } else {
        // If no more questions, but recommendation is not complete, it could be an incomplete branch.
        // It's possible the "Fin de l'algorithme" message in renderQuestion handles this.
        // Or we could set a specific state to indicate an incomplete path without a final recommendation.
        console.warn("No complete recommendation and no more questions for this path.", activeTab, newAnswers);
      }
    }
  }, [answers, activeTab, currentStep, calculateRecommendation, addToHistory, setCurrentStep, setAnswers, setRecommendation]);


  const exportRecommendation = () => {
    if (!recommendation) return;
    
    const exportData = {
      timestamp: new Date().toLocaleString(),
      section: TABS.find(t => t.id === activeTab)?.label,
      recommendation: recommendation,
      answers: answers
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cbnpc-recommandation-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };
  
  const getTotalApplicableQuestions = (): number => {
    const questions = getQuestions(activeTab);
    let count = 0;
    const tempAnswers = {...answers}; // Use a copy of answers as it was at the START of the current path for THIS tab.
    
    // Iterate through questions for the current tab
    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        if (!q.condition || q.condition(tempAnswers)) {
            count++;
            // If this question was answered, use its answer for subsequent condition checks in THIS loop
            if (answers[q.key]) { // Check original answers for what has been actually answered
                 tempAnswers[q.key] = answers[q.key];
            }
        } else {
            // If a condition is not met, no further questions in this path are applicable
            break; 
        }
    }
    return Math.max(count, currentStep + 1); // Ensure it's at least the current step
  };

  const renderQuestion = () => {
    const question = getCurrentQuestion();
    if (!question) return (
        // This state can occur if an incomplete recommendation is returned and there are no more questions.
        // Or if the question logic somehow fails to return a question when one is expected.
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Fin de l'algorithme ou section incomplète.</h3>
            <p className="text-gray-600 mb-6">Aucune question supplémentaire pour ce chemin ou la section est en cours de développement. Une recommandation finale n'a pas été atteinte.</p>
            <button
                onClick={resetFlow}
                className="flex items-center mx-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
                <RotateCcw size={20} className="mr-2" />
                <span className="font-medium">Recommencer</span>
            </button>
        </div>
    );

    const totalQuestionsInPath = getTotalApplicableQuestions();

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        {(currentStep > 0 || recommendation) && ( // Show back button if not on the first step or if a recommendation is shown (to go back from recommendation)
          <div className="mb-4 flex justify-start">
            <button
              onClick={goToPreviousStep}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <ChevronLeft size={20} className="mr-2" />
              <span className="font-medium">Retour</span>
            </button>
          </div>
        )}

        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start space-x-3 flex-1">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-blue-600 font-bold text-sm">{currentStep + 1}</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 leading-relaxed">{question.question}</h3>
          </div>
        </div>
        
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(question.key, option.value)}
              className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 transform hover:scale-[1.01] shadow-sm hover:shadow-md"
              aria-label={`Répondre : ${option.label}`}
            >
              <span className="font-medium text-gray-800">{option.label}</span>
            </button>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
               <button
                onClick={resetFlow}
                className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors border border-blue-300"
              >
                <RotateCcw size={16} className="mr-2" />
                Recommencer
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">Étape {currentStep + 1} / {totalQuestionsInPath}</span>
              <div className="w-24 bg-gray-200 rounded-full h-2" role="progressbar" aria-valuenow={currentStep + 1} aria-valuemin={1} aria-valuemax={totalQuestionsInPath} aria-label="Progression">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / Math.max(totalQuestionsInPath, 1)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {(currentStep > 0 || recommendation) && ( // Show shortcuts if not on first step or if recommendation is displayed
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-400">
              💡 Raccourcis : <kbd className="px-2 py-1 bg-gray-100 rounded border">Échap</kbd> = Retour | 
              <kbd className="px-2 py-1 bg-gray-100 rounded border">Ctrl+R</kbd> (ou <kbd className="px-2 py-1 bg-gray-100 rounded border">Cmd+R</kbd>) = Recommencer
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderRecommendation = () => {
    if (!recommendation) return null;

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="mb-6 flex flex-wrap gap-3 justify-start">
          <button
            onClick={goToPreviousStep} // This will set recommendation to null, showing the last question
            className="flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <ChevronLeft size={20} className="mr-2" />
            <span className="font-medium">Modifier la dernière réponse</span>
          </button>
          
          <button
            onClick={resetFlow}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <RotateCcw size={20} className="mr-2" />
            <span className="font-medium">Nouveau cas</span>
          </button>
          
          <button
            onClick={exportRecommendation}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <Download size={20} className="mr-2" />
            <span className="font-medium">Exporter</span>
          </button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <CheckCircle className="text-green-600" size={24} />
            <h3 className="text-2xl font-bold text-green-700">{recommendation.title}</h3>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-3 flex items-center">
              <CheckCircle size={20} className="mr-2 text-green-600" />
              Traitement recommandé
            </h4>
            <p className="text-green-700 text-lg font-medium">{recommendation.treatment}</p>
            {recommendation.redirectToTabId && recommendation.treatmentActionLabel && (
              <button
                onClick={() => handleTabChange(recommendation.redirectToTabId!)}
                className="mt-4 flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <ChevronRight size={20} className="mr-2" />
                <span className="font-medium">{recommendation.treatmentActionLabel}</span>
              </button>
            )}
            {recommendation.posology && (
              <div className="mt-4 p-3 bg-green-100 rounded-lg">
                <h5 className="font-medium text-green-800 mb-1">Posologie :</h5>
                <p className="text-green-700 text-sm">{recommendation.posology}</p>
              </div>
            )}
          </div>

          {recommendation.alternatives && recommendation.alternatives.length > 0 && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-3">Alternatives thérapeutiques</h4>
              <ul className="text-blue-700 space-y-2">
                {recommendation.alternatives.map((alt, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>{alt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {recommendation.notes && recommendation.notes.length > 0 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-3">Notes importantes</h4>
              <ul className="text-yellow-700 space-y-2">
                {recommendation.notes.map((note, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-500 mr-2">⚠️</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {recommendation.followUp && (
            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-3">Surveillance</h4>
              <p className="text-purple-700">{recommendation.followUp}</p>
            </div>
          )}
        </div>
        <div className="mt-4 text-center">
            <p className="text-xs text-gray-400">
              💡 Raccourcis : <kbd className="px-2 py-1 bg-gray-100 rounded border">Échap</kbd> = Retour | 
              <kbd className="px-2 py-1 bg-gray-100 rounded border">Ctrl+R</kbd> (ou <kbd className="px-2 py-1 bg-gray-100 rounded border">Cmd+R</kbd>) = Recommencer
            </p>
        </div>
      </div>
    );
  };

  const renderHistory = () => {
    if (consultationHistory.length === 0) return null;

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mt-6">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
          <Clock size={20} className="mr-2 text-gray-700" />
          Historique des consultations (5 derniers)
        </h4>
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {consultationHistory.map((item) => ( 
            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div>
                <p className="font-medium text-sm text-gray-800">{item.recommendation.title}</p>
                <p className="text-xs text-gray-600">{TABS.find(t=>t.id === item.tab)?.label} - {item.timestamp}</p>
              </div>
              <button
                onClick={() => {
                  setActiveTab(item.tab);
                  setAnswers(item.answers);
                  setRecommendation(item.recommendation);
                  // Recalculate currentStep based on reloaded answers
                  const questionsForTab = getQuestions(item.tab);
                  let step = 0;
                  let tempAnswersForStep = {}; // answers for condition checks
                  for (const q of questionsForTab) {
                    if (item.answers[q.key] !== undefined) {
                       tempAnswersForStep = {...tempAnswersForStep, [q.key]: item.answers[q.key]}; // build up answers for conditions
                       if (!q.condition || q.condition(tempAnswersForStep)) {
                           step++; // This question was part of the path
                       } else {
                           break; // Condition not met, path stopped here before this question
                       }
                    } else {
                        // This question was not answered, so path stopped before it.
                        // The number of prior valid questions is the step.
                        break; 
                    }
                  }
                  // currentStep is 0-indexed count of completed steps/questions.
                  // If 1 question was answered, step becomes 1, currentStep should be 0.
                  // If recommendation is set, currentStep effectively becomes the number of questions answered to reach it.
                  setCurrentStep(Math.max(0, step -1)); 
                }}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium px-3 py-1 rounded hover:bg-blue-100"
              >
                Voir
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const currentActiveTabData = TABS.find(t => t.id === activeTab);
  const ActiveIcon: LucideIcon = currentActiveTabData?.icon || FileText;

  const filteredTabs = TABS.filter(tab => 
    tab.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold mb-1 md:mb-2">CBNPC Assistant 2025</h1>
                <p className="text-blue-100 text-md md:text-lg">Référentiels Auvergne Rhône-Alpes</p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-blue-200">Version</p>
                  <p className="font-bold">2025.1.0</p>
                </div>
                 <img src="https://img.icons8.com/plasticine/100/lungs.png" alt="Lungs Icon" className="w-12 h-12"/>
              </div>
            </div>
            
            <div className="mt-6 relative">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-300" size={20} />
              <input
                type="text"
                placeholder="Rechercher une section..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30"
                aria-label="Rechercher une section"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            <nav className="w-full lg:w-80 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200 p-4 lg:p-6" aria-labelledby="sections-heading">
              <div className="mb-6">
                 <h2 id="sections-heading" className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                  <FileText size={24} className="mr-3 text-blue-600" />
                  Sections
                </h2>
                <p className="text-sm text-gray-600">Sélectionnez un arbre décisionnel.</p>
              </div>

              {(currentStep > 0 || recommendation) && (
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Navigation Rapide</h4>
                  <div className="space-y-2">
                    {(currentStep > 0 && !recommendation) && (
                      <button
                        onClick={goToPreviousStep}
                        className="w-full flex items-center space-x-3 px-4 py-2.5 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors border border-orange-200 text-left text-sm font-medium"
                      >
                        <ChevronLeft size={16} />
                        <span>Question précédente</span>
                      </button>
                    )}
                     {recommendation && ( // Show "Modifier réponse" if a recommendation is active
                      <button
                        onClick={goToPreviousStep}
                        className="w-full flex items-center space-x-3 px-4 py-2.5 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors border border-orange-200 text-left text-sm font-medium"
                      >
                        <ChevronLeft size={16} />
                        <span>Modifier réponse</span>
                      </button>
                    )}
                    <button
                      onClick={resetFlow}
                      className="w-full flex items-center space-x-3 px-4 py-2.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors border border-blue-200 text-left text-sm font-medium"
                    >
                      <RotateCcw size={16} />
                      <span>Recommencer section</span>
                    </button>
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                {[
                  { title: 'Stades Précoces', ids: ['stage1', 'stage2-3'] },
                  { title: 'Stades Avancés', ids: ['stage3advanced', 'apex', 'stage4-nonepi', 'stage4-epi', 'stage4-second'] },
                  { title: 'Mutations Ciblables', ids: ['egfr', 'alk', 'other-mutations'] },
                ].map(group => {
                  const relevantTabs = filteredTabs.filter(tab => group.ids.includes(tab.id));
                  if (relevantTabs.length === 0 && searchTerm && TABS.filter(t => group.ids.includes(t.id)).length > 0 ) {
                    // This group originally had tabs, but search filtered them all out. Show nothing for this group then.
                    return null; 
                  }
                  // If the group had no tabs to begin with (even before search), don't render it.
                  if (TABS.filter(t => group.ids.includes(t.id)).length === 0) return null;


                  return (
                    <div key={group.title}>
                      <h5 className="text-xs font-semibold text-gray-500 mb-2 px-1 uppercase tracking-wider">{group.title}</h5>
                      <div className="space-y-1.5">
                        {relevantTabs.map((tab) => {
                          const CurrentTabIcon = tab.icon;
                          const isActive = activeTab === tab.id;
                          const activeClasses = `bg-${tab.color}-600 text-white shadow-md hover:bg-${tab.color}-700`;
                          const inactiveClasses = `bg-white text-gray-700 hover:bg-gray-100 shadow-sm hover:shadow border border-gray-200 hover:border-${tab.color}-300 hover:text-${tab.color}-700`;
                          return (
                            <button
                              key={tab.id}
                              onClick={() => handleTabChange(tab.id)}
                              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 text-left transform active:scale-95 ${
                                isActive ? activeClasses : inactiveClasses
                              }`}
                              aria-pressed={isActive}
                              aria-label={`Section : ${tab.label}`}
                            >
                              <CurrentTabIcon size={18} className={`flex-shrink-0 ${isActive ? 'text-white' : `text-${tab.color}-500`}`} aria-hidden="true" />
                              <span className="flex-1">{tab.label}</span>
                              {isActive && <CheckCircle size={16} className="flex-shrink-0 text-white/80" aria-hidden="true" />}
                            </button>
                          );
                        })}
                         {relevantTabs.length === 0 && searchTerm && TABS.filter(t => group.ids.includes(t.id)).length > 0 && <p className="text-xs text-gray-400 px-1">Aucune section de ce groupe ne correspond à la recherche.</p>}
                      </div>
                    </div>
                  );
                })}
                 {filteredTabs.length === 0 && searchTerm && <p className="text-sm text-gray-500 px-1 py-2">Aucune section ne correspond à votre recherche.</p>}
              </div>
            </nav>

            <main className="flex-1 min-w-0" role="main">
              <div className="lg:hidden bg-blue-50 border-b border-blue-200 p-3 sticky top-0 z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ActiveIcon size={16} className={`text-${currentActiveTabData?.color}-600`} aria-hidden="true"/>
                    <span className={`text-sm text-${currentActiveTabData?.color}-700 font-medium`}>
                      {currentActiveTabData?.label}
                    </span>
                  </div>
                  {!recommendation && <span className="text-xs text-blue-600">Étape {currentStep + 1}</span>}
                  {recommendation && <span className="text-xs text-green-600 flex items-center"><CheckCircle size={14} className="mr-1" aria-hidden="true"/> Prêt</span>}
                </div>
              </div>

              <div className="p-4 md:p-6 lg:p-8">
                {recommendation ? renderRecommendation() : renderQuestion()}
                {renderHistory()}
              </div>
            </main>
          </div>

          <footer className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 md:p-6 border-t text-center">
            <p className="text-xs md:text-sm text-gray-600 mb-1">
              <a 
                href="https://referentiels-aristot.com/129-cancer-bronchique-non-petites-cellules/147-algorithmes/148-stade-i-et-ii/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline text-blue-600 hover:text-blue-700"
              >
                Référentiels Auvergne Rhône-Alpes en Oncologie Thoracique 2025.
              </a> Outil d'aide à la décision, ne remplace pas le jugement clinique.
            </p>
            <p className="text-xs md:text-sm text-gray-500">
              Application développée par Dr Zouhair Souissi
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default NSCLCDiagnosticApp;
