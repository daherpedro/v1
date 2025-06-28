import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { GOOGLE_SHEETS_CONFIG } from '../config/googleSheetConfig.js';

/**
 * Serviço para conectar e enviar dados para o Google Sheets
 * 
 * Para usar este serviço, você precisa:
 * 1. Criar um projeto no Google Cloud Console
 * 2. Habilitar a API do Google Sheets
 * 3. Criar uma conta de serviço e baixar a chave privada (JSON)
 * 4. Compartilhar sua planilha com o email da conta de serviço
 */

// Obtém as configurações do arquivo de configuração
const { SPREADSHEET_ID, SHEET_ID, CLIENT_EMAIL, PRIVATE_KEY } = GOOGLE_SHEETS_CONFIG;

// Cria o objeto de autenticação JWT para o Google Sheets
const createAuth = () => {
  return new JWT({
    email: CLIENT_EMAIL,
    key: PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
};

/**
 * Adiciona uma linha de dados à planilha do Google Sheets
 * @param {Object} rowData - Objeto com os dados a serem adicionados
 * @returns {Promise} - Promessa com o resultado da operação
 */
export const addRowToSheet = async (rowData) => {
  try {
    // Cria a autenticação
    const auth = createAuth();
    
    // Inicializa o documento com a autenticação JWT
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, auth);
    
    // Carrega as informações do documento
    await doc.loadInfo();
    // console.log(`Acessando planilha: ${doc.title}`);
    
    // Acessa a aba específica pelo ID ou índice
    const sheet = doc.sheetsById[SHEET_ID] || doc.sheetsByIndex[0];
    
    // Formata a data atual
    const now = new Date();
    const dataFormatada = now.toLocaleString('pt-BR', { 
      timeZone: 'America/Sao_Paulo' 
    });
    
    // Prepara os dados com a data atual
    // Garantir que o hash seja salvo sem espaços extras
    const sessionHash = rowData.sessionId ? rowData.sessionId.trim() : '';
    // console.log('Salvando formulário com hash:', sessionHash);
    
    const rowDataWithDate = {
      hash: sessionHash, // Adiciona o ID único da sessão como primeira coluna (sem espaços extras)
      Data_Lead: dataFormatada,
      Nome: rowData.nome || '',
      Email: rowData.email || '',
      Whatsapp: rowData.telefone || '',
      Pais: rowData.pais || '',
      UTM_Source: rowData.utmSource || '',
      UTM_Campaign: rowData.utmCampaign || '',
      UTM_Medium: rowData.utmMedium || '',
      UTM_Content: rowData.utmContent || '',
      Grupo_WPP: rowData.grupoWpp || '',
      Quizz_Resposta1: rowData.quizzResposta1 || '',
      Quizz_Resposta2: rowData.quizzResposta2 || '',
      Quizz_Resposta3: rowData.quizzResposta3 || ''
    };
    
    // Adiciona a linha à planilha
    const result = await sheet.addRow(rowDataWithDate);
    // console.log('Dados adicionados com sucesso:', result);
    
    return { success: true, data: result };
  } catch (error) {
    console.error('Erro ao adicionar dados à planilha:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Testa a conexão com o Google Sheets
 * @returns {Promise} - Promessa com o resultado do teste
 */
export const testConnection = async () => {
  try {
    // console.log('Iniciando teste de conexão...');
    // console.log('SPREADSHEET_ID:', SPREADSHEET_ID);
    // console.log('SHEET_ID:', SHEET_ID);
    // console.log('CLIENT_EMAIL:', CLIENT_EMAIL);
    
    // Cria a autenticação
    // console.log('Criando objeto de autenticação JWT...');
    const auth = createAuth();
    
    // Inicializa o documento com a autenticação JWT
    // console.log('Inicializando documento do Google Sheets...');
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, auth);
    
    // Carrega as informações do documento
    // console.log('Carregando informações do documento...');
    await doc.loadInfo();
    // console.log('Documento carregado com sucesso!');
    // console.log('Título da planilha:', doc.title);
    
    return { 
      success: true, 
      message: `Conexão bem-sucedida. Planilha: ${doc.title}` 
    };
  } catch (error) {
    console.error('Erro ao testar conexão:', error);
    console.error('Detalhes do erro:', JSON.stringify(error, null, 2));
    return { 
      success: false, 
      message: `Erro na conexão: ${error.message}` 
    };
  }
};

/**
 * Atualiza as respostas do quiz para uma linha identificada pelo hash
 * @param {Object} quizData - Objeto com o hash e as respostas do quiz
 * @returns {Promise} - Promessa com o resultado da operação
 */
export const updateQuizByHash = async (quizData) => {
  try {
    // Cria a autenticação
    const auth = createAuth();
    
    // Inicializa o documento com a autenticação JWT
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, auth);
    
    // Carrega as informações do documento
    await doc.loadInfo();
    // console.log(`Acessando planilha: ${doc.title}`);
    
    // Acessa a aba específica pelo ID ou índice
    const sheet = doc.sheetsById[SHEET_ID] || doc.sheetsByIndex[0];
    
    if (!sheet) {
      console.error('Planilha não encontrada');
      return { 
        success: false, 
        message: 'Planilha não encontrada' 
      };
    }
    
    // Carregar todas as linhas
    const rows = await sheet.getRows();
    
    // Logs para depuração
    // console.log('Total de linhas na planilha:', rows.length);
    // console.log('Hash sendo procurado:', quizData.hash);
    // console.log('Tipo do hash recebido:', typeof quizData.hash);
    
    // Verificar os hashes existentes na planilha (primeiras 5 linhas)
    const sampleRows = rows.slice(0, 5);
    console.log('Amostra de hashes na planilha:');
    sampleRows.forEach((row, index) => {
      console.log(`Linha ${index + 1}:`, {
        hash: row.hash,
        tipo: typeof row.hash,
        igualdade: row.hash === quizData.hash,
        igualdadeTrim: row.hash?.trim() === quizData.hash?.trim()
      });
    });
    
    // Obter os headers da planilha para identificar o nome correto da coluna hash
    const headerValues = rows.length > 0 ? Object.keys(rows[0]._rawData) : [];
    console.log('Headers da planilha:', headerValues);
    
    // Verificar o nome correto da coluna que contém o hash
    const hashColumnName = headerValues[0]; // Assumindo que o hash é a primeira coluna
    console.log('Nome da coluna hash:', hashColumnName);
    
    // Verificar os dados brutos das primeiras linhas
    console.log('Dados brutos das primeiras 3 linhas:');
    rows.slice(0, 3).forEach((row, index) => {
      console.log(`Linha ${index + 1} - Dados:`, row._rawData);
    });
    
    // Procurar a linha com o hash correspondente usando os dados brutos
    const hashLimpo = quizData.hash.trim();
    console.log('Procurando hash limpo:', hashLimpo);
    
    let targetRow = null;
    
    // Procurar usando os dados brutos
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowHash = row._rawData[0]; // O hash está na primeira coluna
      
      if (rowHash && (rowHash === hashLimpo || rowHash.trim() === hashLimpo)) {
        targetRow = row;
        console.log('Hash encontrado na linha:', i + 1);
        break;
      }
    }
    
    if (!targetRow) {
      console.error('Registro não encontrado com o hash fornecido:', quizData.hash);
      return { 
        success: false, 
        message: 'Registro não encontrado com o hash fornecido. Por favor, verifique se o link que você está usando é o mesmo que recebeu por e-mail.' 
      };
    }
    
    // Obter os índices das colunas para as respostas do quiz
    const headerRow = await sheet.headerValues;
    // console.log('Headers completos:', headerRow);
    
    // Encontrar os índices das colunas de resposta - busca exata primeiro
    let quizResp1Index = headerRow.findIndex(h => h === 'Quizz_Resposta1');
    let quizResp2Index = headerRow.findIndex(h => h === 'Quizz_Resposta2');
    let quizResp3Index = headerRow.findIndex(h => h === 'Quizz_Resposta3');
    
    // Se não encontrar, buscar por substring
    if (quizResp1Index < 0) quizResp1Index = headerRow.findIndex(h => h && h.includes('Resposta1'));
    if (quizResp2Index < 0) quizResp2Index = headerRow.findIndex(h => h && h.includes('Resposta2'));
    if (quizResp3Index < 0) quizResp3Index = headerRow.findIndex(h => h && h.includes('Resposta3'));
    
    // Se ainda não encontrar, usar posições fixas (assumindo que as respostas estão nas últimas três colunas)
    if (quizResp1Index < 0) quizResp1Index = headerRow.length - 3;
    if (quizResp2Index < 0) quizResp2Index = headerRow.length - 2;
    if (quizResp3Index < 0) quizResp3Index = headerRow.length - 1;
    
    // console.log('Índices das colunas de resposta:', { quizResp1Index, quizResp2Index, quizResp3Index });
    // console.log('Valores atuais:', {
    //   resp1: targetRow._rawData[quizResp1Index],
    //   resp2: targetRow._rawData[quizResp2Index],
    //   resp3: targetRow._rawData[quizResp3Index]
    // });
    
    // Atualizar os campos de resposta do quiz usando os índices encontrados
    targetRow._rawData[quizResp1Index] = quizData.quizzResposta1 || '';
    targetRow._rawData[quizResp2Index] = quizData.quizzResposta2 || '';
    targetRow._rawData[quizResp3Index] = quizData.quizzResposta3 || '';
    
    // Atualizar o campo grupoWpp se fornecido
    if (quizData.grupoWpp) {
      // Encontrar o índice da coluna grupoWpp
      const grupoWppIndex = headerRow.findIndex(h => h === 'grupoWpp' || (h && h.toLowerCase().includes('grupo') && h.toLowerCase().includes('wpp')));
      if (grupoWppIndex >= 0) {
        targetRow._rawData[grupoWppIndex] = quizData.grupoWpp;
      }
    }
    
    // Salvar as alterações
    await targetRow.save();
    // console.log('Respostas do quiz atualizadas com sucesso para o hash:', quizData.hash);
    
    return { 
      success: true, 
      message: 'Respostas do quiz atualizadas com sucesso.' 
    };
  } catch (error) {
    console.error('Erro ao atualizar respostas do quiz:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
};

/**
 * Instruções para configurar o Google Sheets API:
 * 
 * 1. Acesse https://console.cloud.google.com/
 * 2. Crie um novo projeto
 * 3. Vá para "APIs e Serviços" > "Biblioteca"
 * 4. Pesquise e ative "Google Sheets API"
 * 5. Vá para "APIs e Serviços" > "Credenciais"
 * 6. Clique em "Criar Credenciais" > "Conta de serviço"
 * 7. Preencha os detalhes da conta de serviço e clique em "Concluir"
 * 8. Clique na conta de serviço criada > "Chaves" > "Adicionar chave" > "Criar nova chave"
 * 9. Selecione o formato JSON e clique em "Criar"
 * 10. Abra o arquivo JSON baixado e copie os valores para o arquivo de configuração
 * 11. Compartilhe sua planilha do Google com o email da conta de serviço
 */
