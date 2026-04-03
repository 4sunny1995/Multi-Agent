@echo off
:: Set UTF-8 encoding for Vietnamese characters
chcp 65001 >nul

:: ==============================================================================
:: INITIALIZATION SCRIPT CHO WINDOWS (BATCH FILE)
:: Mục đích: Xây dựng bộ khung xương sống cho dự án.
:: Mức độ an toàn: Kiểm tra sự tồn tại (if not exist) trước khi tạo để tránh ghi đè.
:: ==============================================================================

echo ⏳ Dang tien hanh thiet lap khong gian lam viec (Dung cho Windows)...

:: Tạo thư mục an toàn
if not exist "src" mkdir "src"
if not exist "docs\orgingin\business" mkdir "docs\orgingin\business"
if not exist "docs\orgingin\architecture" mkdir "docs\orgingin\architecture"


:: Do Windows hiếm khi bị lỗi permission denied ở thư mục root dự án như Linux
:: Nên việc bắt lỗi ở đây được đơn giản hoá
echo ✅ Hoan tat! Cau truc thu muc nen tang da san sang.
echo Nhan phim bat ky de thoat...
pause >nul
