# Configuración de Vercel para Promail.ar

## Problema Identificado

El error "Error de conexión. Por favor, intenta nuevamente." ocurre porque:

1. Las variables de entorno de la base de datos NO están configuradas en Vercel
2. La configuración de `vercel.json` necesitaba ajustes
3. Las credenciales estaban hardcodeadas en el código (riesgo de seguridad)

## Solución

### 1. Configurar Variables de Entorno en Vercel

Debes agregar las siguientes variables de entorno en tu proyecto de Vercel:

1. Ve a tu proyecto en Vercel: https://vercel.com/dashboard
2. Selecciona tu proyecto "promail"
3. Ve a **Settings** → **Environment Variables**
4. Agrega las siguientes variables (una por una):

| Variable | Valor | Ambiente |
|----------|-------|----------|
| `PGHOST` | `ep-cool-rain-ad0kocck-pooler.c-2.us-east-1.aws.neon.tech` | Production, Preview, Development |
| `PGDATABASE` | `neondb` | Production, Preview, Development |
| `PGUSER` | `neondb_owner` | Production, Preview, Development |
| `PGPASSWORD` | `npg_AkRIVhH48jbT` | Production, Preview, Development |
| `PGPORT` | `5432` | Production, Preview, Development |

**Importante:** Marca las tres opciones (Production, Preview y Development) para cada variable.

### 2. Re-desplegar el Proyecto

Después de agregar las variables de entorno:

1. Ve a la pestaña **Deployments**
2. Busca el último deployment
3. Haz clic en los tres puntos (...) → **Redeploy**
4. Selecciona "Use existing Build Cache" y confirma

**O simplemente haz un nuevo push a GitHub:**

```bash
git add .
git commit -m "Fix: Configurar variables de entorno para Vercel"
git push origin main
```

### 3. Verificar el Deployment

1. Espera a que el deployment termine (1-2 minutos)
2. Ve a tu sitio en producción
3. Intenta hacer login con:
   - Usuario: `admin`
   - Contraseña: `admin123`

### 4. Verificar con Script de Diagnóstico

He creado un script que verifica la configuración de la base de datos:

**En Producción (Vercel):**
```
https://tu-proyecto.vercel.app/api/endpoints/test-connection.php
```

**En Local:**
```
http://localhost/promail/api/endpoints/test-connection.php
```

Este script te mostrará:
- ✅ Si las variables de entorno están configuradas
- ✅ Si la conexión a la base de datos funciona
- ✅ Si puede hacer queries a la base de datos
- ✅ Cuántos admins hay en la base de datos

### 5. Debugging (Si aún hay problemas)

Si el login sigue fallando:

1. Abre las **Developer Tools** del navegador (F12)
2. Ve a la pestaña **Console**
3. Intenta hacer login nuevamente
4. Revisa los errores en la consola

También puedes revisar los logs en Vercel:
1. Ve a tu proyecto en Vercel
2. Selecciona el deployment más reciente
3. Haz clic en **View Function Logs**
4. Busca errores relacionados con la base de datos

## Cambios Realizados en el Código

### 1. `vercel.json`
- ✅ Agregado `"version": 2` para compatibilidad
- ✅ Agregada sección `env` con referencias a las variables de entorno

### 2. `api/config/database.php`
- ✅ Eliminadas credenciales hardcodeadas (riesgo de seguridad)
- ✅ Agregada validación de variables de entorno
- ✅ Mejorado logging para debugging

### 3. `env.example`
- ✅ Actualizado con las variables correctas de Neon

## Configuración Local

Para desarrollo local, necesitas crear un archivo `.env` en la raíz del proyecto:

```bash
cp env.example .env
```

Luego edita `.env` y agrega tus credenciales de Neon:

```env
PGHOST=ep-cool-rain-ad0kocck-pooler.c-2.us-east-1.aws.neon.tech
PGDATABASE=neondb
PGUSER=neondb_owner
PGPASSWORD=npg_AkRIVhH48jbT
PGPORT=5432
```

## Verificación del Ambiente Local

Para verificar que todo funcione en local:

1. Asegúrate de tener XAMPP corriendo
2. Abre http://localhost/promail/login.html
3. Intenta hacer login con las credenciales de prueba
4. Si hay errores, revisa la consola del navegador y los logs de PHP

## Seguridad

⚠️ **IMPORTANTE:** 

- Las credenciales de Neon están ahora almacenadas en variables de entorno de Vercel
- Nunca subas el archivo `.env` a Git (ya está en `.gitignore`)
- Considera rotar las credenciales de la base de datos periódicamente
- En producción, considera usar Vercel Secrets en lugar de variables de entorno normales

## Recursos Adicionales

- [Documentación de Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [Documentación de Vercel PHP Runtime](https://vercel.com/docs/runtimes#official-runtimes/php)
- [Documentación de Neon PostgreSQL](https://neon.tech/docs/introduction)

## Checklist de Deployment

- [ ] Variables de entorno configuradas en Vercel
- [ ] Proyecto re-desplegado en Vercel
- [ ] Login funcionando en producción
- [ ] Archivo `.env` creado para desarrollo local
- [ ] Login funcionando en local

## Contacto

Si sigues teniendo problemas, revisa los logs de Vercel o contacta a soporte técnico.

