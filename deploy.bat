@echo off
echo ========================================
echo   TIN HOC 12 - DEPLOY TO GITHUB
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git chua duoc cai dat!
    echo Vui long tai Git tai: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [1/5] Checking Git status...
git status

echo.
echo [2/5] Adding all files...
git add .

echo.
set /p commit_message="Nhap commit message (Enter de dung mac dinh): "
if "%commit_message%"=="" set commit_message=Update website

echo [3/5] Committing changes...
git commit -m "%commit_message%"

echo.
echo [4/5] Pushing to GitHub...
git push origin main

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Push that bai!
    echo.
    echo Neu day la lan dau tien, chay cac lenh sau:
    echo   git remote add origin https://github.com/NguyenTaiPhat/tinhoc12.git
    echo   git branch -M main
    echo   git push -u origin main
    echo.
    echo Thay USERNAME va REPO bang thong tin cua ban.
    pause
    exit /b 1
)

echo.
echo [5/5] THANH CONG!
echo ========================================
echo Website da duoc cap nhat tren GitHub!
echo Doi 1-2 phut de GitHub Pages build.
echo ========================================
echo.

pause
