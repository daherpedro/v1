import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface TestimonialProps {
  backgroundImage?: string;
}

interface VideoTestimonial {
  id: string;
  thumbnailUrl: string;
  videoUrl: string;
  name: string;
  profession: string;
  quote: string;
}

export default function Testimonials({
  backgroundImage = '/images/bg/testimonials-bg.jpg'
}: TestimonialProps) {
  const { t } = useTranslation();
  
  // Estado para controlar qual vídeo está sendo reproduzido
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // Obter os dados dos depoimentos em vídeo das traduções
  const testimonials: VideoTestimonial[] = t('testimonials.testimonialsList', { returnObjects: true }) as VideoTestimonial[];

  // Função para abrir o modal de vídeo
  const openVideoModal = (videoId: string) => {
    setActiveVideo(videoId);
    document.body.style.overflow = 'hidden'; // Previne rolagem quando modal está aberto
  };

  // Função para fechar o modal de vídeo
  const closeVideoModal = () => {
    setActiveVideo(null);
    document.body.style.overflow = 'auto'; // Restaura rolagem
  };

  return (
    <section className="relative py-24 overflow-hidden bg-black">
      {/* Background com textura */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Elementos decorativos */}
      {/* <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-900 to-transparent"></div> */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
      
      {/* Container principal */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Título da seção */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-[#01C38D]/20 rounded-full px-4 py-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#01C38D] mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              <span className="text-[#01C38D] font-medium">{t('testimonials.realStories')}</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {t('testimonials.subtitle')}
            </h2>
            
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              {t('testimonials.description')}
            </p>
          </div>
          
          {/* Grid de depoimentos em vídeo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl hover:shadow-[#01C38D]/10"
              >
                {/* Thumbnail do vídeo com overlay de play */}
                <div 
                  className="relative aspect-video cursor-pointer"
                  onClick={() => openVideoModal(testimonial.id)}
                >
                  <img 
                    src={testimonial.thumbnailUrl} 
                    alt={t('testimonials.videoAlt', { name: testimonial.name })}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all duration-300">
                    <div className="w-16 h-16 bg-[#01C38D] rounded-full flex items-center justify-center shadow-lg shadow-[#01C38D]/30 transform group-hover:scale-110 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Informações do depoimento */}
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#01C38D] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#01C38D] to-teal-600 flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <h4 className="text-white font-medium">{testimonial.name}</h4>
                      <p className="text-[#01C38D] text-sm">{testimonial.profession}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
       
        </div>
      </div>
      
      {/* Modal de vídeo */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            {/* Botão de fechar */}
            <button 
              onClick={closeVideoModal}
              className="absolute -top-12 right-0 text-white hover:text-[#01C38D] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Container do vídeo */}
            <div className="aspect-video w-full bg-black">
              <iframe
                src={testimonials.find(t => t.id === activeVideo)?.videoUrl}
                title={t('testimonials.videoModalTitle')}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
