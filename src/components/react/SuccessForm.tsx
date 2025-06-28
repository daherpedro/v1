import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SuccessFormProps {
  pageKey: 'successPage1' | 'successPage2';
  whatsappUrl: string;
}

const SuccessForm: React.FC<SuccessFormProps> = ({ pageKey, whatsappUrl }) => {
  const { t } = useTranslation();
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [selectedJobCount, setSelectedJobCount] = useState<string | null>(null);
  const [selectedIncome, setSelectedIncome] = useState<string | null>(null);
  const [formCompleted, setFormCompleted] = useState(false);

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
          onClick={(e) => !formCompleted && e.preventDefault()}
        >
          {formCompleted ? t(`${pageKey}.buttonText`) : t('common.completeFormMessage')}
        </a>
        {!formCompleted && (
          <p className="text-[#01C38D] text-sm mt-2 text-center">
            {t('common.completeFormMessage', 'Complete o formulário para continuar')}
          </p>
        )}
      </div>
    </div>
  );
};

export default SuccessForm;
