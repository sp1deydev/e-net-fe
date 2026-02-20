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
}

interface UserState {
    currentUser: UserProfile | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    currentUser: {
        id: 'u1',
        username: 'thien_tdk',
        fullName: '',
        email: 'thien@example.com',
        avatar: '',
        bio: 'Software Engineer & Designer',
        phone: '+84 123 456 789',
        location: 'TP. Hồ Chí Minh, Việt Nam',
        joinedDate: '2023-01-15',
    },
    isLoading: false,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
            if (state.currentUser) {
                state.currentUser = { ...state.currentUser, ...action.payload };
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        logout: (state) => {
            state.currentUser = null;
        }
    },
});

export const { updateProfile, setLoading, setError, logout } = userSlice.actions;

export default userSlice.reducer;
