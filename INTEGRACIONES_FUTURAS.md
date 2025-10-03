# 🔌 Integraciones Futuras - Promail.ar

## 🔒 APIs de Seguridad para Monitor de Amenazas

### 1. VirusTotal API
**URL**: https://developers.virustotal.com/reference/overview

**Qué ofrece**:
- Análisis de URLs sospechosas
- Detección de malware
- Información sobre dominios maliciosos
- Estadísticas de amenazas globales

**Plan Gratuito**: 4 requests/minuto

**Implementación sugerida**:
```php
// En api/services/virustotal.php
$apiKey = getenv('VIRUSTOTAL_API_KEY');
$url = "https://www.virustotal.com/api/v3/urls";
```

---

### 2. AbuseIPDB
**URL**: https://www.abuseipdb.com/api.html

**Qué ofrece**:
- Base de datos de IPs maliciosas
- Reportes de ataques en tiempo real
- Geolocalización de amenazas
- Estadísticas de spam y malware

**Plan Gratuito**: 1,000 requests/día

**Implementación sugerida**:
```php
// Detectar país de origen de amenazas
$ip = $_SERVER['REMOTE_ADDR'];
$response = file_get_contents("https://api.abuseipdb.com/api/v2/check?ipAddress=$ip");
```

---

### 3. PhishTank
**URL**: https://www.phishtank.com/api_info.php

**Qué ofrece**:
- Base de datos de sitios de phishing
- Verificación de URLs en tiempo real
- Reportes comunitarios
- Datos gratuitos (sin límite)

**Plan Gratuito**: Sí, ilimitado

**Implementación sugerida**:
```php
// Verificar si una URL es phishing
$url = "http://data.phishtank.com/data/online-valid.json";
$phishingList = json_decode(file_get_contents($url), true);
```

---

### 4. Spamhaus
**URL**: https://www.spamhaus.org/

**Qué ofrece**:
- Lista de dominios de spam
- IPs bloqueadas
- Datos en tiempo real

**Nota**: Requiere consultas DNS, no API REST tradicional

---

### 5. Google Safe Browsing API
**URL**: https://developers.google.com/safe-browsing

**Qué ofrece**:
- Detección de malware
- Detección de phishing
- URLs maliciosas
- Integración con Chrome

**Plan Gratuito**: 10,000 requests/día

---

## 🤖 APIs de IA para el Chat

### 1. OpenAI ChatGPT (Recomendado)
**URL**: https://platform.openai.com/docs/api-reference

**Costo**: ~$0.002 por 1K tokens (muy económico)

**Implementación**:
```php
// api/services/openai.php
$apiKey = getenv('OPENAI_API_KEY');

$data = [
    'model' => 'gpt-3.5-turbo',
    'messages' => [
        ['role' => 'system', 'content' => 'Eres un asistente de ventas para Promail.ar'],
        ['role' => 'user', 'content' => $userMessage]
    ]
];

$ch = curl_init('https://api.openai.com/v1/chat/completions');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $apiKey,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
```

---

### 2. Anthropic Claude (Alternativa)
**URL**: https://www.anthropic.com/api

Excelente alternativa a GPT, muy bueno para conversaciones largas.

---

### 3. Cohere (Gratis con limitaciones)
**URL**: https://cohere.ai/

**Plan Gratuito**: Sí, para pruebas

---

## 📧 APIs de Email Marketing

### 1. Resend (Recomendado para transaccionales)
**URL**: https://resend.com/

**Plan Gratuito**: 3,000 emails/mes

**Para**:
- Confirmaciones de contacto
- Notificaciones
- Emails transaccionales

---

### 2. Mailchimp
**URL**: https://mailchimp.com/developer/

**Plan Gratuito**: 500 contactos, 1,000 emails/mes

**Para**:
- Newsletter
- Campañas de marketing
- Automatizaciones

---

## 💳 APIs de Pagos

### 1. Mercado Pago (Argentina)
**URL**: https://www.mercadopago.com.ar/developers

**Ventajas**:
- Ideal para Argentina
- Múltiples métodos de pago
- Sin costos de setup

**Implementación**:
```php
require_once 'vendor/autoload.php';

MercadoPago\SDK::setAccessToken(getenv('MP_ACCESS_TOKEN'));

$preference = new MercadoPago\Preference();
$item = new MercadoPago\Item();
$item->title = 'Plan Business';
$item->quantity = 1;
$item->unit_price = 4990.00;
$preference->items = array($item);
$preference->save();
```

---

### 2. Stripe
**URL**: https://stripe.com/docs/api

**Ventajas**:
- Internacional
- Muy usado
- Buena documentación

---

## 📊 Ejemplo de Integración Completa

### Monitor de Amenazas con APIs Reales

```php
<?php
// api/services/threat-aggregator.php

class ThreatAggregator {
    private $virusTotalKey;
    private $abuseIPDBKey;
    
    public function __construct() {
        $this->virusTotalKey = getenv('VIRUSTOTAL_API_KEY');
        $this->abuseIPDBKey = getenv('ABUSEIPDB_API_KEY');
    }
    
    public function getGlobalThreats() {
        $threats = [];
        
        // Obtener de VirusTotal
        $vtThreats = $this->getVirusTotalThreats();
        
        // Obtener de AbuseIPDB
        $abuseThreats = $this->getAbuseIPDBThreats();
        
        // Obtener de PhishTank
        $phishThreats = $this->getPhishTankThreats();
        
        // Combinar y retornar
        return array_merge($vtThreats, $abuseThreats, $phishThreats);
    }
    
    private function getVirusTotalThreats() {
        // Implementación
    }
    
    private function getAbuseIPDBThreats() {
        // Implementación
    }
    
    private function getPhishTankThreats() {
        $url = "http://data.phishtank.com/data/online-valid.json";
        $data = json_decode(file_get_contents($url), true);
        
        $threats = [];
        foreach (array_slice($data, 0, 5) as $phish) {
            $threats[] = [
                'type' => 'Phishing',
                'url' => $phish['url'],
                'location' => $this->getCountryFromIP($phish['ip'] ?? ''),
                'timestamp' => $phish['submission_time']
            ];
        }
        
        return $threats;
    }
}
?>
```

---

## 🎯 Plan de Implementación Sugerido

### Fase 1 (Semana 1-2)
- ✅ Sitio web básico (COMPLETADO)
- ✅ APIs REST básicas (COMPLETADO)
- ⏳ Integrar PhishTank (gratis, sin límites)
- ⏳ Configurar OpenAI para chat

### Fase 2 (Semana 3-4)
- ⏳ Integrar VirusTotal
- ⏳ Integrar AbuseIPDB
- ⏳ Mejorar visualización del monitor

### Fase 3 (Mes 2)
- ⏳ Panel de administración
- ⏳ Sistema de autenticación
- ⏳ Integrar Mercado Pago

### Fase 4 (Mes 3)
- ⏳ Email marketing (Resend/Mailchimp)
- ⏳ Analytics y reportes
- ⏳ Dashboard de clientes

---

## 💰 Costos Estimados Mensuales

### Setup Inicial (Gratis)
- PhishTank: $0
- APIs básicas: $0

### Operación Normal
- OpenAI (Chat): ~$10-30/mes
- VirusTotal: $0 (plan gratis) o $200/mes (premium)
- AbuseIPDB: $0 (1k requests/día) o $20/mes
- Vercel: $0 (hobby) o $20/mes (pro)
- Neon: $0 (512MB) o $19/mes (3GB)

**Total mínimo**: $10-30/mes  
**Total con todo premium**: ~$300/mes

---

## 🔐 Seguridad de API Keys

### Nunca hardcodear las keys en el código:

```php
// ❌ MAL
$apiKey = "sk-1234567890abcdef";

// ✅ BIEN
$apiKey = getenv('OPENAI_API_KEY');
```

### En Vercel, agregar variables de entorno:

```bash
vercel env add OPENAI_API_KEY
vercel env add VIRUSTOTAL_API_KEY
vercel env add ABUSEIPDB_API_KEY
vercel env add MP_ACCESS_TOKEN
```

### En local, usar archivo .env (no commitear):

```
OPENAI_API_KEY=sk-xxxxx
VIRUSTOTAL_API_KEY=xxxxx
ABUSEIPDB_API_KEY=xxxxx
```

---

¿Preguntas? Consulta la documentación oficial de cada API o contacta con sus equipos de soporte.
