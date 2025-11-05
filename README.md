# DevWrite-Multi-User-Blog

A full-featured **Next.js 16** blogging platform built with **Prisma**, **Better Auth**, and **Tailwind CSS 4**.  
It includes **user authentication**, **admin management**, **post creation/editing**, **markdown support**, and **modern UI skeletons** for loading states.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-blue?logo=prisma)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Features

### Authentication & Authorization
- Secure authentication using **Better Auth**
- Login / Signup pages with protected routes
- Role-based access (Admin / User)
- Session management using server-side validation

### User Features
- Create, update, and delete blog posts
- Edit profile information including bio and avatar
- View and save posts
- Fully client-interactive Markdown editor with live preview

### Admin Features
- Manage all users (delete or view user data)
- Manage posts
- Dashboard UI with loading skeletons
- Admin-only access routes under `(admin)` group

### Blog Features
- Fully responsive post grid and sidebar layout
- Syntax highlighting for code blocks in posts
- Markdown support with:
  - **remark-gfm**
  - **rehype-highlight**
  - **rehype-raw**
  - **rehype-sanitize**
- Dynamic post detail pages and slug routing
- Post management with optimistic updates

### Technical Highlights
- **Next.js 16 App Router**
- **React 19**
- **Tailwind CSS 4** for modern styling
- **Prisma ORM** with PostgreSQL (or any Prisma-supported DB)
- **TypeScript** with strict type safety
- **Zod** for input validation
- **Sonner** for beautiful toast notifications
- Optimized loading states with Skeleton components

---

## Project Structure

```
app/
├── (auth)/ → Login & Signup routes
├── (user)/ → User profile & create-post pages
├── (admin)/ → Admin dashboard & management tools
├── posts/ → Blog post details & update pages
└── api/ → Auth API routes

components/ → Shared UI components
lib/ → Authentication, Prisma, and data access layers
prisma/ → Prisma schema and migrations
types/ → Global TypeScript definitions
public/ → Static assets
```


---

## Tech Stack

| Category | Technology |
|-----------|-------------|
| Framework | [Next.js 16](https://nextjs.org/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| ORM | [Prisma 6](https://www.prisma.io/) |
| Auth | [Better Auth](https://better-auth.dev/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Database | SQLite / PostgreSQL / MongoDB (configurable) |
| Markdown | React Markdown + Rehype / Remark |
| Code Editor | @uiw/react-codemirror |
| Validation | Zod |
| UI Notifications | Sonner |

---

## ⚙️ Installation & Setup

### Clone the Repository
```bash
git clone https://github.com/Morshed004/DevWrite-multi-user-blog.git
cd DevWrite-multi-user-blog
```

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Set Up Environment Variables

Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./dev.db"   # or your Postgres/MongoDB URL
AUTH_SECRET="your-secret-key"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Run Prisma Migrations

```
npx prisma migrate dev
```

### Start the Development Server
```
npm run dev
```
Then visit:
👉 [http://localhost:3000](http://localhost:3000)

