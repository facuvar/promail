// Dashboard JavaScript con datos dummy

// Verificar autenticación
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    // Cargar info del usuario
    const userName = localStorage.getItem('admin_name') || 'Admin';
    const userEmail = localStorage.getItem('admin_email') || 'admin@promail.ar';
    document.getElementById('userName').textContent = userName;
    document.getElementById('userEmail').textContent = userEmail;

    // Inicializar menú móvil
    initMobileMenu();

    // Inicializar dashboard
    initDashboard();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('dashboardSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const navItems = document.querySelectorAll('.nav-item');

    if (!menuToggle || !sidebar || !overlay) return;

    // Toggle menu
    menuToggle.addEventListener('click', () => {
        const isOpen = sidebar.classList.contains('open');
        
        if (isOpen) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    // Cerrar al hacer clic en overlay
    overlay.addEventListener('click', () => {
        closeSidebar();
    });

    // Cerrar al hacer clic en un item del menú (solo en móvil)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                closeSidebar();
            }
        });
    });

    // Cerrar al cambiar a desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            closeSidebar();
        }
    });

    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('active');
        menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_name');
    localStorage.removeItem('admin_email');
    window.location.href = 'login.html';
});

// Navegación
function initDashboard() {
    const navItems = document.querySelectorAll('.nav-item');
    const content = document.getElementById('dashboardContent');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Actualizar navegación activa
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Obtener vista
            const view = item.getAttribute('data-view');
            loadView(view);
        });
    });

    // Cargar vista inicial
    loadView('overview');
}

function loadView(view) {
    const content = document.getElementById('dashboardContent');
    const pageTitle = document.getElementById('pageTitle');
    const pageSubtitle = document.getElementById('pageSubtitle');

    switch(view) {
        case 'overview':
            pageTitle.textContent = 'Resumen';
            pageSubtitle.textContent = 'Vista general de tu dominio';
            content.innerHTML = getOverviewView();
            break;
        case 'sentiment':
            pageTitle.textContent = 'Sentiment Radar';
            pageSubtitle.textContent = 'Análisis de sentimiento organizacional';
            content.innerHTML = getSentimentView();
            break;
        case 'emails':
            pageTitle.textContent = 'Correos';
            pageSubtitle.textContent = 'Gestión de correos enviados y recibidos';
            content.innerHTML = getEmailsView();
            break;
        case 'users':
            pageTitle.textContent = 'Usuarios';
            pageSubtitle.textContent = 'Gestión de casillas de correo';
            content.innerHTML = getUsersView();
            break;
        case 'ai-support':
            pageTitle.textContent = 'Soporte IA';
            pageSubtitle.textContent = 'Asistente virtual especializado en Promail.ar';
            content.innerHTML = getAISupportView();
            initAIChat();
            break;
        case 'settings':
            pageTitle.textContent = 'Configuración';
            pageSubtitle.textContent = 'Ajustes del dominio y cuenta';
            content.innerHTML = getSettingsView();
            break;
    }
}

// Vista de Resumen
function getOverviewView() {
    return `
        <div class="stats-grid-dashboard">
            <div class="stat-card-dashboard">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-value">124</div>
                        <div class="stat-label">Correos Hoy</div>
                    </div>
                    <div class="stat-icon blue">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none">
                            <path d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                            <path d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div class="stat-change positive">↑ 12% vs ayer</div>
            </div>

            <div class="stat-card-dashboard">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-value">68%</div>
                        <div class="stat-label">Sentimiento Positivo</div>
                    </div>
                    <div class="stat-icon green">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
                            <path d="M8 13.5C8 13.5 9 15 12 15C15 15 16 13.5 16 13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9 9.5H9.01M15 9.5H15.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div class="stat-change positive">↑ 5% vs semana pasada</div>
            </div>

            <div class="stat-card-dashboard">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-value">23</div>
                        <div class="stat-label">Usuarios Activos</div>
                    </div>
                    <div class="stat-icon yellow">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                            <path d="M20.7739 18C21.5232 18 22.1192 17.5285 22.6543 16.8691C23.7498 15.5194 21.9512 14.4408 21.2652 13.9126C20.5679 13.3756 19.7893 13.0714 18.9999 13M17.9999 11C19.3806 11 20.4999 9.88071 20.4999 8.5C20.4999 7.11929 19.3806 6 17.9999 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M3.2259 18C2.47659 18 1.88061 17.5285 1.34548 16.8691C0.250028 15.5194 2.04861 14.4408 2.73458 13.9126C3.43191 13.3756 4.21052 13.0714 4.99994 13M5.49994 11C4.11923 11 2.99994 9.88071 2.99994 8.5C2.99994 7.11929 4.11923 6 5.49994 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M8.08368 15.1112C7.0619 15.743 4.38286 17.0331 6.01458 18.6474C6.81166 19.436 7.6994 20 8.8155 20H15.1843C16.3004 20 17.1881 19.436 17.9852 18.6474C19.6169 17.0331 16.9379 15.743 15.9161 15.1112C13.52 13.6296 10.4797 13.6296 8.08368 15.1112Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M15.4999 7.5C15.4999 9.433 13.9329 11 11.9999 11C10.0669 11 8.49988 9.433 8.49988 7.5C8.49988 5.567 10.0669 4 11.9999 4C13.9329 4 15.4999 5.567 15.4999 7.5Z" stroke="currentColor" stroke-width="1.5"/>
                        </svg>
                    </div>
                </div>
                <div class="stat-change">2 nuevos esta semana</div>
            </div>

            <div class="stat-card-dashboard">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-value">8</div>
                        <div class="stat-label">Amenazas Bloqueadas</div>
                    </div>
                    <div class="stat-icon red">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none">
                            <path d="M12 16.5V14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M4.26781 18.8447C4.49269 20.515 5.87613 21.8235 7.55966 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.879 17.7547 20 16.6376 20 15.5C20 14.3624 19.879 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55966 9.09909C5.87613 9.17649 4.49269 10.485 4.26781 12.1553C4.12104 13.2453 4 14.3624 4 15.5C4 16.6376 4.12104 17.7547 4.26781 18.8447Z" stroke="currentColor" stroke-width="1.5"/>
                            <path d="M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div class="stat-change negative">↓ 20% vs ayer</div>
            </div>
        </div>

        <div class="dashboard-card">
            <div class="card-header">
                <h3>Actividad Reciente</h3>
            </div>
            <div class="email-list">
                <div class="email-item unread">
                    <div class="email-header">
                        <span class="email-from">ventas@empresa.com</span>
                        <span class="email-time">Hace 5 min</span>
                    </div>
                    <div class="email-subject">Nueva consulta sobre Plan Business</div>
                    <div class="email-preview">Hola, quisiera información sobre migración desde Google Workspace...</div>
                    <div class="email-tags">
                        <span class="email-tag received">Recibido</span>
                    </div>
                </div>
                <div class="email-item">
                    <div class="email-header">
                        <span class="email-from">soporte@promail.ar</span>
                        <span class="email-time">Hace 1 hora</span>
                    </div>
                    <div class="email-subject">Ticket #1234 resuelto</div>
                    <div class="email-preview">El problema reportado ha sido solucionado exitosamente...</div>
                    <div class="email-tags">
                        <span class="email-tag sent">Enviado</span>
                    </div>
                </div>
                <div class="email-item">
                    <div class="email-header">
                        <span class="email-from">marketing@cliente.com</span>
                        <span class="email-time">Hace 3 horas</span>
                    </div>
                    <div class="email-subject">Reunión semanal - Resumen</div>
                    <div class="email-preview">Adjunto el resumen de la reunión de esta semana con los puntos clave...</div>
                    <div class="email-tags">
                        <span class="email-tag received">Recibido</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Vista de Sentiment Radar
function getSentimentView() {
    return `
        <div class="dashboard-card">
            <div class="card-header">
                <h3>Análisis Global de Sentimiento</h3>
                <div class="card-actions">
                    <button class="btn-icon" title="Actualizar">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
                            <path d="M20.0078 8C20.0078 8 17.5301 3 12.0078 3C6.48553 3 4.00781 8 4.00781 8M4.00781 16C4.00781 16 6.48553 21 12.0078 21C17.5301 21 20.0078 16 20.0078 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M20.0059 8.00781H15.0059M20.0059 8.00781V3.00781M4.00781 16.0078H9.00781M4.00781 16.0078V21.0078" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 2rem;">
                <div style="text-align: center; padding: 2.5rem 1.5rem; background: #d1fae5; border-radius: 12px;">
                    <div style="font-size: 3rem; font-weight: 700; color: #065f46; margin-bottom: 0.5rem;">68%</div>
                    <div style="color: #065f46; font-weight: 600; font-size: 1rem;">Positivo</div>
                </div>
                <div style="text-align: center; padding: 2.5rem 1.5rem; background: #fef3c7; border-radius: 12px;">
                    <div style="font-size: 3rem; font-weight: 700; color: #92400e; margin-bottom: 0.5rem;">22%</div>
                    <div style="color: #92400e; font-weight: 600; font-size: 1rem;">Neutral</div>
                </div>
                <div style="text-align: center; padding: 2.5rem 1.5rem; background: #fee2e2; border-radius: 12px;">
                    <div style="font-size: 3rem; font-weight: 700; color: #991b1b; margin-bottom: 0.5rem;">10%</div>
                    <div style="color: #991b1b; font-weight: 600; font-size: 1rem;">Negativo</div>
                </div>
            </div>
        </div>

        <div class="dashboard-card">
            <div class="card-header">
                <h3>Sentimiento por Departamento</h3>
            </div>
            
            <div class="sentiment-meters">
                <div class="sentiment-meter">
                    <div class="meter-label">Ventas</div>
                    <div class="meter-bar">
                        <div class="meter-fill positive" style="width: 82%"></div>
                    </div>
                    <div class="meter-value">82%</div>
                </div>
                <div class="sentiment-meter">
                    <div class="meter-label">Marketing</div>
                    <div class="meter-bar">
                        <div class="meter-fill positive" style="width: 75%"></div>
                    </div>
                    <div class="meter-value">75%</div>
                </div>
                <div class="sentiment-meter">
                    <div class="meter-label">Soporte</div>
                    <div class="meter-bar">
                        <div class="meter-fill neutral" style="width: 58%"></div>
                    </div>
                    <div class="meter-value">58%</div>
                </div>
                <div class="sentiment-meter">
                    <div class="meter-label">RRHH</div>
                    <div class="meter-bar">
                        <div class="meter-fill positive" style="width: 71%"></div>
                    </div>
                    <div class="meter-value">71%</div>
                </div>
                <div class="sentiment-meter">
                    <div class="meter-label">Desarrollo</div>
                    <div class="meter-bar">
                        <div class="meter-fill positive" style="width: 65%"></div>
                    </div>
                    <div class="meter-value">65%</div>
                </div>
            </div>
        </div>

        <div class="dashboard-card">
            <div class="card-header">
                <h3>Alertas de Sentimiento</h3>
            </div>
            <div style="padding: 1rem; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 8px; margin-bottom: 1rem;">
                <div style="font-weight: 600; color: #92400e; margin-bottom: 0.25rem;">⚠️ Atención: Departamento de Soporte</div>
                <div style="font-size: 0.875rem; color: #78350f;">El sentimiento negativo aumentó 15% en los últimos 3 días. Recomendamos revisar la carga de trabajo.</div>
            </div>
            <div style="padding: 1rem; background: #d1fae5; border-left: 4px solid #10b981; border-radius: 8px;">
                <div style="font-weight: 600; color: #065f46; margin-bottom: 0.25rem;">✓ Mejora Detectada: Departamento de Ventas</div>
                <div style="font-size: 0.875rem; color: #064e3b;">El sentimiento positivo aumentó 8% esta semana. ¡Buen trabajo!</div>
            </div>
        </div>
    `;
}

// Vista de Correos
function getEmailsView() {
    return `
        <div class="stats-grid-dashboard">
            <div class="stat-card-dashboard">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-value">847</div>
                        <div class="stat-label">Enviados Esta Semana</div>
                    </div>
                    <div class="stat-icon blue">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                            <path d="M22 12L12 2M22 12L12 22M22 12H2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div class="stat-change positive">↑ 8% vs semana pasada</div>
            </div>

            <div class="stat-card-dashboard">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-value">1,234</div>
                        <div class="stat-label">Recibidos Esta Semana</div>
                    </div>
                    <div class="stat-icon green">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                            <path d="M2 12L12 22M2 12L12 2M2 12H22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div class="stat-change positive">↑ 12% vs semana pasada</div>
            </div>
        </div>

        <div class="dashboard-card">
            <div class="card-header">
                <h3>Correos Recientes</h3>
                <div class="card-actions">
                    <button class="btn-icon" title="Filtrar">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
                            <path d="M3 7H6M6 7C6 8.65685 7.34315 10 9 10C10.6569 10 12 8.65685 12 7C12 5.34315 10.6569 4 9 4C7.34315 4 6 5.34315 6 7ZM3 17H9M18 17H21M18 17C18 18.6569 16.6569 20 15 20C13.3431 20 12 18.6569 12 17C12 15.3431 13.3431 14 15 14C16.6569 14 18 15.3431 18 17ZM12 7H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="email-list">
                ${generateDummyEmails(15)}
            </div>
        </div>
    `;
}

function generateDummyEmails(count) {
    const from = ['cliente@empresa.com', 'soporte@promail.ar', 'ventas@negocio.com', 'info@startup.com', 'admin@corporacion.com'];
    const subjects = ['Consulta sobre servicios', 'Problema con la cuenta', 'Solicitud de información', 'Reunión de seguimiento', 'Propuesta comercial'];
    const previews = ['Me gustaría saber más sobre...', 'Tengo un problema con...', 'Necesito información adicional sobre...', 'Podríamos coordinar una reunión para...', 'Les envío la propuesta solicitada...'];
    
    let html = '';
    for (let i = 0; i < count; i++) {
        const isUnread = i < 3;
        const isSent = i % 3 === 0;
        const timeAgo = i === 0 ? 'Hace 5 min' : i === 1 ? 'Hace 30 min' : i === 2 ? 'Hace 1 hora' : `Hace ${i} horas`;
        
        html += `
            <div class="email-item ${isUnread ? 'unread' : ''}">
                <div class="email-header">
                    <span class="email-from">${from[i % from.length]}</span>
                    <span class="email-time">${timeAgo}</span>
                </div>
                <div class="email-subject">${subjects[i % subjects.length]}</div>
                <div class="email-preview">${previews[i % previews.length]}</div>
                <div class="email-tags">
                    <span class="email-tag ${isSent ? 'sent' : 'received'}">${isSent ? 'Enviado' : 'Recibido'}</span>
                </div>
            </div>
        `;
    }
    return html;
}

// Vista de Usuarios
function getUsersView() {
    return `
        <div class="dashboard-card">
            <div class="card-header">
                <h3>Casillas de Correo Activas</h3>
                <button class="btn btn-primary">+ Agregar Usuario</button>
            </div>
            <p style="color: var(--text-light); text-align: center; padding: 3rem;">Vista de usuarios en desarrollo...</p>
        </div>
    `;
}

// Vista de Configuración
function getSettingsView() {
    return `
        <div class="dashboard-card">
            <div class="card-header">
                <h3>Configuración General</h3>
            </div>
            <p style="color: var(--text-light); text-align: center; padding: 3rem;">Vista de configuración en desarrollo...</p>
        </div>
    `;
}

// Vista de Soporte IA
function getAISupportView() {
    return `
        <div class="ai-info-box">
            <p><strong>Asistente IA de Promail.ar</strong> - Este chat está conectado con un agente especializado de OpenAI que puede ayudarte con configuraciones, aplicaciones compatibles, y consultas sobre tu webmail.</p>
        </div>

        <div class="ai-chat-container">
            <div class="ai-chat-header">
                <div class="ai-avatar">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none">
                        <path d="M8 13.5C8 13.5 8.9 15 12 15C15.1 15 16 13.5 16 13.5M15 9H15.01M9 9H9.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.9999 7.65802V4.00005C18.9999 3.07979 18.9999 2.61966 18.7808 2.27607C18.6341 2.04023 18.4191 1.8559 18.1654 1.74613C17.7815 1.57826 17.2831 1.67374 16.2861 1.86472C14.1779 2.2743 12.0014 2.49995 9.7777 2.49995C8.48374 2.49995 7.20803 2.42302 5.95335 2.27426C5.12766 2.18053 4.71481 2.13367 4.43449 2.3117C4.32352 2.38534 4.2265 2.47869 4.14823 2.58694C3.96784 2.86044 3.96786 3.27104 3.9679 4.09223L3.9681 12.5689C3.9681 13.8948 3.96811 14.5577 4.22988 15.0732C4.4589 15.5235 4.83103 15.8845 5.28827 16.0996C5.81069 16.3481 6.47546 16.3322 7.80499 16.3004C9.15663 16.2682 10.4708 16.0995 11.7362 15.8097C13.4202 15.4181 14.2621 15.2224 14.9018 15.5625C15.1478 15.6904 15.3694 15.8582 15.5576 16.0585C16.0001 16.5375 16.0001 17.2493 16 18.673L16 18.6735C16 20.1271 16 20.8539 16.4282 21.2552C16.5935 21.4082 16.7869 21.5287 16.9984 21.6106C17.5274 21.8213 18.1701 21.6382 19.4555 21.2722L19.4738 21.2672C20.4544 21.0012 20.9447 20.8682 21.2861 20.5661C21.4939 20.387 21.6596 20.1636 21.7713 19.9124C21.9999 19.4091 21.9999 18.8133 21.9999 17.6217V17.6214V12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div>
                    <h3>Asistente Promail IA</h3>
                    <p>Estoy aquí para ayudarte con cualquier consulta</p>
                </div>
            </div>

            <div class="ai-chat-messages" id="aiChatMessages">
                <div class="ai-welcome-message">
                    <div class="ai-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
                            <path d="M8 14C8.91212 15.2144 10.3643 16 12 16C13.6357 16 15.0879 15.2144 16 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8.00897 9L8 9M16 9L15.991 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <h4>¡Hola! Soy tu asistente virtual</h4>
                    <p>Puedo ayudarte con configuraciones de email, aplicaciones compatibles, migración desde otros servicios, y mucho más. ¿En qué puedo asistirte hoy?</p>
                </div>

                <div class="ai-message assistant" style="display: none;">
                    <div class="ai-message-avatar">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
                            <path d="M8 13.5C8 13.5 8.9 15 12 15C15.1 15 16 13.5 16 13.5M15 9H15.01M9 9H9.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M18.9999 7.65802V4.00005C18.9999 3.07979 18.9999 2.61966 18.7808 2.27607C18.6341 2.04023 18.4191 1.8559 18.1654 1.74613C17.7815 1.57826 17.2831 1.67374 16.2861 1.86472C14.1779 2.2743 12.0014 2.49995 9.7777 2.49995C8.48374 2.49995 7.20803 2.42302 5.95335 2.27426C5.12766 2.18053 4.71481 2.13367 4.43449 2.3117C4.32352 2.38534 4.2265 2.47869 4.14823 2.58694C3.96784 2.86044 3.96786 3.27104 3.9679 4.09223L3.9681 12.5689C3.9681 13.8948 3.96811 14.5577 4.22988 15.0732C4.4589 15.5235 4.83103 15.8845 5.28827 16.0996C5.81069 16.3481 6.47546 16.3322 7.80499 16.3004C9.15663 16.2682 10.4708 16.0995 11.7362 15.8097C13.4202 15.4181 14.2621 15.2224 14.9018 15.5625C15.1478 15.6904 15.3694 15.8582 15.5576 16.0585C16.0001 16.5375 16.0001 17.2493 16 18.673L16 18.6735C16 20.1271 16 20.8539 16.4282 21.2552C16.5935 21.4082 16.7869 21.5287 16.9984 21.6106C17.5274 21.8213 18.1701 21.6382 19.4555 21.2722L19.4738 21.2672C20.4544 21.0012 20.9447 20.8682 21.2861 20.5661C21.4939 20.387 21.6596 20.1636 21.7713 19.9124C21.9999 19.4091 21.9999 18.8133 21.9999 17.6217V17.6214V12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="ai-message-content">
                        <div class="ai-typing-indicator" id="aiTypingIndicator">
                            <div class="ai-typing-dot"></div>
                            <div class="ai-typing-dot"></div>
                            <div class="ai-typing-dot"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="ai-chat-input-container">
                <div class="ai-chat-input-wrapper">
                    <textarea 
                        id="aiChatInput" 
                        class="ai-chat-input" 
                        placeholder="Escribe tu consulta aquí..." 
                        rows="1"
                    ></textarea>
                    <button id="aiSendButton" class="ai-send-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                            <path d="M20.3355 7.79109C21.8557 7.14887 21.8557 4.85113 20.3355 4.20891L4.20891 -3.48816e-07C2.85662 -0.576069 1.57607 0.704481 2.14845 2.05677L5.40071 9.48071C5.58045 9.91729 5.58045 10.4077 5.40071 10.8443L2.14845 18.2682C1.57607 19.6205 2.85662 20.9011 4.20891 20.325L20.3355 16.1161C21.8557 15.4739 21.8557 13.1761 20.3355 12.5339L8.27486 7.54944" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>

                <div class="ai-suggestions" id="aiSuggestions">
                    <div class="ai-suggestion-chip">¿Cómo configuro mi email en Outlook?</div>
                    <div class="ai-suggestion-chip">¿Qué apps móviles son compatibles?</div>
                    <div class="ai-suggestion-chip">¿Cómo migro desde Gmail?</div>
                    <div class="ai-suggestion-chip">¿Cuál es el límite de almacenamiento?</div>
                </div>
            </div>
        </div>
    `;
}

// Inicializar Chat IA
function initAIChat() {
    const chatInput = document.getElementById('aiChatInput');
    const sendButton = document.getElementById('aiSendButton');
    const chatMessages = document.getElementById('aiChatMessages');
    const suggestions = document.querySelectorAll('.ai-suggestion-chip');

    if (!chatInput || !sendButton) return;

    // Auto-resize textarea
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });

    // Enviar con Enter (Shift+Enter para nueva línea)
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Enviar con botón
    sendButton.addEventListener('click', sendMessage);

    // Sugerencias
    suggestions.forEach(chip => {
        chip.addEventListener('click', function() {
            chatInput.value = this.textContent;
            chatInput.focus();
            sendMessage();
        });
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Limpiar input
        chatInput.value = '';
        chatInput.style.height = 'auto';

        // Ocultar mensaje de bienvenida si existe
        const welcomeMessage = chatMessages.querySelector('.ai-welcome-message');
        if (welcomeMessage) {
            welcomeMessage.remove();
        }

        // Ocultar sugerencias después del primer mensaje
        const suggestionsContainer = document.getElementById('aiSuggestions');
        if (suggestionsContainer && suggestionsContainer.style.display !== 'none') {
            suggestionsContainer.style.display = 'none';
        }

        // Agregar mensaje del usuario
        addUserMessage(message);

        // Mostrar indicador de "escribiendo..."
        showTypingIndicator();

        // Enviar a la API
        sendToOpenAI(message);
    }

    function addUserMessage(text) {
        const messageHtml = `
            <div class="ai-message user">
                <div class="ai-message-avatar">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
                        <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" stroke-width="1.5"/>
                    </svg>
                </div>
                <div class="ai-message-content">
                    <div class="ai-message-bubble">${escapeHtml(text)}</div>
                    <div class="ai-message-time">${getCurrentTime()}</div>
                </div>
            </div>
        `;
        
        // Insertar antes del indicador de typing
        const typingMessage = chatMessages.querySelector('.ai-message.assistant[style*="display: none"]');
        if (typingMessage) {
            typingMessage.insertAdjacentHTML('beforebegin', messageHtml);
        } else {
            chatMessages.insertAdjacentHTML('beforeend', messageHtml);
        }
        
        scrollToBottom();
    }

    function addAssistantMessage(text) {
        const messageHtml = `
            <div class="ai-message assistant">
                <div class="ai-message-avatar">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
                        <path d="M8 13.5C8 13.5 8.9 15 12 15C15.1 15 16 13.5 16 13.5M15 9H15.01M9 9H9.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.9999 7.65802V4.00005C18.9999 3.07979 18.9999 2.61966 18.7808 2.27607C18.6341 2.04023 18.4191 1.8559 18.1654 1.74613C17.7815 1.57826 17.2831 1.67374 16.2861 1.86472C14.1779 2.2743 12.0014 2.49995 9.7777 2.49995C8.48374 2.49995 7.20803 2.42302 5.95335 2.27426C5.12766 2.18053 4.71481 2.13367 4.43449 2.3117C4.32352 2.38534 4.2265 2.47869 4.14823 2.58694C3.96784 2.86044 3.96786 3.27104 3.9679 4.09223L3.9681 12.5689C3.9681 13.8948 3.96811 14.5577 4.22988 15.0732C4.4589 15.5235 4.83103 15.8845 5.28827 16.0996C5.81069 16.3481 6.47546 16.3322 7.80499 16.3004C9.15663 16.2682 10.4708 16.0995 11.7362 15.8097C13.4202 15.4181 14.2621 15.2224 14.9018 15.5625C15.1478 15.6904 15.3694 15.8582 15.5576 16.0585C16.0001 16.5375 16.0001 17.2493 16 18.673L16 18.6735C16 20.1271 16 20.8539 16.4282 21.2552C16.5935 21.4082 16.7869 21.5287 16.9984 21.6106C17.5274 21.8213 18.1701 21.6382 19.4555 21.2722L19.4738 21.2672C20.4544 21.0012 20.9447 20.8682 21.2861 20.5661C21.4939 20.387 21.6596 20.1636 21.7713 19.9124C21.9999 19.4091 21.9999 18.8133 21.9999 17.6217V17.6214V12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="ai-message-content">
                    <div class="ai-message-bubble">${formatMessage(text)}</div>
                    <div class="ai-message-time">${getCurrentTime()}</div>
                </div>
            </div>
        `;
        
        // Insertar antes del indicador de typing
        const typingMessage = chatMessages.querySelector('.ai-message.assistant[style*="display: none"]');
        if (typingMessage) {
            typingMessage.insertAdjacentHTML('beforebegin', messageHtml);
        } else {
            chatMessages.insertAdjacentHTML('beforeend', messageHtml);
        }
        
        scrollToBottom();
    }

    function showTypingIndicator() {
        const typingIndicator = document.getElementById('aiTypingIndicator');
        const typingMessage = typingIndicator.closest('.ai-message');
        if (typingMessage) {
            typingMessage.style.display = 'flex';
        }
        if (typingIndicator) {
            typingIndicator.classList.add('active');
        }
        scrollToBottom();
    }

    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('aiTypingIndicator');
        const typingMessage = typingIndicator.closest('.ai-message');
        if (typingMessage) {
            typingMessage.style.display = 'none';
        }
        if (typingIndicator) {
            typingIndicator.classList.remove('active');
        }
    }

    async function sendToOpenAI(message) {
        try {
            const response = await fetch('api/endpoints/ai-chat.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message })
            });

            const data = await response.json();

            hideTypingIndicator();

            if (data.success && data.response) {
                addAssistantMessage(data.response);
            } else {
                addAssistantMessage('Lo siento, hubo un error al procesar tu consulta. Por favor, intenta nuevamente.');
                console.error('Error from API:', data.error || data.message);
            }
        } catch (error) {
            hideTypingIndicator();
            addAssistantMessage('Lo siento, no pude conectarme con el servidor. Por favor, verifica tu conexión e intenta nuevamente.');
            console.error('Error:', error);
        }
    }

    function scrollToBottom() {
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 100);
    }

    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function formatMessage(text) {
        // Convertir markdown básico a HTML
        let formatted = escapeHtml(text);
        
        // Negrita
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Cursiva
        formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Saltos de línea
        formatted = formatted.replace(/\n/g, '<br>');
        
        // Listas
        formatted = formatted.replace(/• (.*?)(<br>|$)/g, '• <span>$1</span>$2');
        
        return formatted;
    }
}

