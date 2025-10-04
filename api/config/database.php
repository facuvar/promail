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
        
        // En Vercel, las variables pueden estar en $_ENV o getenv()
        $this->host = $_ENV['PGHOST'] ?? getenv('PGHOST');
        $this->db_name = $_ENV['PGDATABASE'] ?? getenv('PGDATABASE');
        $this->username = $_ENV['PGUSER'] ?? getenv('PGUSER');
        $this->password = $_ENV['PGPASSWORD'] ?? getenv('PGPASSWORD');
        $this->port = $_ENV['PGPORT'] ?? getenv('PGPORT') ?: '5432';
        
        // Validar que las variables estén configuradas
        if (!$this->host || !$this->db_name || !$this->username || !$this->password) {
            $this->lastError = 'Variables de entorno de base de datos no configuradas';
            error_log('ERROR: Faltan variables de entorno de base de datos');
            error_log('PGHOST: ' . ($this->host ? 'SET' : 'NOT SET'));
            error_log('PGDATABASE: ' . ($this->db_name ? 'SET' : 'NOT SET'));
            error_log('PGUSER: ' . ($this->username ? 'SET' : 'NOT SET'));
            error_log('PGPASSWORD: ' . ($this->password ? 'SET' : 'NOT SET'));
        }
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

