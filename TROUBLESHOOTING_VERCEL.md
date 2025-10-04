# 🔧 Troubleshooting - Variables Ya Configuradas en Vercel

## Situación

Ya configuraste las variables de entorno en Vercel (`PGHOST`, `PGDATABASE`, `PGUSER`, `PGPASSWORD`, `PGPORT`) pero **aún recibes el error**:

```
Error de conexión. Por favor, intenta nuevamente.
```

## ✅ Solución Paso a Paso

### Paso 1: Verificar que las Variables Estén Bien Configuradas

1. Ve a https://vercel.com/dashboard
2. Selecciona tu proyecto
3. **Settings** → **Environment Variables**
4. Verifica que las 5 variables estén ahí:
   - ✅ `PGHOST`
   - ✅ `PGDATABASE`
   - ✅ `PGUSER`
   - ✅ `PGPASSWORD`
   - ✅ `PGPORT`

5. **IMPORTANTE:** Verifica que cada variable tenga marcadas las 3 opciones:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

**Si falta alguna marca:** Edita la variable y marca las 3 opciones.

### Paso 2: Verificar los Valores

Haz clic en cada variable para verificar que los valores sean correctos:

```
PGHOST = ep-cool-rain-ad0kocck-pooler.c-2.us-east-1.aws.neon.tech
PGDATABASE = neondb
PGUSER = neondb_owner
PGPASSWORD = npg_AkRIVhH48jbT
PGPORT = 5432
```

⚠️ **Revisa que NO haya:**
- Espacios al inicio o al final
- Comillas extra
- Saltos de línea

### Paso 3: Re-desplegar el Proyecto

**Esto es CRÍTICO:** Las variables de entorno solo se aplican en nuevos deployments.

#### Opción A - Push a Git (Recomendado)

1. Abre tu terminal en el proyecto
2. Ejecuta:

```bash
git add .
git commit -m "fix: Mejorar lectura de variables de entorno en Vercel"
git push origin main
```

#### Opción B - Re-deploy Manual desde Vercel

1. Ve a tu proyecto en Vercel
2. Clic en la pestaña **Deployments**
3. Encuentra el deployment más reciente
4. Clic en los tres puntos (...) → **Redeploy**
5. **NO marques** "Use existing Build Cache"
6. Clic en **Redeploy**

### Paso 4: Esperar y Verificar

1. **Espera 1-2 minutos** a que termine el deployment
2. Ve a la pestaña **Deployments**
3. Verifica que el nuevo deployment muestre "Ready" con ✅

### Paso 5: Probar el Script de Diagnóstico

Abre en tu navegador:

```
https://tu-proyecto.vercel.app/api/endpoints/test-connection.php
```

Reemplaza `tu-proyecto.vercel.app` con tu URL real de Vercel.

#### ✅ Respuesta Esperada (TODO OK):

```json
{
  "timestamp": "2025-10-04 12:34:56",
  "environment": {
    "PGHOST": {
      "set": true,
      "value": "ep-cool-rain-ad0kocck-pooler.c-2.us-east-1.aws.neon.tech",
      "source": "$_ENV"
    },
    "PGDATABASE": {
      "set": true,
      "value": "neondb",
      "source": "$_ENV"
    },
    "PGUSER": {
      "set": true,
      "value": "neondb_owner",
      "source": "$_ENV"
    },
    "PGPASSWORD": {
      "set": true,
      "value": "***jbT",
      "source": "$_ENV"
    },
    "PGPORT": {
      "set": true,
      "value": "5432",
      "source": "$_ENV"
    },
    "all_set": true
  },
  "database": {
    "connected": true,
    "query_test": "success",
    "admin_count": 1
  },
  "status": "OK",
  "message": "Todas las verificaciones pasaron correctamente"
}
```

#### ❌ Respuesta con Error (Variables NO Configuradas):

```json
{
  "environment": {
    "PGHOST": {
      "set": false,
      "value": null,
      "source": "none"
    },
    ...
    "all_set": false
  },
  "errors": ["Faltan variables de entorno requeridas"],
  "status": "ERROR"
}
```

**Si ves esto:** Las variables NO están llegando al código. Vuelve al Paso 1.

### Paso 6: Probar el Login

Si el script de diagnóstico devuelve "OK":

1. Ve a tu sitio: `https://tu-proyecto.vercel.app/login.html`
2. Ingresa las credenciales:
   - Usuario: `admin`
   - Contraseña: `admin123`
3. Haz clic en **Ingresar**

✅ **Debería redirigirte al dashboard**

## 🐛 Si Aún No Funciona

### Revisar los Function Logs de Vercel

1. Ve a tu proyecto en Vercel
2. **Deployments** → último deployment
3. Clic en **View Function Logs**
4. Busca líneas con:
   - `ERROR: Faltan variables de entorno`
   - `PGHOST: NOT SET`
   - `Error de conexión a base de datos`

### Revisar la Consola del Navegador

1. Abre tu sitio en Vercel
2. Presiona **F12** para abrir Developer Tools
3. Ve a la pestaña **Console**
4. Intenta hacer login
5. Busca errores en rojo

Si ves:
```
Failed to fetch
```

Significa que el endpoint PHP no está respondiendo. Revisa los Function Logs.

### Probar la URL del Endpoint Directamente

Abre en tu navegador:

```
https://tu-proyecto.vercel.app/api/endpoints/login.php
```

Deberías ver:
```json
{
  "success": false,
  "message": "Método no permitido"
}
```

Si ves un error 404 o 500, hay un problema con la configuración de PHP en Vercel.

## 🔍 Problemas Comunes

### Problema 1: Variables Configuradas pero No Aplicadas

**Síntoma:** El script de diagnóstico muestra `"source": "none"`

**Causa:** No re-desplegaste después de agregar las variables

**Solución:** Re-despliega el proyecto (Paso 3)

### Problema 2: Variables Solo en Production

**Síntoma:** Funciona en producción pero no en preview/development

**Causa:** Las variables solo están marcadas para Production

**Solución:** Edita cada variable en Vercel y marca las 3 opciones

### Problema 3: Variables con Espacios Extra

**Síntoma:** El script muestra las variables como "set" pero la conexión falla

**Causa:** Hay espacios al inicio/final del valor

**Solución:** Edita las variables en Vercel y elimina espacios extra

### Problema 4: Credenciales de Neon Incorrectas

**Síntoma:** El script conecta pero falla al hacer queries

**Causa:** Las credenciales de Neon son incorrectas o caducaron

**Solución:** Ve a Neon Dashboard y verifica tus credenciales

### Problema 5: Runtime de PHP No Configurado

**Síntoma:** Error 404 en todos los endpoints PHP

**Causa:** Problema en `vercel.json`

**Solución:** Verifica que `vercel.json` tenga:

```json
{
  "version": 2,
  "functions": {
    "api/**/*.php": {
      "runtime": "vercel-php@0.7.2"
    }
  }
}
```

## 📊 Checklist de Diagnóstico

Marca cada ítem a medida que lo verificas:

- [ ] Las 5 variables están en Vercel Settings → Environment Variables
- [ ] Cada variable tiene marcadas: Production, Preview y Development
- [ ] Los valores NO tienen espacios extra ni comillas
- [ ] Re-desplegué el proyecto después de configurar las variables
- [ ] El script `test-connection.php` devuelve "OK"
- [ ] Los Function Logs NO muestran errores de variables
- [ ] La consola del navegador NO muestra errores de conexión
- [ ] El endpoint PHP responde (aunque sea con error 405)

## 🎯 Resultado Esperado

Después de seguir todos los pasos:

1. ✅ Script de diagnóstico devuelve `"status": "OK"`
2. ✅ Login funciona correctamente
3. ✅ Puedes acceder al dashboard

## 📚 Recursos Adicionales

- [SOLUCION_ERROR_VERCEL.md](./SOLUCION_ERROR_VERCEL.md) - Solución general
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [Vercel Function Logs](https://vercel.com/docs/observability/runtime-logs)

---

**¿Sigues teniendo problemas?** Comparte los resultados del script de diagnóstico y los logs de Vercel para ayudarte mejor.

