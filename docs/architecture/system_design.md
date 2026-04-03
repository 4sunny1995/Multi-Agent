# System Architecture & Design Patterns

## 1. Technology Stack
- **Backend:** Node.js (Express, TypeScript), TypeORM
- **Frontend:** Vue 3, Vite, Tailwind CSS, Pinia
- **Database:** MySQL
- **Infrastructure:** Docker Compose

## 2. Architecture: Clean Architecture & SOLID
Hệ thống sẽ được xây dựng dựa trên nguyên tắc Separation of Concerns (SoC) và nỗ lực tuân theo Clean Architecture:
- `Controllers`: Quản lý Request/Response.
- `Services`: Quản lý Business Logic (Nghiệp vụ).
- `Repositories`: Quản lý giao tiếp Database theo Interface.

## 3. Design Patterns Applied
1. **Repository Pattern (Nhóm Cấu trúc/Creational gián tiếp):** 
   - Tách biệt Data Access Layer và Business Logic. Các Services không trực tiếp thực thi SQL mà qua các `UserRepository`, `RoleRepository` interfaces nhằm đảm bảo tính Dependency Inversion (Chữ D trong SOLID).
2. **Strategy Pattern (Nhóm Hành vi):** 
   - Sử dụng cho việc xác thực (Authentication). Dễ dàng chuyển từ JWT Strategy, Local Auth Strategy sang SSO Strategy sau này nếu cần.
3. **Dependency Injection (DI):** (Mở rộng từ SOLID)
   - Bơm (Inject) các Repository vào trong Service qua Constructor. Tăng tính dễ test (Unit Test / Mocking).
4. **Middleware Pattern:**
   - Authorization chặn ở cấp độ Route. `RequirePermission('create_user')` middleware đóng vai trò Guard trước khi Request chạm đến Controller.

## 4. API & Database Schema
**Database Schema:**
- `users`: id, username, password_hash, role_id, token_version
- `roles`: id, name
- `permissions`: id, name
- `role_permissions`: role_id, permission_id

**API Structure:**
- `POST /api/auth/login`
- `GET /api/users` (Requires 'read_user')
- `POST /api/users` (Requires 'create_user')
- `GET /api/roles` (Requires 'read_role')
