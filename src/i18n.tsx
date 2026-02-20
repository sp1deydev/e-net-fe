import React from 'react'
import i18n from 'i18next'
import { initReactI18next, useTranslation, I18nextProvider } from 'react-i18next'

type Lang = 'en' | 'vi'

type TranslationKeys =
  | 'appName'
  | 'login'
  | 'logout'
  | 'register'
  | 'email'
  | 'password'
  | 'signInWith'
  | 'or'
  | 'dontHaveAccount'
  | 'createAccount'
  | 'chatPlaceholder'
  | 'messagePlaceholder'
  | 'send'
  | 'details'
  | 'info'
  | 'members'
  | 'media'
  | 'notifications'
  | 'privacy'
  | 'clearConversation'
  | 'typing'
  | 'newConversation'
  | 'findFriends'
  | 'create'
  | 'cancel'
  | 'close'
  | 'addFriend'
  | 'friendRequested'
  | 'deleteConversation'
  | 'open'
  | 'markAsRead'
  | 'markAsUnread'
  | 'settings'
  | 'darkMode'
  | 'language'
  | 'help'
  | 'aboutUs'
  | 'actionsGroup'
  | 'settingsGroup'
  | 'findFriendsTitle'
  | 'findFriendsPlaceholder'
  | 'suggestedLabel'
  | 'suggestedSource'
  | 'friendConnected'
  | 'notFound'
  | 'aboutDesc'
  | 'website'
  | 'terms'
  | 'rights'
  | 'languageChanged'
  | 'confirmLogout'
  | 'clearedHistory'
  | 'openingSettings'
  | 'themeChanged'
  | 'helpCenter'
  | 'version'
  | 'online'
  | 'expressions'
  | 'clickToAddEmoji'
  | 'inputHint'
  | 'attachFile'
  | 'emoji'
  | 'clearSearch'
  | 'detailsTooltip'
  | 'filesAndImages'
  | 'notifSettings'
  | 'notifSound'
  | 'notifSoundSub'
  | 'muteNotif'
  | 'muteNotifSub'
  | 'previewContent'
  | 'previewContentSub'
  | 'privacyTitle'
  | 'blockUser'
  | 'reportConv'
  | 'deleteAndLeave'
  | 'you'
  | 'admin'
  | 'member'
  | 'removeFromGroup'
  | 'profile'
  | 'fullName'
  | 'bio'
  | 'profileAvatar'
  | 'saveChanges'
  | 'updateSuccess'
  | 'updateError'
  | 'editProfile'
  | 'bioPlaceholder'
  | 'avatarPlaceholder'
  | 'memberSince'
  | 'filterAll'
  | 'filterUnread'
  | 'filterGroups'
  | 'conversationsCount'
  | 'noConversationFound'
  | 'matchingWith'
  | 'noConversationsYet'
  | 'findFriendsToStart'
  | 'enterConversationName'
  | 'noConversationSelected'
  | 'actionMessage'
  | 'actionCall'
  | 'actionMute'
  | 'actionSearch'
  | 'basicInfo'
  | 'infoType'
  | 'infoTypePrivate'
  | 'infoCreatedDate'
  | 'infoStatus'
  | 'infoStatusActive'
  | 'infoTotalMessages'
  | 'actionsSection'
  | 'botAutoReply'
  | 'messages'
  | 'sloganTitle'
  | 'sloganSubtitle'
  | 'sloganDesc'
  | 'featureSecure'
  | 'featureRealtime'
  | 'featureMultilang'
  | 'loginWith'
  | 'homeWelcome'
  | 'pleaseEnterEmail'
  | 'pleaseEnterPassword'
  | 'registerTitle'
  | 'registerSubtitle'
  | 'registerDesc'
  | 'featureFree'
  | 'featureDevices'
  | 'featureFriendly'
  | 'confirmPassword'
  | 'pleaseConfirmPassword'
  | 'alreadyHaveAccount'
  | 'lightMode'
  | 'theme'
  | 'username'
  | 'pleaseEnterUsername'
  | 'welcomeTitle'
  | 'welcomeSubtitle'
  | 'selectConversationToStart'

const resources = {
  en: {
    translation: {
      appName: 'E-Net Chat',
      login: 'Login',
      logout: 'Logout',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      signInWith: 'Sign in with',
      or: 'or',
      dontHaveAccount: "Don't have an account?",
      createAccount: 'Create an account',
      chatPlaceholder: 'Search conversations...',
      messagePlaceholder: 'Type a message... (Enter to send)',
      send: 'Send',
      details: 'Details',
      info: 'Info',
      members: 'Members',
      media: 'Media',
      notifications: 'Notifications',
      privacy: 'Privacy',
      clearConversation: 'Clear history',
      typing: 'typing...',
      newConversation: 'New conversation',
      findFriends: 'Find friends',
      create: 'Create',
      cancel: 'Cancel',
      close: 'Close',
      addFriend: 'Add friend',
      friendRequested: 'Friend request sent',
      deleteConversation: 'Delete conversation',
      open: 'Open',
      markAsRead: 'Mark as read',
      markAsUnread: 'Mark as unread',
      settings: 'General Settings',
      darkMode: 'Dark Mode',
      language: 'Language',
      help: 'Help & Support',
      aboutUs: 'About Us',
      actionsGroup: 'ACTIONS',
      settingsGroup: 'SETTINGS & PREFERENCES',
      findFriendsTitle: 'Search and connect with people on E-Net',
      findFriendsPlaceholder: 'Enter username or email...',
      suggestedLabel: 'SUGGESTED FRIENDS',
      suggestedSource: 'Suggested from contacts',
      friendConnected: 'Connected with',
      notFound: 'No user found named',
      aboutDesc: 'Modern, secure, and smooth messaging platform. Connect with friends and share moments with the best user experience.',
      website: 'Website',
      terms: 'Terms of Service',
      rights: '© 2026 E-Net Corp. All rights reserved.',
      languageChanged: 'Language changed to English',
      confirmLogout: 'Are you sure you want to logout?',
      clearedHistory: 'Chat history cleared',
      openingSettings: 'Opening Settings...',
      themeChanged: 'Theme toggled',
      helpCenter: 'Help Center',
      version: 'Version 2.0.0 (Premium)',
      online: 'Online',
      expressions: 'Expressions',
      clickToAddEmoji: 'Click to add emoji to message',
      inputHint: 'Enter to send · Shift+Enter for new line',
      attachFile: 'Attach file',
      emoji: 'Emoji',
      clearSearch: 'Clear search',
      detailsTooltip: 'Details',
      filesAndImages: 'Files & Images',
      notifSettings: 'Notification Settings',
      notifSound: 'Notification Sound',
      notifSoundSub: 'Play sound for new messages',
      muteNotif: 'Mute Notifications',
      muteNotifSub: 'Do not receive notifications',
      previewContent: 'Message Preview',
      previewContentSub: 'Show message content in notifications',
      privacyTitle: 'Privacy & Security',
      blockUser: 'Block User',
      reportConv: 'Report Conversation',
      deleteAndLeave: 'Delete & Leave Group',
      you: 'You',
      admin: 'Admin',
      member: 'Member',
      removeFromGroup: 'Remove from group',
      profile: 'Profile',
      fullName: 'Full Name',
      bio: 'Bio',
      profileAvatar: 'Avatar URL',
      saveChanges: 'Save Changes',
      updateSuccess: 'Profile updated successfully!',
      updateError: 'Failed to update profile',
      editProfile: 'Edit Profile',
      bioPlaceholder: 'Tell us something about yourself...',
      avatarPlaceholder: 'Paste image URL here...',
      memberSince: 'Member since',
      filterAll: 'All',
      filterUnread: 'Unread',
      filterGroups: 'Groups',
      conversationsCount: 'conversations',
      noConversationFound: 'No conversations found',
      matchingWith: 'matching with',
      noConversationsYet: 'No conversations yet',
      findFriendsToStart: 'Find friends to start!',
      enterConversationName: 'Enter conversation name...',
      noConversationSelected: 'No conversation selected',
      actionMessage: 'Message',
      actionCall: 'Call',
      actionMute: 'Mute',
      actionSearch: 'Search',
      basicInfo: 'Basic Info',
      infoType: 'Type',
      infoTypePrivate: 'Private Conversation',
      infoCreatedDate: 'Created Date',
      infoStatus: 'Status',
      infoStatusActive: 'Active',
      infoTotalMessages: 'Total Messages',
      actionsSection: 'Actions',
      botAutoReply: 'I received your message! 👍',
      messages: 'messages',
      sloganTitle: 'Connect everyone,',
      sloganSubtitle: 'anytime, anywhere',
      sloganDesc: 'Experience real-time communication, secure, fast and modern.',
      featureSecure: 'End-to-end encryption',
      featureRealtime: 'Real-time messaging',
      featureMultilang: 'Multi-language support',
      loginWith: 'or sign in with',
      homeWelcome: 'Welcome back!',
      pleaseEnterEmail: 'Please enter your email!',
      pleaseEnterPassword: 'Please enter your password!',
      registerTitle: 'Join the community,',
      registerSubtitle: 'today',
      registerDesc: 'Create a free account and start connecting with friends and colleagues worldwide.',
      featureFree: 'Registration is completely free',
      featureDevices: 'Access on all devices',
      featureFriendly: 'User-friendly interface',
      confirmPassword: 'Confirm Password',
      pleaseConfirmPassword: 'Please confirm your password!',
      alreadyHaveAccount: 'Already have an account?',
      lightMode: 'Light Mode',
      theme: 'Theme',
      username: 'Username',
      pleaseEnterUsername: 'Please enter your username!',
      welcomeTitle: 'Welcome to E-Net Chat',
      welcomeSubtitle: 'The modern way to connect with your world.',
      selectConversationToStart: 'Please select a conversation from the sidebar to start messaging.'
    }
  },
  vi: {
    translation: {
      appName: 'E-Net Chat',
      login: 'Đăng nhập',
      logout: 'Đăng xuất',
      register: 'Đăng ký',
      email: 'Email',
      password: 'Mật khẩu',
      signInWith: 'Đăng nhập với',
      or: 'hoặc',
      dontHaveAccount: 'Chưa có tài khoản?',
      createAccount: 'Tạo tài khoản',
      chatPlaceholder: 'Tìm kiếm cuộc trò chuyện...',
      messagePlaceholder: 'Nhập tin nhắn... (Enter để gửi)',
      send: 'Gửi',
      details: 'Chi tiết',
      info: 'Thông tin',
      members: 'Thành viên',
      media: 'Tệp & Ảnh',
      notifications: 'Thông báo',
      privacy: 'Riêng tư',
      clearConversation: 'Xóa lịch sử tin nhắn',
      typing: 'Đang nhập...',
      newConversation: 'Cuộc trò chuyện mới',
      findFriends: 'Tìm bạn bè',
      create: 'Tạo',
      cancel: 'Hủy',
      close: 'Đóng',
      addFriend: 'Kết bạn',
      friendRequested: 'Đã gửi lời mời',
      deleteConversation: 'Xóa cuộc trò chuyện',
      open: 'Mở',
      markAsRead: 'Đánh dấu đã đọc',
      markAsUnread: 'Đánh dấu chưa đọc',
      settings: 'Cài đặt chung',
      darkMode: 'Chế độ tối',
      language: 'Ngôn ngữ',
      help: 'Trợ giúp & Hỗ trợ',
      aboutUs: 'Về chúng tôi',
      actionsGroup: 'TÁC VỤ',
      settingsGroup: 'CÀI ĐẶT & GIAO DIỆN',
      findFriendsTitle: 'Tìm kiếm và kết nối với mọi người trên E-Net',
      findFriendsPlaceholder: 'Nhập tên người dùng hoặc email...',
      suggestedLabel: 'GỢI Ý KẾT BẠN',
      suggestedSource: 'Gợi ý từ danh bạ',
      friendConnected: 'Đã kết nối với',
      notFound: 'Không tìm thấy ai tên là',
      aboutDesc: 'Nền tảng nhắn tin hiện đại, bảo mật và mượt mà. Kết nối bạn bè, chia sẻ khoảnh khắc với trải nghiệm người dùng tuyệt vời nhất.',
      website: 'Website',
      terms: 'Điều khoản',
      rights: '© 2026 E-Net Corp. All rights reserved.',
      languageChanged: 'Đã đổi ngôn ngữ sang Tiếng Việt',
      confirmLogout: 'Bạn có chắc chắn muốn đăng xuất?',
      clearedHistory: 'Đã xóa lịch sử tin nhắn',
      openingSettings: 'Đang mở Cài đặt...',
      themeChanged: 'Đã chuyển giao diện',
      helpCenter: 'Trung tâm trợ giúp',
      version: 'Phiên bản 2.0.0 (Premium)',
      online: 'Trực tuyến',
      expressions: 'Biểu cảm',
      clickToAddEmoji: 'Click để thêm emoji vào tin nhắn',
      inputHint: 'Enter để gửi · Shift+Enter xuống dòng',
      attachFile: 'Đính kèm tệp',
      emoji: 'Emoji',
      clearSearch: 'Xóa tìm kiếm',
      detailsTooltip: 'Chi tiết',
      filesAndImages: 'Tệp & Hình ảnh',
      notifSettings: 'Cài đặt thông báo',
      notifSound: 'Âm thanh thông báo',
      notifSoundSub: 'Phát âm khi có tin mới',
      muteNotif: 'Tắt thông báo',
      muteNotifSub: 'Không nhận thông báo nữa',
      previewContent: 'Xem trước nội dung',
      previewContentSub: 'Hiện tin nhắn trong thông báo',
      privacyTitle: 'Bảo mật & Quyền riêng tư',
      blockUser: 'Chặn người dùng',
      reportConv: 'Báo cáo cuộc trò chuyện',
      deleteAndLeave: 'Xóa và rời nhóm',
      you: 'Bạn',
      admin: 'Quản trị viên',
      member: 'Thành viên',
      removeFromGroup: 'Xóa khỏi nhóm',
      profile: 'Trang cá nhân',
      fullName: 'Họ tên',
      bio: 'Tiểu sử',
      profileAvatar: 'Ảnh đại diện (URL)',
      saveChanges: 'Lưu thay đổi',
      updateSuccess: 'Cập nhật trang cá nhân thành công!',
      updateError: 'Cập nhật thất bại, vui lòng thử lại',
      editProfile: 'Chỉnh sửa trang cá nhân',
      bioPlaceholder: 'Giới thiệu một chút về bạn...',
      avatarPlaceholder: 'Dán đường dẫn ảnh vào đây...',
      memberSince: 'Thành viên từ',
      filterAll: 'Tất cả',
      filterUnread: 'Chưa đọc',
      filterGroups: 'Nhóm',
      conversationsCount: 'cuộc hội thoại',
      noConversationFound: 'Không tìm thấy cuộc trò chuyện nào',
      matchingWith: 'khớp với',
      noConversationsYet: 'Chưa có cuộc trò chuyện nào',
      findFriendsToStart: 'Tìm bạn bè để bắt đầu!',
      enterConversationName: 'Nhập tên cuộc trò chuyện...',
      noConversationSelected: 'Chưa chọn cuộc trò chuyện',
      actionMessage: 'Nhắn tin',
      actionCall: 'Gọi thoại',
      actionMute: 'Tắt tiếng',
      actionSearch: 'Tìm kiếm',
      basicInfo: 'Thông tin cơ bản',
      infoType: 'Loại',
      infoTypePrivate: 'Cuộc trò chuyện riêng tư',
      infoCreatedDate: 'Ngày tạo',
      infoStatus: 'Trạng thái',
      infoStatusActive: 'Đang hoạt động',
      infoTotalMessages: 'Tổng tin nhắn',
      actionsSection: 'Hành động',
      botAutoReply: 'Mình đã nhận được tin nhắn của bạn! 👍',
      messages: 'tin nhắn',
      sloganTitle: 'Kết nối mọi người,',
      sloganSubtitle: 'mọi lúc mọi nơi',
      sloganDesc: 'Trải nghiệm giao tiếp thời gian thực, bảo mật, nhanh chóng và hiện đại.',
      featureSecure: 'Bạo mật đầu cuối mã hóa',
      featureRealtime: 'Tin nhắn thời gian thực',
      featureMultilang: 'Hỗ trợ đa ngôn ngữ',
      loginWith: 'hoặc đăng nhập với',
      homeWelcome: 'Chào mừng bạn trở lại!',
      pleaseEnterEmail: 'Vui lòng nhập email!',
      pleaseEnterPassword: 'Vui lòng nhập mật khẩu!',
      registerTitle: 'Tham gia cộng đồng,',
      registerSubtitle: 'ngay hôm nay',
      registerDesc: 'Tạo tài khoản miễn phí và bắt đầu kết nối với bạn bè, đồng nghiệp toàn thế giới.',
      featureFree: 'Đăng ký hoàn toàn miễn phí',
      featureDevices: 'Truy cập mọi thiết bị',
      featureFriendly: 'Giao diện thân thiện, dễ dùng',
      confirmPassword: 'Xác nhận mật khẩu',
      pleaseConfirmPassword: 'Vui lòng xác nhận mật khẩu!',
      alreadyHaveAccount: 'Đã có tài khoản?',
      lightMode: 'Chế độ sáng',
      theme: 'Giao diện',
      username: 'Tên người dùng',
      pleaseEnterUsername: 'Vui lòng nhập tên người dùng!',
      welcomeTitle: 'Chào mừng bạn đến với E-Net Chat',
      welcomeSubtitle: 'Kết nối thế giới theo cách hiện đại nhất.',
      selectConversationToStart: 'Vui lòng chọn một cuộc trò chuyện từ danh sách để bắt đầu nhắn tin.'
    }
  }
}

// initialize i18next
i18n.use(initReactI18next).init({
  resources,
  lng: (navigator.language || 'vi').startsWith('en') ? 'en' : 'vi',
  fallbackLng: 'vi',
  interpolation: { escapeValue: false }
})

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

export const useI18n = () => {
  const { t, i18n: i18 } = useTranslation()
  const lang = (i18.language || 'vi') as Lang
  return {
    t: (k: string) => t(k),
    setLang: (l: Lang) => i18.changeLanguage(l),
    lang
  }
}

export default i18n
