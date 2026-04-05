---
rule_id: CLEAN-CODE-001
trigger: always_on
applies_to: [DEV, LEADER, SA]
version: "2.0-llm"
---

# 📖 Clean Code: Quy tắc viết mã sạch (LLM-Optimized)

## ⚡ Quick Reference Card (Dán vào não LLM)

| Quy tắc | Giới hạn | Hành động vi phạm |
| :--- | :--- | :--- |
| Hàm | < 15 dòng | Tách sub-function ngay |
| File | < 200 dòng | Extract module mới |
| Tham số | ≤ 2 | Đóng gói vào Object |
| Naming | Mô tả mục đích | Đổi tên + Refactor |

---

## 1. NAMING LAWS (Luật đặt tên)

❌ `int d;` → ✅ `int daysSinceCreation;`
❌ `function handle(u)` → ✅ `function registerAdultUser(user)`
❌ `DataProcess` (class mơ hồ) → ✅ `UserRegistrationService`
❌ Magic numbers: `if (age > 18)` → ✅ `const ADULT_AGE = 18; if (age > ADULT_AGE)`

## 2. FUNCTION LAWS (Luật hàm)

- **Do One Thing**: Tên hàm phải là 1 động từ + 1 danh từ. Nếu cần giải thích thêm → vi phạm.
- **Guard Clause**: Return early thay vì lồng `if-else` sâu.
- **No Side Effects**: Hàm tên `get*` không được modify state.

```javascript
// ❌ BAD: 2 concerns + tên mơ hồ
function process(u) { if (u.age > 18) { db.save(u); email.send(u.email); } }

// ✅ GOOD: 1 concern each
function registerAdultUser(user) {
  if (!isAdult(user)) return;
  saveUserToDatabase(user);
  sendWelcomeEmail(user.email);
}
```

## 3. DEBT MANAGEMENT (Quản lý Nợ)

- Phát hiện Code Smell → Gắn `[TECH_DEBT: mô tả ngắn]` comment ngay.
- Dùng quick fix → PHẢI gắn tag và đặt deadline hoàn trả.
- Boy Scout Rule: Refactor 1 đoạn code cũ liên quan mỗi khi chạm vào file.

---

## ✅ LEADER Gate Checklist (Bắt buộc trước khi PASS)
- [ ] Có biến nào tên là `data`, `temp`, `x`, `obj` không? → **FAIL**
- [ ] Có hàm nào > 15 dòng không? → **FAIL**
- [ ] Có magic number hoặc hardcoded string không? → **FAIL**
- [ ] Code self-documenting không cần comment không? → **Must be YES**