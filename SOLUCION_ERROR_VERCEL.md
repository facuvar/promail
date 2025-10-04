# 🔧 Solución al Error de Conexión en Vercel

## 📋 Resumen del Problema

**Error:** "Error de conexión. Por favor, intenta nuevamente."  

**Causas posibles:**
1. Las variables de entorno NO están configuradas en Vercel
2. Las variables ESTÁN configuradas pero no se están leyendo correctamente en PHP
3. Necesitas re-desplegar después de configurar las variables

## ✅ Solución en 3 Pasos

### Paso 1: Configurar Variables de Entorno en Vercel

1. **Ir a Vercel Dashboard**
   - Abre https://vercel.com/dashboard
   - Selecciona tu proyecto "promail"

2. **Agregar Variables de Entorno**
   - Ve a: **Settings** → **Environment Variables**
   - Agrega las siguientes 5 variables (una por una):

   | Variable | Valor |
   |----------|-------|
   | `PGHOST` | `ep-cool-rain-ad0kocck-pooler.c-2.us-east-1.aws.neon.tech` |
   | `PGDATABASE` | `neondb` |
   | `PGUSER` | `neondb_owner` |
   | `PGPASSWORD` | `npg_AkRIVhH48jbT` |
   | `PGPORT` | `5432` |

3. **Importante:** Para cada variable, marca las 3 opciones:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

### Paso 2: Re-desplegar el Proyecto

Tienes 2 opciones:

**Opción A - Desde Vercel Dashboard:**
1. Ve a la pestaña **Deployments**
2. Encuentra el último deployment
3. Clic en los tres puntos (...) → **Redeploy**
4. Confirma el re-despliegue

**Opción B - Push a Git (Recomendado):**
```bash
git add .
git commit -m "fix: Configurar variables de entorno para Vercel"
git push origin main
```

### Paso 3: Verificar que Funcione

1. **Espera 1-2 minutos** a que termine el deployment

2. **Prueba el Script de Diagnóstico:**
   ```
   https://tu-proyecto.vercel.app/api/endpoints/test-connection.php
   ```
   
   Deberías ver algo como:
   ```json
   {
     "status": "OK",
     "database": {
       "connected": true,
       "admin_count": 1
     }
   }
   ```

3. **Prueba el Login:**
   - Ve a tu sitio en Vercel
   - Intenta hacer login con:
     - Usuario: `admin`
     - Contraseña: `admin123`

## 🎯 Verificación Rápida

### ✅ Checklist de Deployment

- [ ] 5 variables de entorno agregadas en Vercel
- [ ] Cada variable marcada con Production, Preview y Development
- [ ] Proyecto re-desplegado
- [ ] Script de diagnóstico devuelve "OK"
- [ ] Login funcionando en producción

## 🐛 Si Aún No Funciona

### 1. Verifica las Variables de Entorno

Ve a **Settings** → **Environment Variables** en Vercel y confirma que:
- Las 5 variables están ahí
- Los valores son correctos (sin espacios extra)
- Están marcadas para Production, Preview y Development

### 2. Revisa los Logs de Vercel

1. Ve a tu proyecto en Vercel
2. Clic en **Deployments** → último deployment
3. Clic en **View Function Logs**
4. Busca errores relacionados con "database" o "PGHOST"

### 3. Verifica la Consola del Navegador

1. Abre tu sitio en Vercel
2. Presiona F12 para abrir Developer Tools
3. Ve a la pestaña **Console**
4. Intenta hacer login
5. Revisa si hay errores en rojo

### 4. Usa el Script de Diagnóstico

Si el script de diagnóstico muestra errores:

```json
{
  "status": "ERROR",
  "errors": ["Faltan variables de entorno requeridas"]
}
```

Significa que las variables NO están configuradas correctamente en Vercel.

## 📝 Cambios Realizados en el Código

### 1. `vercel.json`
- Agregado `"version": 2"` para compatibilidad
- Removida sección `env` (no es necesaria, las variables se configuran en el dashboard)

### 2. `api/config/database.php`
- ✅ Eliminadas credenciales hardcodeadas
- ✅ Agregada validación de variables de entorno
- ✅ Soporte para `$_ENV` y `getenv()` (Vercel usa ambos)
- ✅ Mejorado logging para debugging

### 3. Nuevo Script de Diagnóstico
- `api/endpoints/test-connection.php`
- Verifica variables de entorno con `$_ENV` y `getenv()`
- Muestra la fuente de cada variable
- Prueba conexión a base de datos
- Cuenta los admins en la base de datos

## 🔒 Seguridad

- ✅ Las credenciales ya NO están en el código
- ✅ `.env` está en `.gitignore`
- ✅ Las credenciales están en variables de entorno de Vercel

## 📚 Recursos Adicionales

- [VERCEL_SETUP.md](./VERCEL_SETUP.md) - Documentación completa
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [Vercel PHP Runtime](https://vercel.com/docs/runtimes#official-runtimes/php)

## 💡 Tip

Después de agregar las variables de entorno, siempre debes re-desplegar el proyecto para que los cambios surtan efecto.

---

**¿Necesitas ayuda?** Revisa los logs de Vercel o usa el script de diagnóstico para identificar el problema exacto.

