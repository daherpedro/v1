import { testConnection, updateQuizByHash } from '../../services/googleSheetService.js';
import type { APIRoute } from 'astro';

// Interface para os dados do formulário de quiz
interface QuizData {
  hash: string;
  quizzResposta1?: string;
  quizzResposta2?: string;
  quizzResposta3?: string;
  grupoWpp?: string;
}

// Interface para a resposta da API
interface ApiResponse {
  success: boolean;
  message?: string;
}

// Interface para a linha da planilha
interface SheetRow {
  hash: string;
  [key: string]: any;
  save(): Promise<void>;
}

// Removido createAuth - agora usando a função do serviço

export const POST: APIRoute = async ({ request }) => {
  try {
    // Extrair os dados do corpo da requisição
    const quizData = await request.json() as QuizData;
    
    // Validar dados essenciais
    if (!quizData.hash) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Hash não fornecido. Impossível identificar o registro.'
        } as ApiResponse),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Não precisamos mais obter configurações aqui, pois estão no serviço
    
    // Primeiro, testar a conexão com o Google Sheets
    const connectionResult = await testConnection();
    
    if (!connectionResult.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: `Falha na conexão com Google Sheets: ${connectionResult.message}`
        } as ApiResponse),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Usar a função do serviço para atualizar as respostas do quiz
    const result = await updateQuizByHash(quizData);
    
    if (!result.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: result.message || 'Erro ao atualizar respostas do quiz.'
        } as ApiResponse),
        { status: result.message?.includes('não encontrado') ? 404 : 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Respostas do quiz atualizadas com sucesso.'
      } as ApiResponse),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    
    return new Response(
      JSON.stringify({
        success: false,
        message: `Erro ao atualizar respostas do quiz: ${errorMessage}`
      } as ApiResponse),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
