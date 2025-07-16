
import React from 'react';

interface AIAssistantButtonProps {
  onClick: () => void;
}

export const AIAssistantButton = ({ onClick }: AIAssistantButtonProps): JSX.Element => (
  <button
    onClick={onClick}
    className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 p-0 w-16 h-16 bg-gradient-to-r from-sky-500 to-sky-600 rounded-full hover:from-sky-600 hover:to-sky-700 active:from-sky-700 active:to-sky-800 focus:outline-none focus:ring-4 focus:ring-sky-300 shadow-2xl transition-all duration-300 ease-in-out flex items-center justify-center text-white animate-pulse-glow"
    aria-label="Ouvrir l'assistant AURA 2025"
    title="Ouvrir l'assistant AURA 2025"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
  </button>
);
