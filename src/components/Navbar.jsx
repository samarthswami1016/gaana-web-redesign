import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaCompass, FaMusic } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <img src="https://pnghdpro.com/wp-content/themes/pnghdpro/download/social-media-and-brands/gaana-app-icon.png" alt="Gaana Logo" className="navbar-logo-img" />
                    <span className="logo-text">GAANA</span>
                </Link>

                {/* Navigation Links */}
                <div className="navbar-links">
                    <Link to="/" className="nav-link">
                        <FaMusic />
                        <span>Home</span>
                    </Link>
                    <Link to="/discover" className="nav-link">
                        <FaCompass />
                        <span>Discover</span>
                    </Link>
                    <Link to="/search" className="nav-link">
                        <FaSearch />
                        <span>Search</span>
                    </Link>
                </div>

                {/* Auth Buttons */}
                <div className="navbar-auth">
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/register')}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
