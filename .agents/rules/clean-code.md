---
trigger: always_on
rule_id: clean-code-001
---

# 📖 Clean Code Handbook: Quy tắc viết mã sạch

Mục tiêu: Mã nguồn phải **dễ đọc, dễ hiểu và dễ bảo trì**.

---

## 🚀 1. Đặt tên có ý nghĩa (Meaningful Names)

| Tiêu chí | Bad (❌) | Good (✅) |
| :--- | :--- | :--- |
| **Rõ ràng** | `int d;` | `int daysSinceCreation;` |
| **Phát âm được** | `fName`, `genymdhms` | `firstName`, `generationTimestamp` |
| **Class** | `DataProcess` (Mơ hồ) | `UserRegistrationService` |
| **Method** | `input()` | `saveUserDetails()` |

---

## 🛠️ 2. Quy tắc về Hàm (Functions)

- **Nguyên tắc "Do One Thing"**: Một hàm chỉ làm 1 việc duy nhất.
- **Kích thước Hàm**: < 15 dòng code. Nếu quá 15 dòng, PHẢI tách hàm (Sub-function).
- **Kích thước File**: < 200 dòng code. Nếu quá, PHẢI tách module.
- **Tham số**: Lý tưởng là 0, tối đa 2. Nếu > 2, hãy đóng gói vào Object.

```javascript
// ❌ BAD: Làm quá nhiều việc, đặt tên mơ hồ
function handle(u) {
  if (u.age > 18) {
    db.save(u);
    email.send(u.email, "Welcome");
  }
}

// ✅ GOOD: Tách biệt logic và đặt tên rõ ràng
function registerAdultUser(user) {
  if (!isAdult(user)) return;
  saveUserToDatabase(user);
  sendWelcomeEmail(user.email);
}
```

---

## 🧼 3. Quy tắc Hướng đạo sinh (Boy Scout Rule)
> "Hãy luôn để lại bãi trại sạch hơn lúc bạn mới đến."

Trước khi kết thúc task, hãy kiểm tra code cũ xung quanh và refactor nếu thấy:
- Biến đặt tên chưa chuẩn.
- Hàm quá dài.
- Code lặp lại (DRY).

---

## 🛡️ 4. Quản lý Nợ kỹ thuật (Debt Management)
- **Không để dành**: Nếu phát hiện Nợ kỹ thuật (Code Smells), hãy Refactor ngay trong Phase của DEV. Đừng đợi đến khi LEADER bắt lỗi.
- **Ghi chú rủi ro**: Nếu buộc phải dùng một giải pháp "nhanh nhưng bẩn" do limit của Tool, PHẢI ghi rõ vào `Defensive Documentation`.

---

## ✅ Agent Checklist (Bắt buộc cho LEADER)
- [ ] Tên biến có tiết lộ mục đích không?
- [ ] Có hàm nào dài quá 15 dòng không?
- [ ] Có "Magic Numbers" hay "Hard-coded Strings" không? (Phải đưa vào Constant/Config).
- [ ] Code có dễ đọc như một câu chuyện không?