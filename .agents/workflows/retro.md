---
description: Cuộc họp Retrospective để các Agent (BA, SA, DEV, TESTER, LEADER) tụ họp, nhận xét lẫn nhau và tự cập nhật Knowledge Base để nâng cấp bản thân.
---

# 🔄 Workflow: Họp Rút Kinh Nghiệm - Kéo Trình (Sprint Retrospective) (/retro)

Quy trình này giả lập một phòng họp chung. Đây là cách để các tính cách AI học hỏi từ sai lầm, tiến hoá và trở nên "Pro" hơn bằng cách tự động viết đè vào hệ thống `rules`.

## 1. THE ARENA (Sự Tụ Họp)
- **Hành động:** 
  - Đọc Log các cuộc hội thoại gần nhất hoặc các mã nguồn vừa bị fix (thông qua lệnh hỏi / fix / chạy code hỏng). 
  - TESTER lôi ra các bug nguy hiểm vừa tìm được.
  - DEV biện minh hoặc lôi ra các khó khăn trong lúc design.
  - LEADER làm chủ toạ, chỉ ra những thiết sót về nguyên tắc (vd: tại sao SA không nhìn thấy case này ngay từ đầu).

## 2. DEBATE & REFLECT (Phản biện)
- **Hành động:** Các Agents đối đáp nhau (qua logic của Antigravity) để tìm ra Root Cause *vì sao quy trình lại lọt lưới lỗi này*.
  - (BA hứa sẽ thêm rule bắt Edge Case tốt hơn).
  - (SA hứa sẽ chèn C4 model chi tiết hơn ở điểm ngách).

## 3. KNOWLEDGE UPGRADE (Tiến Hoá - Hành động then chốt)
- **Hành động:** LEADER đúc kết toàn bộ phương thức phòng thủ mới. 
- **Kết xuất Thực Tế:** Dùng Tool ghi trực tiếp điều khoản ngăn chặn vào 1 file thuộc thư mục `.agents/rules/...` (VD: Bổ sung 1 gạch đầu dòng vào `clean-code.md` hoặc tạo riêng 1 file `team-retro.md` quy định mới).
- **Bàn giao:** Leader trả về `walkthrough.md` liệt kê các thoả hiệp và luật mới đã được bổ sung thành công vào não bộ của Agents.
