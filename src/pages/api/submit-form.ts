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
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Extrair os dados do corpo da requisição
    const formData = await request.json() as FormData;
    
    // Validar dados essenciais
    if (!formData.nome || !formData.email || !formData.telefone) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Dados incompletos. Nome, email e telefone são obrigatórios.'
        } as ApiResponse),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
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
    
    // Se a conexão for bem-sucedida, adicionar os dados à planilha
    const addResult = await addRowToSheet(formData);
    
    if (!addResult.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: `Falha ao adicionar dados à planilha: ${addResult.error}`
        } as ApiResponse),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Sucesso na adição dos dados
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Dados adicionados com sucesso à planilha!'
      } as ApiResponse),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    
    return new Response(
      JSON.stringify({
        success: false,
        message: `Erro ao processar o formulário: ${errorMessage}`
      } as ApiResponse),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
