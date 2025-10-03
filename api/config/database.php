<?php
/**
 * Configuración de Base de Datos
 * Usa Neon tanto en local como en producción
 */

// Cargar variables de entorno en local si no están cargadas
if (!getenv('PGHOST')) {
    require_once __DIR__ . '/env.php';
}

class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    private $port;
    public $conn;

    public function __construct() {
        // Usar Neon en todos los ambientes (local y producción)
        // Las variables se cargan desde .env en local o desde Vercel en producción
        
        $this->host = getenv('PGHOST') ?: 'ep-cool-rain-ad0kocck-pooler.c-2.us-east-1.aws.neon.tech';
        $this->db_name = getenv('PGDATABASE') ?: 'neondb';
        $this->username = getenv('PGUSER') ?: 'neondb_owner';
        $this->password = getenv('PGPASSWORD') ?: 'npg_AkRIVhH48jbT';
        $this->port = getenv('PGPORT') ?: '5432';
    }

    public $lastError = null;
    
    public function getConnection() {
        $this->conn = null;

        try {
            // Extraer endpoint ID del host (primera parte antes del primer punto)
            $endpointId = explode('.', $this->host)[0];
            
            // Incluir endpoint como parámetro en el DSN (formato que sugiere Neon)
            $dsn = sprintf(
                "pgsql:host=%s;port=%s;dbname=%s;sslmode=require;options=endpoint=%s",
                $this->host,
                $this->port,
                $this->db_name,
                $endpointId
            );
            
            // Intentar conexión pasando user/password como parámetros de PDO
            $this->conn = new PDO($dsn, $this->username, $this->password, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]);
            
        } catch(PDOException $e) {
            $this->lastError = $e->getMessage();
            error_log("Error de conexión a base de datos: " . $e->getMessage());
            return null;
        }

        return $this->conn;
    }
}

