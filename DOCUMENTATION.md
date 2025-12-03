# Gaana Redesign - Project Documentation

## 1. Project Overview
This project is a modern, responsive redesign of the Gaana music streaming application. It features a premium, dark-themed UI with glassmorphism effects, smooth animations, and a user-friendly experience. The application is built as a Single Page Application (SPA) using React and Vite.

## 2. Technology Stack

### Core
- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** JavaScript (ES6+)

### Styling & UI
- **CSS:** Vanilla CSS with CSS Variables (Custom Properties) for a scalable design system.
- **Animations:** Framer Motion for complex page transitions and micro-interactions.
- **Icons:** React Icons (FontAwesome, Material Design, etc.)
- **Notifications:** React Hot Toast

### State Management & Routing
- **State Management:** Zustand (Lightweight, hook-based state management)
- **Routing:** React Router DOM v6

### HTTP Client
- **Data Fetching:** Axios (configured but currently using mock data for demo purposes)

## 3. Design System

The design system is built around a "Dark Premium" aesthetic, utilizing deep blacks, vibrant gradients, and glassmorphism effects.

### 3.1 Colors

#### Brand Colors
| Name | Hex Value | CSS Variable | Usage |
|------|-----------|--------------|-------|
| **Primary** | `#ff3366` | `--primary` | Main brand color (Pink/Red) |
| **Primary Dark** | `#e62958` | `--primary-dark` | Hover states for primary |
| **Secondary** | `#9333ea` | `--secondary` | Secondary brand color (Purple) |
| **Accent** | `#06b6d4` | `--accent` | Highlights and accents (Cyan) |

#### Background Colors
| Name | Hex Value | CSS Variable | Usage |
|------|-----------|--------------|-------|
| **BG Primary** | `#0a0a0a` | `--bg-primary` | Main app background |
| **BG Secondary** | `#121212` | `--bg-secondary` | Sidebar, secondary sections |
| **BG Tertiary** | `#1a1a1a` | `--bg-tertiary` | Cards, tertiary sections |
| **BG Elevated** | `#242424` | `--bg-elevated` | Modals, elevated elements |

#### Text Colors
| Name | Value | CSS Variable | Usage |
|------|-------|--------------|-------|
| **Text Primary** | `#ffffff` | `--text-primary` | Headings, main text |
| **Text Secondary** | `rgba(255, 255, 255, 0.7)` | `--text-secondary` | Subtitles, descriptions |
| **Text Muted** | `rgba(255, 255, 255, 0.4)` | `--text-muted` | Disabled text, placeholders |

### 3.2 Gradients
- **Primary Gradient:** `linear-gradient(135deg, #ff3366 0%, #9333ea 100%)`
  - Used for: Primary buttons, active states, brand text.
- **Secondary Gradient:** `linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)`
  - Used for: Feature highlights, secondary accents.
- **Dark Gradient:** `linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)`
  - Used for: Background depth.

### 3.3 Typography

#### Fonts
- **Primary Font:** `Inter` (Sans-serif) - Used for body text, UI elements.
- **Display Font:** `Poppins` (Sans-serif) - Used for Headings (h1-h6).

#### Hierarchy
- **H1:** `clamp(2rem, 5vw, 3.5rem)` - Page Titles
- **H2:** `clamp(1.5rem, 4vw, 2.5rem)` - Section Headers
- **H3:** `clamp(1.25rem, 3vw, 1.75rem)` - Card Titles

### 3.4 Glassmorphism (Glass Effect)
Used extensively for cards, sidebars, and overlays to create depth.
- **Background:** `rgba(255, 255, 255, 0.05)`
- **Border:** `1px solid rgba(255, 255, 255, 0.1)`
- **Blur:** `backdrop-filter: blur(20px)`

## 4. Project Structure

```
client/
├── public/              # Static assets (images, icons)
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Sidebar.jsx  # Main navigation sidebar
│   │   ├── Player.jsx   # Music player controls
│   │   └── ...
│   ├── pages/           # Application Route Pages
│   │   ├── Home.jsx     # Landing page with trending music
│   │   ├── Discover.jsx # Genre and playlist exploration
│   │   ├── Login.jsx    # Authentication pages
│   │   └── ...
│   ├── store/           # Global State Management
│   │   ├── authStore.js # User authentication state
│   │   └── playerStore.js # Music player state (queue, current song)
│   ├── App.jsx          # Main application component & routing
│   ├── index.css        # Global styles & Design Tokens
│   └── main.jsx         # Entry point
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

## 5. Key Features

1.  **Music Player:**
    *   Global persistent player.
    *   Play, pause, next, previous, shuffle, repeat controls.
    *   Volume control and progress bar.
    *   Queue management.

2.  **Authentication (Demo):**
    *   Login and Register pages with beautiful UI.
    *   Demo accounts for quick access.
    *   Form validation and error handling.

3.  **Discovery:**
    *   Trending songs section.
    *   Browse by genres (Electronic, Pop, Rock, etc.).
    *   Mood-based playlists.

4.  **Responsive Design:**
    *   Fully responsive layout that adapts to mobile, tablet, and desktop screens.
    *   Collapsible sidebar on smaller screens.

## 6. Setup & Running

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run Development Server:**
    ```bash
    npm run dev
    ```

3.  **Build for Production:**
    ```bash
    npm run build
    ```
