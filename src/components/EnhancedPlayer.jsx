import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaPlay, FaPause, FaStepBackward, FaStepForward,
    FaRandom, FaRedoAlt, FaHeart, FaRegHeart, FaExpand,
    FaVolumeUp, FaVolumeMute, FaList, FaTimes, FaGripVertical
} from 'react-icons/fa';
import { usePlayerStore } from '../store/playerStore';
import './EnhancedPlayer.css';

const EnhancedPlayer = () => {
    const navigate = useNavigate();
    const audioRef = useRef(null);
    const [showQueue, setShowQueue] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

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
        reorderQueue
    } = usePlayerStore();

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
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

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

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const handleDragStart = (e, index) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', index);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();
        const dragIndex = parseInt(e.dataTransfer.getData('text/html'));
        if (dragIndex !== dropIndex) {
            reorderQueue(dragIndex, dropIndex);
        }
    };

    if (!currentSong) return null;

    const progress = (currentTime / duration) * 100 || 0;

    return (
        <>
            <div className="enhanced-player">
                {/* Left Side - Player */}
                <div className="player-main">
                    <audio
                        ref={audioRef}
                        src={currentSong.audioUrl}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onEnded={handleEnded}
                    />

                    {/* Album Art & Info */}
                    <div className="player-left-section">
                        <div
                            className="player-album-art"
                            onClick={() => navigate(`/now-playing/${currentSong._id}`)}
                        >
                            <img src={currentSong.coverImage} alt={currentSong.title} />
                            <div className="album-art-overlay">
                                <FaExpand />
                            </div>
                        </div>
                        <div className="player-song-details">
                            <h3 className="player-song-title">{currentSong.title}</h3>
                            <p className="player-song-artist">{currentSong.artist}</p>
                            <span className="player-song-genre">{currentSong.genre || 'Music'}</span>
                        </div>
                        <button className="player-like-btn">
                            <FaRegHeart />
                        </button>
                    </div>

                    {/* Center - Controls */}
                    <div className="player-center-section">
                        <div className="player-control-buttons">
                            <button
                                className={`player-ctrl-btn ${shuffle ? 'active' : ''}`}
                                onClick={toggleShuffle}
                                title="Shuffle"
                            >
                                <FaRandom />
                            </button>

                            <button
                                className="player-ctrl-btn"
                                onClick={previousSong}
                                title="Previous"
                            >
                                <FaStepBackward />
                            </button>

                            <button
                                className="player-play-btn"
                                onClick={togglePlay}
                            >
                                {isPlaying ? <FaPause /> : <FaPlay />}
                            </button>

                            <button
                                className="player-ctrl-btn"
                                onClick={nextSong}
                                title="Next"
                            >
                                <FaStepForward />
                            </button>

                            <button
                                className={`player-ctrl-btn ${repeat ? 'active' : ''}`}
                                onClick={toggleRepeat}
                                title="Repeat"
                            >
                                <FaRedoAlt />
                            </button>
                        </div>

                        <div className="player-progress-section">
                            <span className="player-time">{formatTime(currentTime)}</span>
                            <div className="player-progress-bar-container">
                                <div
                                    className="player-progress-bar-fill"
                                    style={{ width: `${progress}%` }}
                                >
                                    <div className="player-progress-thumb"></div>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={progress}
                                    onChange={handleSeek}
                                    className="player-progress-input"
                                />
                            </div>
                            <span className="player-time">{formatTime(duration)}</span>
                        </div>
                    </div>

                    {/* Right - Volume & Queue Toggle */}
                    <div className="player-right-section">
                        <div className="player-volume-control">
                            <button
                                className="player-ctrl-btn"
                                onClick={toggleMute}
                            >
                                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={isMuted ? 0 : volume * 100}
                                onChange={(e) => setVolume(e.target.value / 100)}
                                className="player-volume-slider"
                            />
                        </div>
                        <button
                            className={`player-queue-btn ${showQueue ? 'active' : ''}`}
                            onClick={() => setShowQueue(!showQueue)}
                            title="Queue"
                        >
                            <FaList />
                            {queue.length > 0 && (
                                <span className="queue-count">{queue.length}</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Queue Sidebar */}
            <div className={`queue-sidebar ${showQueue ? 'show' : ''}`}>
                <div className="queue-header">
                    <h3>
                        <FaList /> Queue ({queue.length})
                    </h3>
                    <button
                        className="queue-close-btn"
                        onClick={() => setShowQueue(false)}
                    >
                        <FaTimes />
                    </button>
                </div>

                <div className="queue-list">
                    {queue.length === 0 ? (
                        <div className="queue-empty">
                            <FaList />
                            <p>No songs in queue</p>
                            <span>Add songs to start playing</span>
                        </div>
                    ) : (
                        queue.map((song, index) => (
                            <div
                                key={`${song._id}-${index}`}
                                className={`queue-item ${index === currentIndex ? 'active' : ''}`}
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, index)}
                            >
                                <div className="queue-item-drag">
                                    <FaGripVertical />
                                </div>
                                <div
                                    className="queue-item-content"
                                    onClick={() => playSongAtIndex(index)}
                                >
                                    <img
                                        src={song.coverImage}
                                        alt={song.title}
                                        className="queue-item-cover"
                                    />
                                    <div className="queue-item-info">
                                        <h4>{song.title}</h4>
                                        <p>{song.artist}</p>
                                    </div>
                                    {index === currentIndex && (
                                        <div className="queue-item-playing">
                                            <div className="playing-bars">
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <button
                                    className="queue-item-remove"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeSongFromQueue(index);
                                    }}
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Overlay when queue is open */}
            {showQueue && (
                <div
                    className="queue-overlay"
                    onClick={() => setShowQueue(false)}
                />
            )}
        </>
    );
};

export default EnhancedPlayer;
