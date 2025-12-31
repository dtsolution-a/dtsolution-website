# DT Solutions - Portfolio Website

A stunning, modern portfolio website for DT Solutions built with React, featuring advanced animations, smooth scrolling, and beautiful design.

## 🎨 Features

- **Modern Design**: Dark theme with coral/orange accent colors inspired by the original portfolio
- **Advanced Animations**:
  - GSAP-powered scroll-triggered animations
  - Framer Motion for smooth component transitions
  - Parallax effects on hero section
  - Typography animations with staggered reveals
  - Custom cursor (desktop only)

- **Smooth Scrolling**: Lenis smooth scroll for buttery-smooth page navigation

- **Fully Responsive**: Mobile-first design that looks great on all devices

- **Interactive Sections**:
  - Hero with parallax background
  - About with animated stats
  - Services with hover effects
  - Portfolio gallery with category filtering
  - Contact form with field animations
  - Footer with links and social media

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
\`\`\`bash
cd dt-solution-website
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open your browser and visit:
\`\`\`
http://localhost:5173
\`\`\`

## 📦 Build for Production

\`\`\`bash
npm run build
\`\`\`

The production-ready files will be in the \`dist\` folder.

## 🎨 Customization

### Colors
Edit \`tailwind.config.js\` and \`src/index.css\` to change the color scheme:
- Primary: Coral (#FF7A64)
- Secondary: Orange (#FF8A5B)
- Background: Dark (#0a0a0a)

### Content
- **Hero Section**: Edit \`src/components/Hero/Hero.jsx\`
- **About Section**: Edit \`src/components/About/About.jsx\`
- **Services**: Edit the services array in \`src/components/Services/Services.jsx\`
- **Portfolio**: Replace project data in \`src/components/Portfolio/Portfolio.jsx\`
- **Contact Info**: Update details in \`src/components/Contact/Contact.jsx\`

### Images
Replace Unsplash placeholder images in Portfolio section with your actual project images.

### Fonts
The website uses **Space Grotesk** font. Change it in \`src/index.css\` if needed.

## 🛠️ Tech Stack

- **React 19** - UI Framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - React animation library
- **GSAP** - Advanced animations
- **Lenis** - Smooth scroll

## 📱 Sections

1. **Hero** - Eye-catching landing with animated logo and CTA
2. **About** - Company philosophy, stats, and expertise areas
3. **Services** - 6 service cards with hover effects
4. **Portfolio** - Filterable project gallery
5. **Contact** - Contact form with animations + contact info
6. **Footer** - Links and copyright

## 🎯 Performance Tips

- Images are lazy-loaded
- Animations are optimized for 60fps
- Custom cursor only on desktop
- Smooth scroll with hardware acceleration

## 📝 Notes

- Custom cursor is disabled on mobile for better UX
- All animations use CSS transforms for better performance
- Portfolio images are from Unsplash (replace with your own)
- Contact form needs backend integration for actual email sending

## 🤝 Credits

Designed and developed by **Dhiraj & Tejas** - DT Solutions

---

**Colors Reference:**
- Dark: #0a0a0a
- Dark Light: #1a1a1a
- Coral: #FF7A64
- Orange: #FF8A5B

**Sanskrit Quote:**
शिल्पेन संदेशो गच्छति दूरम् । कलया जगत् सुशोभते ॥

*"Through design, messages travel far. Through art, the world becomes beautiful."*
