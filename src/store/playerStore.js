import { create } from 'zustand';

export const usePlayerStore = create((set, get) => ({
    currentSong: null,
    isPlaying: false,
    volume: 0.7,
    currentTime: 0,
    duration: 0,
    queue: [],
    currentIndex: 0,
    repeat: false,
    shuffle: false,

    setCurrentSong: (song) => set({ currentSong: song, isPlaying: true }),

    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

    setVolume: (volume) => set({ volume }),

    setCurrentTime: (time) => set({ currentTime: time }),

    setDuration: (duration) => set({ duration }),

    nextSong: () => {
        const { queue, currentIndex, shuffle } = get();
        if (queue.length === 0) return;

        let nextIndex;
        if (shuffle) {
            nextIndex = Math.floor(Math.random() * queue.length);
        } else {
            nextIndex = (currentIndex + 1) % queue.length;
        }

        set({
            currentIndex: nextIndex,
            currentSong: queue[nextIndex],
            isPlaying: true
        });
    },

    previousSong: () => {
        const { queue, currentIndex } = get();
        if (queue.length === 0) return;

        const prevIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
        set({
            currentIndex: prevIndex,
            currentSong: queue[prevIndex],
            isPlaying: true
        });
    },

    setQueue: (songs, startIndex = 0) => set({
        queue: songs,
        currentIndex: startIndex,
        currentSong: songs[startIndex]
    }),

    playSongAtIndex: (index) => {
        const { queue } = get();
        if (queue[index]) {
            set({
                currentIndex: index,
                currentSong: queue[index],
                isPlaying: true
            });
        }
    },

    removeSongFromQueue: (index) => {
        const { queue, currentIndex } = get();
        const newQueue = queue.filter((_, i) => i !== index);

        let newIndex = currentIndex;
        if (index < currentIndex) {
            newIndex = currentIndex - 1;
        } else if (index === currentIndex) {
            newIndex = currentIndex >= newQueue.length ? 0 : currentIndex;
        }

        set({
            queue: newQueue,
            currentIndex: newIndex,
            currentSong: newQueue[newIndex] || null
        });
    },

    reorderQueue: (fromIndex, toIndex) => {
        const { queue, currentIndex } = get();
        const newQueue = [...queue];
        const [movedSong] = newQueue.splice(fromIndex, 1);
        newQueue.splice(toIndex, 0, movedSong);

        let newIndex = currentIndex;
        if (fromIndex === currentIndex) {
            newIndex = toIndex;
        } else if (fromIndex < currentIndex && toIndex >= currentIndex) {
            newIndex = currentIndex - 1;
        } else if (fromIndex > currentIndex && toIndex <= currentIndex) {
            newIndex = currentIndex + 1;
        }

        set({
            queue: newQueue,
            currentIndex: newIndex
        });
    },

    toggleRepeat: () => set((state) => ({ repeat: !state.repeat })),

    toggleShuffle: () => set((state) => ({ shuffle: !state.shuffle })),
}));

