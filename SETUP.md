# 🚀 Guía de Configuración - Promail.ar

## Configuración Local con XAMPP

### 1. Configurar PostgreSQL

#### Instalar PostgreSQL
1. Descargar PostgreSQL desde https://www.postgresql.org/download/windows/
2. Instalar con las opciones por defecto (puerto 5432)
3. Recordar la contraseña del usuario `postgres`

#### Crear la Base de Datos
```bash
# Abrir PowerShell o CMD
cd C:\Program Files\PostgreSQL\15\bin

# Conectar a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE promail_db;

# Salir
\q

# Importar el schema
psql -U postgres -d promail_db -f C:\xampp\htdocs\promail\database\schema.sql
```

### 2. Configurar PHP en XAMPP

#### Habilitar extensión PostgreSQL
1. Abrir `C:\xampp\php\php.ini`
2. Buscar y descomentar (quitar el `;`):
   ```ini
   extension=pdo_pgsql
   extension=pgsql
   ```
3. Guardar y reiniciar Apache desde el panel de XAMPP

### 3. Iniciar el Servidor

1. Abrir el Panel de Control de XAMPP
2. Iniciar **Apache**
3. Verificar que PostgreSQL esté corriendo

### 4. Acceder al Sitio

Abrir en el navegador: `http://localhost/promail`

## 🧪 Probar las APIs

### API de Contactos

**Crear un contacto (POST)**
```bash
curl -X POST http://localhost/promail/api/endpoints/contacts.php \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@empresa.com",
    "empresa": "Empresa SA",
    "plan": "business",
    "mensaje": "Quiero más información"
  }'
```

**Listar contactos (GET)**
```bash
curl http://localhost/promail/api/endpoints/contacts.php
```

### API del Chat

```bash
curl -X POST http://localhost/promail/api/endpoints/chat.php \
  -H "Content-Type: application/json" \
  -d '{"message": "¿Cuánto cuesta el plan Business?"}'
```

### API de Amenazas

```bash
curl http://localhost/promail/api/endpoints/threats.php
```

## 📊 Verificar Base de Datos

```bash
# Conectar a la base de datos
psql -U postgres -d promail_db

# Ver las tablas creadas
\dt

# Ver los planes
SELECT * FROM plans;

# Ver contactos
SELECT * FROM contacts;

# Salir
\q
```

## 🌐 Deploy a Producción

### Paso 1: Configurar Neon Database

1. Crear cuenta en https://neon.tech
2. Crear nuevo proyecto llamado "promail"
3. En el dashboard, copiar la connection string
4. Ejecutar el schema:
   ```bash
   psql "postgresql://user:password@host/promail_db?sslmode=require" < database/schema.sql
   ```

### Paso 2: Deploy a Vercel

1. Instalar Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Iniciar sesión:
   ```bash
   vercel login
   ```

3. Deploy desde la carpeta del proyecto:
   ```bash
   cd C:\xampp\htdocs\promail
   vercel
   ```

4. Configurar variables de entorno en Vercel:
   ```bash
   vercel env add PGHOST
   vercel env add PGDATABASE
   vercel env add PGUSER
   vercel env add PGPASSWORD
   vercel env add PGPORT
   ```

   Usar los valores de la connection string de Neon.

5. Deploy a producción:
   ```bash
   vercel --prod
   ```

## 🔧 Troubleshooting

### Error: Could not find driver (PDO)

**Solución**: Verificar que las extensiones `pdo_pgsql` y `pgsql` estén habilitadas en `php.ini`

### Error: Connection refused (PostgreSQL)

**Solución**: 
1. Verificar que PostgreSQL esté corriendo
2. Verificar el puerto (5432 por defecto)
3. Revisar las credenciales en `api/config/database.php`

### Error: Permission denied

**Solución**: Verificar los permisos de la carpeta `C:\xampp\htdocs\promail`

### Chat no funciona

**Solución**: Verificar la consola del navegador (F12) para ver errores de JavaScript

## 📱 Características Implementadas

✅ Sitio one-page responsive  
✅ Diseño moderno con colores corporativos  
✅ Monitor de amenazas en tiempo real (simulado)  
✅ Chat asistente con IA (placeholder)  
✅ Formulario de contacto funcional  
✅ APIs REST para contactos, chat y amenazas  
✅ Base de datos PostgreSQL  
✅ Configuración para deploy en Vercel + Neon  

## 🔮 Próximos Pasos

1. **Integrar IA real para el chat**: Conectar con OpenAI API o similar
2. **APIs de seguridad reales**: Integrar VirusTotal, PhishTank, AbuseIPDB
3. **Panel de administración**: Crear dashboard para gestionar contactos
4. **Sistema de autenticación**: Implementar login/registro
5. **Procesamiento de pagos**: Integrar Mercado Pago o Stripe
6. **Email marketing**: Conectar con Mailchimp o similar

## 💡 Notas

- El sitio está optimizado para localhost durante el desarrollo
- Las APIs REST funcionan tanto en local como en producción
- El monitor de amenazas usa datos simulados hasta integrar APIs reales
- El chat usa respuestas predefinidas hasta conectar con IA real
