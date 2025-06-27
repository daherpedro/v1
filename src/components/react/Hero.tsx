import React from 'react';

interface HeroProps {
    backgroundImage?: string;
}

export default function Hero({ backgroundImage = '/hero-background.jpg' }: HeroProps) {
    return (
        <section className='min-h-screen relative overflow-hidden'>
            <div className="relative  flex items-center justify-center">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 z-10 opacity-65 bg-cover bg-top"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                    }}
                />

                <img className='absolute inset-0 bg-cover bg-center grayscale  w-full' src="/images/bg/freepik__a-brazilian-nurse-with-typical-brazilian-features-__35097.jpeg" alt="" />
                {/* Dark overlay */}
                {/* <div className="absolute inset-0 bg-black opacity-10"></div> */}

                {/* Content Container */}
                <div className="container mx-auto px-4 z-10 relative py-16">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="bg-[#01C38D]  text-white inline-block px-4 py-1 mb-6 font-bold uppercase tracking-wider text-sm">Masterclass Exclusiva</div>

                        <h1 className="text-4xl backdrop-blur-3xl uppercase md:text-5xl lg:text-8xl font-bold text-white  leading-tight">
                            Você pode sair
                        </h1>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-base text-white mb-6 leading-tight">
                            do subemprego hospitalar e construir uma nova vida com liberdade e respeito financeiro!
                        </h1>

                        <div className="w-24 h-1 bg-[#01C38D]  mx-auto mb-8"></div>

                        <p className="text-xl md:text-2xl text-white mb-10 leading-relaxed">
                            Participe da masterclass gratuita com Bruno Pappalardo e descubra como enfermeiros estão conquistando independência financeira com atendimentos particulares de feridas e estomias.
                        </p>

                        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-10">
                            <button className="bg-[#01C38D] hover:bg-[#01C38D]/60 text-white font-bold py-4 px-10 text-xl uppercase tracking-wider transition-all duration-300 w-full md:w-auto">
                                QUERO PARTICIPAR AGORA
                            </button>

                            <div className="flex items-center text-white">
                                <div className="bg-[#01C38D]  rounded-full p-1 mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="font-semibold">08 de Julho - 19h</span>
                            </div>
                        </div>

                        {/* Trust indicators */}
                        <div className="border-t border-white/20 pt-6 flex justify-center">
                            <div className="flex items-center text-white mx-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>+1000 enfermeiros já participaram</span>
                            </div>
                            <div className="flex items-center text-white mx-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Vagas limitadas</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
