import React from 'react';

interface SpeakerProps {
  name?: string;
  title?: string;
  bio?: string;
  image?: string;
  backgroundImage?: string;
}

export default function Speaker({
  name = 'Bruno Pappalardo',
  title = 'Especialista em Feridas e Estomias',
  bio = 'Bruno Pappalardo é enfermeiro especialista em feridas e estomias, com mais de 10 anos de experiência na área. Transformou sua carreira saindo do ambiente hospitalar tradicional para criar um negócio próprio de atendimentos particulares, ajudando centenas de enfermeiros a fazerem o mesmo.',
  image = '/images/expert/bruno.png',
  backgroundImage = '/images/bg/649702f6eaa2f396e66b8a99_ds-home-texture-one.jpg'
}: SpeakerProps) {
  return (
    <section className="relative bg-black py-12 md:py-24 overflow-hidden">
      {/* Background Image */}
      <img src="/images/bg/bg.png" className='absolute inset-0 w-full h-full object-cover' alt="" />

      <img 
        src="/images/bg/freepik__background__18028.png" 
        className='absolute hidden md:block  inset-0 left-0 top-0 w-full md:w-1/2 h-full object-cover' 
        alt="" 
      />

      <img 
        src="/images/expert/ENSAIOCORPORATIVO-197.jpg" 
        className='absolute inset-0 opacity-10 right-0 top-0 w-full mix-blend-color-dodge blur-sm z-0 h-full object-cover' 
        alt="" 
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold max-w-md mx-auto text-white mb-4">
              Conheça <span className="text-[#01C38D]">seu mentor na jornada</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#01C38D] to-[#01C38D]/80 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-center">
            {/* Image Column - Hidden on mobile but kept for structure */}
            <div className="md:col-span-2 relative hidden md:block">
              {/* Decorative elements around image */}
              <div className="absolute top-4 -right-4 w-24 h-24 border-4 border-[#01C38D]/30 rounded-full -z-10"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border-4 border-[#01C38D]/20 rounded-full -z-10"></div>
              
              {/* Floating badges */}
              <div className="absolute top-6 -right-10 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full shadow-xl">
                <div className="flex items-center space-x-2">
                  <svg className="h-5 w-5 text-[#01C38D]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-[#01C38D] text-sm">+10 anos de experiência</span>
                </div>
              </div>
              
              <div className="absolute bottom-8 -left-8 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full shadow-xl">
                <div className="flex items-center space-x-2">
                  <svg className="h-5 w-5 text-[#01C38D]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                  </svg>  
                  <span className="text-[#01C38D] text-sm">+1000 enfermeiros</span>
                </div>
              </div>
            </div>
            
            {/* Mobile badges - only visible on mobile */}
            <div className="flex justify-center space-x-4 mb-6 md:hidden">
              <div className="bg-white/10 backdrop-blur-md px-3 py-2 rounded-full shadow-xl">
                <div className="flex items-center space-x-1">
                  <svg className="h-4 w-4 text-[#01C38D]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-[#01C38D] text-xs">+10 anos</span>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md px-3 py-2 rounded-full shadow-xl">
                <div className="flex items-center space-x-1">
                  <svg className="h-4 w-4 text-[#01C38D]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                  </svg>  
                  <span className="text-[#01C38D] text-xs">+1000 enfermeiros</span>
                </div>
              </div>
            </div>
            
            {/* Content Column */}
            <div className="col-span-1 md:col-span-3 bg-white/5 backdrop-blur-sm p-5 md:p-8 rounded-2xl border border-white/10 shadow-xl">
            <img src="/images/expert/bruno.png" className="w-48 md:hidden h-48 rounded-full mx-auto mb-4" alt="" />
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">{name}</h3>
              <p className="text-[#01C38D] font-medium text-base md:text-lg mb-4 md:mb-6">{title}</p>
              
              <div className="space-y-4 md:space-y-6 text-gray-300">
                <p className="text-base md:text-lg leading-relaxed">{bio}</p>
                
                <div className="pt-4 md:pt-6">
                  <h4 className="font-bold text-white mb-3 md:mb-4 text-lg md:text-xl">Especialidades:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div className="bg-white/5 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                      <div className="flex items-start">
                        <div className="bg-[#01C38D]/20 p-2 rounded-lg mr-3 group-hover:bg-[#01C38D]/30 transition-all duration-300">
                          <svg className="h-5 w-5 md:h-6 md:w-6 text-[#01C38D]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h5 className="font-bold text-white mb-1 text-sm md:text-base">Especialista em Feridas e Estomias</h5>
                          <p className="text-xs md:text-sm text-gray-300">+10 anos de experiência clínica</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                      <div className="flex items-start">
                        <div className="bg-[#01C38D]/20 p-2 rounded-lg mr-3 group-hover:bg-[#01C38D]/30 transition-all duration-300">
                          <svg className="h-5 w-5 md:h-6 md:w-6 text-[#01C38D]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                          </svg>
                        </div>
                        <div>
                          <h5 className="font-bold text-white mb-1 text-sm md:text-base">Mentor Experiente</h5>
                          <p className="text-xs md:text-sm text-gray-300">Centenas de alunos na América Latina</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                      <div className="flex items-start">
                        <div className="bg-[#01C38D]/20 p-2 rounded-lg mr-3 group-hover:bg-[#01C38D]/30 transition-all duration-300">
                          <svg className="h-5 w-5 md:h-6 md:w-6 text-[#01C38D]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                          </svg>
                        </div>
                        <div>
                          <h5 className="font-bold text-white mb-1 text-sm md:text-base">Referência em Empreendedorismo</h5>
                          <p className="text-xs md:text-sm text-gray-300">Para profissionais da saúde</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                      <div className="flex items-start">
                        <div className="bg-[#01C38D]/20 p-2 rounded-lg mr-3 group-hover:bg-[#01C38D]/30 transition-all duration-300">
                          <svg className="h-5 w-5 md:h-6 md:w-6 text-[#01C38D]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                          </svg>
                        </div>
                        <div>
                          <h5 className="font-bold text-white mb-1 text-sm md:text-base">Criador da <span className="italic">Tríade da Liberdade do Enfermeiro™</span></h5>
                          <p className="text-xs md:text-sm text-gray-300">Você vai aprender com quem realmente vive o que ensina</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}