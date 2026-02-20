import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Message {
    id: string;
    text: string;
    sender: string;
    timestamp: string; // Serialized Date
    isMine: boolean;
}

export interface ConversationMeta {
    name: string;
    unread: number;
    avatar?: string;
}

interface ChatState {
    conversationsState: Record<string, Message[]>;
    conversationsMeta: Record<string, ConversationMeta>;
    selectedConvId: string;
}

const initialState: ChatState = {
    conversationsState: {
        '1': [{ id: '1', text: 'Xin chào! Chào mừng bạn đến với E-Net Chat.', sender: 'Bot', timestamp: new Date().toISOString(), isMine: false }],
        '2': [{ id: '1', text: 'Welcome to group chat! 🎉', sender: 'Alice', timestamp: new Date().toISOString(), isMine: false }]
    },
    conversationsMeta: {
        '1': { name: 'Bot Support', unread: 2 },
        '2': { name: 'Group Chat', unread: 0 }
    },
    selectedConvId: '',
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setSelectedConv: (state, action: PayloadAction<string>) => {
            state.selectedConvId = action.payload;
            if (state.conversationsMeta[action.payload]) {
                state.conversationsMeta[action.payload].unread = 0;
            }
        },
        addMessage: (state, action: PayloadAction<{ convId: string; message: Message }>) => {
            const { convId, message } = action.payload;
            if (!state.conversationsState[convId]) {
                state.conversationsState[convId] = [];
            }
            state.conversationsState[convId].push(message);
        },
        clearConversation: (state, action: PayloadAction<string>) => {
            state.conversationsState[action.payload] = [];
        },
        markAsRead: (state, action: PayloadAction<string>) => {
            if (state.conversationsMeta[action.payload]) {
                state.conversationsMeta[action.payload].unread = 0;
            }
        },
        markAsUnread: (state, action: PayloadAction<string>) => {
            if (state.conversationsMeta[action.payload]) {
                state.conversationsMeta[action.payload].unread += 1;
            }
        },
        deleteConversation: (state, action: PayloadAction<string>) => {
            delete state.conversationsState[action.payload];
            delete state.conversationsMeta[action.payload];
            if (state.selectedConvId === action.payload) {
                state.selectedConvId = Object.keys(state.conversationsMeta)[0] || '';
            }
        },
        createConversation: (state, action: PayloadAction<{ id: string; name: string }>) => {
            const { id, name } = action.payload;
            state.conversationsMeta[id] = { name, unread: 0 };
            state.conversationsState[id] = [];
        }
    },
});

export const {
    setSelectedConv,
    addMessage,
    clearConversation,
    markAsRead,
    markAsUnread,
    deleteConversation,
    createConversation
} = chatSlice.actions;

export default chatSlice.reducer;
