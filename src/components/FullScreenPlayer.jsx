import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaPlay,
    FaPause,
    FaStepBackward,
    FaStepForward,
    FaRandom,
    FaRedoAlt,
    FaHeart,
    FaRegHeart,
    FaVolumeMute,
    FaVolumeUp,
    FaTimes,
    FaGripVertical,
    FaUserPlus,
    FaUserCheck
} from 'react-icons/fa';
import { IoMdMusicalNotes } from 'react-icons/io';
import { usePlayerStore } from '../store/playerStore';
import './FullScreenPlayer.css';

const FullScreenPlayer = ({ onClose }) => {
    const navigate = useNavigate();
    const audioRef = useRef(null);
    const [activeTab, setActiveTab] = useState('queue'); // 'queue' or 'favorites'
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [showVolume, setShowVolume] = useState(false);
    const [currentLyric, setCurrentLyric] = useState('');

    const {
        currentSong,
        isPlaying,
        volume,
        currentTime,
        duration,
        repeat,
        shuffle,
        queue,
        currentIndex,
        togglePlay,
        setVolume,
        setCurrentTime,
        setDuration,
        nextSong,
        previousSong,
        toggleRepeat,
        toggleShuffle,
        playSongAtIndex,
        removeSongFromQueue,
    } = usePlayerStore();

    // Demo lyrics
    const lyrics = [
        { timestamp: 0, text: 'In the silence of the night' },
        { timestamp: 15, text: 'Stars are dancing in the sky' },
        { timestamp: 30, text: 'Lost in midnight dreams tonight' },
        { timestamp: 45, text: 'Where the moonlight meets my eyes' },
        { timestamp: 60, text: 'Whispers of a distant melody' },
        { timestamp: 75, text: 'Echoing through eternity' },
    ];

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentSong]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        // Update current lyric based on time
        const lyric = lyrics
            .filter(l => l.timestamp <= currentTime)
            .pop();
        setCurrentLyric(lyric?.text || '');
    }, [currentTime]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (e) => {
        const seekTime = (e.target.value / 100) * duration;
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
    };

    const formatTime = (time) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleEnded = () => {
        if (repeat) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        } else {
            nextSong();
        }
    };

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num?.toString() || '0';
    };

    if (!currentSong) return null;

    const upNext = queue.slice(currentIndex + 1, currentIndex + 4);

    return (
        <div className="fullscreen-player">
            <audio
                ref={audioRef}
                src={currentSong.audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
            />

            {/* Background with blur effect */}
            <div
                className="fullscreen-bg"
                style={{ backgroundImage: `url(${currentSong.coverImage})` }}
            />

            {/* Main Content */}
            <div className="fullscreen-content">
                {/* Left Section - Album Art & Controls */}
                <div className="fullscreen-left">
                    {/* Close Button */}
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>

                    {/* Album Art */}
                    <div className={`album-art-wrapper ${isPlaying ? 'playing' : ''}`}>
                        <div className="album-glow" />
                        <img
                            src={currentSong.coverImage}
                            alt={currentSong.title}
                            className="album-art-large"
                        />
                        <div className="vinyl-spin" />
                    </div>

                    {/* Song Info */}
                    <div className="song-info-section">
                        <h1 className="song-title-large">{currentSong.title}</h1>
                        <div className="artist-section">
                            <img
                                src={currentSong.artistAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=artist'}
                                alt={currentSong.artist}
                                className="artist-avatar-small"
                            />
                            <div className="artist-details-small">
                                <p className="artist-name-small">{currentSong.artist}</p>
                                <p className="artist-followers-small">
                                    {formatNumber(currentSong.followers || 125000)} followers
                                </p>
                            </div>
                            <button
                                className={`follow-btn-small ${isFollowing ? 'following' : ''}`}
                                onClick={() => setIsFollowing(!isFollowing)}
                            >
                                {isFollowing ? <FaUserCheck /> : <FaUserPlus />}
                                {isFollowing ? 'Following' : 'Follow'}
                            </button>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="progress-section-large">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={(currentTime / duration) * 100 || 0}
                            onChange={handleSeek}
                            className="progress-slider"
                        />
                        <div className="time-labels">
                            <span>{formatTime(currentTime)}</span>
                            <span>-{formatTime(duration - currentTime)}</span>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="controls-section-large">
                        <div className="secondary-controls">
                            <button
                                className={`control-btn-large ${shuffle ? 'active' : ''}`}
                                onClick={toggleShuffle}
                            >
                                <FaRandom />
                            </button>
                            <button className="control-btn-large" onClick={previousSong}>
                                <FaStepBackward />
                            </button>
                        </div>

                        <button className="play-btn-large" onClick={togglePlay}>
                            {isPlaying ? <FaPause /> : <FaPlay />}
                        </button>

                        <div className="secondary-controls">
                            <button className="control-btn-large" onClick={nextSong}>
                                <FaStepForward />
                            </button>
                            <button
                                className={`control-btn-large ${repeat ? 'active' : ''}`}
                                onClick={toggleRepeat}
                            >
                                <FaRedoAlt />
                            </button>
                        </div>
                    </div>

                    {/* Bottom Controls */}
                    <div className="bottom-controls">
                        <button
                            className={`like-btn-large ${isLiked ? 'liked' : ''}`}
                            onClick={() => setIsLiked(!isLiked)}
                        >
                            {isLiked ? <FaHeart /> : <FaRegHeart />}
                        </button>

                        <div className="volume-control">
                            <button
                                className="volume-btn"
                                onClick={() => setShowVolume(!showVolume)}
                            >
                                {volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
                            </button>
                            {showVolume && (
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={volume * 100}
                                    onChange={(e) => setVolume(e.target.value / 100)}
                                    className="volume-slider"
                                />
                            )}
                        </div>
                    </div>

                    {/* Lyrics Display */}
                    {currentLyric && (
                        <div className="lyrics-box">
                            <IoMdMusicalNotes className="lyrics-icon" />
                            <p className="lyrics-text">{currentLyric}</p>
                        </div>
                    )}
                </div>

                {/* Right Section - Queue & Up Next */}
                <div className="fullscreen-right">
                    {/* Up Next Section */}
                    <div className="up-next-section">
                        <h3 className="section-title">Up Next</h3>
                        {upNext.length > 0 ? (
                            <div className="up-next-item">
                                <img
                                    src={upNext[0].coverImage}
                                    alt={upNext[0].title}
                                    className="up-next-cover"
                                />
                                <div className="up-next-info">
                                    <p className="up-next-title">{upNext[0].title}</p>
                                    <p className="up-next-artist">{upNext[0].artist}</p>
                                </div>
                            </div>
                        ) : (
                            <p className="empty-message">No upcoming songs</p>
                        )}
                    </div>

                    {/* Tabs */}
                    <div className="queue-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'queue' ? 'active' : ''}`}
                            onClick={() => setActiveTab('queue')}
                        >
                            Playlist & Queue
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
                            onClick={() => setActiveTab('favorites')}
                        >
                            Favorites
                        </button>
                    </div>

                    {/* Queue List */}
                    <div className="queue-list">
                        {activeTab === 'queue' ? (
                            queue.length > 0 ? (
                                queue.map((song, index) => (
                                    <div
                                        key={index}
                                        className={`queue-item ${index === currentIndex ? 'playing' : ''}`}
                                        onClick={() => playSongAtIndex(index)}
                                    >
                                        <FaGripVertical className="drag-handle" />
                                        <img
                                            src={song.coverImage}
                                            alt={song.title}
                                            className="queue-item-cover"
                                        />
                                        <div className="queue-item-info">
                                            <p className="queue-item-title">{song.title}</p>
                                            <p className="queue-item-artist">{song.artist}</p>
                                        </div>
                                        <button
                                            className="queue-item-action"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // Toggle favorite
                                            }}
                                        >
                                            <FaRegHeart />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="empty-message">Queue is empty</p>
                            )
                        ) : (
                            <p className="empty-message">No favorites yet</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FullScreenPlayer;
