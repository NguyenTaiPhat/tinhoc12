# 🚀 HƯỚNG DẪN NHANH DEPLOY LÊN GITHUB

## ⚡ Cách nhanh nhất (5 phút)

### 1️⃣ Cài Git (nếu chưa có)
- Tải: https://git-scm.com/download/win
- Cài đặt → Nhấn Next → Next → Install
- Mở CMD, gõ `git --version` để kiểm tra

### 2️⃣ Cấu hình Git (chỉ làm 1 lần)
Mở CMD và chạy:
```bash
git config --global user.name "Ten Ban"
git config --global user.email "email@example.com"
```

### 3️⃣ Tạo Repository trên GitHub
1. Đăng nhập GitHub: https://github.com
2. Nhấn nút **+** (góc trên phải) → **New repository**
3. Repository name: `tin-hoc-12`
4. Chọn: **Public** ✅
5. Nhấn: **Create repository**

### 4️⃣ Deploy website

**Mở CMD trong thư mục TINHOC** (Shift + Click phải → "Open PowerShell window here")

Chạy từng lệnh:

```bash
# Khởi tạo git
git init

# Thêm tất cả files
git add .

# Commit
git commit -m "First commit"

# Thêm remote (THAY USERNAME bằng tên GitHub của bạn)
git remote add origin https://github.com/USERNAME/tin-hoc-12.git

# Đổi branch sang main
git branch -M main

# Push lên GitHub
git push -u origin main
```

**Nếu hỏi username/password:**
- Username: tên GitHub của bạn
- Password: dùng Personal Access Token (xem bên dưới)

### 5️⃣ Kích hoạt GitHub Pages
1. Vào repository trên GitHub
2. **Settings** (tab trên cùng)
3. **Pages** (menu bên trái)
4. Source: **main** / **/ (root)**
5. **Save**

### 6️⃣ Xem website
Đợi 2 phút, truy cập:
```
https://USERNAME.github.io/tin-hoc-12/
```

---

## 🔑 Tạo Personal Access Token (nếu cần)

GitHub không dùng password nữa, cần Token:

1. GitHub → **Settings** (avatar góc phải)
2. **Developer settings** (cuối cùng bên trái)
3. **Personal access tokens** → **Tokens (classic)**
4. **Generate new token** → **Generate new token (classic)**
5. Note: `Deploy token`
6. Expiration: **No expiration**
7. Tích vào: **repo** (tất cả các ô trong repo)
8. **Generate token**
9. **COPY TOKEN NGAY** (chỉ hiện 1 lần)
10. Dùng token này thay cho password

---

## 🔄 Cập nhật website sau này

### Cách 1: Dùng script tự động
**Click đúp vào file `deploy.bat`** → Nhập message → Enter

### Cách 2: Chạy lệnh thủ công
```bash
git add .
git commit -m "Cap nhat noi dung"
git push
```

### Cách 3: Sửa trực tiếp trên GitHub
1. Vào file cần sửa trên GitHub
2. Nhấn nút bút chì (Edit)
3. Sửa nội dung
4. Commit changes

---

## ❌ Nếu không muốn dùng Git

### Upload thủ công:

1. Tạo repository trên GitHub (như bước 3 ở trên)
2. **Add file** → **Upload files**
3. Kéo thả 4 files:
   - index.html
   - style.css
   - script.js
   - README.md
4. **Commit changes**
5. Settings → Pages → Kích hoạt (như bước 5)

**Để cập nhật:** Upload lại file (sẽ tự động ghi đè)

---

## 🎯 Link website của bạn

Sau khi deploy xong:
```
https://USERNAME.github.io/tin-hoc-12/
```

**Rút gọn link:**
- bit.ly
- tinyurl.com
- gg.gg

---

## 🐛 Khắc phục lỗi

### Lỗi: Permission denied
→ Dùng Personal Access Token thay vì password (xem hướng dẫn ở trên)

### Lỗi: 404 Not Found
→ Đợi thêm 2-3 phút, rồi hard refresh (Ctrl + F5)

### Lỗi: fatal: remote origin already exists
```bash
git remote remove origin
git remote add origin https://github.com/USERNAME/tin-hoc-12.git
```

### Website không cập nhật
→ Vào Actions tab trên GitHub, xem có lỗi không

---

## 📞 Cần trợ giúp?

1. Đọc file **DEPLOY.md** (hướng dẫn chi tiết)
2. YouTube: "github pages hướng dẫn"
3. GitHub Docs: https://docs.github.com/pages

---

**✅ Xong! Website của bạn đã ONLINE!** 🎉

Chia sẻ link cho bạn bè ngay nhé!
