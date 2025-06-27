import React from 'react';

interface HeroProps {
    backgroundImage?: string;
    eventDate?: string;
}

export default function Hero({ 
    backgroundImage = '/hero-background.jpg',
    eventDate = '08 de Julho'
}: HeroProps) {
    return (
        <section className='min-h-screen relative overflow-hidden'>
            <div className="relative flex items-center min-h-screen">
                {/* Background Image */}
                <img 
                    className='absolute inset-0 w-full h-full object-cover' 
                    src="/images/bg/freepik__a-brazilian-nurse-with-typical-brazilian-features-__35097.jpeg" 
                    alt="Enfermeira brasileira" 
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30"></div>
                
                {/* Content Container */}
                <div className="container px-3 md:px-20 z-10 relative py-16 md:py-24">
                    <div className="max-w-2xl text-left">
                        {/* Event badge */}
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
                            <div className="bg-[#01C38D] rounded-full p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-white font-medium text-sm">{eventDate} • MASTERCLASS GRATUITA</span>
                        </div>
                        
                        {/* Main headline - Problem */}
                        <h2 className="text-[#01C38D] font-bold text-xl md:text-2xl mb-3">
                            CANSADO DOS PLANTÕES EXAUSTIVOS E MAL REMUNERADOS?
                        </h2>
                        
                        {/* Main headline - Solution */}
                        <h1 className="text-4xl md:text-5xl lg:text-4xl font-bold text-white leading-tight mb-6">
                            Transforme sua carreira na enfermagem com <span className="text-[#01C38D]">atendimentos particulares</span> de alto valor
                        </h1>
                        
                        {/* Subheadline with benefits */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 mb-8">
                            <p className="text-xl text-white font-medium mb-4">Nesta masterclass você vai descobrir:</p>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-[#01C38D] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-white">Como captar <span className="font-bold">pacientes</span> com ética e técnica</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-[#01C38D] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-white">Como cobrar <span className="font-bold">corretamente</span> e se valorizar</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-[#01C38D] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-white">Como estruturar  <span className="font-bold">um modelo de negócio</span> de atendimentos</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-[#01C38D] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-white">Como escalar seu faturamento sem abrir mão da sua saúde</span>
                                </li>
                            </ul>
                        </div>
                        
                        {/* CTA Section */}
                        <div className="flex flex-col space-y-4 mb-8">
                            <button className="bg-[#01C38D] hover:bg-[#01C38D]/80 text-white font-bold py-4 px-8 rounded-lg text-lg uppercase tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-[#01C38D]/20 transform hover:-translate-y-1">
                                GARANTIR MINHA VAGA AGORA
                            </button>
                            
                            {/* Social proof */}
                            <div className="flex items-center justify-between text-white/80 text-sm">
                                <div className="flex items-center">
                                    <div className="flex -space-x-2 mr-3">
                                        {[1,2,3].map(i => (
                                            <div key={i} className="w-6 h-6 rounded-full bg-gray-500 border border-black"></div>
                                        ))}
                                    </div>
                                    <span>+1000 enfermeiros inscritos</span>
                                </div>
                                <div className="flex items-center">
                                    <svg className="h-4 w-4 text-[#01C38D] mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                    <span>Vagas limitadas</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
