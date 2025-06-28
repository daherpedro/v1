import React from 'react';
import { useTranslation } from 'react-i18next';

interface HeroProps {
    backgroundImage?: string;
}

export default function Hero({ backgroundImage = '/hero-background.jpg' }: HeroProps) {
    const { t } = useTranslation();
    return (
        <section className='min-h-screen pb-10 relative overflow-hidden flex items-center'>
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0  opacity-65 bg-cover z-20 bg-top h-full w-full object-cover"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                }}
            />
            <img
                className='absolute inset-0 bg-cover bg-center grayscale w-full h-full object-cover'
                src="/images/bg/freepik__a-brazilian-nurse-with-typical-brazilian-features-__35097.webp"
                alt="Enfermeira brasileira"
            />

            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30 z-5"></div>

            {/* Content Container */}
            <div className="container  mx-auto px-4 z-40 py-5 md:py-10">
                <div className="max-w-6xl mx-auto text-center">
                    <img                             src="/images/Logo-04-8.webp"  className='mx-auto w-52' alt={t('hero.logoAlt')} />
                    {/* Tag */}
                    <div className="bg-[#01C38D] text-white inline-block px-4 py-2 mb-6 font-bold uppercase tracking-wider text-xs md:text-sm rounded-full">
                        {t('hero.exclusiveTag')}
                    </div>

                    {/* Main headline - more balanced size */}
                    <h1 className="text-3xl md:text-5xl lg:text-6xl max-w-[80%] mx-auto font-bold text-white leading-tight mb-3">
                        {t('hero.mainTitle')}
                    </h1>

                    {/* Subheadline */}
                    <h2 className="text-xl md:text-2xl lg:text-3xl max-w-md mx-auto font-medium text-white mb-6 leading-tight">
                        {t('hero.subTitle')} <span className="text-[#01C38D] font-bold">{t('hero.subTitleHighlight')}</span>
                    </h2>

                    <p className="text-lg md:text-xl  text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
                        {t('hero.description')}
                    </p>

                    <div className="flex w-fit mx-auto mb-5 items-center text-white bg-black/30 backdrop-blur-sm py-2 px-4 rounded-full">
                        <div className="bg-[#01C38D] rounded-full p-1 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="font-semibold text-2xl">{t('hero.eventDate')}</span>
                    </div>

                    {/* Divider */}
                    {/* <div className="w-24 h-1 bg-[#01C38D] mx-auto mb-6"></div> */}

                    {/* Description - more balanced with headline */}
                   

                    {/* CTA Section */}
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 mb-8">
                        <a href="#call-to-action" className="bg-[#01C38D] hover:bg-[#01C38D]/80 text-white font-bold py-3 md:py-4 px-8 md:px-10 text-lg md:text-xl uppercase tracking-wider transition-all duration-300 w-full md:w-auto rounded-md shadow-lg hover:shadow-[#01C38D]/30 hover:-translate-y-1 text-center">
                            {t('hero.ctaButton')}
                        </a>
                    </div>

                  

                    {/* Trust indicators - improved layout */}
                    <div className="border-t hidden border-white/20 pt-5 mt-4">
                        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
                            <div className="flex items-center text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#01C38D] mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>{t('hero.trustIndicator1')}</span>
                            </div>
                            <div className="flex items-center text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#01C38D] mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>{t('hero.trustIndicator2')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
