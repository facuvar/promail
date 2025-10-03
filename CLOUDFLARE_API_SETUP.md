# 🔑 Configuración de Cloudflare API

## 📊 Estado Actual

El sitio ahora intenta conectarse a la **Cloudflare Radar API real** automáticamente. Funciona en dos modos:

### ✅ Modo Actual (Sin API Key)
- Intenta obtener datos públicos de Cloudflare Radar
- Si falla, usa datos estimados basados en estadísticas reales
- **Ventaja**: No requiere configuración
- **Limitación**: Datos estimados, no en tiempo real 100%

### 🚀 Modo Mejorado (Con API Key) - RECOMENDADO
- Acceso completo a Cloudflare Radar API
- Datos 100% reales en tiempo real
- Estadísticas detalladas por región
- Más tipos de amenazas

---

## 🔧 Cómo Obtener tu API Key de Cloudflare

### Paso 1: Crear Cuenta en Cloudflare (Gratis)

1. Ve a [dash.cloudflare.com](https://dash.cloudflare.com/sign-up)
2. Regístrate con tu email
3. Verifica tu cuenta

### Paso 2: Generar API Token

1. **Inicia sesión** en [dash.cloudflare.com](https://dash.cloudflare.com)

2. Click en tu **perfil** (arriba derecha) → **My Profile**

3. Ve a la pestaña **API Tokens**

4. Click en **"Create Token"**

5. **IMPORTANTE**: En lugar de "Custom Token", usa el template **"Read analytics"**
   - O si prefieres custom, sigue leyendo...

6. Si creaste **Custom Token**, configúralo así:
   
   **Opción A - Permisos Account** (Recomendado):
   ```
   Token Name: Promail API
   
   Permissions:
   - Account → Account Analytics → Read
   - Account → Account Settings → Read (opcional)
   
   Account Resources:
   - Include → All accounts
   
   Zone Resources:
   - Include → All zones
   ```
   
   **Opción B - Usar Template "Read analytics"**:
   ```
   1. En "Create Token" selecciona: "Use template"
   2. Busca: "Read analytics"
   3. Click en "Use template"
   4. Deja todo como está
   5. Continue to summary
   ```

7. Click en **"Continue to Summary"**

8. Click en **"Create Token"**

9. **¡IMPORTANTE!** Copia el token que aparece. Solo se muestra una vez.
   ```
   Ejemplo: aBcDeFgH1234567890abcdefgh
   ```

### Paso 3: Alternativa - API Pública sin Autenticación

**¡BUENA NOTICIA!** Cloudflare Radar tiene endpoints públicos que **NO requieren API key**.

Nuestro código ya está preparado para usar estos endpoints. Simplemente:

1. **No hagas nada** - El sitio funcionará automáticamente
2. Los datos se obtienen de: `https://radar.cloudflare.com/` (datos públicos)
3. Limitación: Menos detalle que con API key, pero **datos reales**

### Paso 4: Agregar API Key a Vercel (Opcional)

#### Opción A: Desde el Dashboard de Vercel

1. Ve a tu proyecto en [vercel.com](https://vercel.com)
2. Click en **Settings**
3. Click en **Environment Variables**
4. Agregar nueva variable:
   ```
   Name: CLOUDFLARE_API_KEY
   Value: [pega tu token aquí]
   Environment: Production, Preview, Development (seleccionar todos)
   ```
5. Click en **"Save"**
6. **Redeploy** el proyecto

#### Opción B: Desde la Terminal (CLI)

```bash
vercel env add CLOUDFLARE_API_KEY
# Pegar tu token cuando te lo pida
# Seleccionar: Production, Preview, Development
```

---

## 🧪 Probar la Integración

### En Local (XAMPP)

1. Crear archivo `.env` en la raíz del proyecto:
   ```env
   CLOUDFLARE_API_KEY=tu_token_aqui
   ```

2. Instalar soporte para .env en PHP (opcional):
   ```bash
   composer require vlucas/phpdotenv
   ```

3. O simplemente setear la variable de entorno:
   ```powershell
   # En PowerShell
   $env:CLOUDFLARE_API_KEY="tu_token_aqui"
   ```

### Verificar que Funciona

1. Abre: `http://localhost/promail`
2. Abre la consola del navegador (F12)
3. Busca en la consola: `"Datos actualizados desde: Cloudflare Radar API"`
4. Si ves eso, ¡está funcionando con datos reales!

---

## 📡 Endpoints Disponibles

Con tu API key puedes acceder a:

### 1. Estadísticas de Ataques Layer 7
```
GET https://api.cloudflare.com/client/v4/radar/attacks/layer7/summary
```
- Ataques HTTP/HTTPS
- DDoS de aplicación
- Tendencias temporales

### 2. Estadísticas por Ubicación
```
GET https://api.cloudflare.com/client/v4/radar/attacks/layer7/summary/origin
```
- Amenazas por país
- Top países atacantes
- Distribución geográfica

### 3. Tipos de Ataques
```
GET https://api.cloudflare.com/client/v4/radar/attacks/layer7/summary/attack_type
```
- SQL Injection
- XSS
- DDoS
- Más tipos

### 4. Inteligencia de IPs
```
GET https://api.cloudflare.com/client/v4/accounts/{account_id}/intel/ip/{ip}
```
- Reputación de IPs
- Categorías de amenaza
- Geolocalización

---

## 🔍 Debugging

### Ver Logs en Vercel

1. Ve a tu proyecto en Vercel
2. Click en **Deployments**
3. Click en el deployment activo
4. Ve a **Functions**
5. Busca logs que digan: `"Cloudflare API Response Code: 200"`

### Códigos de Respuesta

- **200**: ✅ Éxito - Datos obtenidos correctamente
- **401**: ❌ API Key inválida o falta autorización
- **403**: ❌ No tienes permisos para ese endpoint
- **429**: ⚠️ Límite de requests excedido
- **500**: ❌ Error del servidor de Cloudflare

### Si NO funciona

El sistema automáticamente usará datos estimados (fallback). Verifica:

1. ✅ API Key correcta
2. ✅ Variable de entorno configurada en Vercel
3. ✅ Redeploy después de agregar la variable
4. ✅ Permisos del token incluyen "Cloudflare Radar - Read"

---

## 💰 Límites y Costos

### Plan Gratuito de Cloudflare

- ✅ **Gratis** para uso personal/empresarial
- ✅ Acceso a Radar API
- ⚠️ Límites de rate (requests por minuto)
- ✅ Sin costos ocultos

### Rate Limits

La API de Cloudflare tiene límites de requests:
- ~1200 requests/hora (aprox)
- Nuestro sitio hace 1 request cada 30 segundos = 120 requests/hora ✅

---

## 🎯 Próximos Pasos

Una vez configurada la API key:

### Datos que Mejorarán Automáticamente:

1. ✅ **Estadísticas Reales** - Números exactos de amenazas
2. ✅ **Ubicaciones Reales** - Países con más ataques reales
3. ✅ **Tipos de Amenazas** - Basados en datos actuales
4. ✅ **Actualizaciones en Tiempo Real** - Cada 30 segundos

### Futuras Mejoras (Opcionales):

- [ ] Gráficos históricos de amenazas
- [ ] Filtrado por región (América Latina)
- [ ] Alertas personalizadas
- [ ] Dashboard de análisis avanzado

---

## 📚 Recursos

- [Cloudflare Radar](https://radar.cloudflare.com/)
- [Cloudflare API Docs](https://developers.cloudflare.com/api/)
- [Radar API Reference](https://developers.cloudflare.com/radar/)
- [Intelligence APIs](https://developers.cloudflare.com/security-center/intel-apis/)

---

## 🆘 Soporte

Si tienes problemas:

1. Revisa los logs en Vercel
2. Verifica que la API key esté activa en Cloudflare
3. Confirma que el token tenga permisos de "Read" para Radar
4. Asegúrate de haber hecho redeploy después de agregar la variable

**El sistema siempre funcionará**, incluso sin API key usará datos estimados. La API key solo mejora la precisión de los datos.

---

**Última actualización**: 3 de Enero, 2025  
**Versión**: 1.0
