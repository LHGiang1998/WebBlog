# 🤖 Hoài Giang Automation Blog

Blog chia sẻ kiến thức về tự động hóa, lập trình, IoT và công nghệ.

## 🌟 Tính năng

### 📖 Cho người đọc:
- **Giao diện hiện đại**: Responsive design, tương thích mọi thiết bị
- **Tìm kiếm thông minh**: Tìm kiếm theo tiêu đề, nội dung, tags
- **Phân loại chuyên mục**: Tự động hóa, IoT, Lập trình, Hướng dẫn
- **Đọc bài viết**: Hỗ trợ Markdown, syntax highlighting
- **Liên hệ**: Form liên hệ trực tiếp

### ✍️ Cho admin:
- **Đăng nhập bảo mật**: Mật khẩu: `admin123`
- **Viết bài**: Editor hỗ trợ Markdown
- **Xem trước**: Preview bài viết trước khi đăng
- **Quản lý bài viết**: Sửa, xóa, quản lý tất cả bài viết
- **Phân loại**: Tự động phân loại theo chuyên mục
- **Tags**: Hệ thống tag linh hoạt

## 🚀 Deploy lên Vercel

### Cách 1: Deploy trực tiếp
1. **Tạo tài khoản Vercel**: https://vercel.com
2. **Import project**: Chọn thư mục này
3. **Deploy**: Vercel sẽ tự động deploy

### Cách 2: Sử dụng Vercel CLI
```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy production
vercel --prod
```

### Cách 3: Kết nối GitHub
1. Push code lên GitHub repository
2. Kết nối GitHub với Vercel
3. Auto deploy khi có commit mới

## 🛠️ Cài đặt local

```bash
# Clone repository
git clone <your-repo-url>
cd hoai-giang-automation-blog

# Cài đặt dependencies (optional)
npm install

# Chạy local server
npm run dev
# hoặc
npx serve .

# Mở trình duyệt
open http://localhost:3000
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

## 🎨 Tùy chỉnh

### Thay đổi thông tin cá nhân:
Sửa trong file `index.html`:
```html
<!-- Thông tin liên hệ -->
<p>lehoaigiangg@gmail.com</p>
<p>033 637 9944</p>
<p>Ninh Kiều, Cần Thơ</p>

<!-- Social links -->
<a href="your-facebook-url"><i class="fab fa-facebook"></i></a>
<a href="your-linkedin-url"><i class="fab fa-linkedin"></i></a>
```

### Thay đổi mật khẩu admin:
Sửa trong file `script.js`:
```javascript
// Dòng ~85
if (password === 'admin123') {  // Đổi mật khẩu tại đây
```

### Thay đổi màu sắc:
Sửa trong file `style.css`:
```css
/* Màu chủ đạo */
--primary-color: #2563eb;
--secondary-color: #1d4ed8;
```

## 📝 Cách sử dụng

### Đăng nhập admin:
1. Click nút **"Admin"** ở header
2. Nhập mật khẩu: `admin123`
3. Click **"Đăng nhập"**

### Viết bài mới:
1. Vào tab **"Viết bài"**
2. Điền thông tin:
   - **Tiêu đề**: Tên bài viết
   - **Chuyên mục**: automation/iot/programming/tutorial
   - **Tags**: Phân cách bằng dấu phẩy
   - **Tóm tắt**: Mô tả ngắn (tùy chọn)
   - **Nội dung**: Hỗ trợ Markdown
3. Click **"Xem trước"** để preview
4. Click **"Đăng bài"** để publish

### Quản lý bài viết:
1. Vào tab **"Quản lý bài viết"**
2. **Sửa**: Click nút "Sửa" để chỉnh sửa
3. **Xóa**: Click nút "Xóa" để xóa bài viết

## 🔧 Tính năng kỹ thuật

### Frontend:
- **HTML5**: Semantic markup
- **CSS3**: Flexbox, Grid, Animations
- **JavaScript ES6+**: Modern JavaScript
- **Responsive Design**: Mobile-first approach
- **Progressive Web App**: Fast loading, offline capable

### Libraries:
- **Font Awesome**: Icons
- **Google Fonts**: Typography (Inter)
- **Marked.js**: Markdown parser
- **LocalStorage**: Data persistence

### SEO & Performance:
- **Meta tags**: Proper SEO optimization
- **Semantic HTML**: Better search engine understanding
- **Fast loading**: Optimized assets
- **Mobile friendly**: Responsive design
- **Accessibility**: ARIA labels, keyboard navigation

## 🔒 Bảo mật

### Client-side security:
- **XSS Protection**: Content sanitization
- **Input validation**: Form validation
- **Secure headers**: Security headers in Vercel config

### Lưu ý:
- Mật khẩu admin được lưu trong code (chỉ phù hợp cho blog cá nhân)
- Dữ liệu lưu trong LocalStorage (chỉ trên máy local)
- Không có backend database (phù hợp cho blog đơn giản)

## 🚀 Nâng cấp trong tương lai

### Backend integration:
- **Database**: MongoDB, PostgreSQL
- **Authentication**: JWT, OAuth
- **API**: RESTful API hoặc GraphQL
- **File upload**: Cloudinary, AWS S3

### Advanced features:
- **Comments system**: Disqus, custom comments
- **Analytics**: Google Analytics, custom tracking
- **Newsletter**: Email subscription
- **RSS feed**: XML feed generation
- **Search**: Elasticsearch, Algolia

## 📞 Hỗ trợ

- **Email**: lehoaigiangg@gmail.com
- **Phone**: 033 637 9944
- **Location**: Ninh Kiều, Cần Thơ

## 📄 License

MIT License - Sử dụng tự do cho mục đích cá nhân và thương mại.

---

**Chúc bạn thành công với blog của mình! 🎉**
