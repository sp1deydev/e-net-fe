import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AppState {
    theme: 'light' | 'dark';
    sidebarOpen: boolean;
}

const initialState: AppState = {
    theme: 'light',
    sidebarOpen: true,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
        setSidebarOpen: (state, action: PayloadAction<boolean>) => {
            state.sidebarOpen = action.payload;
        },
    },
});

export const { toggleTheme, setSidebarOpen } = appSlice.actions;

export default appSlice.reducer;
