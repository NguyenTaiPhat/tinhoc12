# TIN HỌC 12 - MẠNG MÁY TÍNH

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue?logo=github)](https://github.com/pages)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🎓 Nền tảng học trực tuyến cho học sinh lớp 12

**Tagline:** Học nhanh. Nhớ lâu. Ôn thi hiệu quả.

### 🌐 Demo Online
👉 **[Truy cập website tại đây](https://USERNAME.github.io/tin-hoc-12/)** *(Thay USERNAME bằng tên GitHub của bạn)*

---

## 🎯 Tính năng chính

### 1. **Trang chủ (Dashboard)**
- Thống kê tổng quan: 8 chương học, 30 flashcards, 50 câu hỏi
- 8 module học tập với thanh tiến độ
- Thiết kế hiện đại với hero section

### 2. **Lý thuyết**
8 chương học với accordion interactiv:
- Chương 1: Mạng máy tính (LAN, WAN, WLAN, Internet)
- Chương 2: Thiết bị mạng (Hub, Switch, Router, Modem, Access Point)
- Chương 3: TCP/IP
- Chương 4: Địa chỉ IP (IPv4, IPv6)
- Chương 5: DNS
- Chương 6: Email (SMTP, POP3, IMAP)
- Chương 7: HTTP & HTTPS
- Chương 8: Ethernet, MAC, ARP, ICMP

**Đặc điểm:**
- Sơ đồ mạng SVG tương tác
- So sánh giao thức trực quan
- Hình minh họa chuyên nghiệp

### 3. **Flashcards**
- 30 thẻ ghi nhớ với hiệu ứng flip 3D
- Đánh dấu thẻ đã học
- Xem thẻ ngẫu nhiên
- Theo dõi tiến độ học tập
- Dữ liệu được lưu tự động

### 4. **Kiểm tra**
- 50 câu hỏi trắc nghiệm
- Phản hồi tức thời
- Thanh tiến độ
- Kết quả chi tiết với:
  - Điểm số
  - Tỷ lệ chính xác
  - Xếp loại (Xuất sắc, Giỏi, Khá, Trung bình, Cần ôn tập)

### 5. **Tiến độ**
- Thống kê flashcards đã học
- Số bài kiểm tra hoàn thành
- Điểm cao nhất
- Tỷ lệ hoàn thành tổng thể
- Lịch sử hoạt động gần đây

---

## 💾 **SAO LƯU VÀ KHÔI PHỤC DỮ LIỆU**

### **Tại sao cần sao lưu?**
Dữ liệu học tập của bạn được lưu trong LocalStorage của trình duyệt. Nếu bạn:
- Xóa cache/cookies
- Cài đặt lại trình duyệt
- Chuyển sang máy tính khác
- Reset trình duyệt

→ **Dữ liệu sẽ bị mất!**

### **Cách sao lưu dữ liệu:**

1. **Tìm 2 nút ở cuối sidebar bên trái:**
   - Nút tải xuống (Download icon) - **SAO LƯU**
   - Nút tải lên (Upload icon) - **KHÔI PHỤC**

2. **Sao lưu:**
   - Nhấn vào nút **Download** (biểu tượng mũi tên xuống)
   - File JSON sẽ được tải xuống với tên: `tinhoc12-backup-YYYY-MM-DD.json`
   - Lưu file này vào nơi an toàn (Google Drive, USB, Email...)

3. **Khôi phục:**
   - Nhấn vào nút **Upload** (biểu tượng mũi tên lên)
   - Chọn file backup đã lưu (file .json)
   - Xác nhận khôi phục
   - Trang sẽ tự động reload với dữ liệu đã khôi phục

### **Dữ liệu được sao lưu:**
✅ Flashcards đã học  
✅ Số bài kiểm tra hoàn thành  
✅ Điểm cao nhất  
✅ Lịch sử hoạt động  
✅ Chế độ giao diện (sáng/tối)

### **Lưu ý quan trọng:**
⚠️ Sao lưu dữ liệu **ĐỊNH KỲ** để tránh mất mát  
⚠️ Lưu nhiều bản backup ở các nơi khác nhau  
⚠️ Kiểm tra file backup có mở được không trước khi xóa dữ liệu cũ

---

## 🎨 Thiết kế

- **Light/Dark Mode** - Chuyển đổi dễ dàng
- **Responsive** - Hoạt động mượt trên mọi thiết bị
- **Glassmorphism** - Hiệu ứng kính mờ hiện đại
- **Smooth Animations** - Chuyển động mượt mà
- **SVG Icons** - Icons vector sắc nét
- **No Emoji** - Chỉ sử dụng SVG icons chuyên nghiệp

---

## 🚀 Cách sử dụng

### **Cài đặt:**
1. Giải nén thư mục
2. Mở file `index.html` bằng trình duyệt web hiện đại
3. Không cần cài đặt gì thêm!

### **Yêu cầu:**
- Trình duyệt hiện đại (Chrome, Firefox, Edge, Safari)
- JavaScript được bật
- LocalStorage được bật (mặc định có sẵn)

### **Không cần:**
- ❌ Internet (chạy offline hoàn toàn)
- ❌ Node.js
- ❌ npm/yarn
- ❌ Build tools
- ❌ Framework

---

## 📱 Responsive

- **Desktop:** Sidebar cố định, layout rộng
- **Tablet:** Sidebar thu gọn, layout linh hoạt
- **Mobile:** Hamburger menu, layout vertical

---

## 🚀 Deploy lên GitHub Pages

### 🎯 Xem hướng dẫn chi tiết:
- **[HƯỚNG DẪN NHANH](HUONG-DAN-NHANH.md)** - 5 phút deploy xong
- **[HƯỚNG DẪN ĐẦY ĐỦ](DEPLOY.md)** - Chi tiết từng bước

### ⚡ TL;DR (Quá ngắn gọn):
```bash
# 1. Cài Git: https://git-scm.com
# 2. Tạo repo trên GitHub (Public)
# 3. Chạy:
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/tin-hoc-12.git
git branch -M main
git push -u origin main
# 4. Settings → Pages → Source: main → Save
# 5. Truy cập: https://USERNAME.github.io/tin-hoc-12/
```

### 🔄 Cập nhật sau này:
**Click đúp vào `deploy.bat`** hoặc chạy:
```bash
git add .
git commit -m "Update"
git push
```

---

## 🔧 Công nghệ

- **HTML5** - Semantic markup
- **CSS3** - Grid, Flexbox, Custom Properties, Animations
- **Vanilla JavaScript ES6+** - No dependencies
- **LocalStorage API** - Lưu trữ dữ liệu
- **File API** - Backup/Restore dữ liệu

---

## 📦 Cấu trúc thư mục

```
TINHOC/
├── index.html              # Trang chính
├── style.css               # Stylesheet
├── script.js               # JavaScript logic
├── README.md               # Hướng dẫn (file này)
├── DEPLOY.md               # Hướng dẫn deploy chi tiết
├── HUONG-DAN-NHANH.md     # Hướng dẫn deploy nhanh
├── CHECKLIST.md            # Checklist trước khi deploy
├── LICENSE                 # MIT License
├── .gitignore             # Git ignore file
├── deploy.bat             # Script tự động deploy (Windows)
└── START.bat              # Chạy website local (Windows)
```

---

## 🎓 Nội dung học tập

### **Lý thuyết:**
- 8 chương hoàn chỉnh
- Sơ đồ mạng tương tác
- Bảng so sánh giao thức
- Ví dụ minh họa

### **Flashcards:**
- 30 thẻ ghi nhớ
- Câu hỏi + Đáp án chi tiết
- Flip animation 3D

### **Quiz:**
- 50 câu trắc nghiệm
- 4 lựa chọn mỗi câu
- Giải thích đáp án
- Hệ thống chấm điểm tự động

---

## 💡 Mẹo học tập

1. **Học tuần tự:** Đọc lý thuyết → Làm flashcards → Kiểm tra
2. **Ôn tập thường xuyên:** Xem lại flashcards mỗi ngày
3. **Làm quiz nhiều lần:** Để ghi nhớ tốt hơn
4. **Theo dõi tiến độ:** Check trang Progress thường xuyên
5. **Sao lưu dữ liệu:** Backup mỗi tuần!

---

## 🔐 Bảo mật & Quyền riêng tư

- ✅ Tất cả dữ liệu lưu **LOCAL** trên máy bạn
- ✅ Không gửi dữ liệu lên server
- ✅ Không tracking
- ✅ Không thu thập thông tin
- ✅ Hoạt động offline 100%

---

## 🐛 Báo lỗi

Nếu gặp vấn đề, hãy kiểm tra:
1. JavaScript có được bật không?
2. LocalStorage có bị chặn không?
3. Trình duyệt có được cập nhật không?
4. Console có báo lỗi gì không? (F12)

---

## 📝 License

Educational purpose only - Dành cho mục đích học tập

---

## 👨‍💻 Phát triển bởi

Kiro AI - Educational Platform Development

---

**Học tốt và đạt điểm cao! 🎉**
