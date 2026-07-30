---
rule_id: SWE-001
trigger: model_decision
description: Chuẩn Kỹ nghệ Phần mềm Tích hợp (Clean Code, SOLID, TDD, Patterns)
applies_to: [SA, DEV, TESTER, LEADER]
version: "7.0-llm"
---

# 🛠️ Software Engineering Standards (SWE-001)

<identity>
Quy chuẩn Engineering hợp nhất. Nguyên tắc tối cao: "Đọc dễ hơn Viết, Sửa dễ hơn Thêm."
</identity>

<activation>
Trình LLM sẽ kích hoạt khi review kiến trúc (SA), viết code (DEV) hoặc duyệt pull request (LEADER).
</activation>

<thinking_pattern>
1. Code này có vi phạm Nguyên lý Đơn trách nhiệm (SRP) không?
2. Hàm này dài hơn 15 dòng hoặc có quá 2 tham số không?
3. Thiết kế có đang mang tính chống cháy (Hardcoded, Magic Numbers) không?
4. Test đã bao phủ các Edge Cases chưa?
</thinking_pattern>

<guidelines>
## 1. THE MINIMALIST MINDSET (KISS & YAGNI)
- **KISS (Keep It Simple, Stupid)**: Giải pháp đơn giản nhất luôn là tốt nhất. Không lạm dụng Design Pattern nếu một hàm thuần túy có thể giải quyết tốt.
- **YAGNI (You Ain't Gonna Need It)**: Không code trước cho "tương lai". Chỉ code đúng nghiệp vụ hiện tại.

## 2. SOLID PRINCIPLES
- **S (Single Responsibility)**: Mỗi Lớp/Module chỉ có 1 lý do để thay đổi.
- **O (Open/Closed)**: Thêm tính năng = Thêm class/file mới, HẠN CHẾ tối đa sửa file cũ.
- **L (Liskov Substitution)**: Lớp con không được phá vỡ kỳ vọng của lớp cha.
- **I (Interface Segregation)**: Không gom "Rác" vào Interface. Tách thành nhiều Interface nhỏ đặc thù.
- **D (Dependency Inversion)**: Module cấp cao gọi module cấp thấp qua Interface/Abstraction.

## 3. CLEAN CODE METRICS
- **Luật Tên**: Khai báo rõ ràng mục đích (`daysSinceCreation` thay vì `d`). Không dùng `data`, `temp`, `obj`.
- **Luật Hàm**: `< 15 dòng`, `≤ 2 parameters`. 1 Động từ + 1 Danh từ, làm đúng 1 việc. Dùng **Guard Clauses** (Return early) thay vì lồng `if-else` quá 3 cấp.
- **Side Effects**: Hàm `get*` tuyệt đối không được mutate external state.

## 4. QUY CHUẨN KIỂM THỬ (TDD & F.I.R.S.T)
- **TDD Flow**: RED (viết test fail) → GREEN (viết code vừa đủ) → REFACTOR (làm sạch).
- **F.I.R.S.T**: Fast (<100ms), Independent (Mocking), Repeatable, Self-Validating, Timely.
- **Cấu trúc AAA**: Arrange (Chuẩn bị) - Act (Thực thi) - Assert (Kiểm chứng).
- **Edge Cases**: Mỗi tính năng phải có ≥ 3 kịch bản biên (Null, Empty, Extreme value).

## 5. REFACTORING & TECHNICAL DEBT
- **Boy Scout Rule**: Luôn để lại file sạch sẽ hơn lúc bạn nhận lấy nó.
- **Gắn Tag Nợ**: Phát hiện mùi code bẩn → Đánh tag `[TECH_DEBT: lý do]`.
</guidelines>

<anti_patterns>
❌ Viết hàm God Function (> 50 dòng, xử lý cả UI lẫn DB).
❌ Dùng chuỗi `if-else` dài thay vì dùng Strategy/Đa hình.
❌ Đặt tên biến vô nghĩa (`data`, `res`, `flag`).
❌ Viết code trước khi có test hoặc bỏ qua Edge Cases.
</anti_patterns>

<checklist>
- [ ] Code có tự giải thích (self-documenting) mà không cần comment dài dòng?
- [ ] Hàm có vi phạm độ sâu `if-else` > 3 levels hoặc dài > 15 dòng?
- [ ] Đã kiểm tra và loại bỏ hoàn toàn Hardcoded/Magic Number chưa?
- [ ] Test đã cô lập hoàn toàn (Mocking DB/Network) và bao phủ Edge Cases chưa?
</checklist>
