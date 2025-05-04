# **EDRMS - Union Management System**  

🚀 **A modern React/TypeScript dashboard application for managing unions, workflows, and documents with authentication and role-based access control.** 
---
Developed by Bernard Togiba for the Office of the Industrial Registrar. Department of Labour and Industrial Relations 2025

---

## **📌 Overview**  
This project is a **Union Management System** built with:  
- **React 18 + TypeScript** (Vite)  
- **Tailwind CSS** (Custom styling)  
- **Supabase** (Database & Auth)  
- **Protected routes & role-based access (Admin, Manager, Staff)**  
- **Data visualization (Recharts)**  
- **Form handling (React Hook Form + Zod validation)**  

Designed for **union administrators**, it provides tools for:  
✔ **User & Staff Management**  
✔ **Workflow Tracking**  
✔ **Document Management (EDRMS)**  
✔ **Union Registration & Analytics**  
✔ **Real-time Notifications**  

---

## **✨ Key Features**  

### **🔐 Authentication & Roles**  
- Secure login with **Supabase Auth**  
- **Role-based access control** (Admin, Manager, Staff)  
- Protected routes using **React Router v6**  

### **📊 Dashboard & Analytics**  
- Interactive **charts & statistics** (Recharts)  
- **Activity feed** for recent actions  
- **Data visualizations** for union metrics  

### **📂 Document Management (EDRMS)**  
- File upload & categorization  
- Search & filter documents  
- Secure access control  

### **👥 Union & Staff Management**  
- Member registration & tracking  
- Staff assignment & permissions  
- Workflow automation  

### **🛠 Technical Highlights**  
- **Type-safe code** with TypeScript  
- **Context API** for global state  
- **Custom UI components** (Tailwind)  
- **Zod validation** for forms  
- **Responsive & accessible** design  

---

## **🛠 Setup & Installation**  

### **Prerequisites**  
- Node.js (v18+)  
- Git  
- Supabase account (for auth & database)  

### **1. Clone the Repository**  
```bash
git clone https://github.com/dbaoir2024/EDRMS.git
cd EDRMS
```

### **2. Install Dependencies**  
```bash
npm install
# or
yarn install
# or
pnpm install
```

### **3. Configure Environment Variables**  
Create a `.env` file with your Supabase credentials:  
```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_KEY=your-supabase-key
```

### **4. Run the Development Server**  
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app.  

---

## **📂 Project Structure**  
```
src/
├── assets/          # Images, icons, fonts
├── components/      # Reusable UI components
├── contexts/        # Auth, Dashboard state
├── pages/           # Main views (Dashboard, Documents, etc.)
├── services/        # API calls (Supabase)
├── styles/          # Global & Tailwind config
├── types/           # TypeScript interfaces
└── utils/           # Helper functions
```

---

## **🔧 Scripts**  
| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

---

## **📜 License**  
This project is licensed under **MIT**.  

---

## **📬 Contact**  
For support or contributions, contact:  
📧 **dbaoir2024@github.com**  

---

🚀 **Happy Coding!** 🚀
