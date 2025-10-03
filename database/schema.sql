-- Schema para PostgreSQL (local y Neon)
-- Base de datos: promail_db

-- Crear tabla de contactos
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    empresa VARCHAR(150),
    plan VARCHAR(50),
    mensaje TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar performance
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);

-- Tabla de usuarios (para futura implementación de panel de administración)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Tabla de planes
CREATE TABLE IF NOT EXISTS plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    features JSONB,
    max_users INTEGER,
    storage_gb INTEGER,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar planes por defecto
INSERT INTO plans (name, price, features, max_users, storage_gb) VALUES
('Starter', 2990.00, '{"email_accounts": 1, "storage": "10 GB", "support": "Email", "domains": 1}', 1, 10),
('Business', 4990.00, '{"email_accounts": "Unlimited", "storage": "50 GB per user", "support": "24/7 Priority", "domains": "Unlimited", "api": true}', null, 50),
('Enterprise', null, '{"email_accounts": "Unlimited", "storage": "Unlimited", "support": "Dedicated", "domains": "Unlimited", "api": true, "sla": "99.9%"}', null, null);

-- Tabla de suscripciones (para futura gestión de clientes)
CREATE TABLE IF NOT EXISTS subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    plan_id INTEGER REFERENCES plans(id),
    status VARCHAR(20) DEFAULT 'active',
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    auto_renew BOOLEAN DEFAULT true
);

-- Tabla de logs de amenazas (para el monitor en tiempo real)
CREATE TABLE IF NOT EXISTS threat_logs (
    id SERIAL PRIMARY KEY,
    threat_type VARCHAR(50) NOT NULL,
    source_ip VARCHAR(50),
    target_email VARCHAR(150),
    location VARCHAR(100),
    blocked BOOLEAN DEFAULT true,
    detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para threat_logs
CREATE INDEX idx_threat_logs_detected_at ON threat_logs(detected_at DESC);
CREATE INDEX idx_threat_logs_type ON threat_logs(threat_type);

-- Comentarios en las tablas
COMMENT ON TABLE contacts IS 'Solicitudes de contacto desde el sitio web';
COMMENT ON TABLE users IS 'Usuarios del panel de administración';
COMMENT ON TABLE plans IS 'Planes de servicio disponibles';
COMMENT ON TABLE subscriptions IS 'Suscripciones activas de clientes';
COMMENT ON TABLE threat_logs IS 'Registro de amenazas detectadas y bloqueadas';
