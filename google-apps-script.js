/**
 * Script para receber dados do formulário React e salvar no Google Sheets
 * 
 * Instruções de uso:
 * 1. Crie uma nova planilha no Google Sheets
 * 2. Vá para Extensões > Apps Script
 * 3. Cole este código no editor
 * 4. Salve o projeto
 * 5. Clique em Implantar > Nova implantação
 * 6. Selecione "Aplicativo da Web" como tipo
 * 7. Defina quem pode acessar como "Qualquer pessoa, mesmo anônima"
 * 8. Clique em "Implantar"
 */

// Substitua pelo ID da sua planilha do Google Sheets
const SPREADSHEET_ID = '1ywDuOrTqBhfd_b-hvIQDTkk3CEg1iPZQSRK3auHB6YE';
const SHEET_NAME = 'leads_captura'; // Nome da aba onde os dados serão salvos

/**
 * Função doPost que recebe os dados via POST
 */
function doPost(e) {
  try {
    // Obtém os dados enviados
    const data = JSON.parse(e.postData.contents);
    
    // Abre a planilha
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Se a aba não existir, cria uma nova
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      
      // Adiciona cabeçalhos
      sheet.appendRow([
        'Data_Lead',
        'Nome',
        'Email',
        'Whatsapp',
        'Pais',
        'UTM_Source',
        'UTM_Campaign',
        'UTM_Medium',
        'UTM_Content',
        'Grupo_WPP',
        'Quizz_Resposta1',
        'Quizz_Resposta2',
        'Quizz_Resposta3'
      ]);
    }
    
    // Formata a data atual
    const now = new Date();
    const dataFormatada = Utilities.formatDate(now, 'GMT-3', 'dd/MM/yyyy HH:mm:ss');
    
    // Adiciona os dados na planilha
    sheet.appendRow([
      dataFormatada,
      data.nome || '',
      data.email || '',
      data.telefone || '',
      data.pais || '',
      data.utmSource || '',
      data.utmCampaign || '',
      data.utmMedium || '',
      data.utmContent || '',
      data.grupoWpp || '',
      data.quizzResposta1 || '',
      data.quizzResposta2 || '',
      data.quizzResposta3 || ''
    ]);
    
    // Retorna sucesso
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Retorna erro
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Função doGet para testar se o script está funcionando
 */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ 'status': 'online' }))
    .setMimeType(ContentService.MimeType.JSON);
}
