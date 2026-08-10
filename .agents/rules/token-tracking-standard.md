---
trigger: always_on
---

# 📊 Token & Agent Interaction Tracking Standard (TTS-001)

<identity>
Tôi là quy chuẩn theo dõi & quản lý hiệu năng Token tiêu thụ và lịch sử tương tác Agent trong hệ sinh thái Antigravity Multi-Agent.
Mục tiêu: Đảm bảo mọi giao tiếp và thực thi workflow đều ghi nhận minh bạch lượng token đã tiêu tốn, tần suất tương tác của từng tác nhân AI, và chi tiết phân bổ token qua từng bước.
</identity>

<activation>
Luôn kích hoạt khi bất kỳ Agent hoặc Workflow nào (`/dev`, `/analyse`, `/design`, `/report`, `/fix`, `/enterprise-dev`,...) được khởi động.
</activation>

<mission>
Ghi nhận đầy đủ chỉ số tương tác và tiêu thụ token của từng phiên làm việc, bao gồm:
1. Danh sách tất cả các Agent/Roles đã tham gia trong cuộc trò chuyện.
2. Tổng số lượt giao tiếp (Interaction Turn Count).
3. Chi tiết lượng Token (Prompt Tokens, Completion Tokens, Total Tokens) đã sử dụng trong từng lượt giao tiếp.
4. Tổng lượng Token lũy kế của toàn bộ cuộc trò chuyện.
</mission>

<guidelines>
- **Automatic Tracking**: Cuối mỗi lượt làm việc (Turn) hoặc khi hoàn thành một Workflow/Bàn giao (Handoff), Agent có trách nhiệm ghi nhận các chỉ số tương tác và sử dụng token.
- **Role Identification**: Phải xác định rõ vai trò Agent tham gia giao tiếp (BA, SA, DEV, TESTER, LEADER, TECH_WRITER, SECURITY,...).
- **Metric Persistence**: Chỉ số theo dõi được lưu vết tại `.agents/metrics/token_metrics.json` và cập nhật vào báo cáo `walkthrough.md`.
- **Token Estimation Formula**:
  - Tiếng Anh / Code: ~ 1 Token = 4 ký tự (hoặc ~0.75 từ).
  - Tiếng Việt (Unicode): ~ 1 Token = 1.5 đến 2 ký tự.
  - Sử dụng thông tin chính xác từ API Metadata khi có sẵn.
</guidelines>

<output_format>
Mọi báo cáo kết quả làm việc hoặc tổng kết Workflow phải đính kèm Bảng Thống Kế Tương Tác chuẩn TTS-001:

```markdown
### 📊 Thống Kế Tương Tác Agent & Token Usage (TTS-001)

- **Phiên làm việc (Session ID)**: `{session_id}`
- **Tổng số lượt giao tiếp**: `{total_turns}` lượt
- **Các Agent đã tham gia**: `{agent_list}`

| Lượt (#) | Agent Role | Hành động / Tác vụ chính | Input Tokens | Output Tokens | Total Tokens | Thời gian |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Turn 1 | BA Agent | Phân tích yêu cầu & tạo BRD Draft | 1,250 | 850 | 2,100 | HH:MM:SS |
| Turn 2 | SA Agent | Thiết kế kiến trúc & API Contract | 2,100 | 1,400 | 3,500 | HH:MM:SS |
| Turn 3 | LEADER | Review & Phê duyệt tài liệu | 950 | 450 | 1,400 | HH:MM:SS |
| **TỔNG BỘ**| **3 Agents** | **3 Turns** | **4,300** | **2,700** | **7,000** | -- |
```
</output_format>

<anti_patterns>
❌ Hoàn thành Workflow/Task mà không ghi nhận số lượt giao tiếp và lượng token đã dùng.
❌ Gộp chung lượng token mà không phân tách chi tiết theo từng Agent tham gia.
❌ Tự ý xóa hoặc ghi đè file lịch sử metrics `.agents/metrics/token_metrics.json`.
</anti_patterns>

<checklist>
- [ ] Đã xác định danh sách các Agent đã tham gia trong cuộc trò chuyện chưa?
- [ ] Đã đếm chính xác số lượt giao tiếp (Turn count) chưa?
- [ ] Đã tính toán lượng token cho từng lượt và tổng lũy kế chưa?
- [ ] Đã lưu vết chỉ số vào `.agents/metrics/` và đính kèm vào báo cáo chưa?
</checklist>

---
> [!IMPORTANT]
> **"Tối ưu hóa tài nguyên bắt đầu từ việc đo lường minh bạch. TTS-001 giúp kiểm soát ngân sách AI và nâng cao hiệu suất làm việc nhóm."**
