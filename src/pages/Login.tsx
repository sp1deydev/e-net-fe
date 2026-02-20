import React from 'react'
import { Button, Form, Input, Space, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { GoogleOutlined, FacebookOutlined, GithubOutlined, GlobalOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '../i18n'
import { useState, useEffect } from 'react'
import './Auth.css'

function loginWithGoogle() {
  alert('Đăng nhập với Google')
  window.location.href = '/chat'
}

function loginWithFacebook() {
  alert('Đăng nhập với Facebook')
  window.location.href = '/chat'
}

function loginWithGithub() {
  alert('Đăng nhập với GitHub')
  window.location.href = '/chat'
}

export default function Login() {
  const navigate = useNavigate()
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
  }

  const langItems: MenuProps['items'] = [
    {
      key: 'vi',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>🇻🇳</span> Tiếng Việt
        </div>
      ),
      onClick: () => setLang('vi'),
    },
    {
      key: 'en',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>🇺🇸</span> Tiếng Anh
        </div>
      ),
      onClick: () => setLang('en'),
    }
  ]

  const onFinish = (values: any) => {
    console.log('Login form', values)
    navigate('/chat')
  }

  return (
    <div className="auth-root">
      {/* Theme & Lang Switcher (Absolute Top Right) */}
      <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 100, display: 'flex', gap: 10 }}>
        <Dropdown menu={{ items: langItems }} placement="bottomRight">
          <Button type="text" style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            {lang === 'vi' ? <><span>🇻🇳</span> VN</> : <><span>🇺🇸</span> EN</>}
          </Button>
        </Dropdown>
        <Button
          icon={theme === 'dark' ? <MoonOutlined /> : <SunOutlined />}
          type="text"
          onClick={toggleTheme}
          style={{ color: 'var(--text-secondary)' }}
        />
      </div>

      {/* Left branding panel */}
      <div className="auth-brand-panel">
        <div className="auth-brand-logo">
          <div className="auth-brand-icon">💬</div>
          <span className="auth-brand-name">E-Net</span>
        </div>

        <h2 className="auth-brand-tagline">
          {t('sloganTitle')}<br />
          <span>{t('sloganSubtitle')}</span>
        </h2>
        <p className="auth-brand-desc">
          {t('sloganDesc')}
        </p>

        <div className="auth-brand-features">
          <div className="auth-feature-item">
            <div className="auth-feature-icon">🔒</div>
            <span className="auth-feature-text">{t('featureSecure')}</span>
          </div>
          <div className="auth-feature-item">
            <div className="auth-feature-icon">⚡</div>
            <span className="auth-feature-text">{t('featureRealtime')}</span>
          </div>
          <div className="auth-feature-item">
            <div className="auth-feature-icon">🌐</div>
            <span className="auth-feature-text">{t('featureMultilang')}</span>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="auth-form-panel">
        <div className="auth-card">
          <div className="auth-card-header">
            <h2>{t('login')}</h2>
            <p>{t('homeWelcome')}</p>
          </div>

          <Form layout="vertical" onFinish={onFinish} size="large">
            <Form.Item
              name="email"
              label={<span className="auth-form-label">{t('email')}</span>}
              rules={[{ required: true, message: t('pleaseEnterEmail') }]}
              className="auth-form-group"
            >
              <Input placeholder="you@example.com" />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span className="auth-form-label">{t('password')}</span>}
              rules={[{ required: true, message: t('pleaseEnterPassword') }]}
              className="auth-form-group"
            >
              <Input.Password />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Space direction="vertical" style={{ width: '100%', gap: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  className="auth-submit-btn"
                >
                  {t('login')}
                </Button>

                <div className="auth-divider">
                  <div className="auth-divider-line" />
                  <span className="auth-divider-text">{t('loginWith')}</span>
                  <div className="auth-divider-line" />
                </div>

                <div className="auth-oauth-grid">
                  <Button
                    icon={<GoogleOutlined />}
                    onClick={loginWithGoogle}
                    className="auth-oauth-btn"
                  >
                    Google
                  </Button>
                  <Button
                    icon={<FacebookOutlined />}
                    onClick={loginWithFacebook}
                    className="auth-oauth-btn"
                  >
                    Facebook
                  </Button>
                  <Button
                    icon={<GithubOutlined />}
                    onClick={loginWithGithub}
                    className="auth-oauth-btn"
                  >
                    GitHub
                  </Button>
                </div>
              </Space>
            </Form.Item>
          </Form>

          <div className="auth-footer-link">
            <span>{t('dontHaveAccount')} </span>
            <button onClick={() => navigate('/register')}>
              {t('register')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
