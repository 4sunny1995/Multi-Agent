# 📂 Project Structure: Quy tắc tổ chức thư mục

Để đảm bảo mọi AI Agent đều biết chính xác nơi đặt và tìm kiếm tài liệu, dự án tuân thủ cấu trúc sau:

```text
/ (Root)
├── .agents/             # Cấu hình AI Agents (Roles, Rules, Workflows)
│   ├── config/          # Cấu hình hệ thống chung
│   ├── roles/           # System Prompts của từng Agent
│   ├── rules/           # Các bộ luật và từ điển (glossary.json)
│   └── workflows/       # Quy trình thực thi (/dev, /fix, etc.)
├── docs/                # TÀI LIỆU DỰ ÁN
│   ├── README.md        # Mục lục tổng thể (Table of Contents)
│   ├── drafts/          # Các bản thảo, tài liệu chưa hoàn thiện
│   ├── original/        # TÀI LIỆU GỐC & LÀM VIỆC
│   │   ├── business/    # BRD, User Stories, Edge Cases
│   │   ├── architecture/# Design Plan, API Contract
│   │   ├── testing/     # Test Plan, Bug Reports
│   │   └── user-guide/  # Hướng dẫn sử dụng
│   └── trans/           # THƯ MỤC CHỨA BẢN DỊCH
│       ├── vi/          # Bản dịch tiếng Việt
│       ├── en/          # Bản dịch tiếng Anh
│       └── ja/          # Bản dịch tiếng Nhật
├── src/                 # Mã nguồn ứng dụng
├── tests/               # Toàn bộ Test Cases
├── .env                 # Biến môi trường
└── README.md            # Tổng quan dự án
```

> [!IMPORTANT]
> **Quy tắc Document Index (TOC)**: Sau khi tạo/dịch tài liệu, Translator hoặc Tech Writer phải cập nhật link vào `docs/README.md`. Mọi tài liệu mới của Agent phải đặt trong `docs/original/<category>/`.
