
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChatMessage, NodeData, BreadcrumbEntry, GroundingSource } from '../types';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  currentNodeData: NodeData | null;
  decisionPath: BreadcrumbEntry[];
}

export const AIAssistant = ({ isOpen, onClose, currentNodeData, decisionPath }: AIAssistantProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    if (!chat) {
      if (!process.env.API_KEY) {
        setMessages([{ role: 'model', text: "Erreur : La clé d'API n'est pas configurée. L'assistant IA est désactivé." }]);
        return;
      }
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const systemInstruction = `You are a helpful AI assistant for oncologists using a decision support application for Thoracic Oncology.
Your responses must be based *exclusively* on the two official 2025 guidelines documents from 'Référentiels Auvergne Rhône-Alpes en Oncologie Thoracique', which are available online. You must use the provided search tool to access these specific documents:
1.  Non-Small Cell Lung Cancer (NSCLC) guide: https://referentiels-aristot.com/wp-content/uploads/01_CBNPC_2025.pdf
2.  Pulmonary Neuroendocrine Neoplasms (NNE) guide: https://referentiels-aristot.com/wp-content/uploads/02_NNE_2025.pdf

When answering, you MUST prioritize and use information found only within these two documents. If a user's question cannot be answered from these documents, you must clearly state that the information is not available in the specified guidelines and do not provide an answer from general knowledge.
Your role is to answer questions in French. You can summarize information, explain medical terms, and provide details based on the user's current context in the decision tree, as long as the information is confirmed by the specified PDF documents.
Use Markdown formatting (like lists, bold text, italics, and headings) to structure your answers for clarity and readability.
Always be professional, concise, and helpful.
Crucially, you must always remind the user that this tool is for educational and informational purposes only and is not a substitute for expert clinical judgment or a decision from a multidisciplinary team meeting (Réunion de Concertation Pluridisciplinaire - RCP). Every treatment decision must be individualized by a qualified physician. Do not provide direct medical advice.`;
        
        const newChat = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: { 
            systemInstruction,
            tools: [{googleSearch: {}}],
          },
        });

        setChat(newChat);
        setMessages([{ role: 'model', text: "Bonjour! Je suis votre assistant IA basé sur les Référentiels Auvergne Rhône-Alpes en Oncologie Thoracique 2025, Comment puis-je vous aider ?" }]);
      } catch (error) {
        console.error("Failed to initialize AI Assistant:", error);
        setMessages([{ role: 'model', text: "Une erreur est survenue lors de l'initialisation de l'assistant IA." }]);
      }
    }
  }, [isOpen, chat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading || !chat) return;

    const userMessage: ChatMessage = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    const contextString = `
      Contexte actuel de l'utilisateur dans l'application :
      - Chemin de décision : ${decisionPath.map(p => p.label).join(' -> ')}
      - Recommandations affichées : ${currentNodeData?.recommendationBlocks ? JSON.stringify(currentNodeData.recommendationBlocks, null, 2) : 'Aucune'}
      - Question actuelle posée à l'utilisateur : ${currentNodeData?.question ? JSON.stringify(currentNodeData.question, null, 2) : 'Aucune'}
    `;

    const fullPrompt = `Basé sur le contexte suivant, réponds à la question de l'utilisateur.\n${contextString}\n\nQuestion de l'utilisateur: "${userMessage.text}"`;
    
    setMessages(prev => [...prev, { role: 'model', text: '' }]);

    try {
      const stream = await chat.sendMessageStream({ message: fullPrompt });
      let fullResponse = '';
      let finalGroundingChunks: any[] | undefined;

      for await (const chunk of stream) {
        fullResponse += chunk.text;
        if (chunk.candidates?.[0]?.groundingMetadata?.groundingChunks) {
            finalGroundingChunks = chunk.candidates[0].groundingMetadata.groundingChunks;
        }
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = fullResponse;
          return newMessages;
        });
      }

      if (finalGroundingChunks) {
        const sources: GroundingSource[] = finalGroundingChunks
          .map(chunk => chunk.web)
          .filter(web => web?.uri && web?.title)
          .map(web => ({ uri: web.uri, title: web.title }));
        
        setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage && lastMessage.role === 'model') {
                lastMessage.sources = sources;
            }
            return newMessages;
        });
      }

    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      const errorMessage = "Désolé, une erreur est survenue. Veuillez réessayer.";
      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages.length > 0 && newMessages[newMessages.length - 1].role === 'model') {
           newMessages[newMessages.length - 1].text = errorMessage;
        } else {
            newMessages.push({role: 'model', text: errorMessage});
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, chat, decisionPath, currentNodeData]);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e as any);
    }
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <aside 
        className={`fixed top-0 right-0 h-full w-full md:w-1/2 lg:w-1/3 bg-slate-50 shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-assistant-title"
      >
        <header className="flex items-center justify-between p-4 border-b border-slate-200 bg-white sticky top-0">
          <h2 id="ai-assistant-title" className="text-xl font-semibold text-sky-700">Ask AURA 2025</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200" aria-label="Fermer l'assistant Ask AURA 2025">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-slate-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow ${msg.role === 'user' ? 'bg-sky-500 text-white' : 'bg-white text-slate-800'}`}>
                {msg.role === 'user' ? (
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                ) : (
                  <div className="markdown-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                  </div>
                )}
                 {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-200">
                      <h4 className="text-xs font-semibold text-slate-500 mb-2">Sources:</h4>
                      <ul className="space-y-1.5">
                        {msg.sources.map((source, i) => (
                          <li key={i} className="text-xs flex gap-x-2">
                            <span className="flex-shrink-0 text-slate-400">{i + 1}.</span>
                            <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-sky-700 hover:underline break-all" title={source.uri}>
                              {source.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {isLoading && msg.role === 'model' && index === messages.length - 1 && (
                    <span className="inline-block w-1 h-4 ml-1 bg-slate-600 animate-ping"></span>
                  )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <footer className="p-4 border-t border-slate-200 bg-white sticky bottom-0">
          <form onSubmit={handleSendMessage} className="flex items-start gap-2">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Posez votre question ici..."
              className="flex-1 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none resize-none"
              rows={2}
              disabled={isLoading}
              aria-label="Votre question pour l'assistant IA"
            />
            <button type="submit" disabled={isLoading || !inputValue.trim()} className="px-4 py-2 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 disabled:bg-slate-400 disabled:cursor-not-allowed h-full flex items-center justify-center self-stretch">
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              )}
            </button>
          </form>
        </footer>
      </aside>
    </>
  );
};