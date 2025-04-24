# 🚀 NestJS Prisma Starter

Proyek ini menggunakan [NestJS](https://nestjs.com/) sebagai framework backend dan [Prisma ORM](https://www.prisma.io/) sebagai ORM untuk mengelola database.

## 📦 Requirements

- Node.js (v18.x atau lebih tinggi)
- npm atau yarn
- PostgreSQL / MySQL / SQLite (sesuai kebutuhan)

## ⚙️ Installation

1. **Clone repository**

```bash
git clone https://github.com/widcha/mlaku-mulu.git
cd your-project
```

2. **Install dependencies**

```bash
npm install
# atau
yarn install
```

## 🛠️ Setup Prisma

1. **Buat/Sediakan DB baru lalu konfigurasi Database dan JWT Secret Key di `.env`**

```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DBNAME?schema=public"
JWT_SECRET="709589faec34e3c7fd976b79fecfaeabaaa0ea7e2ab5ee518c9c3asdbccf8151c6b"
```

2. **Jika menggunakan DB selain PostgreSQL bisa ubah bagian provider (Optional)**

Contoh isi `prisma/schema.prisma`:

```prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

```

3. **Generate Prisma Client**

```bash
npx prisma generate
```

4. **Migrasi database**

```bash
npx prisma migrate dev --name init
```

## 🧪 Run Development Server

```bash
npm run start:dev
```

## 📚 Dokumentasi API (Swagger)

Setelah server berjalan, kamu bisa akses Swagger UI di:
👉 [http://localhost:3000/api](http://localhost:3000/api)
Swagger menampilkan dokumentasi lengkap endpoint-endpoint yang tersedia.

## 📚 Useful Commands

| Command                             | Keterangan                             |
| ----------------------------------- | -------------------------------------- |
| `npx prisma migrate dev --name ...` | Membuat migrasi schema                 |
| `npx prisma generate`               | Generate Prisma Client                 |
| `npm run start:dev`                 | Jalankan server dalam mode development |

## 📁 Struktur Direktori (Singkat)

```
.
├── prisma/                  # Folder untuk Prisma schema dan konfigurasi
│   └── schema.prisma        # Skema database Prisma
│
├── src/                     # Folder utama source code aplikasi
│   ├── app/                 # Folder utama aplikasi
│   │   ├── decorators/      # Custom decorators (misalnya: @Roles)
│   │   ├── enums/           # Enum global (misalnya RolesEnum)
│   │   ├── guards/          # Auth dan role-based guards
│   │   ├── modules/         # Modul fitur
│   │   │   ├── auth/        # Modul otentikasi
│   │   │   ├── prisma/      # Modul PrismaService (dependency injection)
│   │   │   ├── trip/        # Modul fitur trip
│   │   │   ├── user/        # Modul fitur user
│   │   │   └── user_trip/   # Modul relasi user-trip
│   │   ├── app.controller.ts       # Controller utama
│   │   ├── app.controller.spec.ts  # Unit test untuk controller
│   │   ├── app.service.ts          # Service utama (opsional)
│   │   └── app.module.ts           # Root module
│
│   └── main.ts              # Entry point aplikasi (bootstrap NestJS)
│
└── test/                    # Folder untuk testing
```

## Description

Project ini dibuat untuk memenuhi technical test.

## 🛡 License

MIT
