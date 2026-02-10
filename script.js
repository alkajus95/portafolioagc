const API_URL = 'https://68c20740f9928dbf33ed3483.mockapi.io/cx8/etica';

async function cargarContenido() {
    const container = document.getElementById('cards-container');
    
    try {
        const respuesta = await fetch(API_URL);
        const reflexiones = await respuesta.json();
        
        container.innerHTML = ''; 

        reflexiones.reverse().forEach((item, index) => {
            const card = document.createElement('article');
            // Añadimos la clase card-reveal para la animación de entrada
            card.className = 'card card-reveal';
            // Delay escalonado para que aparezcan una tras otra
            card.style.animationDelay = `${index * 0.1}s`;
            
            const listaTags = item.terminos.split(',').map(t => `<span class="tag">${t.trim()}</span>`).join('');

            card.innerHTML = `
                <span class="date-tag">${item.fecha}</span>
                <h3>${item.tema}</h3>
                <p><strong>Meta:</strong> ${item.objetivo}</p>
                
                <span class="section-label">Análisis</span>
                <p><em>${item.reconstruccion}</em></p>
                
                <span class="section-label">Mi Reflexión</span>
                <p style="color: #fff;">"${item.queAprendi}"</p>
                
                <div class="tag-cloud">${listaTags}</div>

                <span class="section-label">Compromiso Social</span>
                <p style="font-size: 0.85rem; border-left: 2px solid var(--accent); padding-left: 12px; margin-top: 10px;">${item.impactoSocial}</p>
            `;
            container.appendChild(card);
        });
    } catch (err) {
        container.innerHTML = `<p style="text-align:center; width:100%;">Error al conectar con el servidor.</p>`;
    }
}

document.addEventListener('DOMContentLoaded', cargarContenido);