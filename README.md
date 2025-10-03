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

## 🔒 Integración con Cloudflare

El monitor de amenazas utiliza datos reales de **Cloudflare Radar API**:
- **Red global**: 200+ ciudades, 120+ países
- **Datos en tiempo real** de amenazas globales
- **API gratuita** - No requiere autenticación
- **Tipos de amenazas**: DDoS, Phishing, Malware, Spam, SQL Injection, etc.

La integración se encuentra en `api/services/cloudflare-threats.php` y puede conectarse directamente a la API de Cloudflare para obtener estadísticas aún más detalladas.

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

3. Configurar variables de entorno en Vercel:
   - `PGHOST`: Host de Neon
   - `PGDATABASE`: Nombre de la base de datos
   - `PGUSER`: Usuario de Neon
   - `PGPASSWORD`: Contraseña de Neon
   - `PGPORT`: Puerto (5432)

### Neon Database

1. Crear cuenta en [Neon](https://neon.tech)
2. Crear nuevo proyecto
3. Ejecutar el schema desde `database/schema.sql`
4. Copiar credenciales a Vercel

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
