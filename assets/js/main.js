// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Threat Monitor - Datos reales de Cloudflare Radar API
class ThreatMonitor {
    constructor() {
        this.threatsBlocked = 0;
        this.spamDetected = 0;
        this.phishingBlocked = 0;
        this.malwareBlocked = 0;
        this.ddosAttacks = 0;
        
        this.threatTypes = [
            { type: 'Phishing', icon: 'shield-alert' },
            { type: 'Spam', icon: 'mail-block' },
            { type: 'Malware', icon: 'bug' },
            { type: 'Ransomware', icon: 'lock-key' },
            { type: 'Spoofing', icon: 'alert-circle' }
        ];
        
        this.locations = [
            'Buenos Aires, Argentina',
            'São Paulo, Brasil',
            'Ciudad de México, México',
            'Bogotá, Colombia',
            'Lima, Perú',
            'Santiago, Chile',
            'Madrid, España',
            'Miami, USA',
            'Londres, UK',
            'Berlín, Alemania'
        ];
        
        this.init();
    }
    
    init() {
        this.loadCloudflareData();
        this.addThreatItems();
        // Actualizar datos cada 30 segundos
        setInterval(() => this.loadCloudflareData(), 30000);
        // Agregar nueva amenaza cada 3 segundos
        setInterval(() => this.addNewThreat(), 3000);
    }
    
    async loadCloudflareData() {
        try {
            const response = await fetch('api/endpoints/threats.php');
            const data = await response.json();
            
            if (response.ok && data.stats) {
                // Actualizar estadísticas con datos reales
                this.threatsBlocked = data.stats.threatsBlocked;
                this.spamDetected = data.stats.spamDetected;
                this.phishingBlocked = data.stats.phishingBlocked;
                this.malwareBlocked = data.stats.malwareBlocked;
                this.ddosAttacks = data.stats.ddosAttacks || 0;
                
                this.updateCounters();
                
                // Mostrar fuente de datos
                console.log('Datos actualizados desde:', data.source);
            }
        } catch (error) {
            console.error('Error al cargar datos de Cloudflare:', error);
            // Fallback a datos simulados si falla la API
            this.useFallbackData();
        }
    }
    
    useFallbackData() {
        this.threatsBlocked = 15847000;
        this.spamDetected = 8934000;
        this.phishingBlocked = 2341000;
        this.malwareBlocked = 1567000;
        this.updateCounters();
    }
    
    updateCounters() {
        this.animateCounter('threatsBlocked', this.threatsBlocked);
        this.animateCounter('spamDetected', this.spamDetected);
        this.animateCounter('phishingBlocked', this.phishingBlocked);
        this.animateCounter('malwareBlocked', this.malwareBlocked);
    }
    
    animateCounter(id, target) {
        const element = document.getElementById(id);
        if (!element) return;
        
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString('es-AR');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString('es-AR');
            }
        }, 30);
    }
    
    startCounterAnimation() {
        // Incremento realista basado en el volumen de Cloudflare
        setInterval(() => {
            this.threatsBlocked += Math.floor(Math.random() * 100) + 50;
            this.spamDetected += Math.floor(Math.random() * 50) + 20;
            this.phishingBlocked += Math.floor(Math.random() * 30) + 10;
            this.malwareBlocked += Math.floor(Math.random() * 20) + 5;
            
            document.getElementById('threatsBlocked').textContent = this.threatsBlocked.toLocaleString('es-AR');
            document.getElementById('spamDetected').textContent = this.spamDetected.toLocaleString('es-AR');
            document.getElementById('phishingBlocked').textContent = this.phishingBlocked.toLocaleString('es-AR');
            document.getElementById('malwareBlocked').textContent = this.malwareBlocked.toLocaleString('es-AR');
        }, 2000);
    }
    
    addThreatItems() {
        for (let i = 0; i < 5; i++) {
            this.addNewThreat();
        }
    }
    
    addNewThreat() {
        const threatsList = document.getElementById('threatsList');
        if (!threatsList) return;
        
        const threat = this.threatTypes[Math.floor(Math.random() * this.threatTypes.length)];
        const location = this.locations[Math.floor(Math.random() * this.locations.length)];
        const now = new Date();
        const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
        
        const threatItem = document.createElement('div');
        threatItem.className = 'threat-item';
        
        // Crear icono SVG según el tipo
        let iconSVG = '';
        switch(threat.icon) {
            case 'shield-alert':
                iconSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M11.9982 2C8.99043 2 7.04018 3.01167 5.73827 4.22522C5.07435 4.84635 4.5 5.74 4.5 6.99999C4.5 10.9622 5.5279 14.4307 7.44664 17.3096C9.36623 20.1894 12.136 22.415 15.5 24C18.864 22.415 21.6338 20.1894 23.5534 17.3096C25.4721 14.4307 26.5 10.9622 26.5 6.99999C26.5 5.74 25.9257 4.84635 25.2617 4.22522C23.9598 3.01167 22.0096 2 19.0018 2C17.7623 2 16.5888 2.24359 15.5 2.66369C14.4112 2.24359 13.2377 2 11.9982 2Z" stroke="#82c0ab" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.5 9V13M15.5 16.5H15.509" stroke="#82c0ab" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                break;
            case 'mail-block':
                iconSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6" stroke="#82c0ab" stroke-width="1.5" stroke-linejoin="round"/><path d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z" stroke="#82c0ab" stroke-width="1.5" stroke-linejoin="round"/><path d="M19 17L17 19M17 19L15 21M17 19L19 21M17 19L15 17" stroke="#82c0ab" stroke-width="1.5" stroke-linecap="round"/></svg>';
                break;
            case 'bug':
                iconSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M4 10H20M4 14H20" stroke="#82c0ab" stroke-width="1.5" stroke-linecap="round"/><path d="M8 4V7M16 4V7" stroke="#82c0ab" stroke-width="1.5" stroke-linecap="round"/><path d="M20 8L21 7M4 8L3 7M20 16L21 17M4 16L3 17" stroke="#82c0ab" stroke-width="1.5" stroke-linecap="round"/><path d="M8 20H16C18.8284 20 20.2426 20 21.1213 19.1213C22 18.2426 22 16.8284 22 14V10C22 7.17157 22 5.75736 21.1213 4.87868C20.2426 4 18.8284 4 16 4H8C5.17157 4 3.75736 4 2.87868 4.87868C2 5.75736 2 7.17157 2 10V14C2 16.8284 2 18.2426 2.87868 19.1213C3.75736 20 5.17157 20 8 20Z" stroke="#82c0ab" stroke-width="1.5"/></svg>';
                break;
            case 'lock-key':
                iconSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M12 16.5V14.5" stroke="#82c0ab" stroke-width="1.5" stroke-linecap="round"/><path d="M4.26781 18.8447C4.49269 20.515 5.87613 21.8235 7.55966 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.879 17.7547 20 16.6376 20 15.5C20 14.3624 19.879 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55966 9.09909C5.87613 9.17649 4.49269 10.485 4.26781 12.1553C4.12104 13.2453 4 14.3624 4 15.5C4 16.6376 4.12104 17.7547 4.26781 18.8447Z" stroke="#82c0ab" stroke-width="1.5"/><path d="M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9" stroke="#82c0ab" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                break;
            default:
                iconSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M5.32171 9.6829C7.73539 5.41196 8.94222 3.27648 10.5983 2.72678C11.5093 2.42437 12.4907 2.42437 13.4017 2.72678C15.0578 3.27648 16.2646 5.41196 18.6783 9.6829C21.092 13.9538 22.2988 16.0893 21.9368 17.8293C21.7376 18.7866 21.2469 19.6548 20.535 20.3097C19.241 21.5 16.8274 21.5 12 21.5C7.17265 21.5 4.75897 21.5 3.46496 20.3097C2.75308 19.6548 2.26239 18.7866 2.06322 17.8293C1.70119 16.0893 2.90803 13.9538 5.32171 9.6829Z" stroke="#82c0ab" stroke-width="1.5"/><path d="M12 8V13" stroke="#82c0ab" stroke-width="1.5" stroke-linecap="round"/><path d="M11.992 16H12.001" stroke="#82c0ab" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        }
        
        threatItem.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <div style="flex-shrink: 0;">${iconSVG}</div>
                <div>
                    <div class="threat-type">${threat.type} bloqueado</div>
                    <div class="threat-location" style="display: flex; align-items: center; gap: 0.25rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" style="flex-shrink: 0;">
                            <path d="M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z" stroke="#82c0ab" stroke-width="1.5"/>
                            <path d="M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z" stroke="#82c0ab" stroke-width="1.5"/>
                        </svg>
                        ${location}
                    </div>
                </div>
            </div>
            <div class="threat-time">${timeStr}</div>
        `;
        
        threatsList.insertBefore(threatItem, threatsList.firstChild);
        
        // Mantener solo las últimas 10 amenazas
        while (threatsList.children.length > 10) {
            threatsList.removeChild(threatsList.lastChild);
        }
    }
}

// Chat Widget
class ChatWidget {
    constructor() {
        this.chatButton = document.getElementById('chatButton');
        this.chatWindow = document.getElementById('chatWindow');
        this.chatClose = document.getElementById('chatClose');
        this.chatInput = document.getElementById('chatInput');
        this.chatSend = document.getElementById('chatSend');
        this.chatMessages = document.getElementById('chatMessages');
        
        this.responses = {
            'precio': 'Nuestros planes comienzan desde $2.990/mes para el plan Starter. ¿Te gustaría conocer más detalles sobre algún plan específico?',
            'plan': 'Tenemos 3 planes: Starter ($2.990), Business ($4.990/usuario) y Enterprise (personalizado). ¿Cuál se adapta mejor a tus necesidades?',
            'migra': 'Ofrecemos migración gratuita desde cualquier proveedor. Nuestro equipo se encarga de todo el proceso sin interrupciones. ¿De qué proveedor te gustaría migrar?',
            'soport': 'Contamos con soporte en español 24/7 para planes Business y Enterprise. ¿En qué podemos ayudarte?',
            'seguridad': 'Implementamos protección avanzada contra phishing, spam, malware y ransomware. Monitoreo en tiempo real y cifrado de extremo a extremo.',
            'hola': '¡Hola! ¿En qué puedo ayudarte hoy? Puedo contarte sobre nuestros planes, precios, seguridad o proceso de migración.',
            'gracias': '¡De nada! ¿Hay algo más en lo que pueda ayudarte?',
            'default': 'Interesante pregunta. Te sugiero contactar con nuestro equipo de ventas para una respuesta personalizada. ¿Te gustaría que te envíen información a tu email?'
        };
        
        this.init();
    }
    
    init() {
        this.chatButton.addEventListener('click', () => this.toggleChat());
        this.chatClose.addEventListener('click', () => this.toggleChat());
        this.chatSend.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }
    
    toggleChat() {
        this.chatWindow.classList.toggle('active');
    }
    
    async sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;
        
        this.addMessage(message, 'user');
        this.chatInput.value = '';
        
        // Llamar a la API del chat
        try {
            const response = await fetch('api/endpoints/chat.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                this.addMessage(data.message, 'bot');
            } else {
                this.addMessage('Lo siento, hubo un error. Por favor, intenta nuevamente.', 'bot');
            }
        } catch (error) {
            console.error('Error:', error);
            // Fallback a respuestas locales si falla la API
            const localResponse = this.getResponse(message);
            this.addMessage(localResponse, 'bot');
        }
    }
    
    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    getResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        for (const [key, response] of Object.entries(this.responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        
        return this.responses.default;
    }
}

// Contact Form
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    try {
        const response = await fetch('api/endpoints/contacts.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            alert('¡Gracias por tu consulta! Nuestro equipo se pondrá en contacto contigo pronto.');
            this.reset();
        } else {
            alert('Hubo un error al enviar tu consulta. Por favor, intenta nuevamente.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al enviar tu consulta. Por favor, intenta nuevamente.');
    }
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// Conversor ARS
(function(){
    const input = document.getElementById('usdOficial');
    const arsSpans = document.querySelectorAll('.ars');

    function formatARS(v){
        try {
            return new Intl.NumberFormat('es-AR', { style:'currency', currency:'ARS', maximumFractionDigits:0 }).format(v);
        } catch(e){
            return 'ARS ' + Math.round(v).toLocaleString('es-AR');
        }
    }

    function recalc(){
        const rate = parseFloat(input.value || '0');
        arsSpans.forEach(el => {
            const usd = parseFloat(el.getAttribute('data-usd'));
            if (!rate || rate <= 0) {
                el.textContent = '';
            } else {
                const ars = usd * rate;
                el.textContent = ' · ' + formatARS(ars);
                el.title = `USD ${usd} × ${rate} ARS`;
            }
        });
    }

    if (input) {
        input.addEventListener('input', recalc);
        recalc();
    }
})();

// Inicializar componentes
document.addEventListener('DOMContentLoaded', () => {
    new ThreatMonitor();
    new ChatWidget();
});
