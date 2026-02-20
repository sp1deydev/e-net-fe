# 🌐 E-Net Chat Application

**E-Net** là một ứng dụng nhắn tin hiện đại, tập trung vào trải nghiệm người dùng, tốc độ và tính bảo mật. Với giao diện tinh tế và khả năng hỗ trợ đa ngôn ngữ, E-Net giúp bạn "Kết nối mọi người, mọi lúc mọi nơi".

---

## ✨ Tính năng nổi bật

- 💬 **Trò chuyện thời gian thực**: Trải nghiệm nhắn tin mượt mà và tức thì.
- 🔐 **Hệ thống xác thực**: Đăng ký và đăng nhập bảo mật với giao diện bắt mắt.
- 🌍 **Đa ngôn ngữ (i18n)**: Hỗ trợ hoàn hảo cho cả tiếng Việt và tiếng Anh.
- 🎨 **Giao diện hiện đại**: Sử dụng hệ thống thiết kế Ant Design (AntD) mang lại vẻ ngoài cao cấp.
- 📱 **Thiết kế Responsive**: Hoạt động tốt trên cả máy tính, máy tính bảng và điện thoại.
- 🌗 **Chế độ tối/sáng**: Tích hợp các gam màu hài hòa, giảm mỏi mắt.

---

## 🛠️ Công nghệ sử dụng

Ứng dụng được xây dựng trên những nền tảng công nghệ mới nhất:

- **Frontend Framework**: [React 19](https://react.dev/)
- **Ngôn ngữ**: [TypeScript](https://www.typescriptlang.org/)
- **Công cụ build**: [Vite](https://vitejs.dev/)
- **Thư viện UI**: [Ant Design (AntD)](https://ant.design/)
- **Điều hướng**: [React Router Dom](https://reactrouter.com/)
- **Quốc tế hóa**: [i18next](https://www.i18next.com/) & [react-i18next](https://react.i18next.com/)
- **Biểu tượng**: @ant-design/icons

---

## 🚀 Bắt đầu nhanh

### Yêu cầu hệ thống

- Node.js (phiên bản 18 trở lên)
- npm hoặc yarn

### Cài đặt

1. **Clone repository:**
   ```bash
   git clone https://github.com/sp1deydev/e-net.git
   cd e-net
   ```

2. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

3. **Chạy ứng dụng ở chế độ phát triển:**
   ```bash
   npm run dev
   ```

4. **Build cho production:**
   ```bash
   npm run build
   ```

---

## 📂 Cấu trúc thư mục

```text
src/
├── components/   # Các component dùng chung
├── hooks/        # Custom hooks
├── i18n.tsx      # Cấu hình đa ngôn ngữ
├── pages/        # Các trang chính (Chat, Login, Register, Home)
├── services/     # API services và logic kết nối
├── store/        # Quản lý state (Zustand/Redux)
├── types/        # Định nghĩa kiểu dữ liệu TypeScript
└── utils/        # Các hàm tiện ích
```

---

## 🌐 Hỗ trợ ngôn ngữ

Hệ thống hỗ trợ chuyển đổi giữa **tiếng Việt (vi)** và **tiếng Anh (en)** một cách linh hoạt thông qua cấu hình trong `src/i18n.tsx`. Bạn có thể dễ dàng thêm ngôn ngữ mới bằng cách cập nhật file này.

---

## 🤝 Đóng góp

Mọi đóng góp nhằm cải thiện ứng dụng đều được chào đón! Hãy tạo Pull Request hoặc gửi Issue nếu bạn phát hiện lỗi hoặc muốn đề xuất tính năng mới.

---

Cảm ơn bạn đã quan tâm đến **E-Net Chat**! 🚀
