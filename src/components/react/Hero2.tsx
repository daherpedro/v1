import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface HeroProps {
    backgroundImage?: string;
    eventDate?: string;
}

export default function Hero({ 
    backgroundImage = '/hero-background.jpg',
    eventDate = '08 de Julho'
}: HeroProps) {
    const { t, i18n } = useTranslation();
    
    // Use state to control client-side hydration
    const [isClient, setIsClient] = useState(false);
    
    // Only enable client-side rendering after hydration
    useEffect(() => {
        setIsClient(true);
    }, []);
    return (
        <section className='min-h-screen relative overflow-hidden'>
            <div className="relative flex items-center">
                {/* Background Image */}
                <img 
                    className='absolute inset-0 w-full h-full object-cover' 
                    src="/images/bg/freepik__a-brazilian-nurse-with-typical-brazilian-features-__35097.webp" 
                    alt={isClient ? t('hero.nurseImageAlt') : "Enfermeira brasileira"} 
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30"></div>
                
                {/* Content Container */}
                <div className="container px-3 md:px-20 z-10 relative py-10 md:py-5 ">
                    <div className="max-w-3xl text-left">
                        {/* Event badge */}
                        <div className="bg-[#01C38D] text-white inline-block px-4 py-2 mb-6 font-bold uppercase tracking-wider text-xs rounded-md">
                            {isClient ? t('hero.exclusiveTag') : "Masterclass Exclusiva"}
                        </div>
                        
                        <img 
                            src="/images/Logo-04-8.webp" 
                            className=' w-52' 
                            alt={isClient ? t('hero.logoAlt') : "Logo do evento de enfermagem"} 
                        />


                        {/* Main headline - Problem */}
                        <h2 className="text-[#01C38D] font-bold text-4xl md:text-5xl mb-3">
                            {isClient ? t('hero.problem') : "Feridas e Estomias"}
                        </h2>
                        
                        {/* Main headline - Solution */}
                        <h1 className="text-xl md:text-3xl lg:text-3xl font-bold text-white leading-tight mb-6">
                            {isClient ? t('hero.solution') : "Aprenda a tratar e cuidar de"} <span className="text-[#01C38D]">{isClient ? t('hero.highlight') : "pacientes com feridas e estomias"}</span> 
                        </h1>
                        
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
                            <div className="bg-[#01C38D] rounded-full p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-white font-medium text-sm">{isClient ? `${t('hero.date')} • ${t('hero.free')}` : "08 de Julho • Gratuito"}</span>
                        </div>

                        {/* Subheadline with benefits */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 mb-8">
                            <p className="text-xl text-white font-medium mb-4">{isClient ? t('hero.discover') : "Descubra nesta masterclass:"}</p>
                            <ul className="space-y-3">
                                {(isClient ? (t('hero.benefits', { returnObjects: true }) as string[]) : [
                                    "Como <strong>avaliar corretamente</strong> feridas e estomias",
                                    "Técnicas de <strong>curativos avançados</strong> para acelerar a cicatrização",
                                    "Protocolos de <strong>prevenção de complicações</strong> em estomias"
                                ]).map((benefit, index) => (
                                    <li key={index} className="flex items-start">
                                        <svg className="h-5 w-5 text-[#01C38D] mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-white" dangerouslySetInnerHTML={{ __html: benefit }} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        {/* CTA Section */}
                        <div className="flex flex-col space-y-4 mb-8">
                            <button className="bg-[#01C38D] hover:bg-[#01C38D]/80 text-white font-bold py-4 px-8 rounded-lg text-lg uppercase tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-[#01C38D]/20 transform hover:-translate-y-1">
                                {isClient ? t('hero.reserveButton') : "RESERVAR MINHA VAGA AGORA"}
                            </button>
                            
                           
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
