import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Declaração do tipo para o Facebook Pixel
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

interface SuccessFormProps {
  pageKey: 'successPage1' | 'successPage2';
  whatsappUrl: string;
  hash?: string; // Hash opcional para identificar o registro
}

const SuccessForm: React.FC<SuccessFormProps> = ({ pageKey, whatsappUrl, hash }) => {
  const { t } = useTranslation();
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [selectedJobCount, setSelectedJobCount] = useState<string | null>(null);
  const [selectedIncome, setSelectedIncome] = useState<string | null>(null);
  const [formCompleted, setFormCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // Capturar o hash da URL se não for fornecido como prop
  const [sessionHash, setSessionHash] = useState<string | null>(hash || null);
  
  useEffect(() => {
    // Se o hash não foi fornecido como prop, tenta obter da URL
    if (!sessionHash) {
      const urlParams = new URLSearchParams(window.location.search);
      const hashFromUrl = urlParams.get('hash');
      if (hashFromUrl) {
        console.log('Hash encontrado na URL:', hashFromUrl);
        setSessionHash(hashFromUrl.trim()); // Remover espaços extras
      } else {
        // Tenta recuperar do localStorage como fallback
        const storedHash = localStorage.getItem('form_session_id');
        if (storedHash) {
          console.log('Hash encontrado no localStorage:', storedHash);
          setSessionHash(storedHash.trim()); // Remover espaços extras
        }
      }
    } else {
      console.log('Hash fornecido como prop:', hash);
    }
  }, [hash, sessionHash]);

  // Opções do formulário baseadas nas traduções
  const ageOptions = t(`${pageKey}.ageRange.options`, { returnObjects: true }) as string[];
  const jobOptions = t(`${pageKey}.jobCount.options`, { returnObjects: true }) as string[];
  const incomeOptions = t(`${pageKey}.desiredIncome.options`, { returnObjects: true }) as string[];

  // Verifica se o formulário está completo
  React.useEffect(() => {
    if (selectedAge && selectedJobCount && selectedIncome) {
      setFormCompleted(true);
    } else {
      setFormCompleted(false);
    }
  }, [selectedAge, selectedJobCount, selectedIncome]);
  
  // Função para enviar as respostas do quiz para a API
  const submitQuizResponses = async () => {
    if (!sessionHash || !formCompleted) {
      console.log('Não é possível enviar:', { sessionHash, formCompleted });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Disparar evento personalizado do Facebook Pixel para conclusão do quiz
      if (typeof window.fbq !== 'undefined') {
        window.fbq('trackCustom', 'quiz_completed');
        console.log('Facebook Pixel: quiz_completed event tracked');
      }
      
      // Garantir que o hash está sem espaços extras
      const cleanHash = sessionHash.trim();
      console.log('Enviando dados com hash:', cleanHash);
      
      // Preparar os dados para envio
      const quizData = {
        hash: cleanHash,
        quizzResposta1: selectedAge || '',
        quizzResposta2: selectedJobCount || '',
        quizzResposta3: selectedIncome || '',
        grupoWpp: 'Sim' // Atualizar para indicar que o usuário entrou no grupo do WhatsApp
      };
      
      // console.log('Dados sendo enviados:', quizData);
      
      // Enviar para a API
      const response = await fetch('/api/update-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(quizData)
      });
      
      const result = await response.json();
      // console.log('Resposta da API:', result);
      
      if (result.success) {
        setSubmitSuccess(true);
        // console.log('Respostas do quiz enviadas com sucesso!');
      } else {
        setSubmitError(result.message || 'Erro ao enviar respostas');
        console.error('Erro ao enviar respostas:', result.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setSubmitError(errorMessage);
      console.error('Erro ao enviar respostas do quiz:', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para selecionar uma opção
  const selectOption = (
    setter: React.Dispatch<React.SetStateAction<string | null>>,
    value: string
  ) => {
    setter(value);
  };

  // Renderiza um grupo de botões de opção
  const renderOptionButtons = (
    options: string[],
    selectedValue: string | null,
    setter: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {options.map((option, index) => (
          <button
            key={index}
            type="button"
            onClick={() => selectOption(setter, option)}
            className={`px-4 py-2 rounded-md text-sm transition-colors ${
              selectedValue === option
                ? 'bg-[#01C38D] text-black font-medium'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 mt-6 border border-gray-800">
      <h3 className="text-xl font-bold text-[#01C38D] mb-2">
        {t(`${pageKey}.formTitle`)}
      </h3>
      <p className="text-gray-300 mb-6">
        {t(`${pageKey}.formDescription`)}
      </p>

      <div className="space-y-6">
        {/* Faixa etária */}
        <div>
          <label className="block text-white font-medium mb-2">
            {t(`${pageKey}.ageRange.label`)}
          </label>
          {renderOptionButtons(ageOptions, selectedAge, setSelectedAge)}
        </div>

        {/* Quantidade de empregos */}
        <div>
          <label className="block text-white font-medium mb-2">
            {t(`${pageKey}.jobCount.label`)}
          </label>
          {renderOptionButtons(jobOptions, selectedJobCount, setSelectedJobCount)}
        </div>

        {/* Renda desejada */}
        <div>
          <label className="block text-white font-medium mb-2">
            {t(`${pageKey}.desiredIncome.label`)}
          </label>
          {renderOptionButtons(incomeOptions, selectedIncome, setSelectedIncome)}
        </div>
      </div>

      <div className="mt-8">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full flex items-center justify-center px-6 py-3 rounded-md text-center font-bold transition-all ${
            formCompleted
              ? 'bg-[#01C38D] hover:bg-[#01a578] text-white'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
          onClick={(e) => {
            if (!formCompleted) {
              e.preventDefault();
              return;
            }
            
            // Disparar evento personalizado do Facebook Pixel para entrada no grupo do WhatsApp
            if (typeof window.fbq !== 'undefined') {
              window.fbq('trackCustom', 'join_whatsapp_group');
              console.log('Facebook Pixel: join_whatsapp_group event tracked');
            }
            
            // Enviar respostas do quiz antes de redirecionar
            submitQuizResponses();
          }}
        >
          {isSubmitting ? t('common.sending') : 
           formCompleted ? t(`${pageKey}.buttonText`) : 
           t('common.completeFormMessage')}
        </a>
        
        {!formCompleted && (
          <p className="text-[#01C38D] text-sm mt-2 text-center">
            {t('common.completeFormMessage', 'Complete o formulário para continuar')}
          </p>
        )}
        
        {submitError && (
          <p className="text-rose-500 text-sm mt-2 text-center">
            {submitError}
          </p>
        )}
        
        {submitSuccess && (
          <p className="text-green-500 text-sm mt-2 text-center">
            {t('common.responsesSaved', 'Suas respostas foram salvas!')}
          </p>
        )}
        
        {!sessionHash && (
          <p className="text-amber-500 text-sm mt-2 text-center">
            {t('common.noHashWarning', 'Aviso: Não foi possível identificar sua sessão. Suas respostas podem não ser salvas.')}
          </p>
        )}
      </div>
    </div>
  );
};

export default SuccessForm;
