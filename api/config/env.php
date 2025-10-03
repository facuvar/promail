<?php
/**
 * Cargar variables de entorno desde archivo .env
 * Solo se usa en desarrollo local
 */

function loadEnv($path) {
    if (!file_exists($path)) {
        error_log("Archivo .env NO encontrado en: " . $path);
        return false;
    }
    
    error_log("Cargando .env desde: " . $path);
    
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        // Ignorar comentarios
        if (strpos(trim($line), '#') === 0) {
            continue;
        }
        
        // Separar clave=valor
        if (strpos($line, '=') === false) {
            continue;
        }
        
        list($key, $value) = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value);
        
        // Remover comillas si las tiene
        $value = trim($value, '"\'');
        
        // Setear variable de entorno
        putenv("$key=$value");
        $_ENV[$key] = $value;
        $_SERVER[$key] = $value;
        
        error_log("Variable cargada: $key");
    }
    
    return true;
}

// Cargar .env si existe (solo en local)
$envPath = __DIR__ . '/../../.env';
loadEnv($envPath);

