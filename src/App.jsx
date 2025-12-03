import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';

// Pages
import Home from './pages/Home';
import Discover from './pages/Discover';
import Library from './pages/Library';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import NowPlaying from './pages/NowPlaying';

// Components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import EnhancedPlayer from './components/EnhancedPlayer';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    const { checkAuth, isAuthenticated } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <Router>
            <div className="app">
                <Toaster
                    position="top-center"
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: '#1a1a1a',
                            color: '#fff',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                        },
                    }}
                />

                {isAuthenticated ? <Sidebar /> : <Navbar />}

                <main className={`main-content ${isAuthenticated ? 'with-sidebar' : ''}`}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Public routes - no login required */}
                        <Route path="/" element={<Home />} />
                        <Route path="/discover" element={<Discover />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/now-playing/:id" element={<NowPlaying />} />
                        <Route path="/profile/:id" element={<Profile />} />

                        {/* Protected routes - login required */}
                        <Route path="/library" element={
                            <ProtectedRoute>
                                <Library />
                            </ProtectedRoute>
                        } />

                        {/* Catch all - redirect to home */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>

                {isAuthenticated && <EnhancedPlayer />}
            </div>
        </Router>
    );
}

export default App;
