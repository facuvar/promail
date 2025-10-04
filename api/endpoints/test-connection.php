<?php
/**
 * Script de Diagnóstico de Conexión a Base de Datos
 * Uso: /api/endpoints/test-connection.php
 */

header('Content-Type: application/json');
require_once '../config/cors.php';
require_once '../config/database.php';

// Array para almacenar resultados del diagnóstico
$diagnostics = [
    'timestamp' => date('Y-m-d H:i:s'),
    'environment' => [],
    'database' => [],
    'errors' => []
];

// 1. Verificar Variables de Entorno (getenv y $_ENV)
$envVars = ['PGHOST', 'PGDATABASE', 'PGUSER', 'PGPASSWORD', 'PGPORT'];
foreach ($envVars as $var) {
    $valueGetenv = getenv($var);
    $valueEnv = $_ENV[$var] ?? null;
    $value = $valueEnv ?: $valueGetenv; // Preferir $_ENV
    
    $diagnostics['environment'][$var] = [
        'set' => !empty($value),
        'value' => !empty($value) ? (
            $var === 'PGPASSWORD' ? '***' . substr($value, -4) : $value
        ) : null,
        'source' => !empty($valueEnv) ? '$_ENV' : (!empty($valueGetenv) ? 'getenv()' : 'none')
    ];
}

// 2. Verificar si todas las variables están configuradas
$allEnvSet = array_reduce($envVars, function($carry, $var) {
    $value = $_ENV[$var] ?? getenv($var);
    return $carry && !empty($value);
}, true);

$diagnostics['environment']['all_set'] = $allEnvSet;

if (!$allEnvSet) {
    $diagnostics['errors'][] = 'Faltan variables de entorno requeridas';
}

// 3. Intentar Conexión a Base de Datos
try {
    $database = new Database();
    $db = $database->getConnection();
    
    if (!$db) {
        $diagnostics['database']['connected'] = false;
        $diagnostics['database']['error'] = $database->lastError;
        $diagnostics['errors'][] = 'No se pudo conectar a la base de datos: ' . $database->lastError;
    } else {
        $diagnostics['database']['connected'] = true;
        
        // 4. Probar una query simple
        try {
            $query = "SELECT COUNT(*) as count FROM admins";
            $stmt = $db->prepare($query);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            
            $diagnostics['database']['query_test'] = 'success';
            $diagnostics['database']['admin_count'] = $result['count'];
            
        } catch (PDOException $e) {
            $diagnostics['database']['query_test'] = 'failed';
            $diagnostics['database']['query_error'] = $e->getMessage();
            $diagnostics['errors'][] = 'Error al consultar la base de datos: ' . $e->getMessage();
        }
    }
    
} catch (Exception $e) {
    $diagnostics['database']['connected'] = false;
    $diagnostics['database']['exception'] = $e->getMessage();
    $diagnostics['errors'][] = 'Excepción al conectar: ' . $e->getMessage();
}

// 5. Información del Sistema
$diagnostics['system'] = [
    'php_version' => phpversion(),
    'pdo_available' => extension_loaded('pdo'),
    'pdo_pgsql_available' => extension_loaded('pdo_pgsql'),
    'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'unknown'
];

// 6. Resultado Final
$diagnostics['status'] = empty($diagnostics['errors']) ? 'OK' : 'ERROR';
$diagnostics['message'] = empty($diagnostics['errors']) 
    ? 'Todas las verificaciones pasaron correctamente' 
    : 'Se encontraron ' . count($diagnostics['errors']) . ' error(es)';

// Código de respuesta HTTP
$httpCode = empty($diagnostics['errors']) ? 200 : 500;
http_response_code($httpCode);

// Respuesta
echo json_encode($diagnostics, JSON_PRETTY_PRINT);

