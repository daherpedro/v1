import React from 'react';
import { useTranslation } from 'react-i18next';
import SuccessForm from './SuccessForm';

export default function SuccessPage1() {
  const { t } = useTranslation();
  const whatsappUrl = "https://chat.whatsapp.com/JCTBQlgc7S89yFsKBaCfQS";

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#01C38D]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#01C38D]/10 rounded-full blur-3xl"></div>

      {/* Golden light rays */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#01C38D]/20 via-transparent to-transparent"></div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Content Column */}
            <div className="order-2 relative z-10 md:order-1">
              <div className="bg-black/40 backdrop-blur-sm p-6 md:p-10 rounded-2xl border border-[#01C38D]/20 shadow-xl">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {t('successPage1.heading')}
                </h1>

                <div className="space-y-8 text-gray-200">
                  <p className="text-lg md:text-xl"
                    dangerouslySetInnerHTML={{ __html: t('successPage1.nextStep') }}>
                  </p>

                  <p className="text-lg md:text-xl"
                    dangerouslySetInnerHTML={{ __html: t('successPage1.exclusiveContent') }}>
                  </p>

                  {/* <div className="py-4 border-t border-b border-[#01C38D]/20">
                    <p className="text-lg"
                       dangerouslySetInnerHTML={{ __html: t('successPage1.callToAction') }}>
                    </p>
                  </div> */}

                  <div className="pt-4">
                    {/* Formulário substituindo o botão direto */}
                    <SuccessForm pageKey="successPage1" whatsappUrl={whatsappUrl} />
                  </div>
                </div>
              </div>
            </div>

            <img
              src="/images/expert/bruno-side.jpg"
              alt={t('successPage1.imageAlt')}
              className="absolute top-0 opacity-34 h-full -right-40 object-cover z-0"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = '/images/expert/bruno.png';
              }}
            />
            {/* Image Column */}
          
          </div>
        </div>
      </div>
    </main>
  );
}
