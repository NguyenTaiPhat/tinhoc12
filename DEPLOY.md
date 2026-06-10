# 🚀 HƯỚNG DẪN DEPLOY LÊN GITHUB PAGES

## Phương án 1: Sử dụng Git (Command Line)

### Bước 1: Cài đặt Git
1. Tải Git tại: https://git-scm.com/download/win
2. Cài đặt với các tùy chọn mặc định
3. Kiểm tra: mở CMD và gõ `git --version`

### Bước 2: Cấu hình Git (chỉ làm 1 lần)
```bash
git config --global user.name "Tên của bạn"
git config --global user.email "email@example.com"
```

### Bước 3: Khởi tạo Git trong thư mục TINHOC
Mở CMD trong thư mục `C:\Users\Tài Phát\Downloads\TINHOC\` và chạy:

```bash
# Khởi tạo git repository
git init

# Thêm tất cả files
git add .

# Commit lần đầu
git commit -m "Initial commit: Tin Hoc 12 - Mang May Tinh"
```

### Bước 4: Tạo Repository trên GitHub
1. Truy cập: https://github.com/new
2. Đặt tên repository: `tin-hoc-12-mang-may-tinh`
3. Chọn **Public** (để deploy miễn phí)
4. **KHÔNG** tích vào "Add a README file"
5. Nhấn **Create repository**

### Bước 5: Push code lên GitHub
Sau khi tạo repository, GitHub sẽ hiện hướng dẫn. Copy và chạy:

```bash
# Thêm remote repository
git remote add origin https://github.com/USERNAME/tin-hoc-12-mang-may-tinh.git

# Đổi branch sang main
git branch -M main

# Push code lên GitHub
git push -u origin main
```

**Lưu ý:** Thay `USERNAME` bằng tên GitHub của bạn.

### Bước 6: Kích hoạt GitHub Pages
1. Vào Settings của repository
2. Chọn **Pages** ở menu bên trái
3. Trong phần **Source**:
   - Branch: `main`
   - Folder: `/ (root)`
4. Nhấn **Save**
5. Đợi 1-2 phút để GitHub build

### Bước 7: Truy cập website
Website sẽ có địa chỉ:
```
https://USERNAME.github.io/tin-hoc-12-mang-may-tinh/
```

---

## Phương án 2: Upload thủ công (Không cần Git)

### Bước 1: Tạo Repository
1. Đăng nhập GitHub
2. Nhấn nút **+** góc trên phải → **New repository**
3. Đặt tên: `tin-hoc-12-mang-may-tinh`
4. Chọn **Public**
5. Tích vào **Add a README file**
6. Nhấn **Create repository**

### Bước 2: Upload files
1. Trong repository, nhấn **Add file** → **Upload files**
2. Kéo thả 4 files vào:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
3. Thêm commit message: "Add website files"
4. Nhấn **Commit changes**

### Bước 3: Kích hoạt GitHub Pages
1. Vào **Settings** → **Pages**
2. Source: **main** branch, **/ (root)** folder
3. **Save**
4. Đợi 1-2 phút

### Bước 4: Truy cập
```
https://USERNAME.github.io/tin-hoc-12-mang-may-tinh/
```

---

## 🔧 Cập nhật website sau này

### Nếu dùng Git:
```bash
# Thêm thay đổi
git add .

# Commit với message
git commit -m "Update content"

# Push lên GitHub
git push
```

### Nếu upload thủ công:
1. Vào file cần sửa trên GitHub
2. Nhấn biểu tượng bút chì (Edit)
3. Sửa nội dung
4. **Commit changes**

Hoặc:
1. **Add file** → **Upload files**
2. Upload file mới (sẽ ghi đè file cũ)

---

## 🎯 Tùy chỉnh domain (Tùy chọn)

### Sử dụng domain riêng:
1. Mua domain (VD: tinhoc12.com)
2. Trong Settings → Pages → Custom domain
3. Nhập domain của bạn
4. Cấu hình DNS:
   - Type: `A`
   - Host: `@`
   - Value: 
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Type: `CNAME`
   - Host: `www`
   - Value: `USERNAME.github.io`

---

## 📱 Chia sẻ website

Sau khi deploy thành công, bạn có thể chia sẻ link:
```
https://USERNAME.github.io/tin-hoc-12-mang-may-tinh/
```

**Hoặc rút gọn link tại:**
- bit.ly
- tinyurl.com
- gg.gg

---

## ⚠️ Lưu ý quan trọng

1. ✅ Repository phải là **Public** để dùng GitHub Pages miễn phí
2. ✅ File chính phải tên là `index.html`
3. ✅ Không có thư mục con, tất cả files ở root
4. ✅ Đợi 1-2 phút sau khi push để GitHub build
5. ✅ Hard refresh (Ctrl + F5) nếu thấy nội dung cũ
6. ✅ Check Actions tab nếu deploy bị lỗi

---

## 🐛 Xử lý lỗi thường gặp

### Lỗi: 404 Not Found
- Kiểm tra file `index.html` có ở root không
- Đợi thêm 2-3 phút
- Hard refresh (Ctrl + Shift + R)

### Lỗi: Permission denied
```bash
# Xóa remote cũ và thêm lại
git remote remove origin
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

### Lỗi: CSS/JS không load
- Kiểm tra đường dẫn trong `index.html`
- Phải dùng relative path (`style.css` không phải `/style.css`)

### Lỗi: "There isn't a GitHub Pages site here"
- Vào Settings → Pages
- Chọn lại Source: main branch, / (root)
- Save và đợi

---

## 🎓 Video hướng dẫn

YouTube: "How to deploy to GitHub Pages"
- Tiếng Việt: https://www.youtube.com/results?search_query=github+pages+tieng+viet
- English: https://www.youtube.com/results?search_query=github+pages+tutorial

---

## 💡 Mẹo

1. **Tên repository ngắn gọn** → URL dễ nhớ
2. **Add README.md** → Mô tả project đẹp
3. **Add LICENSE** → MIT License cho open source
4. **Add .gitignore** → Bỏ qua files không cần thiết
5. **Thêm screenshot** → Trong README để người khác xem preview

---

## 🆓 Hoàn toàn MIỄN PHÍ

- ✅ Hosting miễn phí
- ✅ SSL Certificate miễn phí (HTTPS)
- ✅ CDN toàn cầu
- ✅ Không giới hạn bandwidth
- ✅ Không giới hạn lượt truy cập

---

**Chúc bạn deploy thành công! 🎉**

Nếu cần hỗ trợ, hãy tạo Issue trên GitHub repository của bạn.
