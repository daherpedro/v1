import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n/i18n';

interface I18nProviderProps {
  children: React.ReactNode;
}

export default function I18nProvider({ children }: I18nProviderProps) {
  // Inicializar i18n quando o componente for montado
  useEffect(() => {
    // Garantir que o i18n está inicializado
    if (!i18n.isInitialized) {
      i18n.init();
    }
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}
