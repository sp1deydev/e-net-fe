import { apiClient } from './apiClient'

export const userService = {
  searchUsers: async (query: string) => {
    return apiClient.get('/users/search', { params: { q: query } })
  },

  updateProfile: async (profileData: { fullName?: string; bio?: string; avatar?: string; phone?: string; location?: string }) => {
    return apiClient.put('/users/profile', profileData)
  },

  sendFriendRequest: async (friendId: string) => {
    return apiClient.post(`/users/friends/request`, { friendId })
  },

  acceptFriendRequest: async (requestId: string) => {
    return apiClient.put(`/users/friends/request/${requestId}/accept`)
  },

  getFriends: async () => {
    return apiClient.get('/users/friends')
  }
}
