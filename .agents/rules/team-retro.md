---
trigger: model_decision
---

# 🔄 Team Retrospective: Lessons Learned & System Evolution (V5.0 — LLM-First)

Tài liệu này ghi lại các bài học kinh nghiệm từ quá trình vận hành hệ thống Multi-Agent trên môi trường Antigravity.

---

## 🗄️ Khối lưu trữ (Archived)
> Lịch sử từ **Sprint 2 đến Sprint 5.3** đã được nén lại và chuyển nhượng sang file `team-retro-archive.md` (Giải phóng 60% Token Context).
- **Thành tựu lõi**: Thiết lập hệ thống 13 Roles, 12 Workflows chuyên sâu, LPE-001 Enforcement, và tái cấu trúc hệ thống Rules thành các Logic Gates tuyệt đối.
---

## 📅 SPRINT 6.0: The Intelligent Autonomous Era (Current)

### 📊 Phân tích Hành vi Đại cục: SWC Matrix
Nhằm chuẩn bị giải quyết các giới hạn nền tảng tiếp theo của hệ thống (*Token Context, Scalability và Destructive Over-engineering*), hội đồng Agent đã thiết lập bảng phân tích năng lực:

| Hạng mục | Khái niệm cốt lõi | Biểu diễn trong hệ thống thực tế |
| :--- | :--- | :--- |
| **Strengths** (Sức mạnh) | Tính chuyên môn sâu & Phân quyền rành mạch | 13 Roles, 12 Workflows chặn Gate tuyệt đối. Các Rule nén siêu mỏng (SWE-001, CLD-002) giảm thiểu Token vắt kiệt. |
| **Weaknesses** (Điểm yếu) | Nạn "Over-Engineering" & Rào cản Context | Tư duy hệ thống rập khuôn kiểu Enterprise, khiến các ứng dụng "đồ chơi" (MVP, học thuật) bị ngộp tài liệu. Rào cản đọc file > 800 LOC. |
| **Challenges** (Thách thức) | Vượt ngưỡng Giới hạn LLM Vận hành | 1. **Mù Codebase quá khổ**: Không có Semantic Vector Search sẽ khiến LLM bó tay với Source Code triệu dòng. <br> 2. **Rủi ro tự trị (Auto-run)**: Chưa có cơ chế Safe-Backup tự động trước khi `replace_file_content` bị lỗi. |

### 🏆 Thành tựu (Design Wins)
1. **Diệt Over-Engineering**: Xây dựng luồng nhánh của `/dev` chia làm 2 cấp `[ENTERPRISE]` và `[MVP-MICRO]`.
2. **Khắc phục Mù Ngữ cảnh**: Cấy ghép "Semantic Knowledge Map" và "Business Domain" vào `STATE.md`, ép BA phải Thấu cảm trước khi phân tích dữ liệu.
3. **Chống Rủi ro Tự trị**: Thiết lập `LAW 4: Safe-Backup` trong `operation-safety.md`, ngăn Agent tự động phá source.
4. **Đồng bộ Hoá Bản năng (100%)**: Cập nhật Role files của BA, SA, TESTER, LEADER giúp toàn bộ đội ngũ cốt lõi hành động theo triết lý "Thấu cảm" và "Tối ưu quy mô" một cách tự nhiên.

### 📚 Cross-Team Lessons Learned Table
| Vấn đề / Tech Debt | Nguyên nhân gốc rễ (Root Cause) | Giải pháp đã áp dụng & Rule mới |
| :--- | :--- | :--- |
| Nợ kỹ thuật âm thầm | Do lười refactor, thiếu nhận diện sớm | Nâng cấp `inspect.md` với AI Pattern Recognition |
| Quên kiểm soát chi phí | Chỉ có dự toán, không có alert | Ép buộc CloudWatch/Billing alarms trong `BUDGET-001` |
| Lọt lỗi bảo mật từ thư viện | Quét 1 lần lúc deploy là không đủ | Bổ sung 24/7 scanning vào `SHS-001` & `/secure` |
| Gây vỡ tính năng cũ (Regression) | BA phân tích requirements như xây mới | Cập nhật `/dev` thêm "Feature Impact Classification" (FIC). |
| Over-Engineering lãng phí Token | Agent bị dính tư duy Enterprise cho dự án bé | Bổ sung Bypass `[MVP-MICRO]` vào luồng `/dev` |
| BA thiết kế luồng vô dụng | Thiếu context người dùng và Pain points thực tế | Nhúng `BUSINESS DOMAIN` vào `STATE.md`, ép BA đọc trước khi viết BRD |
| AI phá hoại source code (Destructive) | Replace lầm file khi chạy Auto-run | Ban hành `LAW 4: Safe-Backup` bắt buộc tạo `.bak` trước khi đè nội dung |
| Bị phân mảnh cấu hình (Tồn tại 2 file glossary.json ở config và rules) | Thiếu góc nhìn toàn cảnh, lọc file theo Single Directory (`list_dir` cục bộ). | Nâng cấp `AGS-001` (Global Context Discovery), ép buộc dùng `grep_search` trên toàn dự án khi xử lý thay đổi kiến trúc/tài liệu cấu hình nền tảng. |

---

## 📅 SPRINT 5.6: The Predictive Era

### 🏆 Thành tựu (System Wins)
1. **AI-Driven RCA**: Nâng cấp `/inspect` với khả năng dùng LLM truy vết Root Cause thay vì chỉ dò regex độ dài file.
2. **Predictive Security**: Tích hợp quy chuẩn dò tìm 24/7 CVE (Dependencies) vào `secure.md` và `SHS-001`.
3. **Cost Auto-Alerting**: Đưa cảnh báo ngân sách Cloud tự động vào `BUDGET-001`.
4. **Cross-Team Intelligence**: Thiết lập Bảng bài học kinh nghiệm dùng chung để các Agent và Human cùng học hỏi.

---



## 📅 SPRINT 5.4: Tiết Kiệm Token & Context Optimization (Current)

### 🏆 Thành tựu (System Wins)
1. **Rule File Optimization**: Chuyển đổi thành công 19/19 files tĩnh (inlined rules) thành các "Conditional Rules" (model_decision).
2. **Context Relief**: Hàng chục ngàn token (bytes) được giải phóng khỏi System Prompt mỗi lượt, giúp giảm Latency và API Cost đáng kể trong môi trường Antigravity.
3. **Archive Old Notes**: Tinh gọn `team-retro.md` bằng cách nén (Archive) các nội dung từ Sprint 2 - 4.3.

### 💡 Bài học (Knowledge Upgrade)
> **"Đừng để thuật toán nhai lại lý thuyết vô ích."**
> - Rules không còn nhồi nhét vô tội vạ vào não bộ. Hãy để `<description>` làm mục lục, và để sự đánh giá của AI (model_decision) quyết định lúc nào cần đọc bằng tool.

### 🚀 Hành động tiếp theo
- **ALL AGENTS**: Từ nay, khi thấy một Rule ở danh sách gợi ý trong System Prompt, hãy chủ động dùng lệnh `view_file` để tự tra cứu nội dung khi gặp bài toán liên quan.

---

## 📅 SPRINT 5.5: Persistent Context & "Não bộ tĩnh" (Current)

### 🏆 Thành tựu (System Wins)
1. **Lưu trữ Cấu hình tĩnh (`STATE.md`)**: Giải quyết triệt để tình trạng AI "Mất trí nhớ context" giữa các phiên chat bằng Project State Checkpoint mới.
2. **Loại bỏ Bottleneck (INF-001)**: Thay vì mỗi đầu Session AI phải quét lại toàn bộ file `package.json`, `docker-compose.yaml` (gây tốn từ 2-5k tokens/lượt mất thời gian), giờ AI sẽ tải cấu hình kiến trúc ngay lập tức từ `STATE.md`.
3. **Workflow Upgrade**: Chu trình `/dev` và `/fix` đã cập nhật lệnh ép buộc (Force action) cho LEADER phải lưu trạng thái của hệ thống trước khi Shutdown session.

### 💡 Bài học (Knowledge Upgrade)
> **"Kiến thức không thể chỉ lưu ở quá khứ (Retro), nó phải hướng tới hành động tương lai (State)."**
> - Thay vì để AI loay hoay quét mù, việc thiết lập một "bảng đồ kiến trúc tĩnh" sẽ là la bàn định hướng cho mọi hành động.

### 🚀 Hành động tiếp theo
- **LEADER**: Chú ý thực thi ghi dữ liệu vào `.agents/STATE.md` ở bước 7 (FINAL GATE).

---

## 📅 SPRINT 5.6: The Discovery & Analysis Era (Current)

### 🏆 Thành tựu (System Wins)
1. **Khởi tạo `/analyse` (ANA-001)**: Thiết lập chốt chặn nghiên cứu chuyên sâu, ép buộc quy trình Discovery (BA) và Technical Assessment (SA) trước khi triển khai.
2. **Failure Point Prevention**: Tích hợp các rào cản chống "Shallow Research" và "Assumption of Greenfield" ngay trong workflow định nghĩa.

### 💡 Bài học (Knowledge Upgrade)
> **"Thấu cảm là chìa khóa của Giải pháp."**
> - Một hệ thống không có pha phân tích rõ ràng thường dẫn đến lãng phí 30-50% công sức lập trình do sai lệch yêu cầu.