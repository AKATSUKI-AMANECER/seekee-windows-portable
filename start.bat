@echo off
cd /d "%~dp0"
where py >nul 2>nul
if not errorlevel 1 (
  py server.py
) else (
  where python >nul 2>nul
  if not errorlevel 1 (
    python server.py
  ) else (
    echo Python no está instalado o no se encontró en el PATH.
    echo Instala Python 3 e intenta de nuevo.
    pause
  )
)
