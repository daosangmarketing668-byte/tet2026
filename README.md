# Tết Bính Ngọ 2026 — GitHub Pages

Trang tĩnh hiển thị đồng hồ đếm ngược và pháo hoa.

Hướng dẫn nhanh để đưa lên GitHub Pages:

1. Tạo một repository mới trên GitHub (ví dụ `tet-2026`).
2. Trên máy của bạn, trong `C:/Users/Admin/Desktop/tet-2026` chạy:

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/<your-username>/tet-2026.git
git push -u origin main
```

3. Workflow GitHub Actions (`.github/workflows/pages.yml`) sẽ tự động deploy trang khi bạn push lên `main`.

4. Sau khi workflow chạy, bật Pages trong Settings → Pages nếu cần, hoặc dùng domain mặc định `https://<your-username>.github.io/tet-2026/`.
