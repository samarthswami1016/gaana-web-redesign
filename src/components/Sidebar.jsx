import { NavLink } from 'react-router-dom';
import { FaHome, FaCompass, FaSearch, FaMusic, FaUser, FaPlus } from 'react-icons/fa';
import { useAuthStore } from '../store/authStore';
import './Sidebar.css';

const Sidebar = () => {
    const { user } = useAuthStore();

    const navItems = [
        { path: '/', icon: FaHome, label: 'Home' },
        { path: '/discover', icon: FaCompass, label: 'Discover' },
        { path: '/search', icon: FaSearch, label: 'Search' },
        { path: '/library', icon: FaMusic, label: 'Your Library' },
        { path: `/profile/${user?._id}`, icon: FaUser, label: 'Profile' },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <img src="/images/logo.png" alt="Gaana Logo" className="navbar-logo-img" />
                    <span className="logo-text">GAANA</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `nav-item ${isActive ? 'active' : ''}`
                        }
                    >
                        <item.icon className="nav-icon" />
                        <span className="nav-label">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-playlists">
                <div className="playlists-header">
                    <h3>Playlists</h3>
                    <button className="btn-icon-sm">
                        <FaPlus />
                    </button>
                </div>

                <div className="playlists-list">
                    <div className="playlist-item">
                        <div className="playlist-icon">❤️</div>
                        <span>Liked Songs</span>
                    </div>
                    <div className="playlist-item">
                        <div className="playlist-icon">🔥</div>
                        <span>My Favorites</span>
                    </div>
                    <div className="playlist-item">
                        <div className="playlist-icon">🎵</div>
                        <span>Chill Vibes</span>
                    </div>
                </div>
            </div>

            <div className="sidebar-footer">
                <div className="user-profile">
                    <img
                        src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                        alt={user?.displayName}
                        className="user-avatar"
                    />
                    <div className="user-info">
                        <p className="user-name">{user?.displayName}</p>
                        <p className="user-email text-muted">{user?.email}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
