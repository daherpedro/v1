import React from 'react';
import { useTranslation } from 'react-i18next';

interface ActionPlanProps {
  backgroundImage?: string;
}

export default function ActionPlan({
  backgroundImage = '/images/bg/action-plan-bg.jpg'
}: ActionPlanProps) {
  const { t } = useTranslation();
  
  // Obter os itens do plano de ação das traduções
  const planItems = t('actionPlan.items', { returnObjects: true }) as Array<{
    icon: string;
    title: string;
    description: string;
  }>;

  return (
    <section className="relative py-24 overflow-hidden bg-gray-900">
      {/* Background com textura e overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Gradientes decorativos */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-900 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
      
      {/* Círculos decorativos */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-[#01C38D]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#01C38D]/10 rounded-full blur-3xl"></div>
      
      {/* Container principal */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho da seção */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-[#01C38D]/20 rounded-full px-4 py-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#01C38D] mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              <span className="text-[#01C38D] font-medium">{t('actionPlan.exclusiveTag')}</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6"
              dangerouslySetInnerHTML={{ __html: t('actionPlan.title') }}
            >
            </h2>
            
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              {t('actionPlan.description')}
            </p>
          </div>
          
          {/* Container do plano de ação */}
          <div className="relative">
            {/* Cartão principal com efeito glassmorphism */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-xl">
              {/* Grid dos itens do plano */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {planItems.map((item, index) => (
                  <div 
                    key={index}
                    className="flex group"
                  >
                    {/* Ícone com efeito de hover */}
                    <div className="flex-shrink-0 mr-5">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#01C38D]/30 to-[#01C38D]/10 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-all duration-300 border border-[#01C38D]/20">
                        {item.icon}
                      </div>
                    </div>
                    
                    {/* Conteúdo do item */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#01C38D] transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Linha divisória com gradiente */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[#01C38D]/30 to-transparent mb-12"></div>
              
              {/* Seção CTA */}
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {t('actionPlan.ctaTitle')}
                  </h3>
                  <p className="text-gray-400 max-w-lg">
                    {t('actionPlan.ctaDescription')}
                  </p>
                </div>
                
                {/* Botão CTA */}
                <div className="flex-shrink-0">
                  <button 
                    className="bg-[#01C38D] hover:bg-[#00A377] text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg shadow-[#01C38D]/30 transform hover:scale-105 transition-all duration-300 flex items-center"
                  >
                    <span className="mr-2">{t('actionPlan.ctaButton')}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Elemento decorativo - linha pontilhada */}
            <div className="absolute -top-4 -bottom-4 left-8 border-l-2 border-dashed border-[#01C38D]/30 hidden md:block"></div>
            
            {/* Elemento decorativo - linha pontilhada */}
            <div className="absolute -top-4 -bottom-4 right-8 border-r-2 border-dashed border-[#01C38D]/30 hidden md:block"></div>
          </div>
          
          {/* Indicador de vagas limitadas */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center bg-[#01C38D]/20 rounded-full px-4 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#01C38D] mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-[#01C38D] font-medium">{t('actionPlan.limitedSpots')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
