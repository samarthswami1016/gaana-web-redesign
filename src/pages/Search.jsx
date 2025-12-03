import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaPlay, FaHeart, FaFire, FaClock } from 'react-icons/fa';
import './Search.css';

// Demo trending searches
const trendingSearches = [
    'Summer Vibes',
    'Chill Beats',
    'Workout Mix',
    'Late Night',
    'Electronic',
    'Pop Hits'
];

// Demo recent searches
const recentSearches = [
    'Arijit Singh',
    'Midnight Dreams',
    'Neon Nights',
    'DJ Thunder'
];

// Demo popular songs
const popularSongs = [
    {
        _id: '1',
        title: 'Midnight Dreams',
        artist: 'Luna Eclipse',
        artistId: '1',
        coverImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500',
        plays: 2500000,
        likes: 450000,
        genre: 'Electronic'
    },
    {
        _id: '2',
        title: 'Summer Vibes',
        artist: 'Sunny Ray',
        artistId: '2',
        coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500',
        plays: 3200000,
        likes: 680000,
        genre: 'Pop'
    },
    {
        _id: '3',
        title: 'Neon Nights',
        artist: 'Cyber Wave',
        artistId: '3',
        coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500',
        plays: 1800000,
        likes: 320000,
        genre: 'Synthwave'
    },
    {
        _id: '4',
        title: 'Lost in Love',
        artist: 'Heart Strings',
        artistId: '4',
        coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500',
        plays: 4100000,
        likes: 890000,
        genre: 'R&B'
    },
    {
        _id: '5',
        title: 'Electric Pulse',
        artist: 'DJ Thunder',
        artistId: '5',
        coverImage: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500',
        plays: 2900000,
        likes: 540000,
        genre: 'EDM'
    },
    {
        _id: '6',
        title: 'Starlight',
        artist: 'Luna Eclipse',
        artistId: '1',
        coverImage: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500',
        plays: 1800000,
        likes: 320000,
        genre: 'Electronic'
    }
];

// Demo top artists
const topArtists = [
    { id: '1', name: 'Arijit Singh', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Arijit_Singh_performance_at_Chandigarh_2025.jpg', followers: '125K' },
    { id: '2', name: 'Shreya Ghoshal', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN8zkuek0DPoBQ8UM-lMOOmdKECncq1etkT4GydXLSlHPFaNZ7GK82nw&s=0', followers: '250K' },
    { id: '3', name: 'Lata Mangeshkar', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXd_aU2gJD0u6lsuhwUrUryLKfs95tf9Bir_Oki7342IMRSASKsm-6Q&s=0', followers: '95K' },
    { id: '4', name: 'Sonu Nigam', image: 'https://artium-v2-blogs.s3.ap-south-1.amazonaws.com/wp-content/uploads/2025/06/Sonu-Nigam-His-Musical-Journey-scaled.webp', followers: '380K' }
];

const Search = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim()) {
            setIsSearching(true);
            // Simulate search
            const results = popularSongs.filter(song =>
                song.title.toLowerCase().includes(query.toLowerCase()) ||
                song.artist.toLowerCase().includes(query.toLowerCase()) ||
                song.genre.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
            setIsSearching(false);
        }
    };

    const handleTrendingClick = (term) => {
        handleSearch(term);
    };

    const playSong = (songId) => {
        navigate(`/now-playing/${songId}`);
    };

    const viewArtist = (artistId) => {
        navigate(`/profile/${artistId}`);
    };

    return (
        <div className="search-page">
            {/* Search Header */}
            <div className="search-header">
                <motion.div
                    className="search-box-container"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search for songs, artists, or genres..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    {searchQuery && (
                        <button className="clear-btn" onClick={() => handleSearch('')}>
                            ✕
                        </button>
                    )}
                </motion.div>
            </div>

            {/* Search Results or Default Content */}
            <div className="search-content">
                {isSearching && searchResults.length > 0 ? (
                    <div className="search-results">
                        <h2>Search Results ({searchResults.length})</h2>
                        <div className="results-grid">
                            {searchResults.map((song, index) => (
                                <motion.div
                                    key={song._id}
                                    className="result-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <div className="result-image-wrapper" onClick={() => playSong(song._id)}>
                                        <img src={song.coverImage} alt={song.title} />
                                        <div className="result-overlay">
                                            <button className="result-play-btn">
                                                <FaPlay />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="result-info">
                                        <h3>{song.title}</h3>
                                        <p onClick={() => viewArtist(song.artistId)}>{song.artist}</p>
                                        <div className="result-meta">
                                            <span className="result-genre">{song.genre}</span>
                                            <span className="result-likes">
                                                <FaHeart /> {formatNumber(song.likes)}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ) : isSearching && searchResults.length === 0 ? (
                    <div className="no-results">
                        <div className="no-results-icon">🔍</div>
                        <h2>No results found</h2>
                        <p>Try searching for something else</p>
                    </div>
                ) : (
                    <>
                        {/* Trending Searches */}
                        <section className="search-section">
                            <div className="section-header">
                                <h2><FaFire /> Trending Searches</h2>
                            </div>
                            <div className="trending-tags">
                                {trendingSearches.map((term, index) => (
                                    <motion.button
                                        key={index}
                                        className="trending-tag"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        onClick={() => handleTrendingClick(term)}
                                    >
                                        {term}
                                    </motion.button>
                                ))}
                            </div>
                        </section>

                        {/* Recent Searches */}
                        {recentSearches.length > 0 && (
                            <section className="search-section">
                                <div className="section-header">
                                    <h2><FaClock /> Recent Searches</h2>
                                </div>
                                <div className="recent-list">
                                    {recentSearches.map((term, index) => (
                                        <motion.div
                                            key={index}
                                            className="recent-item"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            onClick={() => handleTrendingClick(term)}
                                        >
                                            <FaClock className="recent-icon" />
                                            <span>{term}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Popular Right Now */}
                        <section className="search-section">
                            <div className="section-header">
                                <h2>Popular Right Now</h2>
                            </div>
                            <div className="popular-grid">
                                {popularSongs.slice(0, 6).map((song, index) => (
                                    <motion.div
                                        key={song._id}
                                        className="popular-card"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                    >
                                        <div className="popular-image-wrapper" onClick={() => playSong(song._id)}>
                                            <img src={song.coverImage} alt={song.title} />
                                            <div className="popular-overlay">
                                                <button className="popular-play-btn">
                                                    <FaPlay />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="popular-info">
                                            <h3>{song.title}</h3>
                                            <p onClick={() => viewArtist(song.artistId)}>{song.artist}</p>
                                            <div className="popular-meta">
                                                <span className="popular-genre">{song.genre}</span>
                                                <span className="popular-likes">
                                                    <FaHeart /> {formatNumber(song.likes)}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Top Artists */}
                        <section className="search-section">
                            <div className="section-header">
                                <h2>Top Artists</h2>
                            </div>
                            <div className="artists-grid">
                                {topArtists.map((artist, index) => (
                                    <motion.div
                                        key={artist.id}
                                        className="artist-card-search"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        onClick={() => viewArtist(artist.id)}
                                    >
                                        <img src={artist.image} alt={artist.name} />
                                        <h3>{artist.name}</h3>
                                        <p>{artist.followers} followers</p>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    </>
                )}
            </div>
        </div>
    );
};

export default Search;
