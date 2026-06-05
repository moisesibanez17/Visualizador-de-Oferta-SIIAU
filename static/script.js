const searchForm = document.getElementById('searchForm');
const clearBtn = document.getElementById('clearBtn');
const loading = document.getElementById('loading');

searchForm.addEventListener('submit', handleSearch);
clearBtn.addEventListener('click', handleClear);

async function handleSearch(e) {
    e.preventDefault();

    const formData = new FormData(searchForm);
    const data = {
        ciclo: formData.get('ciclo'),
        centro: formData.get('centro'),
        carrera: formData.get('carrera') || '',
        materia: formData.get('materia') || '',
        hora_inicio: formData.get('hora_inicio') || '',
        hora_fin: formData.get('hora_fin') || '',
        edificio: formData.get('edificio') || '',
        aula: formData.get('aula') || '',
        orden: formData.get('orden'),
        mostrar: formData.get('mostrar'),
        solo_disponibles: formData.get('solo_disponibles') === 'on',
        dias: formData.getAll('dias')
    };

    if (!data.centro) {
        showNotification('Por favor selecciona un Centro Universitario', 'error');
        return;
    }

    const submitBtn = searchForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Buscando...';
    loading.style.display = 'block';

    try {
        const response = await fetch('/api/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Error en la búsqueda');
        }

        if (result.redirect) {
            window.location.href = result.redirect;
        }

    } catch (error) {
        console.error('Error:', error);
        showNotification(`Error: ${error.message}`, 'error');
        loading.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-search"></i> Buscar';
    }
}

function handleClear() {
    searchForm.reset();
    showNotification('Formulario limpiado', 'success');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border-radius: 12px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: white;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                z-index: 1000;
                animation: slideInRight 0.3s ease;
                max-width: 400px;
            }
            .notification-error { border-left: 4px solid #ef4444; }
            .notification-success { border-left: 4px solid #10b981; }
            .notification-info { border-left: 4px solid #3b82f6; }
            @keyframes slideInRight {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(400px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

const horaInicio = document.getElementById('hora_inicio');
const horaFin = document.getElementById('hora_fin');

[horaInicio, horaFin].forEach(input => {
    input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
    });
});
