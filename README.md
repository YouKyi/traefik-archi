# Traefik Zero Trust Architecture

<div align="center">

![Traefik Architecture](https://img.shields.io/badge/Traefik-Architecture-blue?style=for-the-badge&logo=traefik)
![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-success?style=for-the-badge&logo=github)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=for-the-badge&logo=vite)

**Interactive visualization of a Zero Trust Architecture using Traefik**

[🚀 **Live Demo**](https://youkyi.github.io/traefik-archi/) | [📖 **Documentation**](#features)

</div>

---

## 📋 Overview

This project provides an interactive, stylized diagram showcasing a Zero Trust Architecture implementation with Traefik as the reverse proxy and edge router. Built with React and Vite, it features dynamic visualizations and an intuitive interface for understanding modern security architecture patterns.

## ✨ Features

- 🎨 **Stylized Mermaid Diagrams** - Beautiful, interactive architecture visualizations
- 🔒 **Zero Trust Architecture** - Complete network security model visualization
- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 🎭 **Interactive UI** - Powered by React with Material-UI and Radix UI components
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🌙 **Dark Mode Support** - Theme switching with next-themes

## 🛠️ Technology Stack

- **Framework**: React 18.3.1
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.12
- **UI Components**: 
  - Material-UI (MUI) 7.3.5
  - Radix UI primitives
  - Lucide icons
- **Animations**: Framer Motion
- **State Management**: React Hook Form
- **Utilities**: date-fns, clsx, class-variance-authority

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or pnpm

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/YouKyi/traefik-archi.git
   cd traefik-archi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## 📦 Deployment

### Automatic Deployment (Recommended)

This repository is configured with **GitHub Actions** for automatic deployment to GitHub Pages.

**Every push to the `main` branch automatically:**
1. ✅ Builds the project
2. ✅ Runs quality checks
3. ✅ Deploys to GitHub Pages
4. ✅ Updates the live site

**Setup GitHub Pages (One-time):**
1. Go to your repository **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Save and wait ~2 minutes for the first deployment

Your site will be live at: `https://youkyi.github.io/traefik-archi/`

### Manual Deployment

You can also deploy manually using:

```bash
npm run deploy
```

This uses `gh-pages` to build and push to the `gh-pages` branch.

## 📁 Project Structure

```
traefik-archi/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── src/
│   ├── app/                    # Application components
│   ├── styles/                 # Global styles and themes
│   └── main.tsx                # Application entry point
├── index.html                  # HTML template
├── vite.config.ts              # Vite configuration
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is available under the MIT License. See the [ATTRIBUTIONS.md](./ATTRIBUTIONS.md) file for third-party attributions.

## 🙏 Acknowledgments

- Original Figma design: [Stylized Mermaid Diagram](https://www.figma.com/design/l8RIOfpoyjLvIwQDmHiC7D/Stylized-Mermaid-Diagram)
- Built with [Vite](https://vitejs.dev/)
- UI components from [Material-UI](https://mui.com/) and [Radix UI](https://www.radix-ui.com/)

---

<div align="center">

**Made with ❤️ for Zero Trust Architecture**

[⬆ Back to Top](#traefik-zero-trust-architecture)

</div>