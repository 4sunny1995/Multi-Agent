# 🧠 Algorithms Handbook: Cẩm nang Thuật toán & Cấu trúc Dữ liệu

Thuật toán (Algorithms) và Cấu trúc dữ liệu (Data Structures) là nền tảng cốt lõi giúp phần mềm mở rộng quy mô (scale) hiệu quả. Không dừng lại ở việc giải bài tập trên LeetCode, hiểu rõ thuật toán giúp lập trình viên đưa ra sự lựa chọn tối ưu về mặt bộ nhớ và tốc độ thực thi trong hệ thống thực tế.

---

## ⏱️ 1. Độ phức tạp tính toán (Big O Notation)

Big O được sử dụng để đánh giá mức độ hiệu quả của một thuật toán, hay cụ thể là cách mà Thời gian chạy (Time Complexity) và Không gian bộ nhớ (Space Complexity) tăng lên khi quy mô dữ liệu mở rộng.

| Ký hiệu Big O | Tên gọi | Tính chất | Ví dụ thực tế |
| :--- | :--- | :--- | :--- |
| **O(1)** | Constant (Hằng số) | Thời gian lấy dữ liệu luôn không báo trước, bất chấp dữ liệu lớn đến đâu. | Đọc giá trị từ Hash Map, truy xuất theo index mảng. |
| **O(log n)** | Logarithmic | Thời gian tăng tuyến tính khi lượng dữ liệu tăng theo cấp số nhân. Tối ưu cực mạnh cho dữ liệu lớn. | Tìm kiếm nhị phân (Binary Search). |
| **O(n)** | Linear (Tuyến tính) | Thời gian xử lý tăng dần đều tỉ lệ thuận với lượng dữ liệu đầu vào. | Khảo sát dữ liệu trong 1 vòng `for` (Duyệt mảng). |
| **O(n log n)** | Log-linear | Thời gian của các thuật toán phân rã hiệu quả. | Các thuật toán sắp xếp tối ưu (Merge Sort, Quick Sort). |
| **O(n²)** | Quadratic (Bậc hai) | Thời gian và rủi ro tăng theo cấp số nhân. Dễ dẫn tới nghẽn cổ chai. | Cặp 2 vòng `for` lồng nhau (Bubble Sort). |

> **💡 Lời khuyên:** Trong hệ thống hệ thống lớn (Scaling Backend), hãy cố phân tích và hạ độ phức tạp từ **O(n²)** xuống **O(n)** hoặc **O(log n)** bằng việc sử dụng Hash Map hoặc chia để trị.

---

## 🧱 2. Cấu trúc dữ liệu cốt lõi (Core Data Structures)

Cấu trúc dữ liệu là cách "tổ chức kho bãi", và Thuật toán là "cách lấy hàng trong kho". Nếu kho được bố trí đúng đắn, bạn thậm chí không cần một thuật toán phức tạp!

* **Array (Mảng):** Lưu trữ tuần tự liên tiếp. Đọc và lấy ra (theo Index) ở `O(1)`. Tuyển tìm kiếm tốn `O(n)`. Nhược điểm: Việc Thêm/Xóa ở giữa mảng cực chậm vì làm dịch chuyển vị trí `O(n)`.
* **Hash Table / Hash Map (Bảng băm):** Là linh hồn của việc tối ưu thời gian. Đây là các kiểu dữ liệu `Dictionary` trong C#, `Object/Map` trong JS. Chặn tốc độ tìm kiếm và ghi tiệm cận `O(1)`. Thích ứng rộng rãi việc dùng mem-cache (Redis).
* **Stack & Queue (Ngăn xếp & Hàng đợi):** 
  * **Stack (LIFO - Vào sau ra trước):** Áp dụng trong luồng xử lý Call Stack, lịch sử duyệt Web, hoặc Undo/Redo.
  * **Queue (FIFO - Vào trước ra trước):** Áp dụng hệ thống Queue xử lý cực lớn (RabbitMQ, Kafka), hàng đợi tác vụ Background Job.
* **Tree (Cây):** Ví dụ như Binary Search Tree (BST), Tries. Mang lại tốc độ lưu trữ / trích xuất theo trật tự nhanh `O(log n)`. Ứng dụng vẽ lại DOM (HTML/XML), hoặc cấu trúc Folder.
* **Graph (Đồ thị):** Dùng để lập bản đồ liên kết tương tác. Giải thuật cho các chức năng Mạng Xã Hội, Recommendations, tìm kiếm lộ trình ngắn nhất đồ thị (Dijkstra).

---

## ⚔️ 3. Các kỹ thuật giải quyết thuật toán (Algorithmic Paradigms)

### 1. Two Pointers / Sliding Window (Con trỏ kép / Cửa sổ trượt)
* **Triết lý:** Sử dụng hai con trỏ hoặc một "window" kích thước động để xét một phân đoạn dữ liệu, tránh cho việc dùng hai vòng lặp.
* **Tầm quan trọng:** Giúp hạ chi phí vòng lặp từ `O(n²)` xuống còn `O(n)`. Rất thường xuyên áp dụng trong bài toán String manipulation và Array liên tục.

### 2. Divide and Conquer (Chia để trị)
* **Triết lý:** "Bẻ gãy" bài toán lớn thành các phần con, giải quyết độc lập, sau đó tổng hợp kết quả (đệ quy).
* **Khuyết điểm:** Tốn không gian bộ nhớ của Stack Đệ quy. Dễ vi phạm Memory Overflow.
* **Ví dụ:** Merge Sort.

### 3. Greedy Algorithm (Tham lam)
* **Triết lý:** Lựa chọn phương án mang lại lợi ích tốt nhất *ngay tức thời* từng bước một, hy vọng rằng cuối cùng sẽ có kết quả tối ưu.
* **Ví dụ:** Bài toán chọn tiền lẻ ít tờ nhất, lập lịch công việc Job Scheduling.

### 4. Dynamic Programming - DP (Quy hoạch động)
* **Triết lý:** Giải quyết bài toán lớn nhưng **Lưu giữ lại kết quả (Memoization, Tabulation)** của tính toán trong quá khứ để không phải chạy lại từ đầu. Đổi không gian mảng nhớ, lấy chi phí tính toán O(n).
* **Lời khuyên:** Giải pháp thần thánh triệt tiêu sự chậm chạp của Đệ quy (thay vì tăng lên không gian hàm O(2^n)).

---

## 🧭 4. Các thuật toán sinh tồn không thể bỏ qua

1. **Searching (Tìm kiếm):**
   * **Binary Search:** Chỉ được sử dụng **khi chuỗi mảng đã được sắp xếp sẵn**. Độ siêu phàm là chỉ cần băm đôi mảng liên tục thay vì duyệt từ đầu, `O(log n)`.
   * **BFS (Breadth-First Search) & DFS (Depth-First Search):** Bộ đôi duyệt qua toàn đồ thị hoặc Tree. BFS dò tìm ngang, DFS đục sâu.

2. **Sorting (Sắp xếp):**
   * Trong lập trình thương mại, hầu hết dev dùng sẵn hàm thư viện của ngôn ngữ (JS: `Array.sort`, Python: `list.sort()`) — cốt lõi được build bởi Timsort, Merge Sort, QuickSort ở tốc độ **O(n log n)**. Nhưng cần hiểu, sắp xếp tốn chi phí dữ liệu tương đối lớn, đừng bao giờ sort một list lớn nếu không thật cần thiết.

---

## 🔐 5. Các thuật toán & Cấu trúc trong System Design

Trong thực tế phát triển Backend và Hệ thống phân tán (Distributed Systems), bạn sẽ hiếm khi phải tự viết lại các thuật toán từ chi tiết như DFS hay Quick Sort, thay vào đó bạn sẽ sử dụng định dạng thuật toán chuyên biệt cho quy mô hệ thống:

1. **Hashing & Cryptography (Băm & Mật mã):**
   * **Hash Functions:** SHA-256 dùng để kiểm tra tính toàn vẹn của dữ liệu (Checksum) và định danh File/Upload nhanh.
   * **Password Hashing:** Bcrypt, Argon2 (luôn phải có 'Salt'), được thiết kế để *cố tình chạy chậm* nhằm chống lại các đợt tấn công dò mật khẩu (Brute-force).

2. **Caching Algorithms (Chiến lược bộ nhớ đệm):**
   * **LRU (Least Recently Used):** Xóa dữ liệu *cũ nhất* xét theo thời gian lần cuối được gọi. Phổ biến nhất trong thiết lập Redis Cache.
   * **LFU (Least Frequently Used):** Xóa dữ liệu *ít được truy cập nhất* tính theo tổng tần suất.

3. **Rate Limiting (Kiểm soát lưu lượng API chống Spam):**
   * **Token Bucket / Leaky Bucket:** Thuật toán kinh điển phân bổ thẻ token định kỳ để kiểm soát mượt mà luồng Request gọi vào Server.
   * **Sliding Window:** Giới hạn log sử dụng khoảng thời gian trượt (VD: Không quá 100 reqs trong 60 giây bất kỳ), sửa hạn chế đột biến băng thông của thuật toán Fixed Window.

4. **Distributed Systems Algorithms (Thuật toán phân tán):**
   * **Consistent Hashing (Băm nhất quán):** Kỹ thuật đỉnh cao dùng trong Load Balancers, CDN, và Database Phân tán (DynamoDB, Cassandra) để phân bổ đều dữ liệu mà không làm sập toàn hệ thống khi thêm hoặc bớt Server.
   * **Leader Election (Raft / Paxos):** Kỹ thuật quyết định xem Node nào trong Cluster sẽ làm 'Boss' thao tác ghi dữ liệu, giúp hệ thống phục hồi khi một vài Node bị chết (Fault Tolerance).

---

## 💡 6. Lời khuyên thực chiến Backend / System Design

1. **Cái Bẫy Tối Ưu Sớm (Premature Optimization):** Nếu mảng của bạn chỉ tối đa chứa khoảng dưới 1,000 cấu trúc đơn giản, hãy bỏ qua các thuật toán xa vời khó thiết kế, viết nhanh 1 vòng lặp `for` O(n) bình thường cho dễ đọc (`KISS Principle`). Thời gian tiết kiệm được ở CPU không xứng với thời gian bảo trì và đọc hiểu!
2. **Chiếm Thế Thượng Phong Của Memory:** Trong hệ thống phần cứng đám mây hiện đại, RAM thường dư dả nhưng Database hay CPU lại là nút thắt (Bottle Neck). Do đó, kỹ sư giỏi sẵn sàng **Sử dụng Dữ Liệu Bộ Nhớ** (sinh ra nhiều biến, lưu Map trung gian khổng lồ, Cache vào RAM) để mưu đồ **Tối Ưu Tốc Độ Xử Lý**.
3. **Database Index là Thuật Toán Lớn Nhất Của Bạn:** Khi thao tác SQL Index, bạn về cơ bản đang tạo dựng ra cấu trúc dữ liệu **B-Tree** (Balanced Tree) khổng lồ hỗ trợ tốc độ truy xuất Database ở `O(log n)`. Bất kì khi nào Query bị chậm, ngay lập tức nghĩ tới thuật toán B-Tree thông qua Index!

---
*Thuật toán chạy tay giúp đỗ phỏng vấn, nhưng Nắm bắt Thuật toán hệ thống quy mô lớn giúp bạn thiết kế được phần mềm trường tồn!*
