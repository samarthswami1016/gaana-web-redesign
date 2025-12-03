import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FaPlay,
    FaFire,
    FaMusic,
    FaGuitar,
    FaDrum,
    FaMicrophone,
    FaHeadphones,
    FaHeart
} from 'react-icons/fa';
import './Discover.css';

// Demo data for genres
const genres = [
    {
        id: 1,
        name: 'Electronic',
        icon: <FaHeadphones />,
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        songs: 1250,
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500'
    },
    {
        id: 2,
        name: 'Pop',
        icon: <FaMicrophone />,
        color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        songs: 2340,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500'
    },
    {
        id: 3,
        name: 'Rock',
        icon: <FaGuitar />,
        color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        songs: 1890,
        image: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500'
    },
    {
        id: 4,
        name: 'Hip Hop',
        icon: <FaDrum />,
        color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
        songs: 1560,
        image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=500'
    },
    {
        id: 5,
        name: 'Jazz',
        icon: <FaMusic />,
        color: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
        songs: 980,
        image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=500'
    },
    {
        id: 6,
        name: 'Classical',
        icon: <FaMusic />,
        color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        songs: 1120,
        image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=500'
    }
];

// Featured playlists
const featuredPlaylists = [
    {
        id: 1,
        title: 'Today\'s Top Hits',
        description: 'The hottest tracks right now',
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500',
        songs: 50,
        followers: '2.5M'
    },
    {
        id: 2,
        title: 'Chill Vibes',
        description: 'Relax and unwind with these tracks',
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500',
        songs: 75,
        followers: '1.8M'
    },
    {
        id: 3,
        title: 'Workout Mix',
        description: 'Get pumped with high-energy music',
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500',
        songs: 60,
        followers: '1.2M'
    },
    {
        id: 4,
        title: 'Late Night Vibes',
        description: 'Perfect for those midnight hours',
        image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500',
        songs: 45,
        followers: '980K'
    }
];

// New releases
const newReleases = [
    {
        id: 1,
        title: 'Midnight Dreams',
        artist: 'Luna Eclipse',
        artistId: '1',
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500',
        releaseDate: '2024-12-01'
    },
    {
        id: 2,
        title: 'Summer Vibes',
        artist: 'Sunny Ray',
        artistId: '2',
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500',
        releaseDate: '2024-11-28'
    },
    {
        id: 3,
        title: 'Neon Nights',
        artist: 'Cyber Wave',
        artistId: '3',
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500',
        releaseDate: '2024-11-25'
    },
    {
        id: 4,
        title: 'Lost in Love',
        artist: 'Heart Strings',
        artistId: '4',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500',
        releaseDate: '2024-11-22'
    },
    {
        id: 5,
        title: 'Electric Pulse',
        artist: 'DJ Thunder',
        artistId: '5',
        image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500',
        releaseDate: '2024-11-20'
    },
    {
        id: 6,
        title: 'Starlight',
        artist: 'Luna Eclipse',
        artistId: '1',
        image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500',
        releaseDate: '2024-11-18'
    }
];

const Discover = () => {
    const navigate = useNavigate();
    const [selectedGenre, setSelectedGenre] = useState(null);

    const handlePlaySong = (songId) => {
        navigate(`/now-playing/${songId}`);
    };

    const handleViewArtist = (artistId) => {
        navigate(`/profile/${artistId}`);
    };

    return (
        <div className="discover-page">
            {/* Hero Section */}
            <section className="discover-hero">
                <motion.div
                    className="discover-hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1>
                        <FaFire className="hero-icon" />
                        Discover New Music
                    </h1>
                    <p>Explore trending songs, genres, and curated playlists</p>
                </motion.div>
            </section>

            {/* Genres Section */}
            <section className="discover-section">
                <div className="section-header">
                    <h2>Browse by Genre</h2>
                    <p>Find music that matches your mood</p>
                </div>
                <div className="genres-grid">
                    {genres.map((genre, index) => (
                        <motion.div
                            key={genre.id}
                            className="genre-card"
                            style={{ background: genre.color }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            onClick={() => setSelectedGenre(genre.id)}
                        >
                            <div className="genre-card-bg">
                                <img src={genre.image} alt={genre.name} />
                            </div>
                            <div className="genre-card-content">
                                <div className="genre-icon">{genre.icon}</div>
                                <h3>{genre.name}</h3>
                                <p>{genre.songs} songs</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Featured Playlists */}
            <section className="discover-section">
                <div className="section-header">
                    <h2>Featured Playlists</h2>
                    <p>Curated collections for every moment</p>
                </div>
                <div className="playlists-grid">
                    {featuredPlaylists.map((playlist, index) => (
                        <motion.div
                            key={playlist.id}
                            className="playlist-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <div className="playlist-card-image">
                                <img src={playlist.image} alt={playlist.title} />
                                <div className="playlist-card-overlay">
                                    <button className="playlist-play-btn">
                                        <FaPlay />
                                    </button>
                                </div>
                            </div>
                            <div className="playlist-card-info">
                                <h3>{playlist.title}</h3>
                                <p>{playlist.description}</p>
                                <div className="playlist-stats">
                                    <span><FaMusic /> {playlist.songs} songs</span>
                                    <span><FaHeart /> {playlist.followers}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* New Releases */}
            <section className="discover-section">
                <div className="section-header">
                    <h2>New Releases</h2>
                    <p>Fresh tracks from your favorite artists</p>
                </div>
                <div className="releases-grid">
                    {newReleases.map((release, index) => (
                        <motion.div
                            key={release.id}
                            className="release-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <div
                                className="release-card-image"
                                onClick={() => handlePlaySong(release.id)}
                            >
                                <img src={release.image} alt={release.title} />
                                <div className="release-card-overlay">
                                    <button className="release-play-btn">
                                        <FaPlay />
                                    </button>
                                </div>
                                <div className="release-badge">NEW</div>
                            </div>
                            <div className="release-card-info">
                                <h3>{release.title}</h3>
                                <p onClick={() => handleViewArtist(release.artistId)}>
                                    {release.artist}
                                </p>
                                <span className="release-date">
                                    {new Date(release.releaseDate).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Discover;
