# 🤖 Hoài Giang Automation Blog

Blog chia sẻ kiến thức về tự động hóa, lập trình, IoT và công nghệ.

## 🚀 Deploy lên Vercel

### Cách 1: GitHub Integration (Khuyến nghị)
1. **Push code lên GitHub:**
```bash
git add .
git commit -m "Deploy blog"
git push origin main
```
2. **Vào Vercel.com** và đăng nhập
3. **Import project** từ GitHub
4. **Deploy** - Vercel sẽ tự động build và deploy

### Cách 2: Drag & Drop
1. **Vào Vercel.com**
2. **Drag & drop** thư mục project vào
3. **Deploy**

### Cách 3: Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

## 🌟 Tính năng

### 📖 Cho người đọc:
- **Giao diện hiện đại**: Responsive design
- **Tìm kiếm thông minh**: Tìm theo tiêu đề, nội dung, tags
- **Phân loại chuyên mục**: Tự động hóa, IoT, Lập trình, Hướng dẫn
- **Đọc bài viết**: Hỗ trợ Markdown

### ✍️ Cho admin:
- **Đăng nhập bảo mật**: Mật khẩu: `admin123`
- **Viết bài**: Editor hỗ trợ Markdown
- **Xem trước**: Preview bài viết
- **Quản lý bài viết**: Sửa, xóa bài viết

## 🎯 Cách sử dụng

### Đăng nhập admin:
1. Click nút **"Admin"** ở header
2. Nhập mật khẩu: `admin123`
3. Click **"Đăng nhập"**

### Viết bài mới:
1. Vào tab **"Viết bài"**
2. Điền thông tin bài viết
3. Click **"Xem trước"** để preview
4. Click **"Đăng bài"** để publish

## 🔧 Tùy chỉnh

### Thay đổi thông tin cá nhân:
Sửa trong file `index.html`:
```html
<p>lehoaigiangg@gmail.com</p>
<p>033 637 9944</p>
<p>Ninh Kiều, Cần Thơ</p>
```

### Thay đổi mật khẩu admin:
Sửa trong file `script.js`:
```javascript
if (password === 'admin123') {  // Đổi mật khẩu tại đây
```

## 📁 Cấu trúc project

```
hoai-giang-automation-blog/
├── index.html          # Trang chính
├── style.css           # CSS styling
├── script.js           # JavaScript logic
├── package.json        # NPM configuration
├── vercel.json         # Vercel deployment config
└── README.md           # Tài liệu này
```

## 📞 Liên hệ

- **Email**: lehoaigiangg@gmail.com
- **Phone**: 033 637 9944
- **Location**: Ninh Kiều, Cần Thơ

## 📄 License

MIT License - Sử dụng tự do cho mục đích cá nhân và thương mại.

---

**Chúc bạn thành công với blog của mình! 🎉**
