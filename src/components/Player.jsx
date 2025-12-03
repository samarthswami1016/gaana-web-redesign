import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaPlay, FaPause, FaStepBackward, FaStepForward,
    FaRandom, FaRedoAlt, FaHeart, FaRegHeart, FaExpand
} from 'react-icons/fa';
import { usePlayerStore } from '../store/playerStore';
import FullScreenPlayer from './FullScreenPlayer';
import './Player.css';

const Player = () => {
    const navigate = useNavigate();
    const audioRef = useRef(null);
    const [showFullScreen, setShowFullScreen] = useState(false);

    const {
        currentSong,
        isPlaying,
        volume,
        currentTime,
        duration,
        repeat,
        shuffle,
        togglePlay,
        setVolume,
        setCurrentTime,
        setDuration,
        nextSong,
        previousSong,
        toggleRepeat,
        toggleShuffle,
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
            audioRef.current.volume = volume;
        }
    }, [volume]);

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

    if (!currentSong) return null;

    return (
        <div className="player">
            <audio
                ref={audioRef}
                src={currentSong.audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
            />

            {/* Song Info */}
            <div className="player-song-info">
                <img
                    src={currentSong.coverImage}
                    alt={currentSong.title}
                    className="player-cover"
                    onClick={() => navigate(`/now-playing/${currentSong._id}`)}
                />
                <div className="player-details">
                    <h4 className="player-title">{currentSong.title}</h4>
                    <p className="player-artist">{currentSong.artist}</p>
                </div>
                <button className="btn-icon-sm">
                    <FaRegHeart />
                </button>
            </div>

            {/* Controls */}
            <div className="player-controls">
                <div className="player-buttons">
                    <button
                        className={`control-btn ${shuffle ? 'active' : ''}`}
                        onClick={toggleShuffle}
                    >
                        <FaRandom />
                    </button>

                    <button className="control-btn" onClick={previousSong}>
                        <FaStepBackward />
                    </button>

                    <button className="control-btn play-btn" onClick={togglePlay}>
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>

                    <button className="control-btn" onClick={nextSong}>
                        <FaStepForward />
                    </button>

                    <button
                        className={`control-btn ${repeat ? 'active' : ''}`}
                        onClick={toggleRepeat}
                    >
                        <FaRedoAlt />
                    </button>
                </div>

                <div className="player-progress">
                    <span className="time">{formatTime(currentTime)}</span>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={(currentTime / duration) * 100 || 0}
                        onChange={handleSeek}
                        className="progress-bar"
                    />
                    <span className="time">{formatTime(duration)}</span>
                </div>
            </div>

            {/* Volume & Extras */}
            <div className="player-extras">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume * 100}
                    onChange={(e) => setVolume(e.target.value / 100)}
                    className="volume-bar"
                />
                <button
                    className="btn-icon-sm"
                    onClick={() => setShowFullScreen(true)}
                >
                    <FaExpand />
                </button>
            </div>

            {/* Full Screen Player */}
            {showFullScreen && (
                <FullScreenPlayer onClose={() => setShowFullScreen(false)} />
            )}
        </div>
    );
};

export default Player;
