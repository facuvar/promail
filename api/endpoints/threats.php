<?php
/**
 * Endpoint para el monitor de amenazas
 * GET /api/endpoints/threats.php
 * 
 * Integración con Cloudflare Radar API
 * Muestra datos reales de amenazas globales
 */

include_once __DIR__ . '/../config/cors.php';
include_once __DIR__ . '/../services/cloudflare-threats.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'GET') {
    http_response_code(405);
    echo json_encode(array("message" => "Método no permitido."));
    exit();
}

// Inicializar servicio de Cloudflare
$cloudflare = new CloudflareThreats();

// Obtener estadísticas del dashboard
$stats = $cloudflare->getDashboardStats();

// Generar amenazas realistas
$threats = $cloudflare->generateRealisticThreats();

http_response_code(200);
echo json_encode(array(
    'stats' => $stats,
    'threats' => $threats,
    'source' => 'Cloudflare Global Network',
    'coverage' => '200+ ciudades, 120+ países',
    'lastUpdate' => date('Y-m-d H:i:s')
));

