import { create } from 'zustand';

// Demo users for frontend-only authentication
const DEMO_USERS = [
    {
        id: 'demo1',
        email: 'demo@gaana.com',
        password: 'demo123',
        name: 'Demo User',
        username: '@demouser',
        avatar: 'https://i.pravatar.cc/150?img=10',
        isPremium: false
    },
    {
        id: 'sam',
        email: 'sam@gaana.com',
        password: 'sam123',
        name: 'Sam',
        username: '@sam_frontend',
        avatar: 'https://i.pravatar.cc/150?img=12',
        isPremium: true
    }
];

export const useAuthStore = create((set, get) => ({
    user: null,
    token: localStorage.getItem('gaana_demo_token'),
    isAuthenticated: !!localStorage.getItem('gaana_demo_token'),
    loading: false,
    error: null,

    // Frontend-only register
    register: async (userData) => {
        set({ loading: true, error: null });

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            // Check if user already exists
            const existingUser = DEMO_USERS.find(u => u.email === userData.email);
            if (existingUser) {
                set({ loading: false, error: 'User already exists' });
                return { success: false, error: 'User already exists with this email' };
            }

            // Create new demo user
            const newUser = {
                id: `user_${Date.now()}`,
                email: userData.email,
                name: userData.displayName || userData.username,
                username: userData.username || `@${userData.email.split('@')[0]}`,
                avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
                isPremium: false
            };

            // Add to demo users (in real app, this would be saved to backend)
            DEMO_USERS.push(newUser);

            // Create demo token
            const demoToken = `demo_token_${newUser.id}`;
            localStorage.setItem('gaana_demo_token', demoToken);
            localStorage.setItem('gaana_demo_user', JSON.stringify(newUser));

            set({
                user: newUser,
                token: demoToken,
                isAuthenticated: true,
                loading: false
            });

            return { success: true };
        } catch (error) {
            set({
                error: 'Registration failed',
                loading: false
            });
            return { success: false, error: 'Registration failed' };
        }
    },

    // Frontend-only login
    login: async (credentials) => {
        set({ loading: true, error: null });

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            // Find user in demo users
            const user = DEMO_USERS.find(u => u.email === credentials.email);

            if (!user) {
                set({ loading: false, error: 'Invalid credentials' });
                return { success: false, error: 'Invalid email or password' };
            }

            // Check password (in demo, we check against predefined passwords)
            if (user.password !== credentials.password) {
                set({ loading: false, error: 'Invalid credentials' });
                return { success: false, error: 'Invalid email or password' };
            }

            // Create demo token
            const demoToken = `demo_token_${user.id}`;
            const userWithoutPassword = { ...user };
            delete userWithoutPassword.password;

            localStorage.setItem('gaana_demo_token', demoToken);
            localStorage.setItem('gaana_demo_user', JSON.stringify(userWithoutPassword));

            set({
                user: userWithoutPassword,
                token: demoToken,
                isAuthenticated: true,
                loading: false
            });

            return { success: true };
        } catch (error) {
            set({
                error: 'Login failed',
                loading: false
            });
            return { success: false, error: 'Login failed' };
        }
    },

    // Logout
    logout: () => {
        localStorage.removeItem('gaana_demo_token');
        localStorage.removeItem('gaana_demo_user');
        set({
            user: null,
            token: null,
            isAuthenticated: false
        });
    },

    // Check if user is authenticated (on app load)
    checkAuth: async () => {
        const token = localStorage.getItem('gaana_demo_token');
        const userStr = localStorage.getItem('gaana_demo_user');

        if (!token || !userStr) {
            set({ isAuthenticated: false, loading: false });
            return;
        }

        try {
            const user = JSON.parse(userStr);
            set({
                user,
                token,
                isAuthenticated: true,
                loading: false
            });
        } catch (error) {
            localStorage.removeItem('gaana_demo_token');
            localStorage.removeItem('gaana_demo_user');
            set({
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false
            });
        }
    },

    // Quick login for demo (bypass form)
    quickLogin: (userEmail) => {
        const user = DEMO_USERS.find(u => u.email === userEmail);
        if (user) {
            const demoToken = `demo_token_${user.id}`;
            const userWithoutPassword = { ...user };
            delete userWithoutPassword.password;

            localStorage.setItem('gaana_demo_token', demoToken);
            localStorage.setItem('gaana_demo_user', JSON.stringify(userWithoutPassword));

            set({
                user: userWithoutPassword,
                token: demoToken,
                isAuthenticated: true
            });
        }
    }
}));
