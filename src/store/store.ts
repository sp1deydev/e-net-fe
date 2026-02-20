import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import chatReducer from './slices/chatSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
    reducer: {
        app: appReducer,
        chat: chatReducer,
        user: userReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {app: AppState}
export type AppDispatch = typeof store.dispatch;
