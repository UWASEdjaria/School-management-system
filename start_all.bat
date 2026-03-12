@echo off
echo Starting School Management System Portals...

:: Start Client Portal on Port 3000
start "Client Portal" cmd /c "cd client-app\frontend && npm run dev"

:: Start Admin Portal on Port 3001
start "Admin Portal" cmd /c "cd admin-app\frontend && npm run dev"

echo.
echo Both portals are starting!
echo Client Portal: http://localhost:3000
echo Admin Portal: http://localhost:3001
echo Landing Page: http://localhost/school-management-system/
echo.
pause
