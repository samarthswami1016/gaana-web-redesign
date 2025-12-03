import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    FaUserPlus,
    FaUserCheck,
    FaPlay,
    FaHeart,
    FaShare,
    FaEllipsisV,
    FaMusic,
    FaUsers,
    FaFire
} from 'react-icons/fa';
import { IoMdMusicalNotes } from 'react-icons/io';
import './Profile.css';

// Demo user data
const demoUsers = {
    'sam': {
        _id: 'sam',
        name: 'Sam',
        username: '@sam_frontend',
        avatar: 'https://media.licdn.com/dms/image/v2/D4D35AQFBrczMFaRvFw/profile-framedphoto-shrink_200_200/B4DZkRhf3GIcAc-/0/1756935618362?e=1765270800&v=beta&t=rlg6Lnz4zGIssjD1KIkkqiyuorQX1AtsxybfbVld7hg',
        coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200',
        bio: '💻 Frontend Developer | Tech Enthusiast | UI/UX Designer ✨',
        verified: true,
        followers: 15000,
        following: 234,
        totalPlays: 0,
        songs: [
            { _id: '6', title: 'Starlight', plays: 1800000, likes: 320000, coverImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500' },
            { _id: '7', title: 'Cosmic Waves', plays: 900000, likes: 180000, coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500' }
        ],
        playlists: 5,
        location: 'India 🇮🇳'
    },
    '1': {
        _id: '1',
        name: 'Arijit Singh',
        username: '@ArijitSingh',
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Arijit_Singh_performance_at_Chandigarh_2025.jpg',
        coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200',
        bio: 'Indian playback singer and composer',
        verified: true,
        followers: 125000,
        following: 342,
        totalPlays: 5200000,
        songs: [
            { _id: '1', title: 'Agar Tum Saath Ho', plays: 2500000, likes: 450000, coverImage: 'https://a10.gaanacdn.com/gn_img/albums/10q3ZR1352/0q3ZzPm035/size_l.webp' },
            { _id: '6', title: 'Tum Hi Ho', plays: 1800000, likes: 320000, coverImage: 'https://a10.gaanacdn.com/gn_img/albums/d41WjnWPLq/41Wjz1LOWP/size_m_1712905431.webp' },
            { _id: '7', title: 'Tujhe Kitna Chahne Lage', plays: 900000, likes: 180000, coverImage: 'https://a10.gaanacdn.com/gn_img/song/ZaP37RKDy7/P371NLRVbD/size_m_1559305408.webp' }
        ],
        playlists: 12,
        location: 'India 🇮🇳'
    },
    '2': {
        _id: '2',
        name: 'Shreya Ghoshal',
        username: '@ShreyaGhoshal',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN8zkuek0DPoBQ8UM-lMOOmdKECncq1etkT4GydXLSlHPFaNZ7GK82nw&s=0',
        coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200',
        bio: '☀️ Spreading positive vibes through music | Pop Artist 🎤',
        verified: true,
        followers: 250000,
        following: 189,
        totalPlays: 8900000,
        songs: [
            { _id: '2', title: 'Summer Vibes', plays: 3200000, likes: 680000, coverImage: '/demo-covers/summer-vibes.jpg' },
            { _id: '8', title: 'Sunshine Days', plays: 2700000, likes: 520000, coverImage: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500' }
        ],
        playlists: 8,
        location: 'India 🇮🇳'
    },
    '3': {
        _id: '3',
        name: 'Lata Mangeshkar',
        username: '@LataMangeshkar',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXd_aU2gJD0u6lsuhwUrUryLKfs95tf9Bir_Oki7342IMRSASKsm-6Q&s=0',
        coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200',
        bio: '☀️ Spreading positive vibes through music | Pop Artist 🎤',
        verified: true,
        followers: 250000,
        following: 189,
        totalPlays: 8900000,
        songs: [
            { _id: '2', title: 'Summer Vibes', plays: 3200000, likes: 680000, coverImage: '/demo-covers/summer-vibes.jpg' },
            { _id: '8', title: 'Sunshine Days', plays: 2700000, likes: 520000, coverImage: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500' }
        ],
        playlists: 8,
        location: 'India 🇮🇳'
    },
    '4': {
        _id: '4',
        name: 'Sonu Nigam',
        username: '@SonuNigam',
        avatar: 'https://artium-v2-blogs.s3.ap-south-1.amazonaws.com/wp-content/uploads/2025/06/Sonu-Nigam-His-Musical-Journey-scaled.webp',
        coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200',
        bio: '☀️ Spreading positive vibes through music | Pop Artist 🎤',
        verified: true,
        followers: 250000,
        following: 189,
        totalPlays: 8900000,
        songs: [
            { _id: '2', title: 'Summer Vibes', plays: 3200000, likes: 680000, coverImage: '/demo-covers/summer-vibes.jpg' },
            { _id: '8', title: 'Sunshine Days', plays: 2700000, likes: 520000, coverImage: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500' }
        ],
        playlists: 8,
        location: 'India 🇮🇳'
    }
};

// Demo friends/followers
const demoFriends = [
    { _id: '3', name: 'Cyber Wave', avatar: 'https://i.pravatar.cc/150?img=3', username: '@cyberwave', followers: 95000, isFollowing: true },
    { _id: '4', name: 'Heart Strings', avatar: 'https://i.pravatar.cc/150?img=4', username: '@heartstrings', followers: 380000, isFollowing: false },
    { _id: '5', name: 'DJ Thunder', avatar: 'https://i.pravatar.cc/150?img=5', username: '@djthunder', followers: 420000, isFollowing: true },
    { _id: '6', name: 'Melody Rose', avatar: 'https://i.pravatar.cc/150?img=6', username: '@melodyrose', followers: 156000, isFollowing: false },
    { _id: '7', name: 'Bass King', avatar: 'https://i.pravatar.cc/150?img=7', username: '@bassking', followers: 289000, isFollowing: true },
    { _id: '8', name: 'Rhythm Soul', avatar: 'https://i.pravatar.cc/150?img=8', username: '@rhythmsoul', followers: 198000, isFollowing: false }
];

import { useAuthStore } from '../store/authStore';
import { FaSignOutAlt } from 'react-icons/fa';

const Profile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user: authUser, logout } = useAuthStore();
    const [user, setUser] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [activeTab, setActiveTab] = useState('songs');
    const [friends, setFriends] = useState(demoFriends);

    useEffect(() => {
        // If no ID is provided or it matches auth user, use auth user data if available
        const targetId = id || authUser?._id || 'sam';
        const userData = demoUsers[targetId] || demoUsers['sam'];
        setUser(userData);

        // Set default tab
        setActiveTab('songs');
    }, [id, authUser]);

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleFriendFollow = (friendId) => {
        setFriends(friends.map(f =>
            f._id === friendId ? { ...f, isFollowing: !f.isFollowing } : f
        ));
    };

    const handlePlaySong = (songId) => {
        navigate(`/now-playing/${songId}`);
    };

    const isOwnProfile = (authUser?.id || authUser?._id) === user?._id;

    if (!user) return <div className="loading">Loading...</div>;

    return (
        <div className="profile-page">
            {/* Cover Image */}
            <div className="profile-cover">
                <img src={user.coverImage} alt="Cover" />
                <div className="cover-overlay"></div>
            </div>

            {/* Profile Header */}
            <div className="profile-header">
                <div className="profile-avatar-container">
                    <img src={user.avatar} alt={user.name} className="profile-avatar" />
                    {user.verified && (
                        <div className="verified-badge">✓</div>
                    )}
                </div>

                <div className="profile-info">
                    <h1 className="profile-name">{user.name}</h1>
                    <p className="profile-username">{user.username}</p>
                    <p className="profile-bio">{user.bio}</p>
                    {user.location && (
                        <p className="profile-location">📍 {user.location}</p>
                    )}
                </div>

                <div className="profile-actions">
                    {isOwnProfile ? (
                        <button
                            className="logout-btn-profile"
                            onClick={handleLogout}
                        >
                            <FaSignOutAlt />
                            Logout
                        </button>
                    ) : (
                        <button
                            className={`follow-btn-profile ${isFollowing ? 'following' : ''}`}
                            onClick={handleFollow}
                        >
                            {isFollowing ? <FaUserCheck /> : <FaUserPlus />}
                            {isFollowing ? 'Following' : 'Follow'}
                        </button>
                    )}
                    <button className="share-btn-profile">
                        <FaShare />
                    </button>
                    <button className="more-btn-profile">
                        <FaEllipsisV />
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="profile-stats">
                <div className="stat-box">
                    <FaMusic className="stat-icon" />
                    <span className="stat-value">{formatNumber(user.totalPlays)}</span>
                    <span className="stat-label">Total Plays</span>
                </div>
                <div className="stat-box">
                    <FaUsers className="stat-icon" />
                    <span className="stat-value">{formatNumber(user.followers)}</span>
                    <span className="stat-label">Followers</span>
                </div>
                <div className="stat-box">
                    <FaHeart className="stat-icon" />
                    <span className="stat-value">{user.following}</span>
                    <span className="stat-label">Following</span>
                </div>
                <div className="stat-box">
                    <IoMdMusicalNotes className="stat-icon" />
                    <span className="stat-value">{user.playlists}</span>
                    <span className="stat-label">Playlists</span>
                </div>
            </div>

            {/* Tabs */}
            <div className="profile-tabs">
                <button
                    className={`tab-btn ${activeTab === 'songs' ? 'active' : ''}`}
                    onClick={() => setActiveTab('songs')}
                >
                    <FaMusic /> Top Songs
                </button>
                <button
                    className={`tab-btn ${activeTab === 'playlists' ? 'active' : ''}`}
                    onClick={() => setActiveTab('playlists')}
                >
                    <IoMdMusicalNotes /> Public Playlists
                </button>
                <button
                    className={`tab-btn ${activeTab === 'friends' ? 'active' : ''}`}
                    onClick={() => setActiveTab('friends')}
                >
                    <FaUsers /> Friends
                </button>
            </div>

            {/* Content */}
            <div className="profile-content">
                {activeTab === 'songs' && (
                    <div className="songs-grid">
                        {user.songs && user.songs.length > 0 ? (
                            user.songs.map(song => (
                                <div key={song._id} className="song-card-profile">
                                    <div className="song-card-image">
                                        <img src={song.coverImage} alt={song.title} />
                                        <div className="song-card-overlay">
                                            <button
                                                className="play-btn-card"
                                                onClick={() => handlePlaySong(song._id)}
                                            >
                                                <FaPlay />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="song-card-info">
                                        <h3 className="song-card-title">{song.title}</h3>
                                        <div className="song-card-stats">
                                            <span>
                                                <FaPlay /> {formatNumber(song.plays)}
                                            </span>
                                            <span>
                                                <FaHeart /> {formatNumber(song.likes)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="trending-badge">
                                        <FaFire /> Popular
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-content">
                                <p>No songs available.</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'playlists' && (
                    <div className="playlists-section">
                        <div className="playlists-grid">
                            {/* Demo Playlists */}
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="playlist-card">
                                    <div className="playlist-cover">
                                        <div className="playlist-overlay">
                                            <FaPlay />
                                        </div>
                                    </div>
                                    <div className="playlist-info">
                                        <h3>{item === 1 ? 'Chill Vibes' : item === 2 ? 'Workout Hits' : 'Late Night'}</h3>
                                        <p>{item * 12} Songs</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'friends' && (
                    <div className="friends-section">
                        <div className="friends-grid">
                            {friends.map(friend => (
                                <div key={friend._id} className="friend-card">
                                    <img src={friend.avatar} alt={friend.name} className="friend-avatar" />
                                    <div className="friend-info">
                                        <h3 className="friend-name">{friend.name}</h3>
                                        <p className="friend-username">{friend.username}</p>
                                        <p className="friend-followers">
                                            {formatNumber(friend.followers)} followers
                                        </p>
                                    </div>
                                    <button
                                        className={`friend-follow-btn ${friend.isFollowing ? 'following' : ''}`}
                                        onClick={() => handleFriendFollow(friend._id)}
                                    >
                                        {friend.isFollowing ? <FaUserCheck /> : <FaUserPlus />}
                                        {friend.isFollowing ? 'Following' : 'Follow'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
