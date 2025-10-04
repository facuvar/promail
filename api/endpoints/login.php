<?php
/**
 * API de Autenticación de Administradores
 */

header('Content-Type: application/json');
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';

// Solo aceptar POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit;
}

// Obtener datos del POST
$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['username']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Usuario y contraseña son requeridos']);
    exit;
}

$username = trim($data['username']);
$password = $data['password'];

try {
    $database = new Database();
    $db = $database->getConnection();
    
    if (!$db) {
        http_response_code(500);
        echo json_encode([
            'success' => false, 
            'message' => 'Error de conexión a la base de datos',
            'debug' => $database->lastError
        ]);
        exit;
    }
    
    // Buscar admin por username o email
    $query = "SELECT id, username, email, password_hash, nombre, role, domain, active 
              FROM admins 
              WHERE (username = :username OR email = :username) 
              AND active = true 
              LIMIT 1";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    
    $admin = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$admin) {
        http_response_code(401);
        echo json_encode([
            'success' => false, 
            'message' => 'Credenciales incorrectas',
            'debug' => 'Usuario no encontrado en la base de datos',
            'username_tried' => $username
        ]);
        exit;
    }
    
    // Verificar contraseña
    if (!password_verify($password, $admin['password_hash'])) {
        http_response_code(401);
        echo json_encode([
            'success' => false, 
            'message' => 'Credenciales incorrectas',
            'debug' => 'Contraseña no coincide',
            'hash_from_db' => substr($admin['password_hash'], 0, 20) . '...'
        ]);
        exit;
    }
    
    // Actualizar last_login
    $updateQuery = "UPDATE admins SET last_login = CURRENT_TIMESTAMP WHERE id = :id";
    $updateStmt = $db->prepare($updateQuery);
    $updateStmt->bindParam(':id', $admin['id']);
    $updateStmt->execute();
    
    // Generar token simple (en producción usar JWT)
    $token = bin2hex(random_bytes(32));
    
    // En producción, guardar el token en una tabla de sesiones
    // Por ahora solo lo devolvemos
    
    // Preparar respuesta
    unset($admin['password_hash']); // No enviar el hash
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Inicio de sesión exitoso',
        'token' => $token,
        'admin' => $admin
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error en el servidor',
        'error' => $e->getMessage()
    ]);
}

