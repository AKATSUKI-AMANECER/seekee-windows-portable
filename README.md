# Seekee Windows Portable

Una versión portable de una app tipo SEEKEE para Windows, como interfaz local de búsqueda e IA.

## Requisitos
- Windows 10 o 11
- Python 3

## Cómo usarla
1. Descarga este repositorio o extrae el ZIP.
2. Abre la carpeta.
3. Haz doble clic en `start.bat`.
4. La app se abrirá en tu navegador local.

## Si no funciona
Si el lanzador falla, abre una terminal dentro de la carpeta y ejecuta:

```bat
python server.py
```

O:

```bat
py server.py
```

Luego abre la URL que aparezca en la consola, normalmente:

```text
http://127.0.0.1:8000/
```

## Archivos principales
- `index.html` — interfaz principal
- `style.css` — estilos visuales
- `script.js` — comportamiento de búsqueda y asistente IA
- `server.py` — servidor local para Windows
- `start.bat` — lanzador para abrir la app

## Nota
Es un prototipo local, portable y funcional visualmente, sin conexión a un servicio de IA real ni contenido externo.
