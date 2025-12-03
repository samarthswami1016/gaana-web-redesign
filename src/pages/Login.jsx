import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaMusic, FaGoogle, FaFacebook } from 'react-icons/fa';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import './Auth.css';

const Login = () => {
    const navigate = useNavigate();
    const { login, loading } = useAuthStore();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(formData);

        if (result.success) {
            toast.success('Welcome back! 🎵');
            navigate('/');
        } else {
            toast.error(result.error || 'Login failed');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-background">
                <div className="auth-blob blob-1"></div>
                <div className="auth-blob blob-2"></div>
                <div className="auth-blob blob-3"></div>
            </div>

            <div className="auth-container">
                <motion.div
                    className="auth-card"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Logo */}
                    <div className="auth-logo">
                        <div className="logo-icon-large">
                            <FaMusic />
                        </div>
                        <h1 className="gradient-text">Welcome Back</h1>
                        <p className="auth-subtitle">Login to continue your music journey</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label>
                                <FaEnvelope className="input-icon" />
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <FaLock className="input-icon" />
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                            <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
                        </div>

                        <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Logging in...
                                </>
                            ) : (
                                'Login to Gaana'
                            )}
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="demo-credentials">
                        <p className="demo-title">🎯 Demo Accounts (Frontend Only)</p>
                        <div className="demo-accounts">
                            <button
                                className="demo-account-btn"
                                onClick={() => setFormData({ email: 'demo@gaana.com', password: 'demo123' })}
                            >
                                <span className="demo-label">Demo User</span>
                                <span className="demo-email">demo@gaana.com</span>
                            </button>
                            <button
                                className="demo-account-btn"
                                onClick={() => setFormData({ email: 'sam@gaana.com', password: 'sam123' })}
                            >
                                <span className="demo-label">Sam (Developer)</span>
                                <span className="demo-email">sam@gaana.com</span>
                            </button>
                        </div>
                        <p className="demo-note">Click to auto-fill credentials, then click Login</p>
                    </div>

                    {/* Divider */}
                    <div className="auth-divider">
                        <span>or continue with</span>
                    </div>

                    {/* Social Login */}
                    <div className="social-login">
                        <button className="social-btn google-btn">
                            <FaGoogle />
                            Google
                        </button>
                        <button className="social-btn facebook-btn">
                            <FaFacebook />
                            Facebook
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="auth-footer">
                        <p>Don't have an account? <Link to="/register" className="auth-link">Sign up for free</Link></p>
                    </div>
                </motion.div>

                {/* Side Info */}
                <motion.div
                    className="auth-info"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h2>Start Your Music Journey</h2>
                    <ul className="feature-list">
                        <li>🎵 Stream millions of songs</li>
                        <li>🎧 Create custom playlists</li>
                        <li>❤️ Like and save favorites</li>
                        <li>👥 Follow friends and artists</li>
                        <li>📱 Listen anywhere, anytime</li>
                    </ul>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
