import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserProfile {
    id: string;
    username: string;
    fullName: string;
    email: string;
    avatar?: string;
    bio?: string;
    phone?: string;
    location?: string;
    joinedDate: string;
    role?: 'user' | 'admin';
}

interface UserState {
    currentUser: UserProfile | null;
    isLoading: boolean;
    error: string | null;
}

const defaultMockUser: UserProfile = {
    id: 'u1',
    username: 'thien_tdk',
    fullName: 'Thien TDK',
    email: 'thien@example.com',
    avatar: '',
    bio: 'Software Engineer & Designer',
    phone: '+84 123 456 789',
    location: 'TP. Hồ Chí Minh, Việt Nam',
    joinedDate: '2023-01-15',
    role: 'user',
};

const getInitialUser = (): UserProfile | null => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) return null;
    
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        try {
            return JSON.parse(savedUser);
        } catch (e) {
            console.error('Failed to parse currentUser from localStorage', e);
        }
    }
    return defaultMockUser;
};

const initialState: UserState = {
    currentUser: getInitialUser(),
    isLoading: false,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ email: string }>) => {
            const email = action.payload.email;
            state.currentUser = {
                id: 'u1',
                username: email.split('@')[0] || 'thien_tdk',
                fullName: 'Thien TDK',
                email: email,
                avatar: '',
                bio: 'Software Engineer & Designer',
                phone: '+84 123 456 789',
                location: 'TP. Hồ Chí Minh, Việt Nam',
                joinedDate: '2023-01-15',
                role: email.toLowerCase().includes('admin') ? 'admin' : 'user',
            };
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
        },
        updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
            if (state.currentUser) {
                state.currentUser = { ...state.currentUser, ...action.payload };
                localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        logout: (state) => {
            console.log('userSlice: logout reducer triggered')
            state.currentUser = null;
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');
            console.log('userSlice: cleared currentUser and localStorage keys')
        }
    },
});

export const { login, updateProfile, setLoading, setError, logout } = userSlice.actions;

export default userSlice.reducer;
