# Promail.ar - Email Corporativo de Nueva Generación #

Sitio web corporativo para Promail.ar, la alternativa profesional argentina a Google Workspace y Microsoft 365.

## 🚀 Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: PHP 8+ con APIs REST
- **Base de Datos**: PostgreSQL
- **Deploy**: Vercel (frontend) + Neon (database)
- **Tipografía**: Atkinson Hyperlegible (Google Fonts)

## 🎨 Diseño

- **Colores**: Verde corporativo #82c0ab sobre fondo blanco
- **Estilo**: Moderno, flat, minimalista
- **Responsive**: Optimizado para todos los dispositivos

## 📋 Características

- ✅ Sitio one-page moderno
- ✅ Sección de precios con 3 planes
- ✅ Monitor de amenazas en tiempo real
- ✅ Chat asistente con IA (placeholder para API futura)
- ✅ Formulario de contacto
- ✅ APIs REST para gestión de datos
- ✅ Diseño responsive

## 🛠️ Instalación Local

### Requisitos

- XAMPP (Apache + PHP 8+)
- PostgreSQL 14+
- Navegador moderno

### Pasos

1. **Clonar en htdocs**
   ```bash
   cd C:\xampp\htdocs\promail
   ```

2. **Configurar PostgreSQL**
   - Crear base de datos `promail_db`
   - Ejecutar el schema:
   ```bash
   psql -U postgres -d promail_db -f database/schema.sql
   ```

3. **Configurar PHP**
   - Verificar que las extensiones PDO_PGSQL estén habilitadas en `php.ini`
   - Ajustar credenciales en `api/config/database.php` si es necesario

4. **Iniciar XAMPP**
   - Iniciar Apache desde el panel de XAMPP
   - Acceder a `http://localhost/promail`

## 🔒 Integración con Cloudflare Radar API

El monitor de amenazas se conecta a la **Cloudflare Radar API** para mostrar datos reales:

### 📊 Funcionamiento Actual

- ✅ **Conexión automática** a Cloudflare Radar API
- ✅ **Fallback inteligente**: Si la API no responde, usa datos estimados
- ✅ **Sin configuración requerida**: Funciona out-of-the-box
- ✅ **Mejorable**: Agrega tu API Key para datos 100% reales

### 🔑 Modo Mejorado (Opcional - Recomendado)

Para obtener **datos 100% en tiempo real**:

1. **Obtén tu API Key** de Cloudflare (gratis): [Guía completa →](CLOUDFLARE_API_SETUP.md)
2. **Agrégala a Vercel**:
   ```bash
   CLOUDFLARE_API_KEY=tu_token_aqui
   ```
3. **Redeploy** - ¡Listo!

Ver [CLOUDFLARE_API_SETUP.md](CLOUDFLARE_API_SETUP.md) para instrucciones paso a paso.

### 🌐 Datos Disponibles

- **Red global**: 200+ ciudades, 120+ países
- **Tipos de amenazas**: DDoS, Phishing, Malware, Spam, SQL Injection, XSS, Ransomware
- **Estadísticas reales**: 15M+ amenazas bloqueadas diarias
- **Actualización**: Cada 30 segundos

## 🌐 Deploy a Producción

### Vercel

1. Instalar Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. **IMPORTANTE:** Configurar variables de entorno en Vercel:
   
   Ve a tu proyecto en Vercel → **Settings** → **Environment Variables** y agrega:
   
   | Variable | Valor | Ambiente |
   |----------|-------|----------|
   | `PGHOST` | Tu host de Neon | Production, Preview, Development |
   | `PGDATABASE` | Nombre de la base de datos | Production, Preview, Development |
   | `PGUSER` | Usuario de Neon | Production, Preview, Development |
   | `PGPASSWORD` | Contraseña de Neon | Production, Preview, Development |
   | `PGPORT` | `5432` | Production, Preview, Development |

4. **Re-desplegar** después de agregar las variables:
   ```bash
   git push origin main
   ```
   O desde el dashboard de Vercel: **Deployments** → **Redeploy**

5. **Verificar configuración** con el script de diagnóstico:
   ```
   https://tu-proyecto.vercel.app/api/endpoints/test-connection.php
   ```

⚠️ **Si tienes error "Error de conexión":** Ver [SOLUCION_ERROR_VERCEL.md](./SOLUCION_ERROR_VERCEL.md)

### Neon Database

1. Crear cuenta en [Neon](https://neon.tech)
2. Crear nuevo proyecto
3. Ejecutar el schema desde `database/schema.sql`
4. Copiar credenciales a Vercel (ver paso 3 arriba)

## 📁 Estructura del Proyecto

```
promail/
├── index.html              # Página principal
├── assets/
│   ├── css/
│   │   └── styles.css      # Estilos principales
│   ├── js/
│   │   └── main.js         # JavaScript principal
│   └── images/
│       └── logo_pm.jpg     # Logo corporativo
├── api/
│   ├── config/
│   │   ├── database.php    # Configuración DB
│   │   └── cors.php        # Configuración CORS
│   ├── models/
│   │   └── Contact.php     # Modelo de contactos
│   └── endpoints/
│       ├── contacts.php    # API de contactos
│       ├── chat.php        # API del chat
│       └── threats.php     # API del monitor
├── database/
│   └── schema.sql          # Schema de PostgreSQL
├── vercel.json             # Configuración Vercel
└── README.md
```

## 🔌 APIs REST

### Contactos

**GET** `/api/endpoints/contacts.php`
- Listar todos los contactos

**POST** `/api/endpoints/contacts.php`
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@empresa.com",
  "empresa": "Empresa SA",
  "plan": "business",
  "mensaje": "Consulta sobre migración"
}
```

### Chat

**POST** `/api/endpoints/chat.php`
```json
{
  "message": "¿Cuánto cuesta el plan Business?"
}
```

### Monitor de Amenazas

**GET** `/api/endpoints/threats.php`
- Retorna estadísticas y amenazas recientes

## 🔮 Próximas Funcionalidades

- [ ] Integración con API de IA para el chat
- [ ] Conexión con APIs de seguridad reales (VirusTotal, PhishTank)
- [ ] Panel de administración
- [ ] Sistema de autenticación
- [ ] Procesamiento de pagos
- [ ] Dashboard de clientes

## 📝 Licencia

© 2025 Promail.ar - Todos los derechos reservados

## 👥 Contacto

- Web: https://promail.ar
- Email: info@promail.ar
