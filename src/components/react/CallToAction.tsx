import React, { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { PhoneInput } from 'react-international-phone';
import { useTranslation } from 'react-i18next';
import 'react-international-phone/style.css';
import '../../styles/phone-input-custom.css';
// Importação para gerar hash único
import { v4 as uuidv4 } from 'uuid';

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
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pais, setPais] = useState('Brasil');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [sessionId, setSessionId] = useState('');

  // UTM parameters
  const [utmParams, setUtmParams] = useState({
    utmSource: '',
    utmCampaign: '',
    utmMedium: '',
    utmContent: ''
  });

  // Get UTM parameters from URL and generate session ID on component mount
  useEffect(() => {
    // Gerar um ID de sessão único ou recuperar do localStorage se já existir
    const getOrCreateSessionId = () => {
      const storedSessionId = localStorage.getItem('form_session_id');
      if (storedSessionId) {
        return storedSessionId;
      } else {
        // Gerar um novo UUID e armazenar no localStorage
        const newSessionId = uuidv4();
        localStorage.setItem('form_session_id', newSessionId);
        return newSessionId;
      }
    };
    
    // Definir o ID de sessão
    setSessionId(getOrCreateSessionId());
    
    // Obter parâmetros UTM da URL
    const urlParams = new URLSearchParams(window.location.search);
    setUtmParams({
      utmSource: urlParams.get('utm_source') || '',
      utmCampaign: urlParams.get('utm_campaign') || '',
      utmMedium: urlParams.get('utm_medium') || '',
      utmContent: urlParams.get('utm_content') || ''
    });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!nome || !email || !phone) {
      setErrorMessage(t('callToAction.formError'));
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      console.log('Iniciando envio do formulário...');
      
      // Dados a serem enviados para o Google Sheets
      const formData = {
        sessionId, // ID único da sessão como primeira coluna
        nome,
        email,
        telefone: phone,
        pais,
        utmSource: utmParams.utmSource,
        utmCampaign: utmParams.utmCampaign,
        utmMedium: utmParams.utmMedium,
        utmContent: utmParams.utmContent,
        grupoWpp: 'Não', // Valor padrão para participação no grupo de WhatsApp
        quizzResposta1: '', // Estes campos podem ser preenchidos em outra parte do fluxo
        quizzResposta2: '',
        quizzResposta3: ''
      };

      // console.log('Dados do formulário:', formData);
      
      // Usando o endpoint de API para enviar dados ao Google Sheets
      // console.log('Enviando dados para a API...');
      // console.log('Dados sendo enviados:', JSON.stringify(formData, null, 2));
      
      let response;
      try {
        // Usar o caminho completo para o endpoint
        response = await fetch('/api/submit-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        // Verificar se a resposta é válida
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Resposta de erro da API:', errorText);
          throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
        }
      } catch (fetchError) {
        console.error('Erro na requisição fetch:', fetchError);
        throw new Error(`Erro na requisição: ${fetchError instanceof Error ? fetchError.message : 'Erro desconhecido'}`);
      }
      
      const result = await response.json();
      console.log('Resposta da API:', result);
      
      if (result.success) {
        console.log('Formulário enviado com sucesso!');
        setSubmitStatus('success');
        
        // Limpar o formulário após o envio bem-sucedido
        setNome('');
        setEmail('');
        setPhone('');
        
        // Redirecionar para página de sucesso com o hash como parâmetro
        window.location.href = `/success/2?hash=${encodeURIComponent(sessionId)}`;
      } else {
        console.error('Erro retornado pela API:', result.message);
        throw new Error(result.message || 'Erro ao enviar formulário');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      console.error('Erro ao enviar formulário:', errorMessage);
      setSubmitStatus('error');
      setErrorMessage(t('callToAction.submitError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="call-to-action" className="relative py-20 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#191E29] via-[#01C38D] to-[#132D46]"></div>
      
      {/* Background texture */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl border-2 border-white/10">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('callToAction.title')}</h2>
              <p className="text-white/80 max-w-2xl mx-auto">{t('callToAction.subtitle')}</p>
            </div>

            <div className="mt-10">
              <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {/* Nome */}
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder={t('callToAction.namePlaceholder')} 
                      className="w-full bg-neutral-900/5 backdrop-blur-sm border-2 border-neutral-300/10 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#01C38D] focus:border-[#01C38D] shadow-inner shadow-white/10 transition-all duration-300"
                      required
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </div>
                  
                  {/* E-mail */}
                  <div className="relative">
                    <input 
                      type="email" 
                      placeholder={t('callToAction.emailPlaceholder')} 
                      className="w-full bg-neutral-900/5 backdrop-blur-sm border-2 border-black/30 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#01C38D] focus:border-[#01C38D] shadow-inner shadow-white/10 transition-all duration-300"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  
                  {/* WhatsApp com seletor internacional */}
                  <div className="relative">
                    <PhoneInput
                      defaultCountry="br"
                      placeholder={t('callToAction.phonePlaceholder')}
                      value={phone}
                      onChange={(phone) => {
                        setPhone(phone);
                        // Atualiza o país com base no código do país selecionado
                        const countryCodeMap: {[key: string]: string} = {
                          '+55': 'Brasil',
                          '+54': 'Argentina',
                          '+34': 'Espanha',
                          '+351': 'Portugal',
                          '+1': 'Estados Unidos',
                          '+52': 'México',
                          '+56': 'Chile',
                          '+57': 'Colômbia',
                          '+58': 'Venezuela',
                          '+591': 'Bolívia',
                          '+593': 'Equador',
                          '+595': 'Paraguai',
                          '+598': 'Uruguai',
                          '+502': 'Guatemala',
                          '+503': 'El Salvador',
                          '+504': 'Honduras',
                          '+505': 'Nicarágua',
                          '+506': 'Costa Rica',
                          '+507': 'Panamá',
                          '+39': 'Itália',
                          '+33': 'França',
                          '+44': 'Reino Unido',
                          '+49': 'Alemanha',
                        };
                        
                        // Encontra o código do país no telefone
                        let foundCountry = '';
                        Object.keys(countryCodeMap).forEach(code => {
                          if (phone.startsWith(code)) {
                            // Se encontrar um código mais longo que o atual, use-o
                            if (!foundCountry || code.length > foundCountry.length) {
                              foundCountry = code;
                            }
                          }
                        });
                        
                        // Define o país se encontrado
                        if (foundCountry && countryCodeMap[foundCountry]) {
                          setPais(countryCodeMap[foundCountry]);
                        } else {
                          // Padrão para Brasil se não encontrar
                          setPais('Brasil');
                        }
                      }}
                      className="phone-input-custom"
                      required
                    />
                  </div>
                  
                  {/* Mensagem de erro */}
                  {errorMessage && (
                    <div className="text-rose-500 text-sm mt-2">
                      {errorMessage}
                    </div>
                  )}
                  
                  {/* Botão de envio */}
                  <div className="pt-4">
                    <button 
                      type="submit" 
                      className="w-full from-rose-500 to-rose-600 bg-gradient-to-r hover:from-rose-600 hover:to-rose-700 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-rose-500/30 transform transition-all duration-300 hover:-translate-y-1 uppercase tracking-wide border border-white/10"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? t('callToAction.submitting') : t('callToAction.submitButton')}
                    </button>
                  </div>
                  
                  {/* Status de sucesso */}
                  {submitStatus === 'success' && (
                    <div className="text-green-400 text-sm mt-2">
                      {t('callToAction.submitSuccess')}
                    </div>
                  )}
                  
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
