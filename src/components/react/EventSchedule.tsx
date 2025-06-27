import React from 'react';

interface CountrySchedule {
  flag: string;
  country: string;
  time: string;
}

interface EventScheduleProps {
  date?: string;
  schedules?: CountrySchedule[];
  backgroundImage?: string;
}

export default function EventSchedule({
  date = '08 de Julho',
  backgroundImage = '/images/bg/tech-pattern.jpg',
  schedules = [
    { flag: '🇲🇽', country: 'México', time: '19h' },
    { flag: '🇵🇪', country: 'Peru', time: '20h' },
    { flag: '🇨🇴', country: 'Colômbia', time: '20h' },
    { flag: '🇨🇱', country: 'Chile', time: '21h' },
    { flag: '🇧🇷', country: 'Brasil', time: '22h' },
  ]
}: EventScheduleProps) {
  return (
    <section className="relative py-16 bg-black overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10 bg-cover bg-center" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#01C38D]/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#01C38D]/30 to-transparent"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-[#01C38D]/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-[#01C38D]/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#01C38D] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-white font-medium">08 DE JULHO</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Evento <span className="text-[#01C38D]">Global</span> e Gratuito
          </h2>
          
          <div className="w-24 h-1 bg-[#01C38D] mx-auto mb-6"></div>
          
          <p className="text-white/80 text-xl max-w-2xl mx-auto">
            Um evento online que vai transformar sua visão sobre o mercado digital, 
            não importa em qual parte do mundo você esteja.
          </p>
        </div>
        
        {/* Main content - Schedule list */}
        <div className="max-w-4xl mx-auto">
          {/* Countdown banner */}
          <div className="bg-black/40 backdrop-blur-md border border-[#01C38D]/20 rounded-xl p-6 mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">Contagem Regressiva</h3>
                <p className="text-white/70">
                Não importa onde você esteja, nosso evento foi programado para atender participantes de diversos países da América Latina. Verifique o horário correspondente ao seu país e não perca essa oportunidade!
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="flex justify-center gap-4 text-white">
                  <div className="flex flex-col items-center bg-black/50 px-4 py-2 rounded-lg border border-[#01C38D]/30">
                    <div className="text-3xl font-bold">11</div>
                    <div className="text-xs text-white/70">DIAS</div>
                  </div>
                  <div className="text-2xl font-bold text-white/30 self-center">:</div>
                  <div className="flex flex-col items-center bg-black/50 px-4 py-2 rounded-lg border border-[#01C38D]/30">
                    <div className="text-3xl font-bold">08</div>
                    <div className="text-xs text-white/70">HORAS</div>
                  </div>
                  <div className="text-2xl font-bold text-white/30 self-center">:</div>
                  <div className="flex flex-col items-center bg-black/50 px-4 py-2 rounded-lg border border-[#01C38D]/30">
                    <div className="text-3xl font-bold">45</div>
                    <div className="text-xs text-white/70">MIN</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Schedule cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {schedules.map((schedule, index) => (
              <div 
                key={index}
                className="bg-black/60 backdrop-blur-md border border-[#01C38D]/20 rounded-lg p-4 transform transition-all duration-300 hover:scale-105 hover:border-[#01C38D]/50 hover:shadow-lg hover:shadow-[#01C38D]/10"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="text-4xl mb-3">{schedule.flag}</div>
                  <div className="text-white font-medium mb-1">{schedule.country}</div>
                  <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#01C38D] mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-[#01C38D] font-bold">{schedule.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
       
          
          {/* CTA Section */}
          <div className="text-center">
            <button className="bg-[#01C38D] hover:bg-[#01C38D]/80 text-white font-bold py-4 px-10 rounded-lg text-xl uppercase tracking-wider transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#01C38D]/20">
              RESERVAR MINHA VAGA AGORA
            </button>
            
            <p className="text-white/60 mt-6">
              Evento 100% online e gratuito • Vagas limitadas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
