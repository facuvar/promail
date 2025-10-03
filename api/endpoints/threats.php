<?php
/**
 * Endpoint para el monitor de amenazas
 * GET /api/endpoints/threats.php
 * 
 * Aquí se conectará con APIs de seguridad reales como:
 * - VirusTotal API
 * - AbuseIPDB
 * - PhishTank
 * - Spamhaus
 */

include_once '../config/cors.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'GET') {
    http_response_code(405);
    echo json_encode(array("message" => "Método no permitido."));
    exit();
}

// Datos simulados de amenazas (temporal)
$threatTypes = array(
    array('type' => 'Phishing', 'icon' => '🎣'),
    array('type' => 'Spam', 'icon' => '📧'),
    array('type' => 'Malware', 'icon' => '🦠'),
    array('type' => 'Ransomware', 'icon' => '🔒'),
    array('type' => 'Spoofing', 'icon' => '🎭')
);

$locations = array(
    'Buenos Aires, Argentina',
    'São Paulo, Brasil',
    'Ciudad de México, México',
    'Bogotá, Colombia',
    'Lima, Perú',
    'Santiago, Chile',
    'Madrid, España',
    'Miami, USA',
    'Londres, UK',
    'Berlín, Alemania'
);

// Generar amenazas aleatorias
$threats = array();
for ($i = 0; $i < 10; $i++) {
    $threat = $threatTypes[array_rand($threatTypes)];
    $threats[] = array(
        'type' => $threat['type'],
        'icon' => $threat['icon'],
        'location' => $locations[array_rand($locations)],
        'timestamp' => date('Y-m-d H:i:s', strtotime('-' . rand(0, 3600) . ' seconds'))
    );
}

// Estadísticas del día
$stats = array(
    'threatsBlocked' => rand(15000, 20000),
    'spamDetected' => rand(8000, 12000),
    'phishingBlocked' => rand(2000, 3000),
    'malwareBlocked' => rand(1500, 2500)
);

http_response_code(200);
echo json_encode(array(
    'stats' => $stats,
    'threats' => $threats,
    'lastUpdate' => date('Y-m-d H:i:s')
));

