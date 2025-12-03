import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaPlay, FaPause, FaStepForward, FaStepBackward, FaRandom, FaRedo, FaHeart, FaRegHeart,
    FaUserPlus, FaUserCheck, FaChevronDown, FaVolumeUp, FaList, FaClock, FaMusic
} from 'react-icons/fa';
import { IoMdMusicalNotes } from 'react-icons/io';
import './NowPlaying.css';

/* --------------  DEMO DATA  -------------- */
const demoSongs = [
    {
        _id: '1',
        title: 'Midnight Dreams',
        artist: 'Luna Eclipse',
        album: 'Nocturnal',
        coverImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800',
        duration: 245,
        plays: 2500000,
        likes: 450000,
        artistAvatar: 'https://i.pravatar.cc/150?img=1',
        artistFollowers: 125000,
        lyrics: [
            'In the silence of the night', 'Stars are dancing in the sky', 'Lost in midnight dreams tonight',
            'Where the moonlight meets my eyes', 'Floating through the cosmic space', 'Time has lost its gentle pace'
        ]
    },
    {
        _id: '2',
        title: 'Summer Vibes',
        artist: 'Sunny Ray',
        album: 'Tropical Paradise',
        coverImage: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800',
        duration: 210,
        plays: 3200000,
        likes: 680000,
        artistAvatar: 'https://i.pravatar.cc/150?img=2',
        artistFollowers: 250000,
        lyrics: ['Feel the sunshine on my face', 'Dancing through the summer days', 'Ocean waves and palm tree shade', 'Living in this paradise']
    },
    {
        _id: '3',
        title: 'Neon Nights',
        artist: 'Cyber Wave',
        album: 'Synthwave Dreams',
        coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800',
        duration: 268,
        plays: 1800000,
        likes: 320000,
        artistAvatar: 'https://i.pravatar.cc/150?img=3',
        artistFollowers: 95000,
        lyrics: ['City lights are calling me', 'Neon signs in pink and blue', 'Racing through the streets at night', 'Living in this electric view']
    },
    {
        _id: '3',
        title: 'Neon Nights',
        artist: 'Cyber Wave',
        album: 'Synthwave Dreams',
        coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800',
        duration: 268,
        plays: 1800000,
        likes: 320000,
        artistAvatar: 'https://i.pravatar.cc/150?img=3',
        artistFollowers: 95000,
        lyrics: ['City lights are calling me', 'Neon signs in pink and blue', 'Racing through the streets at night', 'Living in this electric view']
    },
    {
        _id: '3',
        title: 'Neon Nights',
        artist: 'Cyber Wave',
        album: 'Synthwave Dreams',
        coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800',
        duration: 268,
        plays: 1800000,
        likes: 320000,
        artistAvatar: 'https://i.pravatar.cc/150?img=3',
        artistFollowers: 95000,
        lyrics: ['City lights are calling me', 'Neon signs in pink and blue', 'Racing through the streets at night', 'Living in this electric view']
    }
];

const queueSongs = [
    { id: '2', title: 'Summer Vibes', artist: 'Sunny Ray', cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200', duration: '3:30' },
    { id: '3', title: 'Neon Nights', artist: 'Cyber Wave', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200', duration: '4:28' },
    { id: '4', title: 'Lost in Love', artist: 'Heart Strings', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200', duration: '3:54' },
    { id: '5', title: 'Electric Pulse', artist: 'DJ Thunder', cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200', duration: '3:18' },
    { id: '3', title: 'Neon Nights', artist: 'Cyber Wave', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200', duration: '4:28' },
    { id: '4', title: 'Lost in Love', artist: 'Heart Strings', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200', duration: '3:54' },
    { id: '5', title: 'Electric Pulse', artist: 'DJ Thunder', cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200', duration: '3:18' }
];

/* --------------  COMPONENT  -------------- */
export default function NowPlaying() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(70);
    const [isShuffle, setIsShuffle] = useState(false);
    const [repeatMode, setRepeatMode] = useState(0); // 0 off  1 all  2 one
    const [activeTab, setActiveTab] = useState('playlist');
    const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
    const [isMiniPlayer, setIsMiniPlayer] = useState(false);

    /* mount */
    useEffect(() => {
        const song = demoSongs.find(s => s._id === id) || demoSongs[0];
        setCurrentSong(song);
    }, [id]);

    /* timer */
    useEffect(() => {
        if (!isPlaying || !currentSong) return;
        const id = setInterval(() => {
            setCurrentTime(t => {
                if (t >= currentSong.duration) {
                    setIsPlaying(false);
                    return 0;
                }
                return t + 1;
            });
        }, 1000);
        return () => clearInterval(id);
    }, [isPlaying, currentSong]);

    /* lyrics */
    useEffect(() => {
        if (!currentSong?.lyrics) return;
        const interval = currentSong.duration / currentSong.lyrics.length;
        const idx = Math.floor(currentTime / interval);
        setCurrentLyricIndex(Math.min(idx, currentSong.lyrics.length - 1));
    }, [currentTime, currentSong]);

    /* helpers */
    const formatTime = s => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
    const formatNumber = n => n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e3 ? (n / 1e3).toFixed(1) + 'K' : n;

    const handleProgress = e => {
        if (!currentSong) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        setCurrentTime(pct * currentSong.duration);
    };

    if (!currentSong) return <div className="loading">Loading…</div>;
    const progress = (currentTime / currentSong.duration) * 100;

    /* --------------  RENDER  -------------- */
    return (
        <div className={`fullscreen-player ${isMiniPlayer ? 'mini-mode' : ''}`}>
            {/* ----- background ----- */}
            <div className="player-bg">
                <div className="bg-gradient" />
                <div className="bg-stars" />
                <div className="bg-blur" style={{ backgroundImage: `url(${currentSong.coverImage})` }} />
            </div>

            {/* ----- header ----- */}
            <motion.header className="player-header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <button className="back-button" onClick={() => navigate(-1)}><FaChevronDown /><span>Back</span></button>
                <div className="header-center"><span className="now-playing-text">NOW PLAYING</span></div>
                <button className="mini-player-toggle" onClick={() => setIsMiniPlayer(s => !s)} title={isMiniPlayer ? 'Expand' : 'Minimise'}>
                    {isMiniPlayer ? '⬆' : '⬇'}
                </button>
            </motion.header>

            {/* ----- main grid ----- */}
            <main className="player-grid">
                {/* LEFT */}
                <section className="panel left-panel">
                    <motion.div className={`album-card ${isPlaying ? 'playing' : ''}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                        <div className="album-glow" />
                        <img src={currentSong.coverImage} alt={currentSong.title} />
                        <div className="album-reflection" />
                    </motion.div>

                    <motion.div className="song-info" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <h1 className="song-title">{currentSong.title}</h1>
                        <p className="song-album">{currentSong.album}</p>
                    </motion.div>

                    <motion.div className="artist-info" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <img className="artist-avatar" src={currentSong.artistAvatar} alt={currentSong.artist} />
                        <div className="artist-text">
                            <p className="artist-name">{currentSong.artist}</p>
                            <p className="artist-followers">{formatNumber(currentSong.artistFollowers)} followers</p>
                        </div>
                        <button className={`follow-btn ${isFollowing ? 'following' : ''}`} onClick={() => setIsFollowing(s => !s)}>
                            {isFollowing ? <FaUserCheck /> : <FaUserPlus />}
                            {isFollowing ? 'Following' : 'Follow'}
                        </button>
                    </motion.div>
                </section>

                {/* CENTER */}
                <section className="panel center-panel">
                    <motion.div className="lyrics-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                        <div className="lyrics-header"><IoMdMusicalNotes /><span>Lyrics</span></div>
                        <div className="lyrics-content">
                            <AnimatePresence mode="wait">
                                {currentSong.lyrics.map((line, i) => (
                                    <motion.p
                                        key={i}
                                        className={`lyric-line ${i === currentLyricIndex ? 'active' : i < currentLyricIndex ? 'passed' : ''}`}
                                        initial={{ opacity: 0.3 }}
                                        animate={{ opacity: i === currentLyricIndex ? 1 : i < currentLyricIndex ? 0.4 : 0.3, scale: i === currentLyricIndex ? 1.05 : 1 }}
                                    >
                                        {line}
                                    </motion.p>
                                ))}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </section>

                {/* RIGHT */}
                <section className="panel right-panel">
                    <motion.div className="queue-panel" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                        <div className="queue-tabs">
                            <button
                                className={`tab ${activeTab === 'playlist' ? 'active' : ''}`}
                                onClick={() => setActiveTab('playlist')}
                            >
                                <FaList /> Playlist
                            </button>
                            <button
                                className={`tab ${activeTab === 'favorites' ? 'active' : ''}`}
                                onClick={() => setActiveTab('favorites')}
                            >
                                <FaHeart /> Favorites
                            </button>
                        </div>

                        {activeTab === 'playlist' ? (
                            <>
                                <div className="up-next">
                                    <h3>Up Next</h3>
                                    <div className="next-card">
                                        <img src={queueSongs[0].cover} alt="" />
                                        <div className="next-text">
                                            <p className="next-title">{queueSongs[0].title}</p>
                                            <p className="next-artist">{queueSongs[0].artist}</p>
                                        </div>
                                        <span className="next-duration">{queueSongs[0].duration}</span>
                                    </div>
                                </div>

                                <div className="queue-list">
                                    {queueSongs.slice(1).map((song, idx) => (
                                        <div key={song.id} className="queue-item">
                                            <span className="queue-num">{idx + 2}</span>
                                            <img src={song.cover} alt="" />
                                            <div className="queue-text">
                                                <p className="queue-title">{song.title}</p>
                                                <p className="queue-artist">{song.artist}</p>
                                            </div>
                                            <span className="queue-duration">{song.duration}</span>
                                            <button className="queue-heart"><FaRegHeart /></button>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="queue-list">
                                <div className="up-next"><h3>Your Favorites</h3></div>
                                {queueSongs.slice().reverse().map((song, idx) => (
                                    <div key={song.id} className="queue-item">
                                        <span className="queue-num">{idx + 1}</span>
                                        <img src={song.cover} alt="" />
                                        <div className="queue-text">
                                            <p className="queue-title">{song.title}</p>
                                            <p className="queue-artist">{song.artist}</p>
                                        </div>
                                        <span className="queue-duration">{song.duration}</span>
                                        <button className="queue-heart" style={{ color: '#ff3366' }}><FaHeart /></button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </section>
            </main>

            {/* ----- bottom controls ----- */}
            <motion.div className="player-controls" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <div className="progress-wrapper" onClick={handleProgress}>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${progress}%` }}>
                            <div className="progress-thumb" />
                        </div>
                    </div>
                    <div className="time-display">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(currentSong.duration)}</span>
                    </div>
                </div>

                <div className="controls-row">
                    <div className="control-group">
                        <button className={`ctrl ${isShuffle ? 'active' : ''}`} onClick={() => setIsShuffle(s => !s)}><FaRandom /></button>
                        <button className="ctrl"><FaStepBackward /></button>
                    </div>

                    <button className="play-btn" onClick={() => setIsPlaying(s => !s)}>{isPlaying ? <FaPause /> : <FaPlay />}</button>

                    <div className="control-group">
                        <button className="ctrl"><FaStepForward /></button>
                        <button className={`ctrl ${repeatMode > 0 ? 'active' : ''}`} onClick={() => setRepeatMode(m => (m + 1) % 3)}><FaRedo /></button>
                    </div>

                    <div className="volume-group">
                        <FaVolumeUp />
                        <input type="range" min="0" max="100" value={volume} onChange={e => setVolume(e.target.value)} />
                        <span>{volume}%</span>
                    </div>

                    <button className={`like-btn ${isLiked ? 'liked' : ''}`} onClick={() => setIsLiked(s => !s)}>
                        {isLiked ? <FaHeart /> : <FaRegHeart />}
                        <span>{formatNumber(currentSong.likes + (isLiked ? 1 : 0))}</span>
                    </button>
                </div>
            </motion.div>
        </div>
    );
}