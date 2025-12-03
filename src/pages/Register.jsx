import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaUser, FaMusic, FaGoogle, FaFacebook, FaUserCircle } from 'react-icons/fa';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import './Auth.css';

const Register = () => {
    const navigate = useNavigate();
    const { register, loading } = useAuthStore();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        displayName: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await register(formData);

        if (result.success) {
            toast.success('Account created successfully! 🎉');
            navigate('/');
        } else {
            toast.error(result.error || 'Registration failed');
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
                        <h1 className="gradient-text">Create Account</h1>
                        <p className="auth-subtitle">Join millions of music lovers today</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label>
                                <FaUserCircle className="input-icon" />
                                Display Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={formData.displayName}
                                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <FaUser className="input-icon" />
                                Username
                            </label>
                            <input
                                type="text"
                                placeholder="Choose a username"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                required
                            />
                        </div>

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
                                placeholder="Create a password (min 6 characters)"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                minLength={6}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Creating account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="auth-divider">
                        <span>or sign up with</span>
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
                        <p>Already have an account? <Link to="/login" className="auth-link">Login here</Link></p>
                    </div>
                </motion.div>

                {/* Side Info */}
                <motion.div
                    className="auth-info"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h2>Why Join Gaana?</h2>
                    <ul className="feature-list">
                        <li>🎵 Unlimited music streaming</li>
                        <li>🎧 HD audio quality</li>
                        <li>📱 Cross-platform access</li>
                        <li>💯 No ads for premium users</li>
                        <li>🔥 Personalized recommendations</li>
                        <li>👥 Connect with music lovers</li>
                    </ul>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
