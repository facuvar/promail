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

    // Inicializar dashboard
    initDashboard();
});

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

