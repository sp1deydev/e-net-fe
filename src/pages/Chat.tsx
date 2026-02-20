import React, { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n'
import {
  Button,
  List,
  Avatar,
  Typography,
  Tooltip,
  Switch,
  Upload,
  Dropdown,
  Modal,
  Input,
  message
} from 'antd'
import {
  SendOutlined,
  UserOutlined,
  SearchOutlined,
  PaperClipOutlined,
  SmileOutlined,
  InfoCircleOutlined,
  TeamOutlined,
  PictureOutlined,
  BellOutlined,
  EyeOutlined,
  CheckOutlined,
  DeleteOutlined,
  LockOutlined,
  CloseOutlined,
  EllipsisOutlined,
  SettingOutlined,
  GlobalOutlined,
  LogoutOutlined,
  MoonOutlined,
  QuestionCircleOutlined,
  FileOutlined,
  PhoneOutlined
} from '@ant-design/icons'
import './Chat.css'

const { Text } = Typography

type Message = {
  id: string
  text: string
  sender: string
  timestamp: Date
  isMine: boolean
}

export default function Chat() {
  const { t, setLang, lang } = useI18n()
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' || 'dark'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    message.success(newTheme === 'dark' ? t('darkMode') : t('lightMode'))
  }

  const handleMoreMenuClick = ({ key }: { key: string }) => {
    // Language handlers
    if (key.startsWith('lang:')) {
      const l = key.split(':')[1] as 'en' | 'vi'
      setLang(l)
      message.success(t('languageChanged') || 'Đã đổi ngôn ngữ')
      return
    }

    // Action handlers
    switch (key) {
      case 'openDetails': setShowDetails(true); break
      case 'findFriends': setShowFind(true); break
      case 'about': setShowAbout(true); break
      case 'settings': message.info(t('openingSettings')); break
      case 'darkMode': toggleTheme(); break
      case 'help': message.info(t('helpCenter')); break
      case 'logout':
        Modal.confirm({
          title: t('logout'),
          content: t('confirmLogout'),
          okText: t('logout'),
          cancelText: t('cancel'),
          okButtonProps: { danger: true },
          onOk: () => window.location.href = '/login'
        })
        break
    }
  }

  const moreMenuItems = [
    // GROUP 1: ACTIONS
    {
      key: 'actions_group',
      type: 'group',
      label: <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)' }}>{t('actionsGroup')}</span>,
      children: [
        {
          key: 'findFriends',
          label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <SearchOutlined /> {t('findFriends')}
            </div>
          )
        },
        {
          key: 'about',
          label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <InfoCircleOutlined /> {t('aboutUs')}
            </div>
          )
        }
      ]
    },
    { type: 'divider' },

    // GROUP 2: SETTINGS (Flattened)
    {
      key: 'settings_group',
      type: 'group',
      label: <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)' }}>{t('settingsGroup')}</span>,
      children: [
        {
          key: 'settings',
          label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <SettingOutlined /> {t('settings')}
            </div>
          )
        },
        {
          key: 'darkMode',
          label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'space-between', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <MoonOutlined /> {theme === 'dark' ? t('darkMode') : t('lightMode')}
              </div>
              <Switch size="small" checked={theme === 'dark'} />
            </div>
          )
        },
        // Languages directly listed
        {
          key: 'lang:vi',
          className: lang === 'vi' ? 'menu-item-active' : '',
          label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 16 }}>🇻🇳</span> Tiếng Việt {lang === 'vi' && '✓'}
            </div>
          )
        },
        {
          key: 'lang:en',
          className: lang === 'en' ? 'menu-item-active' : '',
          label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 16 }}>🇺🇸</span> Tiếng Anh {lang === 'en' && '✓'}
            </div>
          )
        }
      ]
    },
    { type: 'divider' },

    // GROUP 3: SYSTEM
    {
      key: 'logout',
      danger: true,
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <LogoutOutlined /> {t('logout')}
        </div>
      )
    }
  ]

  const [conversationsState, setConversationsState] = useState<Record<string, Message[]>>({
    '1': [{ id: '1', text: 'Xin chào! Chào mừng bạn đến với E-Net Chat.', sender: 'Bot', timestamp: new Date(), isMine: false }],
    '2': [{ id: '1', text: 'Welcome to group chat! 🎉', sender: 'Alice', timestamp: new Date(), isMine: false }]
  })
  const [conversationsMeta, setConversationsMeta] = useState<Record<string, { name: string; unread: number }>>({
    '1': { name: 'Bot Support', unread: 2 },
    '2': { name: 'Group Chat', unread: 0 }
  })
  const [selectedConv, setSelectedConv] = useState<string>('1')
  const messages = conversationsState[selectedConv] || []
  const [newMessage, setNewMessage] = useState('')
  const [search, setSearch] = useState('')
  const [filterChip, setFilterChip] = useState<'all' | 'unread' | 'groups'>('all')
  const [searchFocused, setSearchFocused] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [typing, setTyping] = useState(false)
  const [emojiOpen, setEmojiOpen] = useState(false)
  const [showNewConv, setShowNewConv] = useState(false)
  const [newConvName, setNewConvName] = useState('')
  const [showFind, setShowFind] = useState(false)
  const [friendQuery, setFriendQuery] = useState('')
  const [showAbout, setShowAbout] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [activeTab, setActiveTab] = useState<'info' | 'members' | 'media' | 'notifications' | 'privacy'>('info')

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim()) return
    const msg: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: 'You',
      timestamp: new Date(),
      isMine: true
    }
    setConversationsState(prev => ({ ...prev, [selectedConv]: [...(prev[selectedConv] || []), msg] }))
    setNewMessage('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: t('botAutoReply'),
        sender: 'Bot',
        timestamp: new Date(),
        isMine: false
      }
      setConversationsState(prev => ({ ...prev, [selectedConv]: [...(prev[selectedConv] || []), botMsg] }))
    }, 900)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const openConversation = (convId: string) => {
    setSelectedConv(convId)
    setShowDetails(false)
    setConversationsMeta(prev => ({ ...prev, [convId]: { ...prev[convId], unread: 0 } }))
  }

  const handleConversationAction = (convId: string, action: string) => {
    if (action === 'open') { openConversation(convId); return }
    if (action === 'clear') {
      setConversationsState(prev => ({ ...prev, [convId]: [] }))
      return
    }
    if (action === 'markRead') {
      setConversationsMeta(prev => ({ ...prev, [convId]: { ...prev[convId], unread: 0 } }))
      return
    }
    if (action === 'markUnread') {
      setConversationsMeta(prev => ({ ...prev, [convId]: { ...prev[convId], unread: (prev[convId]?.unread || 0) + 1 } }))
      return
    }
    if (action === 'delete') {
      setConversationsState(prev => { const c = { ...prev }; delete c[convId]; return c })
      setConversationsMeta(prev => { const c = { ...prev }; delete c[convId]; return c })
      if (selectedConv === convId) setSelectedConv(Object.keys(conversationsMeta)[0] || '')
    }
  }

  const conversationsList = Object.keys(conversationsMeta).map(id => {
    const msgs = conversationsState[id] || []
    const last = msgs.length ? msgs[msgs.length - 1].text : ''
    return { id, name: conversationsMeta[id].name, lastMessage: last, unread: conversationsMeta[id].unread }
  }).filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase())
    if (filterChip === 'unread') return matchSearch && c.unread > 0
    if (filterChip === 'groups') return matchSearch && c.name.toLowerCase().includes('group')
    return matchSearch
  })

  const currentConvName = conversationsMeta[selectedConv]?.name || ''

  const tabButtons = [
    { key: 'info' as const, icon: <InfoCircleOutlined />, label: t('info') },
    { key: 'members' as const, icon: <TeamOutlined />, label: t('members') },
    { key: 'media' as const, icon: <PictureOutlined />, label: t('media') },
    { key: 'notifications' as const, icon: <BellOutlined />, label: t('notifications') },
    { key: 'privacy' as const, icon: <LockOutlined />, label: t('privacy') },
  ]

  const langItems = [
    {
      key: 'en',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>🇺🇸</span> Tiếng Anh
        </div>
      ),
      onClick: () => setLang('en'),
    },
    {
      key: 'vi',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>🇻🇳</span> Tiếng Việt
        </div>
      ),
      onClick: () => setLang('vi'),
    },
  ]

  return (
    <div className="chat-root">
      {/* ====== SIDEBAR ====== */}
      <div className="chat-sidebar">
        {/* Sidebar Header */}
        <div className="chat-sidebar-header">
          <span className="chat-sidebar-title">💬 E-Net</span>
          <div className="chat-sidebar-header-actions">
            <Dropdown
              menu={{ items: moreMenuItems as any, onClick: handleMoreMenuClick }}
              trigger={['click']}
              placement="bottomRight"
              overlayClassName="chat-setting-dropdown"
            >
              <div className="icon-btn setting-trigger">
                <SettingOutlined spin={false} style={{ fontSize: 18 }} />
              </div>
            </Dropdown>
          </div>
        </div>

        {/* Search */}
        <div className="chat-sidebar-search">
          <div className="chat-search-wrapper">
            {/* Search input box */}
            <div
              className="chat-search-box"
              onClick={() => searchInputRef.current?.focus()}
            >
              <span className="chat-search-icon">
                <SearchOutlined />
              </span>

              <input
                ref={searchInputRef}
                className="chat-search-input"
                placeholder={searchFocused ? t('enterConversationName') : t('chatPlaceholder')}
                value={search}
                onChange={e => setSearch(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />

              {/* Clear button — only shown when there's query */}
              {search ? (
                <button
                  className="chat-search-clear"
                  onClick={e => { e.stopPropagation(); setSearch('') }}
                  title="Xóa tìm kiếm"
                >
                  ✕
                </button>
              ) : (
                /* Keyboard hint — hidden on focus */
                <div className="chat-search-kbd">
                  <kbd>/</kbd>
                </div>
              )}
            </div>

            {/* Footer: filter chips + result count */}
            <div className="chat-search-footer">
              <div className="chat-filter-chips">
                {(['all', 'unread', 'groups'] as const).map(chip => (
                  <button
                    key={chip}
                    className={`chat-filter-chip ${filterChip === chip ? 'active' : ''}`}
                    onClick={() => setFilterChip(chip)}
                  >
                    {chip === 'all' ? t('filterAll') : chip === 'unread' ? t('filterUnread') : t('filterGroups')}
                  </button>
                ))}
              </div>
              <span className="chat-search-count">
                <span className="highlight">{conversationsList.length}</span>
                &nbsp;{t('conversationsCount')}
              </span>
            </div>
          </div>
        </div>

        {/* Conversation List */}
        <div className="chat-conv-list">
          {conversationsList.map(item => {
            const unread = conversationsMeta[item.id]?.unread || 0
            const convMenuItems = [
              {
                key: 'open',
                label: (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <EyeOutlined /> {t('open')}
                  </div>
                )
              },
              unread > 0
                ? {
                  key: 'markRead',
                  label: (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckOutlined /> {t('markAsRead')}
                    </div>
                  )
                }
                : {
                  key: 'markUnread',
                  label: (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <BellOutlined /> {t('markAsUnread')}
                    </div>
                  )
                },
              { type: 'divider' },
              {
                key: 'clear',
                label: (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CloseOutlined /> {t('clearConversation')}
                  </div>
                )
              },
              {
                key: 'delete',
                danger: true,
                label: (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <DeleteOutlined /> {t('deleteConversation')}
                  </div>
                )
              }
            ]
            return (
              <div
                key={item.id}
                className={`chat-conv-item ${item.id === selectedConv ? 'active' : ''}`}
                onClick={() => openConversation(item.id)}
              >
                <div className="chat-conv-avatar">
                  <Avatar size={44} icon={<UserOutlined />} />
                  <div className="chat-conv-online-dot" />
                </div>

                <div className="chat-conv-info">
                  <div className="chat-conv-name">{item.name}</div>
                  <div className="chat-conv-last">{item.lastMessage || '—'}</div>
                </div>

                <div className="chat-conv-meta">
                  <span className="chat-conv-time">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {unread > 0 && <span className="chat-badge">{unread}</span>}
                </div>

                <div className="chat-conv-actions">
                  <Dropdown
                    menu={{
                      items: convMenuItems as any,
                      onClick: ({ key }) => handleConversationAction(item.id, key)
                    }}
                    trigger={['click']}
                    placement="bottomRight"
                    overlayClassName="chat-setting-dropdown"
                  >
                    <div className="icon-btn context-trigger" onClick={e => e.stopPropagation()}>
                      <EllipsisOutlined />
                    </div>
                  </Dropdown>
                </div>
              </div>
            )
          })}
          {conversationsList.length === 0 && (
            <div className="chat-search-empty">
              <div className="chat-search-empty-icon">
                {search ? '🔍' : '💬'}
              </div>
              <div className="chat-search-empty-text">
                {search ? (
                  <>{t('noConversationFound')}<br />{t('matchingWith')} <strong>"{search}"</strong></>
                ) : (
                  <>{t('noConversationsYet')}<br /><strong>{t('findFriendsToStart')}</strong></>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ====== MAIN CHAT AREA ====== */}
      <div className="chat-main">
        {/* Header */}
        <div className="chat-main-header">
          <Avatar size={40} icon={<UserOutlined />} />
          <div>
            <div className="chat-contact-name">{currentConvName}</div>
            <div className="chat-contact-status">{t('online')}</div>
          </div>
          <div className="chat-main-header-actions">
            <Tooltip title="Chi tiết">
              <div className="icon-btn" onClick={() => setShowDetails(true)}>
                <InfoCircleOutlined />
              </div>
            </Tooltip>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages-container">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`chat-message-row ${msg.isMine ? 'mine' : 'other'}`}
            >
              <div className="chat-message-group">
                <div className="chat-message-wrapper">
                  {!msg.isMine && (
                    <div className="chat-message-avatar">
                      <Avatar size={32} icon={<UserOutlined />} />
                    </div>
                  )}
                  <div className="chat-message-content">
                    <div className={`chat-bubble ${msg.isMine ? 'mine' : 'other'}`}>
                      {msg.text}
                    </div>
                    <div className="chat-message-time">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  {msg.isMine && (
                    <div className="chat-message-avatar">
                      <Avatar size={32} icon={<UserOutlined />} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {typing && (
            <div className="chat-typing-row">
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                <Avatar size={32} icon={<UserOutlined />} />
                <div className="chat-typing-bubble">
                  <div className="chat-typing-dots">
                    <div className="chat-typing-dot" />
                    <div className="chat-typing-dot" />
                    <div className="chat-typing-dot" />
                  </div>
                  <span className="chat-typing-text">{t('typing')}</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        < div className="chat-input-area" >
          {/* Emoji Picker */}
          {
            emojiOpen && (
              <div className="chat-emoji-picker">
                <div className="chat-emoji-picker-header">
                  <span className="chat-emoji-picker-title">{t('expressions')}</span>
                  <button className="chat-emoji-close-btn" onClick={() => setEmojiOpen(false)}>✕</button>
                </div>
                <div className="chat-emoji-grid">
                  {['😀', '😄', '😅', '😂', '😊', '😍', '🥰', '😎', '🤔', '😏',
                    '👍', '👎', '❤️', '🔥', '🎉', '✨', '💯', '🙏', '👏', '😭'].map(em => (
                      <button
                        key={em}
                        className="chat-emoji-btn"
                        onClick={() => { setNewMessage(prev => prev + em); setEmojiOpen(false) }}
                      >
                        {em}
                      </button>
                    ))}
                </div>
                <div className="chat-emoji-picker-footer">
                  <span className="chat-emoji-hint">{t('clickToAddEmoji')}</span>
                </div>
              </div>
            )
          }

          {/* Input Card */}
          <div className="chat-input-card">
            {/* Text row */}
            <div className="chat-input-text-row">
              <textarea
                className="chat-input-textarea"
                placeholder={t('messagePlaceholder')}
                value={newMessage}
                rows={1}
                onChange={e => {
                  setNewMessage(e.target.value)
                  // auto-resize
                  e.target.style.height = 'auto'
                  e.target.style.height = Math.min(e.target.scrollHeight, 140) + 'px'
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
              />
            </div>

            {/* Action bar */}
            <div className="chat-input-action-bar">
              {/* Left icons */}
              <div className="chat-input-left-actions">
                <Tooltip title={t('attachFile')} placement="top">
                  <Upload showUploadList={false} beforeUpload={() => false}>
                    <div className="chat-icon-btn">
                      <PaperClipOutlined />
                    </div>
                  </Upload>
                </Tooltip>

                <Tooltip title={t('emoji')} placement="top">
                  <div
                    className={`chat-icon-btn ${emojiOpen ? 'is-active' : ''}`}
                    onClick={() => setEmojiOpen(prev => !prev)}
                  >
                    <SmileOutlined />
                  </div>
                </Tooltip>

                <div className="chat-input-sep" />

                <div className="chat-input-hint">
                  {t('inputHint')}
                </div>
              </div>

              {/* Right: counter + send */}
              <div className="chat-input-right-actions">
                {newMessage.length > 0 && (
                  <span className={`chat-char-counter ${newMessage.length > 900 ? 'danger'
                    : newMessage.length > 700 ? 'warn'
                      : ''
                    }`}>
                    {newMessage.length}/1000
                  </span>
                )}

                {/* Send button — visible when has text, icon-only grey when empty */}
                {newMessage.trim() ? (
                  <button className="chat-send-btn" onClick={sendMessage}>
                    <SendOutlined />
                    {t('send')}
                  </button>
                ) : (
                  <div className="chat-send-icon-btn">
                    <SendOutlined />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div >
      </div >

      {/* ====== DETAILS PANEL ====== */}
      < div className={`chat-details-panel ${showDetails ? 'open' : 'closed'}`}>

        {/* === COVER HEADER === */}
        < div className="chat-details-cover" >
          <div className="chat-details-cover-bg" />

          {/* Close button */}
          <button
            className="chat-details-close-btn"
            onClick={() => setShowDetails(false)}
          >
            <CloseOutlined />
          </button>

          {/* Avatar centered & overlapping */}
          <div className="chat-details-avatar-wrap">
            <div className="chat-details-avatar-ring">
              <Avatar size={66} icon={<UserOutlined />} />
            </div>
            <div className="chat-details-online" />
          </div>
        </div >

        {/* === PROFILE INFO === */}
        < div className="chat-details-profile" >
          <div className="chat-details-name">{currentConvName || t('noConversationSelected')}</div>
          <div className="chat-details-status">{t('online')}</div>

          {/* Quick action buttons */}
          <div className="chat-details-quick-actions">
            {[
              { icon: <SendOutlined />, label: t('actionMessage') },
              { icon: <PhoneOutlined />, label: t('actionCall') },
              { icon: <BellOutlined />, label: t('actionMute') },
              { icon: <SearchOutlined />, label: t('actionSearch') },
            ].map((btn, i) => (
              <div key={i} className="chat-quick-btn">
                <div className="chat-quick-btn-icon">{btn.icon}</div>
                <span className="chat-quick-btn-label">{btn.label}</span>
              </div>
            ))}
          </div>
        </div >

        {/* === BOTTOM TAB NAV === */}
        < div className="chat-details-tab-nav" >
          {
            [
              { key: 'info', icon: <InfoCircleOutlined />, label: t('info') },
              { key: 'members', icon: <TeamOutlined />, label: t('members') },
              { key: 'media', icon: <PictureOutlined />, label: t('media') },
              { key: 'notifications', icon: <BellOutlined />, label: t('notifications') },
              { key: 'privacy', icon: <LockOutlined />, label: t('privacy') },
            ].map(tab => (
              <div
                key={tab.key}
                className={`chat-details-tab-item ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key as 'info' | 'members' | 'media' | 'notifications' | 'privacy')}            >
                <span className="tab-icon-wrap">{tab.icon}</span>
                {tab.label}
              </div>
            ))
          }
        </div >

        {/* === TAB CONTENT === */}
        < div className="chat-details-content" >

          {/* INFO tab */}
          {
            activeTab === 'info' && (
              <div>
                <div className="dp-section-title">{t('basicInfo')}</div>

                {[
                  { icon: '🔒', label: t('infoType'), value: t('infoTypePrivate') },
                  { icon: '📅', label: t('infoCreatedDate'), value: new Date().toLocaleDateString('vi-VN') },
                  { icon: '✅', label: t('infoStatus'), value: t('infoStatusActive') },
                  { icon: '💬', label: t('infoTotalMessages'), value: `${messages.length} ${t('messages')}` },
                ].map((row, i) => (
                  <div key={i} className="dp-info-row">
                    <div className="dp-info-icon">{row.icon}</div>
                    <div>
                      <div className="dp-info-label">{row.label}</div>
                      <div className="dp-info-value">{row.value}</div>
                    </div>
                  </div>
                ))}

                <div className="dp-section-title" style={{ marginTop: 16 }}>{t('actionsSection')}</div>
                <button
                  className="dp-action-btn danger"
                  onClick={() => {
                    setConversationsState(prev => ({ ...prev, [selectedConv]: [] }))
                    setShowDetails(false)
                  }}
                >
                  <span className="dp-action-icon">🗑️</span>
                  {t('clearConversation')}
                </button>
              </div>
            )
          }

          {/* MEMBERS tab */}
          {
            activeTab === 'members' && (
              <div>
                <div className="dp-section-title">3 {t('members')}</div>
                {[
                  { name: t('you'), role: t('admin'), badge: 'owner', color: '#6366f1' },
                  { name: 'Bot AI', role: t('member'), badge: 'member', color: '#22c55e' },
                  { name: 'Alice', role: t('member'), badge: 'member', color: '#ec4899' },
                ].map((m, i) => (
                  <div key={i} className="dp-member-card">
                    <Avatar
                      size={40}
                      icon={<UserOutlined />}
                      style={{ background: `linear-gradient(135deg, ${m.color}, ${m.color}99)` }}
                    />
                    <div className="dp-member-info">
                      <div className="dp-member-name">{m.name}</div>
                      <div className="dp-member-role">{m.role}</div>
                    </div>
                    <span className={`dp-member-badge ${m.badge}`}>
                      {m.badge === 'owner' ? t('admin') : t('member')}
                    </span>
                    {m.badge !== 'owner' && (
                      <button className="dp-member-remove" title={t('removeFromGroup')}>
                        <CloseOutlined />
                      </button> // fix
                    )}
                  </div>
                ))}
              </div>
            )
          }

          {/* MEDIA tab */}
          {
            activeTab === 'media' && (
              <div>
                <div className="dp-section-title">{t('filesAndImages')}</div>
                <div className="dp-media-grid">
                  {[
                    { name: 'image1.png', size: '2.4 MB', type: 'img', emoji: '🖼️' },
                    { name: 'document.pdf', size: '1.1 MB', type: 'pdf', emoji: '📄' },
                    { name: 'report.docx', size: '840 KB', type: 'doc', emoji: '📝' },
                    { name: 'archive.zip', size: '5.7 MB', type: 'zip', emoji: '🗜️' },
                  ].map((f, i) => (
                    <div key={i} className="dp-media-card">
                      <div className={`dp-media-file-icon ${f.type}`}>{f.emoji}</div>
                      <div className="dp-media-info">
                        <div className="dp-media-name">{f.name}</div>
                        <div className="dp-media-size">{f.size}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          }

          {/* NOTIFICATIONS tab */}
          {
            activeTab === 'notifications' && (
              <div>
                <div className="dp-section-title">{t('notifSettings')}</div>
                {[
                  { icon: '🔔', cls: 'sound', label: t('notifSound'), sub: t('notifSoundSub'), checked: true },
                  { icon: '🔕', cls: 'mute', label: t('muteNotif'), sub: t('muteNotifSub'), checked: false },
                  { icon: '👁️', cls: 'preview', label: t('previewContent'), sub: t('previewContentSub'), checked: true },
                ].map((n, i) => (
                  <div key={i} className="dp-notif-row">
                    <div className={`dp-notif-icon ${n.cls}`}>{n.icon}</div>
                    <div className="dp-notif-text">
                      <div className="dp-notif-label">{n.label}</div>
                      <div className="dp-notif-sub">{n.sub}</div>
                    </div>
                    <Switch defaultChecked={n.checked} />
                  </div>
                ))}
              </div>
            )
          }

          {/* PRIVACY tab */}
          {
            activeTab === 'privacy' && (
              <div>
                <div className="dp-section-title">{t('privacyTitle')}</div>
                <button
                  className="dp-action-btn"
                  onClick={() => alert('Chặn người dùng (demo)')}
                >
                  <span className="dp-action-icon" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', borderRadius: 8 }}>🚫</span>
                  {t('blockUser')}
                </button>
                <button
                  className="dp-action-btn warning"
                  onClick={() => alert('Báo cáo (demo)')}
                >
                  <span className="dp-action-icon">⚠️</span>
                  {t('reportConv')}
                </button>
                <button
                  className="dp-action-btn danger"
                  onClick={() => alert('Xóa (demo)')}
                >
                  <span className="dp-action-icon">🗑️</span>
                  {t('deleteAndLeave')}
                </button>
              </div>
            )
          }

        </div >
      </div >

      {/* ====== MODALS ====== */}
      < Modal
        title={t('newConversation')}
        open={showNewConv}
        onCancel={() => setShowNewConv(false)}
        footer={
          [
            <Button key="cancel" onClick={() => setShowNewConv(false)}>{t('cancel')}</Button>,
            <Button key="create" type="primary" onClick={() => {
              if (!newConvName.trim()) { message.warning('Vui lòng nhập tên'); return }
              const id = Date.now().toString()
              setConversationsMeta(prev => ({ ...prev, [id]: { name: newConvName.trim(), unread: 0 } }))
              setConversationsState(prev => ({ ...prev, [id]: [] }))
              setSelectedConv(id)
              setShowNewConv(false)
              setNewConvName('')
              message.success(t('create'))
            }}>{t('create')}</Button>
          ]}
      >
        <Input value={newConvName} onChange={e => setNewConvName(e.target.value)} placeholder={t('newConversation')} />
      </Modal >

      {/* ====== MODAL: FIND FRIENDS (PREMIUM) ====== */}
      < Modal
        title={null}
        footer={null}
        open={showFind}
        onCancel={() => setShowFind(false)}
        width={480}
        className="chat-modal-premium"
        closeIcon={< div className="chat-modal-close-icon" >✕</div >}
      >
        <div className="chat-modal-header">
          <h3>{t('findFriends')}</h3>
          <p>{t('findFriendsTitle')}</p>
        </div>

        <div className="chat-modal-search-wrap">
          <SearchOutlined className="search-icon" />
          <input
            className="chat-modal-input"
            value={friendQuery}
            onChange={e => setFriendQuery(e.target.value)}
            placeholder={t('findFriendsPlaceholder')}
            autoFocus
          />
        </div>

        <div className="chat-modal-list">
          <div className="list-label">{t('suggestedLabel')}</div>
          {['Alice', 'Bob', 'Charlie', 'Linh', 'Dat']
            .filter(n => n.toLowerCase().includes(friendQuery.toLowerCase()))
            .map((name, i) => (
              <div key={name} className="chat-modal-user-item">
                <div className="user-avatar">
                  <Avatar size={40} icon={<UserOutlined />} style={{ backgroundColor: ['#6366f1', '#ec4899', '#22c55e', '#f59e0b', '#8b5cf6'][i % 5] }} />
                </div>
                <div className="user-info">
                  <div className="user-name">{name}</div>
                  <div className="user-sub">{t('suggestedSource')}</div>
                </div>
                <button
                  className="user-add-btn"
                  onClick={() => {
                    const id = Date.now().toString()
                    setConversationsMeta(prev => ({ ...prev, [id]: { name, unread: 1 } }))
                    setConversationsState(prev => ({
                      ...prev,
                      [id]: [{ id: Date.now().toString(), text: `Hi ${name}!`, sender: name, timestamp: new Date(), isMine: false }]
                    }))
                    setShowFind(false)
                    message.success(`${t('friendRequested')}: ${name}`)
                  }}
                >
                  {t('addFriend')}
                </button>
              </div>
            ))}
          {friendQuery && !['Alice', 'Bob', 'Charlie', 'Linh', 'Dat'].some(n => n.toLowerCase().includes(friendQuery.toLowerCase())) && (
            <div className="chat-modal-empty">
              <span>😞</span> {t('notFound')} "{friendQuery}"
            </div>
          )}
        </div>
      </Modal >

      {/* ====== MODAL: ABOUT US ====== */}
      < Modal
        title={null}
        footer={null}
        open={showAbout}
        onCancel={() => setShowAbout(false)}
        width={420}
        className="chat-modal-premium about-modal"
        closeIcon={< div className="chat-modal-close-icon" >✕</div >}
      >
        <div className="about-content">
          <div className="about-logo">
            <div className="about-logo-ring" />
            <div className="about-logo-icon">💬</div>
          </div>
          <h2 className="about-title">{t('appName')}</h2>
          <p className="about-ver">{t('version')}</p>

          <div className="about-desc">
            {t('aboutDesc')}
          </div>

          <div className="about-links">
            <button className="about-link-btn" onClick={() => window.open('https://github.com', '_blank')}>
              {t('website')}
            </button>
            <button className="about-link-btn" onClick={() => window.open('https://github.com', '_blank')}>
              {t('terms')}
            </button>
          </div>

          <div className="about-footer">
            {t('rights')}
          </div>
        </div>
      </Modal >

    </div >
  )
}