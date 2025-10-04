<?php
/**
 * Script de prueba para verificar configuración de OpenAI
 * GET /api/endpoints/test-ai-config.php
 */

ini_set('display_errors', 0);
error_reporting(E_ALL);

require_once __DIR__ . '/../config/cors.php';
header('Content-Type: application/json');

$result = [
    'timestamp' => date('Y-m-d H:i:s'),
    'environment_check' => [],
    'php_info' => [
        'version' => phpversion(),
        'curl_available' => extension_loaded('curl'),
        'json_available' => extension_loaded('json'),
    ]
];

// Verificar API Key
$apiKey = $_ENV['OPENAI_API_KEY'] ?? getenv('OPENAI_API_KEY');
$result['environment_check']['OPENAI_API_KEY'] = [
    'configured' => !empty($apiKey),
    'source' => !empty($_ENV['OPENAI_API_KEY']) ? '$_ENV' : (!empty(getenv('OPENAI_API_KEY')) ? 'getenv()' : 'none'),
    'value_preview' => $apiKey ? 'sk-...' . substr($apiKey, -4) : null
];

// Verificar Assistant ID
$assistantId = $_ENV['OPENAI_ASSISTANT_ID'] ?? getenv('OPENAI_ASSISTANT_ID');
$result['environment_check']['OPENAI_ASSISTANT_ID'] = [
    'configured' => !empty($assistantId),
    'source' => !empty($_ENV['OPENAI_ASSISTANT_ID']) ? '$_ENV' : (!empty(getenv('OPENAI_ASSISTANT_ID')) ? 'getenv()' : 'none'),
    'value' => $assistantId ?? null
];

// Estado general
$allConfigured = !empty($apiKey) && !empty($assistantId);
$result['status'] = $allConfigured ? 'OK' : 'ERROR';
$result['message'] = $allConfigured 
    ? 'Configuración completa' 
    : 'Faltan variables de entorno';

if (!$allConfigured) {
    $result['errors'] = [];
    if (empty($apiKey)) {
        $result['errors'][] = 'OPENAI_API_KEY no está configurada';
    }
    if (empty($assistantId)) {
        $result['errors'][] = 'OPENAI_ASSISTANT_ID no está configurada';
    }
}

http_response_code($allConfigured ? 200 : 500);
echo json_encode($result, JSON_PRETTY_PRINT);

