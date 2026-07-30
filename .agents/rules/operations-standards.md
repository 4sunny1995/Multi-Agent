---
rule_id: OPS-STANDARDS-001
trigger: model_decision
description: Quy chuẩn Vận hành An toàn và Tự phục hồi (Safety, Backup, Resilience, Retry)
applies_to: [ALL]
version: "7.0-llm"
---

# 🛡️ Operations & Resilience Standards (OPS-001)

<identity>
Mục tiêu: Đảm bảo Agent vận hành an toàn tuyệt đối trên hệ thống của User và thiết kế hệ thống có khả năng tự phục hồi (Resilience).
</identity>

<activation>
Kích hoạt trong mọi thao tác file, lệnh terminal, hoặc thiết kế cơ chế xử lý lỗi hệ thống.
</activation>

<thinking_pattern>
1. Tôi đã `view_file` trước khi sửa chưa?
2. Lệnh này có tính chất hủy hoại (destructive) không? Nếu có -> Cần Backup.
3. Nếu hệ thống ngoại vi lỗi (HTTP 5xx), đã có cơ chế Retry/Fallback chưa?
4. Tôi có đang log dữ liệu nhạy cảm không?
</thinking_pattern>

<guidelines>
## 1. SAFE OPERATIONS (4 Luật Bất Biến)
- **LAW 1 (Read-First)**: `view_file` TRƯỚC khi edit. Không đọc = Không sửa.
- **LAW 2 (Replace-Preference)**: Ưu tiên `replace_file_content` thay vì `write_to_file` (Overwrite).
- **LAW 3 (Safety Warning)**: Giải thích cho User TRƯỚC khi chạy lệnh hủy hoại (`rm`, `reset`, `drop`).
- **LAW 4 (Auto-Backup)**: Khi sửa file lõi quan trọng, BẮT BUỘC gọi `run_command (cp file file.bak)` trước khi thực hiện thay đổi.

## 2. SYSTEM RESILIENCE (Tự phục hồi)
- **Mandatory Retry**: Khi gặp lỗi `HTTP 502, 503, 504` hoặc gRPC `UNAVAILABLE`, thực hiện retry tối đa **3 lần** với backoff delay.
- **Fallback Strategy**: Luôn có phương án dự phòng (Fallback) trả về cùng Schema dữ liệu để không làm hỏng chuỗi xử lý (Pipeline).
- **Graceful Degradation**: Không bao giờ hiển thị lỗi thô (Raw JSON/TraceID) cho người dùng cuối. Chuyển sang trạng thái "Bảo trì nhẹ" hoặc thông báo thân thiện.

## 3. TRACEABILITY & LOGGING
- **Trace ID**: Mọi yêu cầu và lỗi phải đi kèm `Trace_ID` để truy vết xuyên suốt.
- **Privacy Zero**: Tuyệt đối không log dữ liệu nhạy cảm (PII, API Keys, Passwords).
</guidelines>

<anti_patterns>
❌ Sửa file dựa trên ảo giác về line numbers (không `view_file` trước).
❌ Chạy `rm -rf` mà không có bước xác nhận hoặc giải thích.
❌ Hiển thị JSON Error thô cho người dùng.
❌ Bỏ qua cơ chế Backup trước khi thực hiện các thay đổi lớn.
</anti_patterns>

<checklist>
- [ ] Đã thực hiện `view_file` và tạo bản sao lưu (.bak) cho file quan trọng chưa?
- [ ] Cơ chế xử lý lỗi có bao gồm Retry và Fallback an toàn chưa?
- [ ] Log có đảm bảo sạch (không chứa PII) và có Trace ID chưa?
- [ ] Đã giải thích các lệnh có rủi ro cao cho User chưa?
</checklist>
