
import React from 'react';
import { BreadcrumbEntry } from '../types';

interface BreadcrumbProps {
  path: BreadcrumbEntry[];
}

export const Breadcrumb = ({ path }: BreadcrumbProps): JSX.Element | null => {
  if (path.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-8 flex justify-center">
      <ol className="flex flex-wrap items-center gap-2 sm:gap-4">
        {path.map((item, index) => (
          <li key={item.nodeId + index} className="flex items-center">
            <span className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg shadow-sm
              ${index === path.length - 1 
                ? 'bg-sky-600 text-white' 
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }
            `}>
              {item.label}
            </span>
            {index < path.length - 1 && (
              <svg 
                className="ml-2 sm:ml-4 h-5 w-5 text-slate-400" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
