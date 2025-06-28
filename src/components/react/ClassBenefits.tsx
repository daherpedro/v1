import React from 'react';
import { useTranslation } from 'react-i18next';

interface ClassBenefitsProps {
  backgroundImage?: string;
}

export default function ClassBenefits({
  backgroundImage = '/images/bg/dark-texture.jpg'
}: ClassBenefitsProps) {
  const { t } = useTranslation();

  // Obter os dados dos cards de benefícios das traduções
  const learningItems = t('classBenefits.learningItems', { returnObjects: true }) as Array<{
    number: string;
    text: string;
    highlight: string;
  }>;

  // Obter os dados de quem deve participar das traduções
  const participantItems = t('classBenefits.participantItems', { returnObjects: true }) as string[];

  return (
    <section className="relative py-24 overflow-hidden bg-gray-900">
      {/* Background com textura */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-900 to-transparent"></div>

      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      <div className="absolute -top-40 left-0 w-full h-44 bg-gradient-to-b from-black to-transparent"></div>
      {/* <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent"></div> */}


      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-900 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>

      {/* Container principal */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Divisão em duas colunas para desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Coluna 1: O que você vai sair sabendo */}
            <div>
              <div className="inline-flex items-center bg-[#01C38D]/20 rounded-full px-4 py-2 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#01C38D] mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-[#01C38D] font-medium">{t('classBenefits.subtitle1')}</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                {t('classBenefits.mainTitle1')}
              </h2>

              <div className="space-y-5">
                {learningItems.map((item, index) => (
                  <div
                    key={index}
                    className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-[#01C38D]/10 transition-all duration-300"
                  >

                    <p className="text-lg text-white font-medium ">
                      {item.text.split(item.highlight).map((part, i, array) => (
                        i < array.length - 1 ? (
                          <React.Fragment key={i}>
                            {part}<span className="font-bold text-[#01C38D]">{item.highlight}</span>
                          </React.Fragment>
                        ) : part
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Coluna 2: Quem deve participar */}
            <div>
              <div className="inline-flex items-center bg-[#01C38D]/20 rounded-full px-4 py-2 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#01C38D] mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span className="text-[#01C38D] font-medium">{t('classBenefits.publicTarget')}</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                {t('classBenefits.mainTitle2')}
              </h2>

              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 md:p-8 border border-white/5">
                <div className="space-y-4">
                  {participantItems.map((text, index) => (
                    <div
                      key={index}
                      className="flex items-center group"
                    >
                      <div className="flex-shrink-0 mr-4 transform group-hover:scale-110 transition-all duration-300">
                        <div className="bg-[#01C38D] rounded-full p-1 shadow-lg shadow-[#01C38D]/20">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-lg text-white group-hover:text-[#01C38D] transition-colors duration-300">{text}</p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}