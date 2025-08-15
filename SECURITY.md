# 🔒 HƯỚNG DẪN BẢO MẬT

## ⚠️ QUAN TRỌNG: ĐỔI MẬT KHẨU ADMIN NGAY SAU KHI DEPLOY

### 🚨 Vấn đề bảo mật:
- Mật khẩu mặc định `admin123` có thể bị lộ qua Git history
- Bất kỳ ai có thể truy cập admin panel nếu biết mật khẩu này
- **BẮT BUỘC phải đổi mật khẩu ngay sau khi deploy**

## 🛡️ CÁCH ĐỔI MẬT KHẨU AN TOÀN

### Bước 1: Đăng nhập Admin
1. Vào website đã deploy
2. Click nút **"Admin"**
3. Nhập mật khẩu mặc định: `admin123`
4. Đăng nhập thành công

### Bước 2: Đổi mật khẩu
1. Click tab **"Cài đặt"**
2. Trong phần **"Đổi mật khẩu Admin"**:
   - **Mật khẩu hiện tại**: `admin123`
   - **Mật khẩu mới**: Nhập mật khẩu mạnh của bạn
   - **Xác nhận**: Nhập lại mật khẩu mới
3. Click **"Đổi mật khẩu"**
4. **HOÀN THÀNH!** Mật khẩu đã được thay đổi

### Bước 3: Test mật khẩu mới
1. Đăng xuất admin
2. Đăng nhập lại với mật khẩu mới
3. Đảm bảo mật khẩu cũ không còn hoạt động

## 🔐 KHUYẾN NGHỊ MẬT KHẨU MẠNH

### Mật khẩu nên có:
- ✅ **Ít nhất 8 ký tự**
- ✅ **Chữ hoa và chữ thường**
- ✅ **Số và ký tự đặc biệt**
- ✅ **Không dễ đoán** (không phải tên, ngày sinh)

### Ví dụ mật khẩu mạnh:
- `MyBlog2024!`
- `AutoMation#123`
- `HoaiGiang@2024`
- `SecureBlog$456`

## 🛠️ TÍNH NĂNG BẢO MẬT ĐÃ CÓ

### 1. Mã hóa mật khẩu:
- ✅ Mật khẩu được hash trước khi lưu
- ✅ Không lưu mật khẩu dạng plain text
- ✅ Sử dụng hash function để bảo vệ

### 2. Lưu trữ local:
- ✅ Mật khẩu hash lưu trong LocalStorage
- ✅ Chỉ có thể truy cập từ domain của bạn
- ✅ Không gửi qua network

### 3. Sao lưu & khôi phục:
- ✅ Xuất dữ liệu blog ra file JSON
- ✅ Nhập dữ liệu từ file backup
- ✅ Bảo vệ dữ liệu khỏi mất mát

## 📋 CHECKLIST BẢO MẬT

### Sau khi deploy:
- [ ] **Đổi mật khẩu admin** ngay lập tức
- [ ] **Test mật khẩu mới** hoạt động
- [ ] **Xóa mật khẩu cũ** khỏi Git history (nếu cần)
- [ ] **Backup dữ liệu** định kỳ
- [ ] **Không chia sẻ** mật khẩu admin

### Định kỳ:
- [ ] **Đổi mật khẩu** 3-6 tháng/lần
- [ ] **Backup dữ liệu** hàng tháng
- [ ] **Kiểm tra** không có ai truy cập trái phép

## 🚨 NẾU MẬT KHẨU BỊ LỘ

### Hành động ngay lập tức:
1. **Đổi mật khẩu** admin ngay
2. **Kiểm tra** các bài viết có bị sửa không
3. **Backup** dữ liệu quan trọng
4. **Xem log** Vercel để check truy cập

### Phòng ngừa:
- Không chia sẻ mật khẩu qua email/chat
- Không lưu mật khẩu trong code
- Sử dụng mật khẩu khác nhau cho các tài khoản

## 🔧 NÂNG CẤP BẢO MẬT (TƯƠNG LAI)

### Có thể thêm:
- **Two-Factor Authentication (2FA)**
- **Session timeout** tự động
- **Login attempts limit**
- **IP whitelist**
- **Audit log** cho admin actions

### Backend integration:
- **Database authentication**
- **JWT tokens**
- **OAuth login** (Google, GitHub)
- **Role-based access control**

## 📞 HỖ TRỢ BẢO MẬT

### Nếu gặp vấn đề:
1. **Quên mật khẩu**: Xóa LocalStorage và reset về `admin123`
2. **Không đổi được mật khẩu**: Check console log lỗi
3. **Mất dữ liệu**: Restore từ file backup

### Cách reset mật khẩu (khẩn cấp):
```javascript
// Mở Developer Console (F12) và chạy:
localStorage.removeItem('adminPasswordHash');
// Sau đó refresh trang và dùng mật khẩu: admin123
```

---

## ⚡ TÓM TẮT NHANH

1. **Deploy website** lên Vercel
2. **Đăng nhập admin** với `admin123`
3. **Vào tab "Cài đặt"** → Đổi mật khẩu
4. **Test mật khẩu mới** hoạt động
5. **Backup dữ liệu** định kỳ

**🔒 BẢO MẬT LÀ ƯU TIÊN HÀNG ĐẦU! HÃY ĐỔI MẬT KHẨU NGAY SAU KHI DEPLOY! 🔒**
