import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  // Start with a null state to prevent hydration mismatch
  const [currentLanguage, setCurrentLanguage] = useState<string | null>(null);
  
  // Only set the language after client-side hydration
  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
    // Salvar a preferência de idioma no localStorage
    localStorage.setItem('i18nextLng', lng);
    // Emitir evento personalizado para notificar outras partes da aplicação
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lng } }));
  };

  // Default style for all buttons before client-side hydration
  const defaultButtonClass = 'flex items-center justify-center w-8 h-8 rounded-full bg-black/40 text-white/70 hover:bg-black/60 transition-all duration-200';
  const activeButtonClass = 'flex items-center justify-center w-8 h-8 rounded-full bg-[#01C38D] text-white transition-all duration-200';
  
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <button
        onClick={() => changeLanguage('pt')}
        className={currentLanguage === null ? defaultButtonClass : 
          currentLanguage === 'pt' ? activeButtonClass : defaultButtonClass}
        aria-label="Português"
        title="Português"
      >
        PT
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={currentLanguage === null ? defaultButtonClass : 
          currentLanguage === 'en' ? activeButtonClass : defaultButtonClass}
        aria-label="English"
        title="English"
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('es')}
        className={currentLanguage === null ? defaultButtonClass : 
          currentLanguage === 'es' ? activeButtonClass : defaultButtonClass}
        aria-label="Español"
        title="Español"
      >
        ES
      </button>
    </div>
  );
}
