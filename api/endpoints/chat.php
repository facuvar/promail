<?php
/**
 * Endpoint para el chat con IA
 * POST /api/endpoints/chat.php
 * 
 * Este endpoint será conectado posteriormente con la API de IA
 */

include_once '../config/cors.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'POST') {
    http_response_code(405);
    echo json_encode(array("message" => "Método no permitido."));
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->message)) {
    $userMessage = htmlspecialchars(strip_tags($data->message));
    
    // Respuestas predefinidas (temporal hasta conectar con IA real)
    $responses = array(
        'precio' => 'Nuestros planes comienzan desde $2.990/mes para el plan Starter. ¿Te gustaría conocer más detalles sobre algún plan específico?',
        'plan' => 'Tenemos 3 planes: Starter ($2.990), Business ($4.990/usuario) y Enterprise (personalizado). ¿Cuál se adapta mejor a tus necesidades?',
        'migra' => 'Ofrecemos migración gratuita desde cualquier proveedor. Nuestro equipo se encarga de todo el proceso sin interrupciones. ¿De qué proveedor te gustaría migrar?',
        'soport' => 'Contamos con soporte en español 24/7 para planes Business y Enterprise. ¿En qué podemos ayudarte?',
        'seguridad' => 'Implementamos protección avanzada contra phishing, spam, malware y ransomware. Monitoreo en tiempo real y cifrado de extremo a extremo.',
        'hola' => '¡Hola! ¿En qué puedo ayudarte hoy? Puedo contarte sobre nuestros planes, precios, seguridad o proceso de migración.',
        'gracias' => '¡De nada! ¿Hay algo más en lo que pueda ayudarte?'
    );
    
    $lowerMessage = strtolower($userMessage);
    $response = 'Interesante pregunta. Te sugiero contactar con nuestro equipo de ventas para una respuesta personalizada. ¿Te gustaría que te envíen información a tu email?';
    
    foreach ($responses as $key => $value) {
        if (strpos($lowerMessage, $key) !== false) {
            $response = $value;
            break;
        }
    }
    
    http_response_code(200);
    echo json_encode(array(
        "message" => $response,
        "timestamp" => date('Y-m-d H:i:s')
    ));
} else {
    http_response_code(400);
    echo json_encode(array("message" => "El mensaje no puede estar vacío."));
}

