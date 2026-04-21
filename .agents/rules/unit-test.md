---
trigger: always_on
rule_id: unit-test-001
---

# 🧪 Unit Test: Nền tảng của chất lượng phần mềm

---

## 📐 1. Quy tắc F.I.R.S.T
- **Fast**: Test phải chạy dưới 100ms.
- **Independent**: Không phụ thuộc vào Database hay Network thật (Dùng Mock).
- **Repeatable**: Chạy ở máy DEV hay CI/CD đều ra cùng kết quả.
- **Self-Validating**: Chỉ có kết quả Pass hoặc Fail.
- **Timely**: Viết test trước hoặc song song với code.
- **Edge Case Coverage**: Mỗi User Story/Task phải có ít nhất 3 Edge Cases (Dữ liệu rỗng, dữ liệu cực đại, dữ liệu sai định dạng).

---

## 🏗️ 2. Cấu trúc AAA (Arrange - Act - Assert)

```javascript
describe('Hàm add()', () => {
  // 1. Success Case
  test('nên cộng hai số dương chính xác', () => {
    const result = add(1, 2);
    expect(result).toBe(3);
  });

  // 2. Edge Case: Dữ liệu rỗng (Null/Undefined)
  test('nên ném lỗi nếu tham số truyền vào bị thiếu', () => {
    expect(() => add()).toThrow('Tham số không hợp lệ');
  });

  // 3. Edge Case: Sai định dạng (String thay vì Number)
  test('nên ném lỗi nếu tham số không phải là số', () => {
    expect(() => add("1", 2)).toThrow('Tham số phải là số');
  });
});
```

---

## 🛠️ 3. Mocking & Stubbing
Nếu hàm của bạn gọi API bên ngoài, hãy dùng **Mocking** để giả lập kết quả trả về. Nếu thấy khó mock, có thể code của bạn đang quá phụ thuộc (Vi phạm SOLID-D).

---

## ✅ Agent Checklist (Bắt buộc cho DEV/TESTER)
- [ ] Test có thực sự cô lập không? (Có dùng DB/Network thật không?).
- [ ] Có bao phủ các Edge Cases (Null, Empty, Extreme values)?
- [ ] Tên hàm test có mô tả rõ "Expectation" không?
- [ ] Test có dễ đọc như tài liệu không?