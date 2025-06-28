/**
 * Script de teste para validar a integração com o Google Sheets
 * 
 * Este script testa diretamente a função addRowToSheet do serviço googleSheetService
 * para verificar se a autenticação e a inserção de dados estão funcionando corretamente.
 */

import { addRowToSheet, testConnection } from './services/googleSheetService.js';

// Dados de teste para simular um envio de formulário
const testData = {
  nome: 'Usuário Teste',
  email: 'teste@example.com',
  telefone: '+5511999999999',
  pais: 'Brasil',
  utmSource: 'teste-integracao',
  utmCampaign: 'validacao',
  utmMedium: 'script',
  utmContent: 'teste-direto',
  grupoWpp: 'Sim',
  quizzResposta1: 'Teste R1',
  quizzResposta2: 'Teste R2',
  quizzResposta3: 'Teste R3'
};

// Função para executar o teste
async function runTest() {
  console.log('🧪 Iniciando teste de integração com Google Sheets...');
  
  try {
    // Primeiro, testa a conexão
    console.log('📡 Testando conexão com a planilha...');
    const connectionResult = await testConnection();
    
    if (!connectionResult.success) {
      throw new Error(`Falha na conexão: ${connectionResult.message}`);
    }
    
    console.log('✅ Conexão bem-sucedida!');
    console.log(`📊 Planilha: ${connectionResult.message}`);
    
    // Se a conexão for bem-sucedida, tenta adicionar uma linha
    console.log('\n📝 Tentando adicionar uma linha de teste...');
    console.log('Dados de teste:', testData);
    
    const addResult = await addRowToSheet(testData);
    
    if (!addResult.success) {
      throw new Error(`Falha ao adicionar linha: ${addResult.error}`);
    }
    
    console.log('✅ Linha adicionada com sucesso!');
    console.log('🎉 Teste de integração concluído com sucesso!');
    console.log('\n📋 Verifique sua planilha do Google Sheets para confirmar que os dados foram adicionados.');
    
  } catch (error) {
    console.error('❌ Erro durante o teste de integração:', error);
    console.error('Detalhes do erro:', error.message);
  }
}

// Executa o teste
runTest();
