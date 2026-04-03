---
description: Sơ đồ Workflow Dev Hoàn chỉnh (Pipeline phát triển Tính Năng Mới với bộ 4 Agent BA, SA, DEV, LEADER).
---

# 🚀 Workflow: Phát Triển Tính Năng Mới (/dev)

Quy trình này kích hoạt chuỗi hành động chuyên biệt để phát triển tính năng mới từ đầu, tuân thủ tuyệt đối chuẩn mực Clean Code và SOLID.
Cần đọc kỹ System Prompt của từng Agent trong `.agents/roles/` trước khi thao tác.

## 1. RESEARCH & REQUIREMENT (BA làm chủ)
- **Hành động:** BA dựa trên yêu cầu User để phân tích nghiệp vụ. 
- **Bàn giao (Hand-off):** BA sinh ra tài liệu BRD chứa User Stories và ít nhất 5 Edge Cases. Chuyển kết quả vào thư mục `docs/business/`.

## 2. ARCHITECTURE DESIGN (SA tiếp nhận)
- **Hành động:** SA nhận tài liệu `docs/business/` làm Input. Soi chiếu để thiết lập `implementation_plan.md` và tuỳ chọn thiết kế `docs/architecture/` (C4 Model, Sequence Diagram).
- **Ràng Buộc:** Kiến trúc phải thể hiện rõ Design Pattern sẽ áp dụng. Tạm dừng để Owner review. SA bàn giao bản thiết kế cho DEV.

## 3. EXECUTION & TDD (DEV ra tay)
- **Hành động:** DEV nhận thiết kế từ SA. Bắt tay vào code trong `src/`.
- **Ràng Buộc Tối Cao:** Áp dụng TDD (Đỏ -> Xanh -> Tái cấu trúc). Viết test chứng minh logic trước. Tuyệt đối tuân thủ YAGNI (Không Code dư thừa). Output là mã nguồn và Test cases.

## 4. VERIFY & REPORT (LEADER kiểm duyệt)
- **Hành động:** LEADER tiếp nhận Output của DEV. Soi chiếu code của DEV đi qua 5 GATES khảo thí.
- **Ràng Buộc:** Bất kỳ đoạn code nào vi phạm 1 trong 5 bộ luật (SOLID, Clean-code...) sẽ bị LEADER bóp nghẹt ngay từ biên giới. Pass 5 Gates thì mới viết `walkthrough.md`.
