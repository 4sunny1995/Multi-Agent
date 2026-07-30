---
rule_id: SOLID-001
trigger: always_on
applies_to: [SA, DEV, LEADER]
version: "2.0-llm"
---

# 🛡️ SOLID Principles: 5 Nguyên tắc thiết kế hướng đối tượng

---

## 1. S - Single Responsibility (Đơn trách nhiệm)
> "Một lớp chỉ có một lý do để thay đổi."

```typescript
// ❌ BAD: Lớp User vừa chứa data vừa chứa logic lưu DB
class User {
  name: string;
  saveToDB() { ... }
}

// ✅ GOOD: Tách biệt trách nhiệm
class User { name: string; }
class UserRepository { save(user: User) { ... } }
```

---

## 2. O - Open/Closed (Đóng cho sửa đổi, Mở cho mở rộng)
> "Thêm tính năng mới mà không cần sửa code cũ."

```typescript
// ❌ BAD: Dùng if-else để check type (Sửa code cũ mỗi khi có loại mới)
function getArea(shape) {
  if (shape.type === 'circle') return ...;
  if (shape.type === 'square') return ...;
}

// ✅ GOOD: Dùng Polymorphism/Interface
interface Shape { getArea(): number; }
class Circle implements Shape { getArea() { ... } }
class Square implements Shape { getArea() { ... } }
```

---

## 3. L - Liskov Substitution (Thay thế Liskov)
> "Lớp con phải thay thế được lớp cha mà không làm hỏng logic."

**Quy tắc**: Không được ghi đè hàm của lớp cha mà làm thay đổi kỳ vọng về kết quả hoặc ném Exception không mong muốn.

---

## 4. I - Interface Segregation (Phân tách Interface)
> "Thà có nhiều interface nhỏ hơn là một interface lớn."

**Ví dụ**: Robot không cần hàm `eat()`, vậy đừng ép nó thực thi interface `IWorker` có chứa `eat()`. Hãy tách thành `IWorkable` và `IEatable`.

---

## 5. D - Dependency Inversion (Đảo ngược phụ thuộc)
> "Phụ thuộc vào Abstraction (Interface), không phụ thuộc vào Implementation."

```typescript
// ❌ BAD: Service gọi trực tiếp MySQL Class
class UserService {
  private db = new MySQLDatabase(); 
}

// ✅ GOOD: Service gọi qua Interface (Dễ dàng swap DB khác)
class UserService {
  constructor(private db: IDatabase) {} 
}
```

---

## ✅ Agent Checklist (Bắt buộc cho SA/LEADER)
- [ ] Có lớp "God Class" nào làm quá nhiều việc không? (Vi phạm S).
- [ ] Có chuỗi `if-else` kiểm tra loại đối tượng không? (Vi phạm O).
- [ ] Các thành phần cấp cao có đang gọi trực tiếp class cấp thấp không? (Vi phạm D).
