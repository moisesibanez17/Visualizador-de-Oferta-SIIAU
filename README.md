# Visualizador de Oferta Académica SIIAU

Aplicación web en Flask para consultar la oferta académica del sistema SIIAU de la Universidad de Guadalajara. Scraping, filtrado y visualización de materias, horarios y disponibilidad de cupos.

## Características

- Búsqueda con filtros: ciclo, centro universitario, carrera, materia, horario, días, edificio/aula
- Resultados **agrupados por materia** — cada grupo desplegable muestra todas sus secciones
- Búsqueda instantánea sobre los resultados (filtra por cualquier campo)
- Badges de disponibilidad: verde (cupos), amarillo (pocos cupos), rojo (lleno)
- Paginación cliente (20 materias por página)
- Exportación a Excel (.xlsx)
- Diseño responsive, funciona en móvil

## Estructura

```
app.py              — Backend Flask (rutas, scraping, API)
requirements.txt    — Dependencias Python
Procfile            — Configuración para Render.com
runtime.txt         — Python 3.12
assets/             — Logos de los grupos (GB, GD, GI)
static/
  style.css         — Estilos globales
  results-extra.css — Estilos de resultados y acordeón
  script.js         — Lógica del formulario de búsqueda
  ICON.png          — Favicon
templates/
  index.html        — Formulario de búsqueda
  results.html      — Vista de resultados agrupados
```

## Instalación local

```bash
pip install -r requirements.txt
python app.py
# Abrir http://localhost:5000
```

## Variables de entorno

| Variable     | Descripción                        | Default                          |
|--------------|------------------------------------|----------------------------------|
| `SECRET_KEY` | Clave secreta para sesiones Flask  | `siiau-extractor-secret-key-2025`|
| `PORT`       | Puerto del servidor                | `5000`                           |

## Cookies SIIAU

El scraping requiere cookies de sesión activas del sistema SIIAU. Están definidas en el dict `COOKIES` en `app.py`. Si las búsquedas dejan de funcionar, actualiza las cookies con una sesión activa del navegador.

## Deploy en Render.com

1. Sube el repositorio a GitHub
2. En Render → New Web Service → conecta el repo
3. Render detecta Flask automáticamente; el `Procfile` define el comando de inicio
4. Agrega la variable de entorno `SECRET_KEY` con un valor seguro
5. Deploy

> El plan gratuito de Render se duerme tras 15 min de inactividad. La primera petición después puede tardar ~30 s en despertar.

## Tecnologías

- **Backend**: Flask, BeautifulSoup4, Pandas, Requests
- **Frontend**: HTML5, CSS3 (variables, grid, accordion), JavaScript vanilla
- **Iconos**: Font Awesome 6 · **Fuente**: Poppins (Google Fonts)
- **Export**: openpyxl

## Autor

Moises Ibañez — desarrollado para estudiantes de la UDG
