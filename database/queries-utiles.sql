-- Consultas Útiles para PostgreSQL - Promail.ar

-- ===============================
-- CONSULTAS DE VERIFICACIÓN
-- ===============================

-- Ver todas las tablas creadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Ver estructura de una tabla
\d contacts;
\d users;
\d plans;
\d subscriptions;
\d threat_logs;

-- Ver todos los planes
SELECT * FROM plans;

-- Contar contactos
SELECT COUNT(*) as total_contactos FROM contacts;

-- Ver últimos contactos
SELECT nombre, email, empresa, plan, created_at 
FROM contacts 
ORDER BY created_at DESC 
LIMIT 10;

-- ===============================
-- CONSULTAS DE DATOS
-- ===============================

-- Ver contactos por plan
SELECT plan, COUNT(*) as cantidad 
FROM contacts 
GROUP BY plan 
ORDER BY cantidad DESC;

-- Ver contactos de las últimas 24 horas
SELECT * FROM contacts 
WHERE created_at >= NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;

-- Buscar contacto por email
SELECT * FROM contacts 
WHERE email LIKE '%ejemplo.com%';

-- Ver amenazas bloqueadas del día
SELECT threat_type, COUNT(*) as cantidad 
FROM threat_logs 
WHERE detected_at >= CURRENT_DATE 
GROUP BY threat_type;

-- ===============================
-- DATOS DE PRUEBA
-- ===============================

-- Insertar contacto de prueba
INSERT INTO contacts (nombre, email, empresa, plan, mensaje) 
VALUES (
    'Juan Pérez', 
    'juan.perez@empresa.com', 
    'Empresa Demo SA', 
    'business',
    'Consulta sobre migración desde Google Workspace'
);

-- Insertar varios contactos de prueba
INSERT INTO contacts (nombre, email, empresa, plan, mensaje) VALUES
('María González', 'maria@startup.com', 'Startup Tech', 'starter', 'Quiero comenzar con el plan básico'),
('Carlos Rodríguez', 'carlos@corp.com', 'Corporación XYZ', 'enterprise', 'Necesito una solución enterprise'),
('Ana Martínez', 'ana@pyme.com', 'PyME Servicios', 'business', 'Migración desde Microsoft 365');

-- Insertar logs de amenazas de prueba
INSERT INTO threat_logs (threat_type, source_ip, target_email, location, blocked) VALUES
('Phishing', '192.168.1.100', 'usuario@promail.ar', 'Buenos Aires, Argentina', true),
('Spam', '10.0.0.50', 'admin@promail.ar', 'São Paulo, Brasil', true),
('Malware', '172.16.0.10', 'ventas@promail.ar', 'Ciudad de México, México', true);

-- ===============================
-- CONSULTAS DE MANTENIMIENTO
-- ===============================

-- Limpiar contactos antiguos (más de 6 meses)
DELETE FROM contacts 
WHERE created_at < NOW() - INTERVAL '6 months';

-- Limpiar logs de amenazas antiguos (más de 30 días)
DELETE FROM threat_logs 
WHERE detected_at < NOW() - INTERVAL '30 days';

-- Ver tamaño de las tablas
SELECT 
    schemaname as schema,
    tablename as table,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- ===============================
-- ESTADÍSTICAS
-- ===============================

-- Dashboard de estadísticas generales
SELECT 
    (SELECT COUNT(*) FROM contacts) as total_contactos,
    (SELECT COUNT(*) FROM contacts WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as contactos_semana,
    (SELECT COUNT(*) FROM contacts WHERE created_at >= CURRENT_DATE) as contactos_hoy,
    (SELECT COUNT(DISTINCT email) FROM contacts) as emails_unicos;

-- Estadísticas por plan
SELECT 
    COALESCE(plan, 'Sin plan') as plan,
    COUNT(*) as cantidad,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM contacts), 2) as porcentaje
FROM contacts
GROUP BY plan
ORDER BY cantidad DESC;

-- Top empresas que consultaron
SELECT 
    empresa,
    COUNT(*) as consultas,
    MAX(created_at) as ultima_consulta
FROM contacts
WHERE empresa IS NOT NULL AND empresa != ''
GROUP BY empresa
ORDER BY consultas DESC
LIMIT 10;

-- ===============================
-- BÚSQUEDAS AVANZADAS
-- ===============================

-- Buscar texto en mensajes
SELECT nombre, email, mensaje, created_at
FROM contacts
WHERE mensaje ILIKE '%migración%'
ORDER BY created_at DESC;

-- Contactos que mencionaron competidores
SELECT nombre, email, mensaje
FROM contacts
WHERE mensaje ILIKE '%google%' 
   OR mensaje ILIKE '%microsoft%'
   OR mensaje ILIKE '%outlook%';

-- ===============================
-- REPORTES
-- ===============================

-- Reporte diario de contactos
SELECT 
    DATE(created_at) as fecha,
    COUNT(*) as contactos,
    COUNT(DISTINCT email) as emails_unicos
FROM contacts
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY fecha DESC;

-- Reporte de conversión por plan
SELECT 
    plan,
    COUNT(*) as interesados,
    ROUND(AVG(LENGTH(mensaje)), 0) as promedio_caracteres_mensaje
FROM contacts
WHERE plan IS NOT NULL
GROUP BY plan;

-- ===============================
-- BACKUPS
-- ===============================

-- Exportar todos los contactos a CSV (ejecutar desde terminal)
-- \copy contacts TO 'C:/backup/contactos.csv' WITH CSV HEADER;

-- Exportar solo contactos del mes actual
-- \copy (SELECT * FROM contacts WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE)) TO 'C:/backup/contactos_mes.csv' WITH CSV HEADER;

-- ===============================
-- ÍNDICES Y OPTIMIZACIÓN
-- ===============================

-- Ver índices existentes
SELECT 
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- Analizar performance de una consulta
EXPLAIN ANALYZE 
SELECT * FROM contacts 
WHERE email = 'test@ejemplo.com';

-- Actualizar estadísticas para mejor performance
ANALYZE contacts;
ANALYZE threat_logs;

-- ===============================
-- COMANDOS ÚTILES DE PSQL
-- ===============================

-- \dt          - Listar tablas
-- \d+ tabla    - Describir tabla con detalles
-- \du          - Listar usuarios
-- \l           - Listar bases de datos
-- \c dbname    - Conectar a otra base de datos
-- \timing      - Activar/desactivar tiempo de ejecución
-- \q           - Salir

-- ===============================
-- NOTAS IMPORTANTES
-- ===============================

-- 1. Siempre hacer backup antes de DELETE masivos
-- 2. Usar EXPLAIN ANALYZE para optimizar consultas lentas
-- 3. Crear índices en columnas que se buscan frecuentemente
-- 4. Limpiar logs antiguos regularmente
-- 5. Monitorear el tamaño de las tablas
