import React from 'react';
import { useTranslation } from 'react-i18next';

interface LearningItem {
  text: string;
  subtitle?: string;
  image?: string;
}

interface WhatYouWillLearnProps {
  title?: string;
  subtitle?: string;
  items?: LearningItem[];
  backgroundImage?: string;
}

export default function WhatYouWillLearn({
  backgroundImage = '/images/bg/649702f6eaa2f396e66b8a99_ds-home-texture-one.jpg'
}: WhatYouWillLearnProps) {
  const { t } = useTranslation();
  
  // Obter os itens de aprendizado do arquivo de tradução
  const learningItems = t('whatYouWillLearn.learningItems', { returnObjects: true }) as LearningItem[];
  return (
    <section className="relative py-16 bg-black overflow-hidden">
      {/* Background texture */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('whatYouWillLearn.title')}</h2>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">{t('whatYouWillLearn.subtitle')}</p>
        </div>
        
        {/* Main content - Grid of cards */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {learningItems.map((item: LearningItem, index: number) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-black border border-[#01C38D]/20 hover:border-[#01C38D] transition-all duration-300 hover:shadow-lg hover:shadow-[#01C38D]/20"
              >
                {/* Card content */}
                <div className="p-6 md:p-8 flex flex-col h-full">
                  {/* Icon with number */}
                  <div className="mb-6 flex items-center">
                    {/* <div className="w-12 h-12 rounded-full bg-[#01C38D]/10 flex items-center justify-center border border-[#01C38D]/30 mr-4">
                      <span className="text-[#01C38D] font-bold text-xl">{index + 1}</span>
                    </div> */}
                    <div className="bg-[#01C38D]/10 rounded-full py-1 px-3 border border-[#01C38D]/20">
                      <span className="text-[#01C38D] text-xs font-semibold">{item.subtitle}</span>
                    </div>
                  </div>
                  
                  {/* Main text with check icon */}
                  <div className="mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3 mt-1">
                        <div className="w-6 h-6 rounded-full bg-[#01C38D]/20 flex items-center justify-center border border-[#01C38D]/30">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#01C38D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-white text-lg md:text-xl font-medium leading-tight">
                        {item.text}
                      </p>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  {/* <div className="mt-auto flex items-center">
                    <div className="w-8 h-px bg-[#01C38D]/50 mr-3"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#01C38D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div> */}
                  
                  {/* Hover effect - glowing corner */}
                  <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-[#01C38D]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Call to action */}
          <div className="mt-12 text-center">
            <p className="text-white text-xl mb-2">{t('whatYouWillLearn.motivationalText1')}</p>
            <p className="text-white text-xl font-bold mb-6">{t('whatYouWillLearn.motivationalText2')}</p>
            
            <button className="bg-[#01C38D] hover:bg-[#01C38D]/60 text-white font-bold py-4 px-8 text-lg uppercase tracking-wider transition-all duration-300">
              {t('whatYouWillLearn.actionButton')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
