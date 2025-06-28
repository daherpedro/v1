import { addRowToSheet, testConnection } from '../../services/googleSheetService.js';
import type { APIRoute } from 'astro';

// Interface para os dados do formulário
interface FormData {
  sessionId: string; // Identificador único da sessão
  nome: string;
  email: string;
  telefone: string;
  pais: string;
  utmSource: string;
  utmCampaign: string;
  utmMedium: string;
  utmContent: string;
  grupoWpp: string;
  quizzResposta1: string;
  quizzResposta2: string;
  quizzResposta3: string;
}

// Interface para a resposta da API
interface ApiResponse {
  success: boolean;
  message?: string;
  connectionMessage?: string;
  addMessage?: string;
}

export const GET: APIRoute = async () => {
  try {
    // Primeiro, testa a conexão
    const connectionResult = await testConnection();
    
    if (!connectionResult.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: `Falha na conexão: ${connectionResult.message}`
        } as ApiResponse),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Dados de teste para simular um envio de formulário
    const testData: FormData = {
      sessionId: `test-${Date.now()}`, // Gera um ID de teste baseado no timestamp atual
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
    
    // Se a conexão for bem-sucedida, tenta adicionar uma linha
    const addResult = await addRowToSheet(testData);
    
    if (!addResult.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: `Falha ao adicionar linha: ${addResult.error}`
        } as ApiResponse),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        connectionMessage: connectionResult.message,
        addMessage: 'Linha adicionada com sucesso!'
      } as ApiResponse),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    
    return new Response(
      JSON.stringify({
        success: false,
        message: `Erro durante o teste: ${errorMessage}`
      } as ApiResponse),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
