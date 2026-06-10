# 📝 CHANGELOG

Tất cả các thay đổi quan trọng của project sẽ được ghi lại ở đây.

---

## [1.1.0] - 2026-06-10

### 🆕 Added
- **Quiz Mode Selector**: Cho phép chọn chế độ làm bài trước khi bắt đầu
  - Chế độ **Xáo trộn**: Thay đổi thứ tự câu hỏi và đáp án
  - Chế độ **Giữ nguyên**: Thứ tự cố định như đề thi
- UI cards để chọn mode với icon và mô tả
- Fisher-Yates shuffle algorithm cho việc xáo trộn
- Tracking mode trong activity log (hiển thị đã làm ở chế độ nào)
- File TINH-NANG-MOI.md giải thích chi tiết tính năng

### 🎨 Improved
- UI/UX của trang Quiz với mode selector đẹp hơn
- Responsive mode selector cho mobile
- Dark mode support cho mode cards
- Nút "Bắt đầu" đổi thành "Bắt đầu làm bài" rõ ràng hơn

### 📚 Documentation
- Cập nhật README.md với thông tin chế độ quiz
- Thêm TINH-NANG-MOI.md hướng dẫn sử dụng
- Cập nhật BAT-DAU.txt
- Tạo CHANGELOG.md (file này)

---

## [1.0.0] - 2026-06-10

### 🎉 Initial Release

#### ✨ Features
- **Dashboard**: Hero section, statistics, 8 learning modules
- **Theory**: 8 chapters with interactive SVG diagrams
  1. Mạng máy tính (LAN, WAN, WLAN, Internet)
  2. Thiết bị mạng (Hub, Switch, Router, Modem, AP)
  3. TCP/IP
  4. Địa chỉ IP (IPv4, IPv6)
  5. DNS
  6. Email (SMTP, POP3, IMAP)
  7. HTTP & HTTPS
  8. Ethernet, MAC, ARP, ICMP

- **Flashcards**: 30 cards with 3D flip animation
  - Previous/Next navigation
  - Random card
  - Mark as learned
  - Progress tracking

- **Quiz**: 50 multiple choice questions
  - Instant feedback
  - Progress bar
  - Score tracking
  - Grade system (Xuất sắc, Giỏi, Khá, Trung bình, Cần ôn tập)

- **Progress Dashboard**
  - Flashcards learned counter
  - Quizzes completed counter
  - Highest score
  - Overall completion percentage
  - Recent activity log

#### 💾 Data Management
- **LocalStorage**: Auto-save all progress
- **Backup/Restore**: Export/Import data as JSON
  - Download backup file
  - Upload restore file
  - Validation and confirmation
  - Toast notifications

#### 🎨 Design
- **Theme**: Light/Dark mode with toggle
- **Responsive**: Mobile-first design
  - Desktop: Fixed sidebar
  - Tablet: Flexible layout
  - Mobile: Hamburger menu
- **Animations**: 
  - Fade in
  - Slide up
  - Hover effects
  - 3D flip (flashcards)
  - Progress animations
- **Colors**: Professional blue gradient theme
- **Icons**: Inline SVG (Lucide style)
- **No Emojis**: Only professional SVG icons

#### 🛠️ Technical
- **HTML5**: Semantic markup
- **CSS3**: 
  - Grid & Flexbox
  - Custom Properties
  - Animations
  - Glassmorphism effects
- **Vanilla JavaScript ES6+**
  - No dependencies
  - No frameworks
  - No build tools
- **LocalStorage API**: Data persistence
- **File API**: Backup/Restore

#### 📦 Tools & Scripts
- `START.bat`: Run website locally
- `deploy.bat`: Auto-deploy to GitHub
- `.gitignore`: Git configuration
- `LICENSE`: MIT License

#### 📚 Documentation
- `README.md`: Complete guide
- `DEPLOY.md`: Detailed deployment instructions
- `HUONG-DAN-NHANH.md`: Quick start guide (Vietnamese)
- `CHECKLIST.md`: Pre-deployment checklist
- `BAT-DAU.txt`: Getting started guide (Vietnamese)

#### ♿ Accessibility
- Semantic HTML
- Keyboard navigation
- ARIA labels
- Focus states
- WCAG-friendly contrast
- Screen reader support

#### 🔐 Security & Privacy
- 100% local data storage
- No server communication
- No tracking
- No data collection
- Offline-first

---

## 🔮 Future Plans

### Version 1.2.0 (Planned)
- [ ] Timer mode (time-limited quizzes)
- [ ] Custom quiz (choose number of questions)
- [ ] Practice mode (only wrong answers)
- [ ] Review mode (see answers after completion)
- [ ] Export results to PDF

### Version 1.3.0 (Planned)
- [ ] Search functionality
- [ ] Bookmarks for theory chapters
- [ ] Notes feature
- [ ] Study statistics graph
- [ ] Achievements/Badges system

### Version 2.0.0 (Planned)
- [ ] Multi-subject support
- [ ] User accounts (optional)
- [ ] Cloud sync
- [ ] Collaborative learning
- [ ] Teacher dashboard

---

## 📊 Version Numbering

Format: `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes, major rewrites
- **MINOR**: New features, backwards compatible
- **PATCH**: Bug fixes, small improvements

---

## 🤝 Contributing

Nếu bạn muốn đóng góp:
1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

MIT License - See [LICENSE](LICENSE) file for details

---

**Keep this changelog updated with each release!**
