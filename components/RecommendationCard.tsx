import React from 'react';
import { RecommendationBlock, TreatmentItem, TreatmentItemDetail } from '../types';

interface RecommendationCardProps {
  blocks: RecommendationBlock[];
}

const renderDetails = (details: TreatmentItemDetail[]): React.ReactNode => {
  return details.map((detail, index) => (
    <React.Fragment key={index}>
      {detail.isOptionLabel && <span className="block text-green-600 font-semibold mt-2 mb-1">Option :</span>}
      <div className="treatment-details text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: detail.text }} />
    </React.Fragment>
  ));
};


export const RecommendationCard = ({ blocks }: RecommendationCardProps): JSX.Element | null => {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <>
      {blocks.map((block, index) => (
        <div
          key={index}
          className={`
            rounded-xl md:rounded-2xl p-6 md:p-8 mt-6 mb-8 shadow-xl border-l-4
            ${block.backgroundColorClass || (block.isMainWarningBox ? 'bg-amber-50' : (block.accentColorClass && block.accentColorClass.includes('red') ? 'bg-red-50' : 'bg-sky-50'))}
            ${block.accentColorClass || (block.isMainWarningBox ? 'border-amber-500' : (block.accentColorClass && block.accentColorClass.includes('red') ? 'border-red-500' : 'border-sky-500'))}
          `}
        >
          {block.title && (
            <h3 className={`
              text-xl md:text-2xl font-semibold mb-5
              ${block.titleColorClass || (block.isMainWarningBox ? 'text-amber-800' : (block.titleColorClass && block.titleColorClass.includes('red') ? 'text-red-800' : 'text-sky-700'))}
            `}>
              {block.title}
            </h3>
          )}
          {block.isMainWarningBox && block.warningStrongText && !block.title && (
             <strong className={block.titleColorClass || 'text-amber-800 text-lg'}>{block.warningStrongText}</strong>
          )}
          {block.items.map((item, itemIndex) => (
            <div key={itemIndex} className={`bg-white p-5 my-4 rounded-xl shadow-md ${block.textColorClass || 'text-slate-700'}`}>
              {item.title && (
                <div className="treatment-title font-semibold text-sky-600 text-lg mb-2">
                  {item.title}
                </div>
              )}
              {item.isNestedWarning && item.nestedWarningStrongText && (
                <div className="my-2 p-3 bg-amber-50 border-l-4 border-amber-400 rounded-md">
                    <strong className="text-amber-700">{item.nestedWarningStrongText}</strong>
                    {item.nestedWarningText && <p className="text-amber-600 text-sm">{item.nestedWarningText}</p>}
                </div>
              )}
              {renderDetails(item.detailsArray)}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};