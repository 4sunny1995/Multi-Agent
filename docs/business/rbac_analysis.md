# Business Analysis: User Management & RBAC System

## 1. Objective
Design and implement a scalable and secure User Management and Authorization system (RBAC) accommodating:
- Authentication (Login)
- Scalable RBAC Model (User -> Role -> Permission)

## 2. Core Entities
- **User**: Represents individuals accessing the system.
- **Role**: Groups of permissions. A user is assigned a single or multiple roles (we will keep it 1-to-M for simplicity, User belongs to Role).
- **Permission**: The atomic level of access rights (e.g., `create_user`, `delete_role`).

## 3. 5 Edge Cases (Trường hợp biên)
1. **Orphaned Users (Xóa Role đang có User):** Quản trị viên xóa một Role nhưng Role đó vẫn đang được gán cho một hoặc nhiều User. 
   *Giải pháp:* Chặn thao tác xóa Role nếu vẫn còn User, hoặc tự động chuyển User sang Role mặc định (Fallback).
2. **Zero Admin Lockout (Khoá chặn Super Admin):** Chỉ còn 1 người dùng duy nhất đóng vai trò Super Admin nhưng người này bị thay đổi quyền (Downgrade) hoặc xóa.
   *Giải pháp:* Thêm logic kiểm tra (Validation): Không cho phép xóa/downgrade nếu đó là Super Admin cuối cùng đang hoạt động.
3. **Concurrent Auth Mismatch (Bất đồng bộ phiên làm việc theo thời gian thực):** User vừa đăng nhập và được cấp JWT Token với quyền "User". Tuy nhiên 1 giây sau Admin nâng cấp họ lên "Manager". 
   *Giải pháp:* Sử dụng `token_version` trong bảng User. Bất cứ khi nào cập nhật Role, tăng `token_version` để các Token cũ (có claim version cũ) trở nên vô hiệu.
4. **Circular/Conflict Permissions (Trùng lặp & Xung đột Quyền):** Khi thêm mới một Permission trùng lặp bằng ID động thay vì chuỗi Enum.
   *Giải pháp:* Chuẩn hóa (Normalize) tên permission dưới dạng chữ thường không dấu (snake_case) với unique index.
5. **No Role Provided on Register (Không truyền Role khi tạo mới):** Đăng ký tự do qua API không có Role. 
   *Giải pháp:* Tự động gán Role "Guest" hoặc "Standard User" có ít đặc quyền nhất bằng hệ thống Factory Method.
