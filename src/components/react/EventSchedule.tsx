import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface CountdownTimerProps {
  targetDate: string;
}

function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setIsClient(true);
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        // Se a data já passou, zera o contador
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calcula imediatamente e depois a cada segundo
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(timer);
  }, [targetDate]);

  // Função para adicionar zero à esquerda se necessário
  const padZero = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 text-white">
      <div className="flex flex-col items-center bg-black/50 px-4 py-2 rounded-lg border border-[#01C38D]/30">
        <div className="text-3xl font-bold">{padZero(timeLeft.days)}</div>
        <div className="text-xs text-white/70">{isClient ? t('common.days') : "dias"}</div>
      </div>
      <div className="text-2xl font-bold text-white/30 self-center hidden sm:block">:</div>
      <div className="flex flex-col items-center bg-black/50 px-4 py-2 rounded-lg border border-[#01C38D]/30">
        <div className="text-3xl font-bold">{padZero(timeLeft.hours)}</div>
        <div className="text-xs text-white/70">{isClient ? t('common.hours') : "horas"}</div>
      </div>
      <div className="text-2xl font-bold text-white/30 self-center hidden sm:block">:</div>
      <div className="flex flex-col items-center bg-black/50 px-4 py-2 rounded-lg border border-[#01C38D]/30">
        <div className="text-3xl font-bold">{padZero(timeLeft.minutes)}</div>
        <div className="text-xs text-white/70">{isClient ? t('common.minutes') : "minutos"}</div>
      </div>
      <div className="text-2xl font-bold text-white/30 self-center hidden sm:block">:</div>
      <div className="flex flex-col items-center bg-black/50 px-4 py-2 rounded-lg border border-[#01C38D]/30">
        <div className="text-3xl font-bold">{padZero(timeLeft.seconds)}</div>
        <div className="text-xs text-white/70">{isClient ? t('common.seconds') : "segundos"}</div>
      </div>
    </div>
  );
}

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
  schedules = []
}: EventScheduleProps) {
  const { t } = useTranslation();
  
  // Use state to control client-side hydration
  const [isClient, setIsClient] = useState(false);
  
  // Only enable client-side rendering after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);
  // Obter os horários dos países a partir das traduções
  const translatedSchedules = isClient ? t('eventSchedule.schedules', { returnObjects: true }) as CountrySchedule[] : [];
  
  // Usar os horários traduzidos ou os padrão se não estiverem disponíveis
  const finalSchedules = isClient && translatedSchedules?.length > 0 ? translatedSchedules : schedules;
  
  return (
    <section className="relative py-16 bg-black overflow-hidden">
      {/* Background elements */}
      {/* <div className="absolute inset-0 opacity-10 bg-cover bg-center" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      /> */}
      
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
          {/* <div className="inline-flex items-center justify-center bg-[#01C38D]/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-[#01C38D]/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#01C38D] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-white font-medium">{date}</span>
          </div> */}
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {isClient ? t('eventSchedule.title') : "Evento"} <span className="text-[#01C38D]">Global</span> {isClient ? "" : "e Gratuito"}
          </h2>
          
          <div className="w-24 h-1 bg-[#01C38D] mx-auto mb-6"></div>
          
          <p className="text-white/80 text-xl max-w-2xl mx-auto">
            {isClient ? t('eventSchedule.description') : "Participe deste evento global com especialistas em feridas e estomias"}
          </p>
        </div>
        
        {/* Main content - Schedule list */}
        <div className="max-w-4xl mx-auto">
          {/* Countdown banner */}
          <div className="bg-black/40 backdrop-blur-md border border-[#01C38D]/20 rounded-xl p-6 mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">{isClient ? t('common.countdown') : "Contagem Regressiva"}</h3>
                <p className="text-white/70">
                {isClient ? t('eventSchedule.countdownText') : "Faltam apenas alguns dias para o início do evento"}
                </p>
              </div>
              <div className="flex-shrink-0">
                <CountdownTimer targetDate="2025-07-08T19:00:00" />
              </div>
            </div>
          </div>
          
          {/* Schedule cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {finalSchedules.map((schedule, index) => (
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
            <a href="#call-to-action" className="inline-block bg-[#01C38D] hover:bg-[#01C38D]/80 text-white font-bold py-4 px-10 rounded-lg text-xl uppercase tracking-wider transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#01C38D]/20 text-center">
              {isClient ? t('eventSchedule.reserveButton') : "Reservar Minha Vaga"}
            </a>
            
            <p className="text-white/60 mt-6">
              {isClient ? t('eventSchedule.eventInfo') : "Evento online com certificado digital para todos os participantes"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
