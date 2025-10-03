<?php
/**
 * Script para probar la conexión a la base de datos
 */

include_once 'config/cors.php';
include_once 'config/database.php';

$database = new Database();
$db = $database->getConnection();

if ($db) {
    // Probar consulta simple
    try {
        $query = "SELECT COUNT(*) as total_plans FROM plans";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        http_response_code(200);
        echo json_encode(array(
            "status" => "success",
            "message" => "Conexión a PostgreSQL exitosa",
            "database" => $database,
            "plans_count" => $result['total_plans']
        ));
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(array(
            "status" => "error",
            "message" => "Error al ejecutar consulta",
            "error" => $e->getMessage()
        ));
    }
} else {
    http_response_code(500);
    echo json_encode(array(
        "status" => "error",
        "message" => "No se pudo conectar a la base de datos"
    ));
}

