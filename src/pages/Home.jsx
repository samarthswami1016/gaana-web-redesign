import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { usePlayerStore } from '../store/playerStore';
import { FaPlay, FaHeart, FaUserPlus } from 'react-icons/fa';
import './Home.css';

// Demo songs with creative covers
const demoSongs = [
    {
        _id: '1',
        title: 'Midnight Dreams',
        artist: 'Luna Eclipse',
        artistId: '1',
        coverImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500',
        plays: 2500000,
        likes: 450000,
        genre: 'Electronic',
        mood: 'Chill'
    },
    {
        _id: '2',
        title: 'Summer Vibes',
        artist: 'Sunny Ray',
        artistId: '2',
        coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500',
        plays: 3200000,
        likes: 680000,
        genre: 'Pop',
        mood: 'Happy'
    },
    {
        _id: '3',
        title: 'Neon Nights',
        artist: 'Cyber Wave',
        artistId: '3',
        coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500',
        plays: 1800000,
        likes: 320000,
        genre: 'Synthwave',
        mood: 'Energetic'
    },
    {
        _id: '4',
        title: 'Lost in Love',
        artist: 'Heart Strings',
        artistId: '4',
        coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500',
        plays: 4100000,
        likes: 890000,
        genre: 'R&B',
        mood: 'Romantic'
    },
    {
        _id: '5',
        title: 'Electric Pulse',
        artist: 'DJ Thunder',
        artistId: '5',
        coverImage: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500',
        plays: 2900000,
        likes: 540000,
        genre: 'EDM',
        mood: 'Energetic'
    },
    {
        _id: '6',
        title: 'Starlight',
        artist: 'Luna Eclipse',
        artistId: '1',
        coverImage: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500',
        plays: 1800000,
        likes: 320000,
        genre: 'Electronic',
        mood: 'Calm'
    }
];

const Home = () => {
    const navigate = useNavigate();
    const [trendingSongs, setTrendingSongs] = useState(demoSongs);
    const { setCurrentSong, setQueue } = usePlayerStore();

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const playSong = (song) => {
        navigate(`/now-playing/${song._id}`);
    };

    const viewArtist = (artistId) => {
        navigate(`/profile/${artistId}`);
    };

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Music for Every Mood
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="hero-subtitle"
                    >
                        Discover millions of songs, create playlists, and connect with artists
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="hero-buttons"
                    >
                        <button className="btn btn-primary" onClick={() => playSong(demoSongs[0])}>
                            <FaPlay /> Start Listening
                        </button>
                        <button className="btn btn-secondary" onClick={() => navigate('/discover')}>
                            Browse Library
                        </button>
                    </motion.div>
                </div>
                <div className="hero-gradient"></div>
            </section>

            {/* Trending Songs */}
            <section className="section">
                <div className="section-header">
                    <h2>Trending Now 🔥</h2>
                    <button className="btn-text">See All</button>
                </div>

                <div className="songs-grid">
                    {trendingSongs.map((song, index) => (
                        <motion.div
                            key={song._id}
                            className="song-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <div className="song-card-image-wrapper" onClick={() => playSong(song)}>
                                <img
                                    src={song.coverImage}
                                    alt={song.title}
                                    className="song-card-image"
                                />
                                <div className="song-card-overlay">
                                    <button className="play-button">
                                        <FaPlay />
                                    </button>
                                </div>
                                <div className="song-card-badge">
                                    <span className="badge-plays">{formatNumber(song.plays)} plays</span>
                                </div>
                            </div>
                            <div className="song-card-info">
                                <h3 className="song-card-title" title={song.title}>{song.title}</h3>
                                <p
                                    className="song-card-artist"
                                    onClick={() => viewArtist(song.artistId)}
                                    style={{ cursor: 'pointer' }}
                                    title={song.artist}
                                >
                                    {song.artist}
                                </p>
                                <div className="song-card-meta">
                                    <span className="genre-tag">{song.genre}</span>
                                    <button className="like-btn">
                                        <FaHeart /> {formatNumber(song.likes)}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Mood Playlists */}
            <section className="section">
                <div className="section-header">
                    <h2>Playlists for Your Mood</h2>
                </div>

                <div className="mood-grid">
                    {moods.map((mood, index) => (
                        <motion.div
                            key={mood.name}
                            className="mood-card"
                            style={{ background: mood.gradient }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <div className="mood-icon">{mood.icon}</div>
                            <h3>{mood.name}</h3>
                            <p>{mood.count} songs</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Top Artists */}
            <section className="section">
                <div className="section-header">
                    <h2>Top Artists</h2>
                    <button className="btn-text">See All</button>
                </div>

                <div className="artists-grid">
                    {artists.map((artist, index) => (
                        <motion.div
                            key={artist.id}
                            className="artist-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            onClick={() => viewArtist(artist.id)}
                        >
                            <img src={artist.image} alt={artist.name} className="artist-image" />
                            <div className="artist-overlay">
                                <button className="follow-artist-btn">
                                    <FaUserPlus /> Follow
                                </button>
                            </div>
                            <h3>{artist.name}</h3>
                            <p>{artist.followers} followers</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

// Mock data
const moods = [
    { name: 'Happy', icon: '😊', count: 150, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { name: 'Sad', icon: '😢', count: 120, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { name: 'Energetic', icon: '⚡', count: 200, gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    { name: 'Calm', icon: '🧘', count: 180, gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' },
    { name: 'Romantic', icon: '❤️', count: 160, gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
    { name: 'Party', icon: '🎉', count: 140, gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
];

const artists = [
    { id: '1', name: 'Arijit Singh', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Arijit_Singh_performance_at_Chandigarh_2025.jpg', followers: '125K' },
    { id: '2', name: 'Shreya Ghoshal', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN8zkuek0DPoBQ8UM-lMOOmdKECncq1etkT4GydXLSlHPFaNZ7GK82nw&s=0', followers: '250K' },
    { id: '3', name: 'Lata Mangeshkar', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXd_aU2gJD0u6lsuhwUrUryLKfs95tf9Bir_Oki7342IMRSASKsm-6Q&s=0', followers: '95K' },
    { id: '4', name: 'Sonu Nigam', image: 'https://artium-v2-blogs.s3.ap-south-1.amazonaws.com/wp-content/uploads/2025/06/Sonu-Nigam-His-Musical-Journey-scaled.webp', followers: '380K' }
];

export default Home;
