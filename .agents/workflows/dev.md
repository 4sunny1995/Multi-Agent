---
description: Sơ đồ Workflow Dev Hoàn chỉnh (Pipeline phát triển Tính Năng Mới với bộ 4 Agent BA, SA, DEV, LEADER).
---

# 🚀 Workflow: Phát Triển Tính Năng Mới (/dev)

Quy trình này kích hoạt chuỗi hành động chuyên biệt để phát triển tính năng mới từ đầu, tuân thủ tuyệt đối chuẩn mực Clean Code và SOLID.

## 1. RESEARCH (Đóng vai BA)
- **Hành động:** Phân tích logic nghiệp vụ được yêu cầu. Phải sinh ra ít nhất **5 Edge Cases (Trường hợp biên)** trước khi code. Đầu ra lưu vào `docs/business`.

## 2. PLAN (Đóng vai SA)
- **Hành động:** Thiết lập file `implementation_plan.md` và tuỳ chọn lưu Design vào `docs/architecture`. 
- **Ràng Buộc:** Kiến trúc phải thể hiện rõ Design Pattern sẽ áp dụng. Tạm dừng để Owner review.

## 3. EXECUTE (Đóng vai DEV)
- **Hành động:** Bắt tay vào code trong `src/`. 
- **Ràng Buộc Tối Cao:** Áp dụng TDD (Test-Driven Development). Viết test trước. Tuyệt đối tuân thủ YAGNI (Không Code dư thừa).

## 4. VERIFY & REPORT (Đóng vai LEADER)
- **Hành động:** Đối chiếu code của DEV với hệ thống Rules hiện hành (`leader.md` và các rules của hệ thống).
- Áp dụng các vòng kiểm duyệt gắt gao. Báo cáo thông qua `walkthrough.md`.

## 🛡️ Tối Cao: Ràng Buộc Luật Lệ (Core Rule Constraints)
Xuyên suốt 5 giai đoạn trên, các Agent **BẮT BUỘC TUÂN THỦ TUYỆT ĐỐI** hệ thống System Rules. Bất kỳ đoạn code nào vi phạm 1 trong 5 bộ luật (SOLID, Clean-code...) trên đều sẽ bị LEADER bóp nghẹt ngay từ trong vòng gửi xe.
