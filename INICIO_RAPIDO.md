# 🚀 Inicio Rápido - Promail.ar

## ⚡ 3 Pasos para Empezar

### 1. Configurar PostgreSQL (5 minutos)

```powershell
# Conectar a PostgreSQL
cd "C:\Program Files\PostgreSQL\15\bin"
.\psql -U postgres

# En la consola de PostgreSQL:
CREATE DATABASE promail_db;
\q

# Importar el schema
.\psql -U postgres -d promail_db -f C:\xampp\htdocs\promail\database\schema.sql
```

### 2. Configurar XAMPP (2 minutos)

1. Abrir `C:\xampp\php\php.ini`
2. Buscar y descomentar (quitar `;`):
   ```ini
   extension=pdo_pgsql
   extension=pgsql
   ```
3. Guardar y reiniciar Apache

### 3. Iniciar el Sitio

1. Abrir Panel de XAMPP
2. Click en **Start** Apache
3. Abrir navegador: `http://localhost/promail`

## ✅ Verificar que Todo Funcione

Visitar: `http://localhost/promail/test.html`

Este panel te permite probar:
- ✓ Conexión a base de datos
- ✓ API de contactos (GET y POST)
- ✓ API de chat
- ✓ API de amenazas

## 🎨 Características del Sitio

- **Hero Section**: Presentación principal con animaciones
- **Ventajas**: 6 tarjetas mostrando beneficios
- **Monitor de Amenazas**: Estadísticas en tiempo real (simuladas)
- **Precios**: 3 planes con detalles
- **Chat IA**: Widget interactivo (respuestas predefinidas)
- **Formulario de Contacto**: Conectado a PostgreSQL

## 🔧 Solución Rápida de Problemas

### Error: "Could not find driver"
```powershell
# Verificar extensiones en php.ini
php -m | findstr pdo_pgsql
```

### Error: "Connection refused"
```powershell
# Verificar que PostgreSQL esté corriendo
pg_ctl status
```

### Chat/APIs no funcionan
- Abrir consola del navegador (F12)
- Revisar errores en la pestaña "Console"
- Verificar que Apache esté corriendo

## 📊 Datos de Prueba

La base de datos ya tiene 3 planes cargados:
- **Starter**: $2.990/mes
- **Business**: $4.990/mes por usuario
- **Enterprise**: Personalizado

## 🌐 Próximo Paso: Deploy

Cuando estés listo para publicar:

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Ver `SETUP.md` para instrucciones completas de deploy.

## 📞 Contacto

¿Problemas? Revisa los archivos:
- `README.md` - Documentación completa
- `SETUP.md` - Guía de configuración detallada

---

**¡Listo!** Ahora puedes empezar a personalizar el sitio según tus necesidades. 🎉
