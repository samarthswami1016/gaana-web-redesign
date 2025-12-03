# Gaana Redesign 🎵

A modern, premium redesign of the Gaana music streaming application, built with React, Vite, and a custom glassmorphism design system.

![Gaana Redesign Banner](public/images/logo.png)

## 🚀 Overview

This project reimagines the Gaana user interface with a focus on "Dark Premium" aesthetics. It features a fully responsive design, smooth animations using Framer Motion, and a robust state management system using Zustand. The application is designed to provide an immersive music discovery and listening experience.

**[View Full Documentation](./DOCUMENTATION.md)** for detailed design system and architecture info.

## ✨ Key Features

- **🎨 Premium UI/UX**: Custom dark theme with vibrant gradients and glassmorphism effects.
- **📱 Fully Responsive**: Seamless experience across mobile, tablet, and desktop devices.
- **🎧 Advanced Player**: Global music player with queue management, shuffle, repeat, and volume controls.
- **🔍 Smart Discovery**: Trending songs, genre-based browsing, and mood playlists.
- **🔐 Authentication**: Beautiful Login and Register pages with form validation (Demo mode included).
- **⚡ High Performance**: Built on Vite for lightning-fast development and production builds.

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Vanilla CSS (Variables), Framer Motion
- **State Management**: Zustand
- **Routing**: React Router DOM v6
- **Icons**: React Icons

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd gaana-redesign/client
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Visit `http://localhost:5173` to view the application.

## 📂 Project Structure

```
client/
├── src/
│   ├── components/    # Reusable UI components (Sidebar, Player, etc.)
│   ├── pages/         # Page components (Home, Discover, Login, etc.)
│   ├── store/         # Global state (Zustand stores)
│   └── index.css      # Global styles and design variables
└── ...
```

## 🎨 Design System

We use a custom design system defined in `src/index.css`.
- **Primary Color**: `#ff3366` (Pink/Red)
- **Secondary Color**: `#9333ea` (Purple)
- **Font**: Inter & Poppins

See [DOCUMENTATION.md](./DOCUMENTATION.md) for the complete style guide.

## 📄 License

This project is for educational purposes. All music metadata and images are used for demonstration only.
