<?php
/**
 * Endpoint para Chat con IA (OpenAI)
 * POST /api/endpoints/ai-chat.php
 * 
 * Conecta con un agente especializado de OpenAI Assistant
 */

// Desactivar display de errores para no romper el JSON
ini_set('display_errors', 0);
error_reporting(E_ALL);

require_once __DIR__ . '/../config/cors.php';
header('Content-Type: application/json');

// Solo aceptar POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Obtener datos del POST
$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['message'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Mensaje es requerido']);
    exit;
}

$userMessage = trim($data['message']);

if (empty($userMessage)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'El mensaje no puede estar vacío']);
    exit;
}

// Obtener API Key y Assistant ID de OpenAI desde variables de entorno
$openaiApiKey = $_ENV['OPENAI_API_KEY'] ?? getenv('OPENAI_API_KEY');
$assistantId = $_ENV['OPENAI_ASSISTANT_ID'] ?? getenv('OPENAI_ASSISTANT_ID');

if (!$openaiApiKey) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'API Key de OpenAI no configurada',
        'error' => 'La variable de entorno OPENAI_API_KEY no está configurada. Por favor, configúrala en Vercel o en tu archivo .env local.'
    ]);
    exit;
}

if (!$assistantId) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Assistant ID de OpenAI no configurado',
        'error' => 'La variable de entorno OPENAI_ASSISTANT_ID no está configurada. Por favor, configúrala en Vercel o en tu archivo .env local.'
    ]);
    exit;
}

try {
    // Paso 1: Crear un Thread
    $threadPayload = json_encode(['messages' => []]);
    
    $ch = curl_init('https://api.openai.com/v1/threads');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $threadPayload,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $openaiApiKey,
            'OpenAI-Beta: assistants=v2'
        ],
        CURLOPT_TIMEOUT => 30
    ]);

    $threadResponse = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode !== 200) {
        $errorData = json_decode($threadResponse, true);
        $errorMessage = $errorData['error']['message'] ?? 'Error al crear thread';
        throw new Exception('Error OpenAI (' . $httpCode . '): ' . $errorMessage);
    }

    $thread = json_decode($threadResponse, true);
    $threadId = $thread['id'];

    // Paso 2: Agregar mensaje del usuario al thread
    $messagePayload = json_encode([
        'role' => 'user',
        'content' => $userMessage
    ]);

    $ch = curl_init('https://api.openai.com/v1/threads/' . $threadId . '/messages');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $messagePayload,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $openaiApiKey,
            'OpenAI-Beta: assistants=v2'
        ],
        CURLOPT_TIMEOUT => 30
    ]);

    curl_exec($ch);
    curl_close($ch);

    // Paso 3: Ejecutar el asistente
    $runPayload = json_encode([
        'assistant_id' => $assistantId
    ]);

    $ch = curl_init('https://api.openai.com/v1/threads/' . $threadId . '/runs');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $runPayload,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $openaiApiKey,
            'OpenAI-Beta: assistants=v2'
        ],
        CURLOPT_TIMEOUT => 30
    ]);

    $runResponse = curl_exec($ch);
    curl_close($ch);

    $run = json_decode($runResponse, true);
    $runId = $run['id'];

    // Paso 4: Esperar a que el run se complete (polling)
    $maxAttempts = 30; // 30 segundos máximo
    $attempts = 0;
    $runStatus = 'queued';

    while ($attempts < $maxAttempts && !in_array($runStatus, ['completed', 'failed', 'cancelled', 'expired'])) {
        sleep(1);
        
        $ch = curl_init('https://api.openai.com/v1/threads/' . $threadId . '/runs/' . $runId);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => [
                'Authorization: Bearer ' . $openaiApiKey,
                'OpenAI-Beta: assistants=v2'
            ],
            CURLOPT_TIMEOUT => 10
        ]);

        $statusResponse = curl_exec($ch);
        curl_close($ch);

        $runStatus = json_decode($statusResponse, true)['status'];
        $attempts++;
    }

    if ($runStatus !== 'completed') {
        throw new Exception('El asistente no pudo completar la respuesta (status: ' . $runStatus . ')');
    }

    // Paso 5: Obtener la respuesta del asistente
    $ch = curl_init('https://api.openai.com/v1/threads/' . $threadId . '/messages');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $openaiApiKey,
            'OpenAI-Beta: assistants=v2'
        ],
        CURLOPT_TIMEOUT => 30
    ]);

    $messagesResponse = curl_exec($ch);
    curl_close($ch);

    $messages = json_decode($messagesResponse, true);
    
    // El primer mensaje es la respuesta más reciente del asistente
    $assistantMessage = null;
    foreach ($messages['data'] as $msg) {
        if ($msg['role'] === 'assistant') {
            $assistantMessage = $msg;
            break;
        }
    }

    if (!$assistantMessage || !isset($assistantMessage['content'][0]['text']['value'])) {
        throw new Exception('No se pudo obtener la respuesta del asistente');
    }

    $aiResponse = trim($assistantMessage['content'][0]['text']['value']);

    // Respuesta exitosa
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'response' => $aiResponse,
        'thread_id' => $threadId
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error al procesar la consulta',
        'error' => $e->getMessage()
    ]);
}

