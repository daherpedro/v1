import React from 'react';
import { useTranslation } from 'react-i18next';
import SuccessForm from './SuccessForm';

export default function SuccessPage2() {
  const { t } = useTranslation();
  const benefits = t('successPage2.benefits', { returnObjects: true }) as string[];
  const whatsappUrl = "https://chat.whatsapp.com/JCTBQlgc7S89yFsKBaCfQS";

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Background image overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/90 to-black/95 z-10"></div>
      
      {/* Background image */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/images/expert/bruno-palestra.jpg" 
          alt={t('successPage2.imageAlt')} 
          className="w-full h-full object-cover opacity-40"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = '/images/expert/bruno.png';
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-20">
        <div className="max-w-3xl mx-auto">
          {/* Progress bar section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">{t('successPage2.progressText')}</span>
              <span className="text-white font-bold">{t('successPage2.progressPercentage')}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
              <div className="bg-[#01C38D] h-4 rounded-full" style={{ width: '91%' }}></div>
            </div>
          </div>
          
          {/* Main content card */}
          <div className="bg-black/60 backdrop-blur-md p-6 md:p-10 rounded-2xl border border-gray-700 shadow-2xl">
            {/* Headline */}
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center bg-[#01C38D]/20 text-amber-400 px-3 py-1 rounded-full text-sm font-bold mb-4">
                <span className="mr-2">⚠️</span> {t('successPage2.attentionLabel')}
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
                {t('successPage2.heading')}
              </h1>
            </div>
            
            {/* Main text */}
            <div className="space-y-6 text-gray-200">
              <p className="text-lg md:text-xl"
                 dangerouslySetInnerHTML={{ __html: t('successPage2.confirmationText') }}>
              </p>
              
              <p className="text-lg">{t('successPage2.benefitsIntro')}</p>
              
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              
              {/* Warning box */}
              <div className="mt-8 bg-[#01C38D]/10 border-l-4 border-[#01C38D] p-4 rounded-r-lg">
                <p className="font-bold text-[#01C38D] mb-2">{t('successPage2.warningTitle')}</p>
                <p className="text-[#01C38D] font-bold">{t('successPage2.warningText')}</p>
              </div>
              
              {/* Formulário */}
              <div className="pt-8">
                <SuccessForm pageKey="successPage2" whatsappUrl={whatsappUrl} />
                
                {/* Countdown */}
                <p className="text-center text-gray-400 mt-4 text-sm">
                  {t('successPage2.expirationText')} <span className="font-bold text-white">23:59:59</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
