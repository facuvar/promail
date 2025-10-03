<?php
/**
 * Configuración de Base de Datos
 * Para desarrollo local con PostgreSQL
 * Para producción con Neon
 */

class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    private $port;
    public $conn;

    public function __construct() {
        // Detectar si estamos en producción (Vercel) o desarrollo local
        if (getenv('VERCEL_ENV')) {
            // Configuración para Neon (Producción)
            $this->host = getenv('PGHOST');
            $this->db_name = getenv('PGDATABASE');
            $this->username = getenv('PGUSER');
            $this->password = getenv('PGPASSWORD');
            $this->port = getenv('PGPORT') ?: '5432';
        } else {
            // Configuración local
            $this->host = 'localhost';
            $this->db_name = 'promail_db';
            $this->username = 'postgres';
            $this->password = 'postgres';
            $this->port = '5432';
        }
    }

    public function getConnection() {
        $this->conn = null;

        try {
            $dsn = "pgsql:host=" . $this->host . 
                   ";port=" . $this->port . 
                   ";dbname=" . $this->db_name;
            
            $this->conn = new PDO($dsn, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            
        } catch(PDOException $e) {
            echo "Error de conexión: " . $e->getMessage();
        }

        return $this->conn;
    }
}

