const AMIGOS = {
    "alejo": { pass: "aura", secreto: "Bienvenido al mejor portafolio de ética" },
    "juandiemonda": { pass: "isabella", secreto: "compañero de cuarto, te gusta la verga y voy a revelar tus archivos 👹" },
    "lupita": { pass: "valeria", secreto: "Bro todos sabemos que te gusta Valeria" },
    "gonzalejo": { pass: "alfaro", secreto: "Valery te metio cule cachera 👹" },
    "gabito": { pass: "sonia", secreto: "no voy a ponerte secreto gabito" },
    "jcvegaq": { pass: "camila", secreto: "Te le declaraste a Jire" },
    "meloski": { pass: "mmejiag", secreto: "Dices que hay peladas boff aunque tengas novia rata" },
    "juanvargasb": { pass: "bedoya", secreto: "Compañero de cuarto, yo se que quieres volver con Marianita" }
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
            card.className = 'card'; // Aquí recuperamos el estilo premium
            card.style.animationDelay = `${index * 0.1}s`;
            
            // Lógica para las etiquetas de términos
            const tagsHtml = item.terminos 
                ? item.terminos.split(',').map(t => `<span class="tag">${t.trim()}</span>`).join('') 
                : '';

            card.innerHTML = `
                <span class="date-tag">${item.fecha}</span>
                <h3>${item.tema}</h3>
                
                <p><strong>Meta:</strong> ${item.objetivo}</p>
                
                <span class="section-label">Análisis Académico</span>
                <p><em>${item.reconstruccion}</em></p>
                
                <span class="section-label">Reflexión Personal</span>
                <p style="color:#fff;">"${item.queAprendi}"</p>
                
                <div class="tag-cloud">
                    ${tagsHtml}
                </div>

                <span class="section-label">Solidaridad y Justicia</span>
                <p style="font-size:0.85rem; border-left:2px solid var(--accent); padding-left:12px; margin-top:10px; color: var(--text-dim);">
                    ${item.impactoSocial}
                </p>
            `;
            container.appendChild(card);
        });
    } catch (e) { 
        container.innerHTML = '<p style="text-align:center; width:100%;">Error de conexión con la bitácora.</p>'; 
    }
}