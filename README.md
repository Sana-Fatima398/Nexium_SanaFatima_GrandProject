# 🍳 AI Recipe Generator

An intelligent, full-stack web application where users can generate AI-based recipes, save them, organize them into events (like birthdays or parties), and manage everything through a clean, modern interface.


---

## 🚀 Features

### ✨ AI Recipe Generator
- Users can input ingredients or a prompt.
- Recipes are generated using AI workflows powered by **n8n**.
- Users can **save**, **view**, or **delete** generated recipes.

### 🔐 Authentication & Authorization
- Magic link login system powered by **Supabase**.
- Authenticated users can:
  - Access all features
  - Manage their saved recipes and events

### 📅 Events Module
- Users can create personal events (e.g., birthdays, dinners).
- Each event includes:
  - Title, date, and time
  - Selected saved recipes
- Full **CRUD support**: Create, Read, Update, Delete events.

### 🎨 UI & Experience
- Built with **React / Next.js**
- Styled using **shadcn/ui** for clean and consistent components
- **LottieFiles** animations enhance visual engagement

---

## 🧰 Tech Stack

| Technology | Usage |
|------------|-------|
| **Next.js** | Frontend framework with server-side support |
| **React** | Component-based UI |
| **Supabase** | Auth (magic link), database (optional), and user management |
| **MongoDB** | Stores user data, recipes, and events |
| **n8n** | AI recipe generation via workflow automation |
| **shadcn/ui** | Styled UI components |
| **LottieFiles** | Animations for better user interaction |
| **Vercel** | Deployment platform |




