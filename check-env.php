<?php
/**
 * Script de Verificación Rápida de Variables de Entorno
 * Uso: php check-env.php
 */

echo "=== Verificación de Variables de Entorno ===\n\n";

// Cargar env si existe
$envPath = __DIR__ . '/.env';
if (file_exists($envPath)) {
    echo "✅ Archivo .env encontrado\n\n";
    
    // Cargar variables
    require_once __DIR__ . '/api/config/env.php';
    
    // Verificar cada variable
    $vars = ['PGHOST', 'PGDATABASE', 'PGUSER', 'PGPASSWORD', 'PGPORT'];
    $allSet = true;
    
    echo "Variables de entorno:\n";
    echo str_repeat("-", 50) . "\n";
    
    foreach ($vars as $var) {
        $value = getenv($var);
        if ($value) {
            if ($var === 'PGPASSWORD') {
                echo "✅ $var: ***" . substr($value, -4) . "\n";
            } else {
                echo "✅ $var: $value\n";
            }
        } else {
            echo "❌ $var: NO CONFIGURADA\n";
            $allSet = false;
        }
    }
    
    echo str_repeat("-", 50) . "\n\n";
    
    if ($allSet) {
        echo "✅ Todas las variables están configuradas\n\n";
        
        // Intentar conexión
        echo "Probando conexión a base de datos...\n";
        require_once __DIR__ . '/api/config/database.php';
        
        try {
            $database = new Database();
            $db = $database->getConnection();
            
            if ($db) {
                echo "✅ Conexión exitosa a la base de datos\n\n";
                
                // Probar query
                $query = "SELECT COUNT(*) as count FROM admins";
                $stmt = $db->prepare($query);
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                
                echo "✅ Query ejecutada exitosamente\n";
                echo "   Admins en la base de datos: " . $result['count'] . "\n\n";
                
                echo "🎉 TODO ESTÁ CONFIGURADO CORRECTAMENTE 🎉\n";
            } else {
                echo "❌ Error de conexión: " . $database->lastError . "\n\n";
            }
        } catch (Exception $e) {
            echo "❌ Error: " . $e->getMessage() . "\n\n";
        }
    } else {
        echo "❌ Faltan variables de entorno\n";
        echo "\nPara configurarlas:\n";
        echo "1. Crea un archivo .env en la raíz del proyecto\n";
        echo "2. Copia el contenido de env.example\n";
        echo "3. Completa las variables con tus credenciales de Neon\n\n";
    }
    
} else {
    echo "❌ Archivo .env NO encontrado\n\n";
    echo "Para crear el archivo .env:\n";
    echo "1. Copia env.example a .env\n";
    echo "2. Edita .env y completa las credenciales\n\n";
    
    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
        echo "Comando Windows:\n";
        echo "copy env.example .env\n\n";
    } else {
        echo "Comando Linux/Mac:\n";
        echo "cp env.example .env\n\n";
    }
}

echo "=== Fin de la Verificación ===\n";

