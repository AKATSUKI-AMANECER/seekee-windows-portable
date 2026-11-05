import http.server
import socketserver
import webbrowser
import threading
import os

PORT = 8000
HOST = '127.0.0.1'
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)


def start_server():
    try:
        httpd = socketserver.TCPServer((HOST, PORT), Handler)
        print(f'La app está corriendo en http://{HOST}:{PORT}')
        webbrowser.open(f'http://{HOST}:{PORT}')
        httpd.serve_forever()
    except OSError:
        print(f'El puerto {PORT} está ocupado. Intentando usar el puerto 8001...')
        try:
            httpd = socketserver.TCPServer((HOST, 8001), Handler)
            print(f'La app está corriendo en http://{HOST}:8001')
            webbrowser.open(f'http://{HOST}:8001')
            httpd.serve_forever()
        except OSError:
            print('No se pudo iniciar el servidor local. Cierra otros programas usando el puerto 8000 y vuelve a intentarlo.')
            input('Pulsa Enter para salir...')


if __name__ == '__main__':
    os.chdir(DIRECTORY)
    start_server()
