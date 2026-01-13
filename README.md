# ☁️ Cloudinary Showcase

### Media Optimization & Social Content Platform

A modern **media optimization SaaS** that allows users to upload videos, compress them automatically in the background, and generate **social-media-ready images** using Cloudinary transformations — all from a secure, production-ready dashboard.
Built with **Next.js, Prisma, PostgreSQL, Cloudinary, and Clerk**.

---

> **Notice:**  
> This project was developed as part of a **Web Development course assignment** to practice and understand **Next.js**, **TypeScript**, and **full-stack development with Prisma, Clerk, Cloudinary**.  
> It is intended for **educational and learning purposes** and not for production use.
> <br>

<p align="center">
  <img src="./screenshots/sss.png" alt="Landing Page" width="800"/>
</p>

---

## 🚀 Project Overview

Media files are often uploaded without optimization, causing:

- Slow page loads
- High bandwidth usage
- Poor social media presentation

**Cloudinary Showcase** solves this by providing a single platform to:

- Optimize videos automatically
- Track compression status in real time
- Generate correctly sized social media images instantly

All processing happens **in the cloud**, making the system scalable and production-ready.

---

## 🌟 Core Benefits

✅ **Automatic video compression**  
 Reduce file sizes without sacrificing quality.

🖼️ **Social-media-ready images**  
Generate platform-specific image formats instantly.

⚡ **Performance-optimized assets**  
Better load times, lower bandwidth costs.

🔐 **Secure multi-user access**  
Each user’s media is isolated and protected.

📊 **Real-time processing states**  
Clear UI feedback for upload, compression, and readiness.

☁️ **Scalable SaaS architecture**  
Designed for real-world cloud workloads.

---

## 🧩 Main Features

### 🔐 Authentication & Security

- Email & password authentication
- Google OAuth sign-in
- Protected routes and APIs
- Session management via Clerk

---

### 🎬 Video Optimization Dashboard

- Upload large video files
- Store metadata (size, duration)
- Automatic background compression
- Track compression status (`Compressing… → Ready`)
- Download original or compressed videos
- Delete videos with confirmation

---

<p align="center">
  <img src="./screenshots//ssss.png" alt="Landing Page" width="800"/>
</p>

<p align="center">
  <img src="./screenshots//sssss.png" alt="Landing Page" width="800"/>
</p>

---

### 🖼️ Social Media Image Creator

Generate social-media-ready images in **one click**.

**Supported capabilities:**

- Upload a single image
- Choose predefined social presets (e.g. Twitter, Instagram)
- Automatic resizing & cropping via Cloudinary
- Instant preview of generated output
- Download optimized image formats

This ensures:

- Correct aspect ratios
- No manual editing
- Platform-optimized visuals

<p align="center">
  <img src="./screenshots//ssssss.png" alt="Landing Page" width="800"/>
</p>

---

### 🎨 UI & UX

- Modern Tailwind-based design
- Loading & processing indicators
- Confirmation dialogs for destructive actions
- Fully responsive layout
- Clean SaaS-style dashboard

---

## 🛠️ Tech Stack

### 🖥️ Frontend

- **Next.js 16 (App Router + Turbopack)**
- **React**
- **Tailwind CSS**
- **Lucide Icons**

### ⚙️ Backend

- **Next.js API Routes**
- **Prisma ORM**
- **PostgreSQL**

### ☁️ Media & Processing

- **Cloudinary** (upload, transform, compress, resize)

### 🔑 Authentication

- **Clerk**

---

## 🗂️ Project Structure

```txt
cloudinary-saas/
├── app/
│   ├── (app)/
│   │   ├── home/                 # Video dashboard
│   │   ├── social-share/         # Social media image creator
│   │   └── video-upload/         # Video upload flow
│   │
│   ├── (auth)/
│   │   ├── sign-in/
│   │   └── sign-up/
│   │
│   ├── api/
│   │   ├── video-upload/         # Video upload endpoint
│   │   ├── image-upload/         # Image upload & transform
│   │   └── videos/
│   │       ├── route.ts          # Fetch user videos
│   │       └── [id]/compress/    # Compression endpoint
│   │
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── magic/                    # Visual effects
│   ├── magicui/
│   │   ├── VideoCard.tsx
│   │   ├── ConfirmDialog.tsx
│   │   └── OrbitingCircles.tsx
│
├── lib/
│   ├── prisma.ts                 # Prisma client
│   └── utils.ts
│
├── prisma/
│   └── schema.prisma
│
├── types/
│   └── index.ts                  # Shared TypeScript types
│
├── public/
│   └── images & icons
│
├── proxy.ts                      # Clerk middleware
├── next.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🗄️ Database Model (Video)

```
model Video {
  id                  String   @id @default(cuid())
  userId              String
  title               String
  description         String?
  publicId            String

  originalSize        String
  compressedSize      String
  duration            Float

  compressedReady     Boolean  @default(false)
  compressedPublicId  String?

  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
}
```

## 🔄 Video Compression Flow

1. User uploads a video
2. Video stored in Cloudinary
3. DB entry created (compressedReady = false)
4. Dashboard detects pending compression
5. Compression API runs automatically
6. Optimized version generated
7. DB updated with compressed metadata
8. UI updates to Ready

## 🔐 Environment Variables

Create a .env.local file:

```
DATABASE_URL=postgresql://user:password@host:port/db

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

## ▶️ Getting Started

```
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

📍 App runs at:
http://localhost:3000

---

## 💡 Why This Project Matters

- This project demonstrates:
- Real SaaS architecture
- Cloud-based media optimization
- Secure authentication
- Background processing
- Clean, state-driven UI
- Practical Cloudinary usage beyond basic uploads

---

## 🔎 Contact

- Email: [officialsithumbuddhika@gmail.com](mailto:officialsithumbuddhika@gmail.com)
- LinkedIn: [Sithum Buddhika Jayalal](https://www.linkedin.com/in/sithum-buddhika-jayalal-827860341)
