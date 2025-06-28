import React from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Salvar a preferência de idioma no localStorage
    localStorage.setItem('i18nextLng', lng);
    // Emitir evento personalizado para notificar outras partes da aplicação
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lng } }));
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <button
        onClick={() => changeLanguage('pt')}
        className={`flex items-center justify-center w-8 h-8 rounded-full ${
          currentLanguage === 'pt' ? 'bg-[#01C38D] text-white' : 'bg-black/40 text-white/70 hover:bg-black/60'
        } transition-all duration-200`}
        aria-label="Português"
        title="Português"
      >
        PT
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`flex items-center justify-center w-8 h-8 rounded-full ${
          currentLanguage === 'en' ? 'bg-[#01C38D] text-white' : 'bg-black/40 text-white/70 hover:bg-black/60'
        } transition-all duration-200`}
        aria-label="English"
        title="English"
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('es')}
        className={`flex items-center justify-center w-8 h-8 rounded-full ${
          currentLanguage === 'es' ? 'bg-[#01C38D] text-white' : 'bg-black/40 text-white/70 hover:bg-black/60'
        } transition-all duration-200`}
        aria-label="Español"
        title="Español"
      >
        ES
      </button>
    </div>
  );
}
