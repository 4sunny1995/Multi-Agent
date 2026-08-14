---
name: system-memories
description: Tự động chụp snapshot lưu vết biến đổi kiến trúc, lưu trữ dòng thời gian ký ức (System Memory Checkpoints), đồng bộ hóa .agents/STATE.md và sinh Dashboard HTML trực quan.
---

# 🧠 System Memories & State Checkpoint Skill (MMS-001)

<identity>
Tôi là công cụ quản lý Bộ nhớ dài hạn (Long-term Memory) và Trạng thái hệ thống (State Checkpoint) trong môi trường Antigravity Multi-Agent.
Nhiệm vụ của tôi là tự động quét toàn diện workspace, ghi nhớ các thay đổi kiến trúc, lưu trữ chuỗi thời gian snapshot ký ức, đồng bộ hóa `.agents/STATE.md` và xuất Dashboard HTML trực quan cho nhà phát triển và các AI Agent.
</identity>

<activation>
triggers:
  - keyword: ["system memories", "system memory", "lưu ký ức", "chụp snapshot dự án", "cập nhật state", "state checkpoint", "memory timeline", "sync state"]
  - workflow: Được gọi tự động cuối mỗi workflow (`/dev`, `/fix`, `/enterprise-dev`, `/analyse`, `/release`) hoặc khi có thay đổi quan trọng trong hệ thống.
</activation>

<mission>
1. **Quét Workspace tự động**: Trích xuất Tech Stack, Runtime, Platform, Package Dependencies, Git Status, số lượng Rules/Skills/Workflows.
2. **Lưu vết Ký ức (Memory Timeline)**: Ghi lại từng mốc checkpoint vào `.agents/memories/snapshots.json` và nhật ký `.agents/memories/MEMORY_LOG.md` theo thời gian thực mà không làm mất lịch sử cũ.
3. **Đồng bộ hóa `.agents/STATE.md`**: Tự động cập nhật các mục công nghệ, danh sách thư mục cốt lõi và hành động gần nhất vào `STATE.md`.
4. **Trực quan hóa Dashboard HTML**: Sinh file giao diện `.agents/memories/memories_dashboard.html` và đồng bộ tới `docs/original/metrics/system_memories.html`.
5. **Chống suy giảm ngữ cảnh (Context Decay Prevention)**: Giúp các AI Agent trong turn mới nắm bắt toàn bộ bối cảnh dự án ngay tức thì.
</mission>

<guidelines>
- **Chạy tự động (Auto Pipeline)**:
  ```bash
  node .agents/skills/system-memories/scripts/memorize.js --auto
  ```
- **Chụp Snapshot kèm thông điệp**:
  ```bash
  node .agents/skills/system-memories/scripts/memorize.js --snapshot "Mô tả thay đổi vừa thực hiện"
  ```
- **Đồng bộ STATE.md**:
  ```bash
  node .agents/skills/system-memories/scripts/memorize.js --sync-state
  ```
- **Xuất Dashboard HTML**:
  ```bash
  node .agents/skills/system-memories/scripts/memorize.js --export-html
  ```
</guidelines>

<usage>
**1. Chạy nhanh qua Node.js:**
```bash
node .agents/skills/system-memories/scripts/memorize.js "Hoàn thành module auth và fix lỗi database"
```

**2. Xem Dashboard HTML trực quan:**
Mở trực tiếp trên trình duyệt:
- `file:///home/rcvn/workspaces/AI/antigravity/.agents/memories/memories_dashboard.html`
- hoặc bản đồng bộ `file:///home/rcvn/workspaces/AI/antigravity/docs/original/metrics/system_memories.html`
- Trên máy chủ Web Document: `http://localhost:3000/docs/metrics/system_memories.html`

**3. Xem trạng thái tóm tắt trên Terminal:**
```bash
node .agents/skills/system-memories/scripts/memorize.js --status
```
</usage>

<anti_patterns>
❌ Tự ý xóa hoặc ghi đè mất file lịch sử snapshot `.agents/memories/snapshots.json`.
❌ Quên đồng bộ hóa `STATE.md` sau khi hoàn thành các thay đổi kiến trúc lớn.
❌ Ghi đè làm mất các ghi chú thủ công bảo mật hoặc quy tắc kinh doanh trong `STATE.md`.
</anti_patterns>

---
> [!TIP]
> **"Ký ức dự án chính là cầu nối giữa các phiên làm việc của AI. MMS-001 giúp loại bỏ hoàn toàn hiện tượng quên ngữ cảnh và tối ưu hóa lượng token tiêu thụ."**
