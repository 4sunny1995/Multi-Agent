---
rule_id: ALG-001
trigger: model_decision
description: Cẩm nang Thuật toán, Big O, Data Structures & System Design Algos
applies_to: [SA, DEV, LEADER]
version: "6.0-llm"
---

# 🧠 Algorithms & Data Structures Handbook

<identity>
Bản tóm lược (Cheat-sheet) các thuật toán lớn, Cấu trúc Dữ liệu và Time Complexity. Dành cho việc thẩm định System Design hoặc Micro-optimizations.
</identity>

<activation>
Kích hoạt khi cần tối ưu hiệu năng của API chạm ngưỡng cổ chai (Bottleneck) hoặc đánh giá Schema / cấu trúc dữ liệu lưu trữ vòng lặp lớn.
</activation>

<thinking_pattern>
1. Bài toán hiện tại có vòng lặp lồng nhau O(n²) hay thao tác Array giữa chừng O(n) không?
2. Có thể đổi O(n) thành O(1) bằng Bảng Băm (Hash Map) được không?
3. Thuật toán này có thích hợp với thiết kế Phân tán (Distributed Systems) không?
</thinking_pattern>

<guidelines>
## 1. BIG O NOTATION & DATA STRUCTURES
- **O(1)**: Tuyệt đối. *Hash Map/Dict/Object*. Dùng để đếm, caching, tra cứu mapping.
- **O(log n)**: Nhanh tuyệt vời. *Binary Search*, *B-Tree* (Database Indexes). Dùng để dò tìm trên cục dữ liệu ĐÃ SORT.
- **O(n)**: Tuyến tính. Duyệt *Array*, *Linked List*. Dễ nghẽn nếu n = Millions.
- **O(n log n)**: Sắp xếp (*Merge Sort, Quick Sort*). Bản thân hàm `.sort()` của ngôn ngữ đã là n log n. Đừng sort nếu không cần.
- **O(n²)**: Ác mộng scale, tránh lồng 2 vòng `for`. Dùng **Sliding Window** hoặc **Two Pointers** để kéo giảm xuống O(n).

## 2. PROBLEM SOLVING PARADIGMS
- **Hai con trỏ (Two Pointers/Window)**: Thay thế 2 vòng For (ví dụ: chuỗi liên tiếp).
- **Quy hoạch động (DP / Memoization)**: Lưu lại kết quả quá khứ thay vì đệ quy O(2^n). "Trade space for time".
- **Tham lam (Greedy)**: Lấy lợi ích tốt nhất từng bước (Eg: Tìm tiền lẻ, lập lịch job). Dễ code nhưng cẩn thận sai edge cases.

## 3. SYSTEM DESIGN ALGORITHMS
- **Hashing/Mật mã**: SHA-256 (Checksum), Bcrypt/Argon2 (Mật khẩu - chạy chậm có chủ đích để chặn Brute-force).
- **Caching**: **LRU** (Least Recently Used - xóa dữ liệu cũ nhất), **LFU** (Xóa dữ liệu ít dùng nhất).
- **Rate Limiting**: **Token Bucket** (Luồng req mượt), **Sliding Window** (Ngăn chặn bớt spike đột biến).
- **Phân tán & Cân bằng**: **Consistent Hashing** (Phân luồng Load Balancer chống sập DB khi thêm node), **Raft/Paxos** (Leader election, Fault Tolerance).

## 4. QUY TẮC HIỆU NĂNG THỰC CHIẾN
1. **Trade Space For Time**: RAM đám mây dồi dào, Database/CPU thì nghẽn. Sẵn sàng tạo Hash Map trung gian lớn trong bộ nhớ O(N) để kéo thời gian xử lý xuống O(1).
2. **SQL Indexes**: Query chậm = Thiếu chỉ mục (B-Tree). Đây là thuật toán lớn nhất bạn sài hàng ngày.
</guidelines>

<anti_patterns>
❌ Tối ưu hóa sớm (Premature Optimization) vòng lặp mảng 1000 items bằng thuật toán phức tạp thay vì KISS.
❌ Cố gắng `.sort()` mảng một cách vô ý thức trước khi trả API.
</anti_patterns>
