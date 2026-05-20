import React from 'react'
import { Card, Table, Tag, Row, Col, Button, Avatar } from 'antd'
import {
  UserOutlined,
  DashboardOutlined,
  LogoutOutlined,
  MessageOutlined,
  SettingOutlined,
  ArrowUpOutlined,
  DatabaseOutlined,
  WechatOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector, logout } from '../store'
import { useI18n } from '../i18n'
import './AdminDashboard.css'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { t } = useI18n()
  const { currentUser } = useAppSelector(state => state.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  // Mock data for analytics
  const stats = [
    { title: 'Total Users', value: 1248, icon: <UserOutlined />, change: '+12%', type: 'up' },
    { title: 'Active Chats', value: 342, icon: <MessageOutlined />, change: '+8%', type: 'up' },
    { title: 'System Health', value: '99.9%', icon: <DatabaseOutlined />, change: 'Optimal', type: 'health' }
  ]

  const columns = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar src={record.avatar} icon={<UserOutlined />} style={{ backgroundColor: record.color }} />
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{text}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{record.email}</div>
          </div>
        </div>
      )
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={role === 'admin' ? 'indigo' : 'blue'} style={{ borderRadius: 6, fontWeight: 600 }}>
          {role.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'online' ? 'success' : 'default'} style={{ borderRadius: 6 }}>
          {status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Joined Date',
      dataIndex: 'joined',
      key: 'joined',
      render: (text: string) => <span style={{ color: 'var(--text-muted)' }}>{text}</span>
    }
  ]

  const mockUsers = [
    { key: '1', name: 'Thien TDK', email: 'admin@enet.com', role: 'admin', status: 'online', color: '#6366f1' },
    { key: '2', name: 'Alice Johnson', email: 'alice@example.com', role: 'user', status: 'online', color: '#ec4899' },
    { key: '3', name: 'Bob Smith', email: 'bob@example.com', role: 'user', status: 'offline', color: '#22c55e' },
    { key: '4', name: 'Charlie Brown', email: 'charlie@example.com', role: 'user', status: 'online', color: '#f59e0b' }
  ]

  return (
    <div className="admin-root">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand-icon">💬</div>
          <span className="admin-brand-name">E-Net Admin</span>
        </div>

        <div className="admin-menu">
          <div className="admin-menu-item active">
            <DashboardOutlined /> Dashboard
          </div>
          <div className="admin-menu-item" onClick={() => navigate('/chat')}>
            <WechatOutlined /> Back to Chat
          </div>
        </div>

        <div className="admin-sidebar-footer">
          <div className="admin-user-profile">
            <Avatar src={currentUser?.avatar} icon={<UserOutlined />} />
            <div className="user-details">
              <div className="name">{currentUser?.fullName}</div>
              <div className="role">Administrator</div>
            </div>
          </div>
          <button className="admin-logout-btn" onClick={handleLogout}>
            <LogoutOutlined /> Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="admin-main">
        <header className="admin-header">
          <div className="admin-header-title">
            <h2>System Overview</h2>
            <p>Real-time analytics and controls</p>
          </div>
        </header>

        <div className="admin-content-grid">
          {/* Stats Cards */}
          <Row gutter={[20, 20]} className="admin-stats-row">
            {stats.map((stat, i) => (
              <Col xs={24} sm={12} lg={8} key={i}>
                <Card className="admin-stat-card" bordered={false}>
                  <div className="card-top">
                    <span className="stat-icon">{stat.icon}</span>
                    <span className={`stat-badge ${stat.type}`}>{stat.change}</span>
                  </div>
                  <div className="card-bottom">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-title">{stat.title}</div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* User Management Table */}
          <Card title="User Accounts" className="admin-table-card" bordered={false}>
            <Table
              columns={columns}
              dataSource={mockUsers}
              pagination={false}
              className="admin-table"
            />
          </Card>
        </div>
      </div>
    </div>
  )
}
