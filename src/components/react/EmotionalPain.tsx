import React from 'react';

interface EmotionalPainProps {
    backgroundImage?: string;
    buttonText?: string;
    buttonUrl?: string;
}

export default function EmotionalPain({
    backgroundImage = '/images/bg/dark-texture.jpg',
    buttonText = 'EU QUERO ESSA SAÍDA',
    buttonUrl = '#register'
}: EmotionalPainProps) {
    return (
        <section className="relative py-20 overflow-hidden bg-black">
            {/* Background with texture */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            />

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute -left-20 top-1/3 w-40 h-40 rounded-full bg-[#01C38D]/20 blur-3xl"></div>
            <div className="absolute -right-20 bottom-1/3 w-40 h-40 rounded-full bg-[#01C38D]/20 blur-3xl"></div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Fire icon */}
                    <div className="flex justify-center mb-8">
                        <div className="bg-gradient-to-br from-orange-500 to-rose-600 p-4 rounded-full shadow-lg shadow-rose-500/20">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                            </svg>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="space-y-8">
                        {/* Quote 1 */}
                        <p className="text-xl md:text-2xl text-white text-center leading-relaxed">
                           Se você chegou aqui é porque você
                        </p>

                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 transform hover:scale-[1.01] transition-all duration-300">
                            <div className="flex items-start">
                                {/* <div className="text-[#01C38D] text-4xl font-serif mr-4 leading-none">💬</div> */}
                                <p className="text-xl md:text-2xl text-white leading-relaxed">
                                    Estudou anos, se dedica dia e noite, mas sente que <span className="font-bold text-[#01C38D]">nunca é valorizado(a)</span>?
                                </p>
                            </div>
                        </div>

                        {/* Quote 2 */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 transform hover:scale-[1.01] transition-all duration-300">
                            <p className="text-xl md:text-2xl text-white leading-relaxed">
                                Está preso(a) a plantões exaustivos, <span className="font-bold text-[#01C38D]">ganhando pouco</span> e sem tempo pra sua vida?
                            </p>
                        </div>

                        {/* Quote 3 */}
                        <p className="text-xl md:text-2xl text-white text-center leading-relaxed">
                            <span className="font-bold text-4xl text-[#01C38D]">Isso não é culpa sua</span>. <br></br> <br></br> O sistema foi feito pra te manter preso(a).
                        </p>

                        {/* Solution */}
                        <div className="bg-gradient-to-r from-[#01C38D]/20 to-transparent border border-[#01C38D]/30 rounded-2xl p-6 md:p-8 transform hover:scale-[1.01] transition-all duration-300">
                            <p className="text-xl md:text-2xl text-white leading-relaxed">
                                Mas há uma saída — e ela começa com <span className="font-bold text-white">conhecimento, estratégia e coragem</span>.
                            </p>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-12 flex justify-center">
                        <a
                            href={buttonUrl}
                            className="group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-bold text-white rounded-lg bg-gradient-to-br from-[#01C38D] to-teal-600 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-full group-hover:h-56 opacity-10"></span>
                            <span className="relative flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                </svg>
                                {buttonText}
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
