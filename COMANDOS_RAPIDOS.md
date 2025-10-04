# 🚀 Comandos Rápidos - Promail.ar

## 🔍 Diagnóstico

### Verificar Variables de Entorno (Local)
```bash
php check-env.php
```

### Verificar Conexión a Base de Datos (Local)
```
http://localhost/promail/api/endpoints/test-connection.php
```

### Verificar Conexión a Base de Datos (Producción)
```
https://tu-proyecto.vercel.app/api/endpoints/test-connection.php
```

## 🛠️ Configuración Local

### Crear archivo .env
```bash
# Windows
copy env.example .env

# Linux/Mac
cp env.example .env
```

### Editar .env
Abre `.env` y agrega tus credenciales de Neon:
```env
PGHOST=tu-host.neon.tech
PGDATABASE=tu-database
PGUSER=tu-usuario
PGPASSWORD=tu-password
PGPORT=5432
```

### Verificar Configuración PHP
```bash
php -v
php -m | grep pdo_pgsql
```

## 📦 Deploy a Vercel

### Deploy Inicial
```bash
npm i -g vercel
vercel
```

### Deploy de Cambios
```bash
git add .
git commit -m "Descripción del cambio"
git push origin main
```

### Re-desplegar Manualmente
Desde Vercel Dashboard:
1. **Deployments** → último deployment
2. Tres puntos (...) → **Redeploy**

## 🔐 Variables de Entorno en Vercel

### Variables Requeridas
```
PGHOST=ep-cool-rain-ad0kocck-pooler.c-2.us-east-1.aws.neon.tech
PGDATABASE=neondb
PGUSER=neondb_owner
PGPASSWORD=npg_AkRIVhH48jbT
PGPORT=5432
```

### Configurar en Vercel
1. Ve a https://vercel.com/dashboard
2. Selecciona tu proyecto
3. **Settings** → **Environment Variables**
4. Agrega cada variable (marca Production, Preview y Development)
5. Re-despliega el proyecto

## 🗄️ Base de Datos

### Conectar a Neon (psql)
```bash
psql "postgresql://neondb_owner:npg_AkRIVhH48jbT@ep-cool-rain-ad0kocck-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

### Ejecutar Schema
```bash
psql "postgresql://..." -f database/schema.sql
```

### Ver Admins
```sql
SELECT * FROM admins;
```

## 🧪 Testing

### Test Login (Local)
```
http://localhost/promail/login.html
Usuario: admin
Contraseña: admin123
```

### Test Login (Producción)
```
https://tu-proyecto.vercel.app/login.html
Usuario: admin
Contraseña: admin123
```

### Test API de Contactos
```bash
curl -X POST http://localhost/promail/api/endpoints/contacts.php \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test",
    "email": "test@test.com",
    "empresa": "Test SA",
    "plan": "business",
    "mensaje": "Test mensaje"
  }'
```

## 🐛 Debugging

### Ver Logs de PHP (Local)
```
C:\xampp\apache\logs\error.log
```

### Ver Logs de Vercel
1. Ve a tu proyecto en Vercel
2. **Deployments** → último deployment
3. **View Function Logs**

### Ver Errores del Navegador
1. Presiona F12
2. Ve a la pestaña **Console**
3. Intenta la acción que falla
4. Revisa los errores en rojo

## 🔄 Git

### Estado
```bash
git status
```

### Commit y Push
```bash
git add .
git commit -m "Mensaje descriptivo"
git push origin main
```

### Ver Historial
```bash
git log --oneline
```

### Revertir Cambios (NO committeados)
```bash
git checkout -- archivo.txt
```

## 📝 Recursos

- [SOLUCION_ERROR_VERCEL.md](./SOLUCION_ERROR_VERCEL.md) - Solución al error de conexión
- [VERCEL_SETUP.md](./VERCEL_SETUP.md) - Documentación completa de Vercel
- [CLOUDFLARE_API_SETUP.md](./CLOUDFLARE_API_SETUP.md) - Setup de Cloudflare API
- [README.md](./README.md) - Documentación general del proyecto

