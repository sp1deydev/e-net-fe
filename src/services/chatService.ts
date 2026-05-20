import { apiClient } from './apiClient'

export const chatService = {
  getConversations: async () => {
    return apiClient.get('/chats')
  },

  getMessages: async (conversationId: string) => {
    return apiClient.get(`/chats/${conversationId}/messages`)
  },

  sendMessage: async (conversationId: string, messageData: { content: string; type?: string; mediaUrl?: string }) => {
    return apiClient.post(`/chats/${conversationId}/messages`, messageData)
  },

  createGroup: async (groupData: { name: string; memberIds: string[] }) => {
    return apiClient.post('/chats/groups', groupData)
  },

  deleteConversation: async (conversationId: string) => {
    return apiClient.delete(`/chats/${conversationId}`)
  }
}
