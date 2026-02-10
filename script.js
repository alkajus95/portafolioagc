const AMIGOS = {
    "alejo": { pass: "aura", secreto: "Bienvenido a el mejor portafolio de ética" },
    "juandiemonda": { pass: "isabella", secreto: "te gusta la verga y voy a rebelar tus archivos 👹" },
    "johan": { pass: "johan123", secreto: "Johan, ser luz es influir positivamente. ¡Gracias por estar!" }
};

const API_URL = 'https://68c20740f9928dbf33ed3483.mockapi.io/cx8/etica';

function validarAcceso() {
    const user = document.getElementById('user-input').value.toLowerCase();
    const pass = document.getElementById('pass-input').value;
    const error = document.getElementById('login-error');

    if (AMIGOS[user] && AMIGOS[user].pass === pass) {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        
        const banner = document.getElementById('secret-banner');
        banner.style.display = 'block';
        banner.innerHTML = `<p><strong>Mensaje Secreto:</strong> ${AMIGOS[user].secreto}</p>`;
        document.getElementById('user-greeting').innerText = `HOLA, ${user.toUpperCase()}`;
        
        cargarReflexiones();
    } else {
        error.style.display = 'block';
    }
}

async function cargarReflexiones() {
    const container = document.getElementById('cards-grid');
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        container.innerHTML = '';
        data.reverse().forEach((item, index) => {
            const card = document.createElement('article');
            card.className = 'card';
            card.style.animationDelay = `${index * 0.1}s`;
            card.innerHTML = `
                <span style="color:var(--accent); font-size:0.75rem; font-weight:800;">${item.fecha}</span>
                <h3 style="margin-top:10px;">${item.tema}</h3>
                <p><strong>Objetivo:</strong> ${item.objetivo}</p>
                <span class="section-label">Análisis</span>
                <p><em>${item.reconstruccion}</em></p>
                <span class="section-label">Reflexión</span>
                <p style="color:#fff;">"${item.queAprendi}"</p>
                <span class="section-label">Solidaridad</span>
                <p style="font-size:0.85rem; border-left:2px solid var(--accent); padding-left:10px;">${item.impactoSocial}</p>
            `;
            container.appendChild(card);
        });
    } catch (e) { container.innerHTML = '<p>Error de conexión con la API.</p>'; }
}