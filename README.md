# HCMUTE DSC · 5 năm

Website lưu giữ hành trình 5 năm của CLB Sinh viên Lập trình HCMUTE (HCMUTE DSC), từ ngày thành lập 20/07/2021. Đây là sản phẩm
**DSC Digital Memory** của dự án *5 Years Legacy*: hành trình theo năm, các thế hệ Ban Chủ nhiệm, câu chuyện, lời nhắn và kênh
đóng góp ký ức.

Dự án mở cho mọi thành viên CLB cùng làm: người viết nội dung chỉ cần sửa file trong `content/`, người code làm việc trong `src/`.

## Chạy trên máy

Cần Node.js 20 trở lên.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # kiểm tra trước khi tạo pull request
```

## Cấu trúc

```
content/                 Nội dung, sửa trực tiếp, không cần biết code
├── site.json            Tên, ngày thành lập, link, link Google Form đóng góp
├── journey.json         Hành trình theo năm: tóm tắt, dấu mốc, ảnh nổi bật
├── generations.json     Các nhiệm kỳ Ban Chủ nhiệm và các Gen thành viên
├── stories.json         Bài từ fanpage được chọn làm "câu chuyện"
├── stories/members/     Câu chuyện của thành viên (Markdown)
├── letters.json         Lời nhắn gửi DSC đã được duyệt
└── archive.json         Sinh tự động từ kho lưu trữ, đừng sửa tay
public/archive/          Ảnh cover sinh tự động từ kho lưu trữ
scripts/import-archive.mjs
src/app/                 Các trang (Next.js App Router)
src/components/          Component dùng chung
src/lib/content.ts       Đọc và gom dữ liệu từ content/
```

| Trang | Đường dẫn |
| --- | --- |
| Trang chủ | `/` |
| Hành trình, từng năm | `/hanh-trinh`, `/hanh-trinh/nam-01` … `nam-05` |
| Các thế hệ | `/the-he` |
| Câu chuyện | `/cau-chuyen`, `/cau-chuyen/[slug]` |
| Lời nhắn | `/loi-nhan` |
| Góp ký ức | `/dong-gop` |

## Dữ liệu từ kho lưu trữ

Bài đăng và ảnh lấy từ mục Hoạt động của website CLB (repo `hcmute-dsc.github.io`, thư mục `news/`). Clone repo đó cạnh repo này rồi chạy:

```bash
npm run import                                   # mặc định đọc ../hcmute-dsc.github.io
ARCHIVE_DIR=/duong/dan/khac npm run import       # nếu để ở chỗ khác
```

Script sẽ chia bài theo năm hoạt động (tính từ 20/07), thống kê số bài và số ảnh, thu nhỏ ảnh cover của các bài trong `featured`, chép nội dung các bài trong `stories.json`, và **báo lỗi nếu có id bài nào không tồn tại**. Id bài chính là tên thư mục trong `news/`, ví dụ `2022-11-08-happy-birthday-gdsc-hcmute`.

## Thêm nội dung

**Một dấu mốc:** thêm vào `milestones` của năm tương ứng trong `content/journey.json`:

```json
{ "date": "11/2022", "title": "Tên dấu mốc", "post": "id-bai-trong-news" }
```

Dùng `url` thay cho `post` nếu dấu mốc trỏ ra ngoài. `"highlight": true` để tô cam.

**Một câu chuyện thành viên:** tạo `content/stories/members/ten-cau-chuyen.md`:

```markdown
---
title: Đêm trước Open Day
author: Nguyễn Văn A
gen: Gen 3
date: 2026-10-20
cover: /stories/open-day.jpg   # tuỳ chọn, ảnh đặt trong public/stories/
excerpt: Một câu tóm tắt (tuỳ chọn)
---

Nội dung câu chuyện viết bằng Markdown...
```

**Một lời nhắn:** thêm vào `letters` trong `content/letters.json`.

**Thông tin thế hệ:** sửa `content/generations.json`. Khi một nhiệm kỳ đã được cựu thành viên xác nhận đầy đủ, đặt `"verified": true` để bỏ nhãn "Đang chờ bổ sung thông tin".

**Link form đóng góp:** dán link Google Form vào `forms.memory`, `forms.story`, `forms.letter` trong `content/site.json`. Khi để trống, nút hiển thị "sắp mở".

## Nguyên tắc nội dung

- Chỉ đăng câu chuyện, lời nhắn và ảnh khi người gửi đồng ý, và cân nhắc cả những người có trong ảnh.
- Không đăng MSSV, số điện thoại, email cá nhân hay ảnh chụp màn hình có thông tin cá nhân.
- Mọi dấu mốc phải có nguồn (bài trên fanpage, tài liệu của CLB) hoặc được người trong cuộc xác nhận.

## Đóng góp code

1. Tạo branch từ `main`, ví dụ `feat/memory-wall`.
2. Chạy `npm run lint` và `npm run build` trước khi tạo pull request.
3. Next.js trong repo này là bản 16 và có nhiều thay đổi so với các bản trước. Đọc tài liệu đi kèm trong `node_modules/next/dist/docs/` trước khi viết code (xem `AGENTS.md`).

Một số hướng phát triển tiếp: Memory Wall (ảnh do thành viên gửi), sổ lưu bút có API và kiểm duyệt, "Where are they now?", bản đồ alumni (có sự đồng ý), kỷ yếu PDF.
