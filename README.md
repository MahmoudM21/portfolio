# 🚀 Mahmoud Bmawy | Full-Stack Portfolio

A world-class, production-ready personal portfolio showcasing Full-Stack Engineering expertise. Built with the MERN stack, featuring cinematic animations, 3D graphics, and a premium dark luxury aesthetic.

![Portfolio Preview](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200)

## ✨ Features

### Frontend Excellence
- **3D Hero Section** - Interactive floating shapes with React Three Fiber
- **Smooth Animations** - Choreographed scroll reveals with Framer Motion
- **Custom Cursor** - Magnetic interactions and context-aware states
- **Dark Luxury Theme** - Glassmorphism, cyan/violet gradients, premium typography
- **Case Study Modals** - Detailed project breakdowns with architecture insights
- **Responsive Design** - Mobile-first, works beautifully on all devices

### Technical Highlights
- **Lazy Loading** - Code-split sections for optimal performance
- **SEO Optimized** - Structured data, Open Graph, meta tags
- **Accessibility** - ARIA labels, focus management, reduced motion support
- **Performance** - 90+ Lighthouse score target

### Backend & Integration
- **REST API** - Projects and Contact endpoints
- **MongoDB** - Mongoose ODM with validation
- **Email Notifications** - Contact form with Nodemailer
- **Error Handling** - Comprehensive middleware

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 + Vite | Core framework & build tool |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations & transitions |
| React Three Fiber | 3D graphics |
| Lenis | Smooth scrolling |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js + Express | Server framework |
| MongoDB + Mongoose | Database & ODM |
| Nodemailer | Email functionality |
| Express Validator | Input validation |

## 📁 Project Structure

```
portfolio/
├── client/                    # React Frontend
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/        # Reusable components
│   │   │   │   ├── AnimatedText.jsx
│   │   │   │   ├── CustomCursor.jsx
│   │   │   │   ├── MagneticWrapper.jsx
│   │   │   │   ├── PageLoader.jsx
│   │   │   │   └── ...
│   │   │   ├── layout/        # Navbar, Footer
│   │   │   ├── sections/      # Page sections
│   │   │   │   ├── Hero.jsx
│   │   │   │   ├── About.jsx
│   │   │   │   ├── Skills.jsx
│   │   │   │   ├── Projects.jsx  # With case studies
│   │   │   │   ├── Experience.jsx
│   │   │   │   ├── Achievements.jsx
│   │   │   │   └── Contact.jsx
│   │   │   └── three/         # 3D Components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API integration
│   │   └── styles/            # Global CSS
│   ├── index.html             # SEO meta tags
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                    # Express Backend
│   ├── config/
│   ├── controllers/
│   │   ├── projectController.js
│   │   └── contactController.js
│   ├── middleware/
│   │   ├── errorMiddleware.js
│   │   └── validateMiddleware.js
│   ├── models/
│   │   ├── Project.js
│   │   └── Contact.js
│   ├── routes/
│   ├── utils/
│   │   ├── email.js
│   │   └── seedData.js
│   └── server.js
│
├── README.md
├── setup.ps1                  # Windows setup
└── setup.sh                   # Unix/Mac setup
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Setup

**Windows (PowerShell):**
```powershell
.\setup.ps1
```

**Mac/Linux:**
```bash
chmod +x setup.sh && ./setup.sh
```

**Manual Setup:**

1. **Clone & Install:**
   ```bash
   git clone https://github.com/mahmoudbmawy/portfolio.git
   cd portfolio
   
   # Install dependencies
   cd server && npm install
   cd ../client && npm install
   ```

2. **Environment Setup:**
   ```bash
   # Create .env files
   copy server/env.example server/.env
   copy client/env.example client/.env
   ```

3. **Configure MongoDB:**
   
   Edit `server/.env`:
   ```env
   MONGO_URI=mongodb://localhost:27017/portfolio
   # Or for MongoDB Atlas:
   # MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
   ```

4. **Seed Database (Optional):**
   ```bash
   cd server && node utils/seedData.js
   ```

5. **Run Development:**
   ```bash
   # Terminal 1: Backend
   cd server && npm run dev
   
   # Terminal 2: Frontend
   cd client && npm run dev
   ```

6. **Open:** http://localhost:5173

## 📡 API Reference

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/projects` | Get all projects |
| `GET` | `/api/projects/:id` | Get project by ID |
| `GET` | `/api/projects/featured` | Get featured projects |
| `GET` | `/api/projects/categories` | Get categories with counts |
| `POST` | `/api/projects` | Create project |
| `PUT` | `/api/projects/:id` | Update project |
| `DELETE` | `/api/projects/:id` | Delete project |

### Contact

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/contact` | Submit contact form |
| `GET` | `/api/contact` | Get all messages |
| `GET` | `/api/contact/:id` | Get message by ID |
| `PATCH` | `/api/contact/:id` | Update status |
| `DELETE` | `/api/contact/:id` | Delete message |

## 🎨 Customization

### Colors
Edit `client/tailwind.config.js`:
```js
colors: {
  'void': '#050505',        // Background
  'cyan': '#00FFE0',        // Primary accent
  'violet': '#8B5CF6',      // Secondary accent
}
```

### Typography
- **Display:** Clash Display (headers)
- **Body:** General Sans (paragraphs)
- **Code:** JetBrains Mono (code blocks)

### Personal Info
Update in these files:
- `client/src/components/sections/Hero.jsx` - Name & tagline
- `client/src/components/sections/About.jsx` - Bio & story
- `client/src/components/sections/Contact.jsx` - Contact details
- `client/index.html` - SEO meta tags

## 🚀 Deployment

### Frontend → Vercel

1. Push to GitHub
2. Import in [Vercel](https://vercel.com)
3. Set root directory: `client`
4. Set environment variables
5. Deploy!

### Backend → Railway/Render

1. Push to GitHub
2. Create project on [Railway](https://railway.app) or [Render](https://render.com)
3. Connect repository
4. Set root directory: `server`
5. Add environment variables:
   - `MONGO_URI`
   - `NODE_ENV=production`
   - `CLIENT_URL=https://your-frontend.vercel.app`
   - Email config (if using)
6. Deploy!

### MongoDB → Atlas

1. Create free cluster at [MongoDB Atlas](https://mongodb.com/atlas)
2. Get connection string
3. Add to backend `MONGO_URI`

## 📊 Performance

Target metrics:
- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 100

Optimizations included:
- Lazy loading for sections
- Code splitting with React.lazy
- Image lazy loading
- Font preconnect
- 3D scene optimization
- Reduced motion support

## 📱 Contact

**Mahmoud Bmawy**
- 📞 Phone: +20 150 8318032
- 💼 LinkedIn: [mahmoud-bmawy](https://www.linkedin.com/in/mahmoud-bmawy-%F0%9F%98%8E-379268262/)
- 📸 Instagram: [@mahmoud.hmaad1_bmawy](https://www.instagram.com/mahmoud.hmaad1_bmawy/)

## 📄 License

MIT License - feel free to use this as a template for your own portfolio!

---

Built with ❤️ by Mahmoud Bmawy
