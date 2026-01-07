# SSR E-commerce Admin Dashboard

A modern **server-side rendered (SSR)** admin dashboard built with **Next.js** to manage products, images, and sales data efficiently.  
Designed to be **secure**, **scalable**, and **easy to maintain**.

This project focuses on real-world admin workflows like inventory management, authentication, and cloud media handling.

---

## Features

### Performance & SEO
- Server-Side Rendering (SSR) using Next.js
- Faster page loads and improved SEO
- Secure server-side data fetching

### Product Management
- Full CRUD operations (Create, Read, Update, Delete)
- Real-time data updates after every change

### Smart Forms & Validation
- Multi-step product creation forms
- Strong server-side validation using **Zod**
- Enforced character limits, data types, and numeric constraints

### Image Uploads
- Product images stored using **Cloudinary**
- Fast and optimized delivery via global CDN

### Analytics Dashboard
- Sales and stock visualizations using **Recharts**

### Responsive UI
- Built with **Tailwind CSS** and **Shadcn/UI**
- Fully responsive across all screen sizes

---

## Tech Stack

| Purpose | Technology |
|------|-----------|
| Framework | Next.js 15+ (App Router) |
| Database | MongoDB (Mongoose ODM) |
| Authentication | NextAuth.js |
| Validation | Zod |
| Charts | Recharts |
| Image Storage | Cloudinary |
| Styling | Tailwind CSS + Shadcn/UI |

---

## Authentication & Security

### Admin Access Only
- Only users with the **admin role** can access the dashboard
- All `/dashboard` routes are protected using **Next.js middleware**

### Secure Sessions
- JWT-based authentication for SSR compatibility
- Passwords are hashed using **Bcrypt**

### Admin Management
- Admin registration pages are hidden from public access
- Only existing admins can create new admin accounts

---

## Application Flow

1. Admin visits a protected dashboard route
2. Middleware verifies authentication and role
3. Server fetches required data from MongoDB
4. Page is rendered on the server
5. Server Actions validate and process form submissions using Zod

---

## Environment Setup

Create a `.env` file in the project root and add:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://ssr-admin-dashboard-project-git-main-simply-cheshtas-projects.vercel.app


CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret


---

## Live Deployment

The application is officially live and running in a production environment.

- **Production URL:**  
  https://ssr-admin-dashboard-project-git-main-simply-cheshtas-projects.vercel.app/

- **Platform:** Vercel (Production)
- **Database:** MongoDB Atlas (Cloud)

---

## Demo Video

 https://drive.google.com/file/d/1ryNAVKnWboS0QPDezB1wOaYp86QEXVuE/view?usp=sharing

---

## Access & Login Credentials

To explore the administrative features, use the following **demo admin account**.
 
> Access is restricted to users with the `admin` role assigned in the database.

| Field | Value |
| --- | --- |
| **Login URL** | `/login` |
| **Email Address** | `admin@test.com` |
| **Password** | `admin123` |


> All sub-routes under `/dashboard` are protected by **NextAuth.js middleware**.  
> Unauthorized access attempts are automatically redirected to the login page.

---


---





