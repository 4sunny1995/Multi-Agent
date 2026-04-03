#!/bin/bash

# ==============================================================================
# SCRIPT KHỞI TẠO CẤU TRÚC THƯ MỤC DỰ ÁN (INITIALIZATION SCRIPT)
# Mục đích: Xây dựng bộ khung xương sống (src, docs/business, docs/architecture).
# Mức độ an toàn: Tuyệt đối. Cờ `-p` đảm bảo sẽ KHÔNG ghi đè, xóa hoặc làm 
# mất dữ liệu nếu các thư mục này đã tồn tại trước đó.
# ==============================================================================

echo "⏳ Đang tiến hành thiết lập không gian làm việc..."

# Cố gắng tạo thư mục và kiểm tra kết quả ngay lập tức
if mkdir -p src docs/original/business docs/original/architecture docs/original/budget; then
    echo "✅ Hoàn tất! Cấu trúc thư mục nền tảng đã sẵn sàng."
else
    # Khu vực xử lý ngoại lệ (Exception Handling)
    ERROR_FILE="XU_LY_LOI_INIT.md"
    
    echo "❌ Lệnh thất bại! Đang tạo file hướng dẫn sửa chữa tại $ERROR_FILE..."
    
    # Sinh file hướng dẫn trực tiếp bằng echo
    cat << 'EOF' > "$ERROR_FILE"
# ⚠️ HƯỚNG DẪN KHẮC PHỤC LỖI TẠO THƯ MỤC

Hệ thống đã gặp sự cố khi chạy lệnh `sh init.sh`. Bạn đừng lo lắng, mã nguồn của bạn hoàn toàn an toàn. Dưới đây là 2 nguyên nhân phổ biến và cách giải quyết:

### Nguyên nhân 1: Xung đột cấu trúc (Conflict)
- **Triệu chứng:** Trong thư mục hiện tại của bạn đã có một **Tệp (File)** tên là `src` hoặc `docs`. Hệ thống không thể tạo Thư mục đè lên Tệp.
- **Cách sửa:** Đổi tên hoặc xóa các File đang bị trùng tên với thư mục cần tạo.

### Nguyên nhân 2: Lỗi phân quyền (Permission Denied)
- **Triệu chứng:** Tài khoản User hiện tại không có quyền ghi dữ liệu vào vị trí này.
- **Cách sửa:** Khởi chạy lại lệnh bằng quyền quản trị. Gõ vào terminal: `sudo sh init.sh` hoặc cấp quyền cho thư mục hiện tại: `sudo chmod -R 775 .`

*Vui lòng xóa file hướng dẫn này sau khi bạn đã khắc phục xong sự cố!*
EOF

    echo "⚠️ Yêu cầu: Hãy mở file $ERROR_FILE để xem cách giải quyết."
    exit 1
fi
