# 🤖 Configuración del Chat de Soporte IA con OpenAI

## Descripción

El dashboard de Promail.ar incluye un **chat de soporte con IA** que utiliza OpenAI (GPT-4) para responder consultas sobre configuración de email, aplicaciones compatibles, migración desde otros servicios, y más.

El asistente está especializado en Promail.ar y tiene conocimiento sobre:
- ✅ Configuración de email en Outlook, Thunderbird, Apple Mail
- ✅ Apps móviles compatibles (iOS y Android)
- ✅ Migración desde Gmail, Office 365, etc.
- ✅ Límites de almacenamiento y características
- ✅ Resolución de problemas comunes

## 🔑 Obtener una API Key de OpenAI

### Paso 1: Crear una Cuenta en OpenAI

1. Ve a [OpenAI Platform](https://platform.openai.com/)
2. Haz clic en **Sign Up** y crea tu cuenta
3. Verifica tu email

### Paso 2: Configurar Facturación

⚠️ **Importante:** OpenAI requiere que configures un método de pago, incluso para el uso básico.

1. Ve a [Billing](https://platform.openai.com/account/billing)
2. Haz clic en **Add payment method**
3. Agrega tu tarjeta de crédito/débito
4. (Opcional) Configura límites de gasto mensuales para evitar sorpresas

### Paso 3: Generar tu API Key

1. Ve a [API Keys](https://platform.openai.com/api-keys)
2. Haz clic en **Create new secret key**
3. Dale un nombre descriptivo (ej: "Promail Dashboard")
4. **Copia la key inmediatamente** - no podrás verla nuevamente
5. Guárdala en un lugar seguro

Tu API Key se verá algo así:
```
sk-proj-AbCdEfGh123456789...
```

### Paso 4: Obtener el Assistant ID

El proyecto ya viene configurado con un asistente especializado de Promail.ar:

```
asst_IX5D8NBG2DQEipJIjOztv3Cy
```

Este asistente ya está entrenado con toda la información sobre configuración de email, apps compatibles, migración, etc. **No necesitas crear un nuevo asistente**, solo usar este ID.

## ⚙️ Configuración Local

### 1. Agregar la API Key al archivo `.env`

Crea o edita el archivo `.env` en la raíz del proyecto:

```bash
# Copiar desde el ejemplo
cp env.example .env
```

Edita `.env` y agrega tu API Key y el Assistant ID:

```env
# OpenAI API
OPENAI_API_KEY=sk-proj-tu-api-key-aqui
OPENAI_ASSISTANT_ID=asst_IX5D8NBG2DQEipJIjOztv3Cy
```

### 2. Reiniciar el servidor local

Si estás usando XAMPP, no necesitas reiniciar nada. Los cambios se aplicarán automáticamente.

### 3. Probar el chat

1. Ve a http://localhost/promail/dashboard.html
2. Haz login con las credenciales de prueba
3. Clic en **Soporte IA** en el menú lateral
4. Envía un mensaje de prueba: "¿Cómo configuro mi email en Outlook?"

## 🚀 Configuración en Producción (Vercel)

### 1. Agregar la Variable de Entorno en Vercel

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto "promail"
3. Ve a **Settings** → **Environment Variables**
4. Agrega dos variables:

   **Variable 1:**
   - **Name:** `OPENAI_API_KEY`
   - **Value:** `sk-proj-tu-api-key-aqui`
   - **Environments:** Marca las 3 opciones (Production, Preview, Development)
   
   **Variable 2:**
   - **Name:** `OPENAI_ASSISTANT_ID`
   - **Value:** `asst_IX5D8NBG2DQEipJIjOztv3Cy`
   - **Environments:** Marca las 3 opciones (Production, Preview, Development)

5. Haz clic en **Save** para cada una

### 2. Re-desplegar el Proyecto

```bash
git add .
git commit -m "Add: Configurar OpenAI API Key para chat de soporte"
git push origin main
```

O desde Vercel Dashboard:
1. **Deployments** → último deployment
2. Tres puntos (...) → **Redeploy**

### 3. Verificar en Producción

1. Ve a tu sitio en Vercel
2. Login → **Soporte IA**
3. Envía un mensaje de prueba

## 💰 Costos de OpenAI

El chat utiliza **OpenAI Assistants API** con un asistente personalizado que responde con conocimiento especializado sobre Promail.ar.

### Precios (a Octubre 2024)

- **Input:** ~$0.15 por 1M tokens (~750,000 palabras)
- **Output:** ~$0.60 por 1M tokens (~750,000 palabras)

### Estimación de Costos Reales

Para un chat de soporte:

| Uso Mensual | Consultas | Costo Aprox. |
|-------------|-----------|--------------|
| **Bajo** | 100 mensajes | ~$0.50 |
| **Medio** | 500 mensajes | ~$2.50 |
| **Alto** | 2,000 mensajes | ~$10 |

**Promedio por consulta:** ~$0.005 (medio centavo de dólar)

### Configurar Límites de Gasto

Para evitar sorpresas:

1. Ve a [Usage Limits](https://platform.openai.com/account/limits)
2. Configura un límite mensual (ej: $10/mes)
3. OpenAI te enviará alertas cuando te acerques al límite

## 🔒 Seguridad

### ✅ Buenas Prácticas

1. **Nunca subas tu API Key a Git**
   - Ya está protegida en `.gitignore`
   - Usa variables de entorno siempre

2. **Rotar la API Key periódicamente**
   - Crea una nueva key cada 3-6 meses
   - Elimina las keys antiguas

3. **Monitorear el uso**
   - Revisa el [Usage Dashboard](https://platform.openai.com/usage)
   - Configura alertas de gasto

4. **Límitar permisos**
   - Si OpenAI agrega opciones de permisos, usa solo los necesarios

### ⚠️ Qué NO hacer

- ❌ No compartas tu API Key públicamente
- ❌ No la incluyas en el código fuente
- ❌ No la envíes por email o chat sin cifrar
- ❌ No uses la misma key para múltiples proyectos (crea keys separadas)

## 🛠️ Troubleshooting

### Error: "API Key de OpenAI no configurada"

**Causa:** La variable `OPENAI_API_KEY` no está disponible.

**Solución Local:**
1. Verifica que el archivo `.env` existe en la raíz del proyecto
2. Verifica que la variable está configurada: `OPENAI_API_KEY=sk-...`
3. Recarga la página

**Solución en Vercel:**
1. Ve a Settings → Environment Variables
2. Verifica que `OPENAI_API_KEY` está configurada
3. Re-despliega el proyecto

### Error: "Assistant ID de OpenAI no configurado"

**Causa:** La variable `OPENAI_ASSISTANT_ID` no está disponible.

**Solución Local:**
1. Verifica que el archivo `.env` existe en la raíz del proyecto
2. Verifica que la variable está configurada: `OPENAI_API_KEY=sk-...`
3. Recarga la página

**Solución en Vercel:**
1. Ve a Settings → Environment Variables
2. Verifica que `OPENAI_API_KEY` está configurada
3. Re-despliega el proyecto

### Error: "Error de OpenAI API (401): Incorrect API key provided"

**Causa:** La API Key es inválida o está mal copiada.

**Solución:**
1. Ve a [API Keys](https://platform.openai.com/api-keys)
2. Verifica que la key esté activa
3. Si hay dudas, crea una nueva key
4. Actualiza la variable de entorno

### Error: "Error de OpenAI API (429): Rate limit reached"

**Causa:** Has superado el límite de requests por minuto.

**Solución:**
1. Espera un momento antes de enviar más mensajes
2. Si el problema persiste, verifica tu tier en OpenAI
3. Considera actualizar tu plan si es necesario

### Error: "Error de OpenAI API (insufficient_quota)"

**Causa:** Has agotado tu crédito o límite de gasto.

**Solución:**
1. Ve a [Billing](https://platform.openai.com/account/billing)
2. Agrega más crédito o aumenta tu límite mensual
3. Verifica que tu método de pago esté activo

### El chat responde lento

**Causa:** GPT-4 puede tardar unos segundos en responder.

**Solución:**
- Es normal, el modelo está procesando
- Si quieres respuestas más rápidas, puedes cambiar a `gpt-3.5-turbo` en `api/endpoints/ai-chat.php` (línea 106)

### El chat responde en inglés

**Causa:** El prompt del sistema no está funcionando correctamente.

**Solución:**
- Verifica que el archivo `api/endpoints/ai-chat.php` no fue modificado
- El prompt incluye "Responde siempre en español"
- Puedes forzar el idioma agregando "Responde en español" al inicio de tu mensaje

## 📊 Monitoreo de Uso

### Ver Estadísticas de Uso

1. Ve a [Usage Dashboard](https://platform.openai.com/usage)
2. Filtra por fecha
3. Revisa:
   - Número de requests
   - Tokens consumidos
   - Costo total

### Alertas de Uso

1. Ve a [Limits](https://platform.openai.com/account/limits)
2. Configura alertas en porcentajes: 50%, 75%, 90%
3. OpenAI te enviará un email cuando alcances esos niveles

## 🎨 Personalización

### Cambiar el Modelo de IA

Edita `api/endpoints/ai-chat.php`, línea ~106:

```php
'model' => 'gpt-4o-mini', // Cambiar aquí
```

Opciones disponibles:
- `gpt-4o-mini` - Más rápido y económico ✅ (recomendado)
- `gpt-4o` - Más inteligente pero más caro
- `gpt-3.5-turbo` - Más rápido y económico pero menos preciso

### Modificar el Prompt del Sistema

Edita `api/endpoints/ai-chat.php`, líneas ~46-127.

Puedes agregar:
- Más información sobre Promail.ar
- Respuestas a preguntas frecuentes específicas
- Tono de voz personalizado
- Restricciones adicionales

### Cambiar el Límite de Tokens

Edita `api/endpoints/ai-chat.php`, línea ~111:

```php
'max_tokens' => 800, // Cambiar aquí
```

- Más tokens = respuestas más largas = más costo
- Menos tokens = respuestas más cortas = menos costo

## 📚 Recursos Adicionales

- [Documentación de OpenAI API](https://platform.openai.com/docs)
- [Pricing de OpenAI](https://openai.com/pricing)
- [Best Practices](https://platform.openai.com/docs/guides/production-best-practices)
- [Rate Limits](https://platform.openai.com/docs/guides/rate-limits)

## ✅ Checklist de Configuración

- [ ] Cuenta de OpenAI creada
- [ ] Método de pago configurado
- [ ] API Key generada y copiada
- [ ] Variables agregadas al `.env` local:
  - [ ] `OPENAI_API_KEY`
  - [ ] `OPENAI_ASSISTANT_ID`
- [ ] Chat funciona en local
- [ ] Variables agregadas en Vercel:
  - [ ] `OPENAI_API_KEY`
  - [ ] `OPENAI_ASSISTANT_ID`
- [ ] Proyecto re-desplegado en Vercel
- [ ] Chat funciona en producción
- [ ] Límites de gasto configurados en OpenAI

## 💡 Consejos

1. **Empieza con límites bajos** ($5-10/mes) y ajusta según el uso real
2. **Monitorea semanalmente** el uso para detectar anomalías
3. **Prueba localmente** antes de desplegar a producción
4. **Guarda tu API Key** en un administrador de contraseñas
5. **Documenta** cualquier cambio al prompt del sistema

---

**¿Necesitas ayuda?** Revisa la [documentación de OpenAI](https://platform.openai.com/docs) o contacta a su soporte.

