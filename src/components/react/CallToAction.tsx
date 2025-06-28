import React, { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import { useTranslation } from 'react-i18next';
import 'react-international-phone/style.css';
import '../../styles/phone-input-custom.css';

interface CallToActionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  backgroundImage?: string;
}

export default function CallToAction({
  title,
  description,
  buttonText,
  buttonUrl = '#',
  backgroundImage = '/images/bg/649702f6eaa2f396e66b8a99_ds-home-texture-one.jpg'
}: CallToActionProps) {
  const { t } = useTranslation();
  const [phone, setPhone] = useState('');
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#191E29] via-[#01C38D] to-[#132D46]"></div>
      
      {/* Background texture */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Decorative elements */}
  
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl border-2 border-white/10">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('callToAction.title')}</h2>
              <p className="text-white/80 max-w-2xl mx-auto">{t('callToAction.subtitle')}</p>
            </div>

            
            <div className="mt-10">
              <form className="max-w-lg mx-auto">
                <div className="space-y-4">
                  {/* Nome */}
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder={t('callToAction.namePlaceholder')} 
                      className="w-full bg-neutral-900/5 backdrop-blur-sm border-2 border-neutral-300/10 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#01C38D] focus:border-[#01C38D] shadow-inner shadow-white/10 transition-all duration-300"
                      required
                    />
                  </div>
                  
                  {/* E-mail */}
                  <div className="relative">
                    <input 
                      type="email" 
                      placeholder={t('callToAction.emailPlaceholder')} 
                      className="w-full bg-neutral-900/5 backdrop-blur-sm border-2 border-black/30 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#01C38D] focus:border-[#01C38D] shadow-inner shadow-white/10 transition-all duration-300"
                      required
                    />
                  </div>
                  
                  {/* WhatsApp com seletor internacional */}
                  <div className="relative">
                    <PhoneInput
                      defaultCountry="br"
                      placeholder={t('callToAction.phonePlaceholder')}
                      value={phone}
                      onChange={(phone) => setPhone(phone)}
                      className="phone-input-custom"
                      required
                    />
                  </div>
                  
                  {/* Botão de envio */}
                  <div className="pt-4">
                    <button 
                      type="submit" 
                      className="w-full from-rose-500 to-rose-600 bg-gradient-to-r hover:from-rose-600 hover:to-rose-700 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-rose-500/30 transform transition-all duration-300 hover:-translate-y-1 uppercase tracking-wide border border-white/10"
                    >
                      {t('callToAction.submitButton')}
                    </button>
                  </div>
                  
                  {/* Política de privacidade */}
                  <p className="text-center text-white/60 text-sm mt-4">{t('callToAction.spots', { count: 100 })}</p>
                  <div className="text-center text-white/60 text-sm mt-4"
                    dangerouslySetInnerHTML={{ __html: t('callToAction.privacyPolicy') }}
                  ></div>
                </div>
              </form>
            </div>
            
            <div className="mt-8 flex justify-center items-center space-x-4 text-white/80">
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>{t('callToAction.eventDate')}</span>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>{t('callToAction.freeEvent')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
