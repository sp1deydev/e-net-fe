import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Space, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import { GlobalOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons'
import { useI18n } from '../i18n'
import './Auth.css'

export default function Register() {
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
      label: 'Tiếng Việt',
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
    console.log('Register form', values)
    navigate('/login')
  }

  return (
    <div className="auth-root">
      {/* Theme & Lang Switcher (Absolute Top Right) */}
      <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 100, display: 'flex', gap: 10 }}>
        <Dropdown menu={{ items: langItems }} placement="bottomRight">
          <Button icon={<GlobalOutlined />} type="text" style={{ color: 'var(--text-secondary)' }}>
            {lang === 'vi' ? 'VN' : 'EN'}
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
          {t('registerTitle')}<br />
          <span>{t('registerSubtitle')}</span>
        </h2>
        <p className="auth-brand-desc">
          {t('registerDesc')}
        </p>

        <div className="auth-brand-features">
          <div className="auth-feature-item">
            <div className="auth-feature-icon">🆓</div>
            <span className="auth-feature-text">{t('featureFree')}</span>
          </div>
          <div className="auth-feature-item">
            <div className="auth-feature-icon">📱</div>
            <span className="auth-feature-text">{t('featureDevices')}</span>
          </div>
          <div className="auth-feature-item">
            <div className="auth-feature-icon">🎯</div>
            <span className="auth-feature-text">{t('featureFriendly')}</span>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="auth-form-panel">
        <div className="auth-card">
          <div className="auth-card-header">
            <h2>{t('register')}</h2>
            <p>{t('createAccount')}</p>
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

            <Form.Item
              name="confirmPassword"
              label={<span className="auth-form-label">{t('confirmPassword')}</span>}
              rules={[{ required: true, message: t('pleaseConfirmPassword') }]}
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
                  {t('register')}
                </Button>
              </Space>
            </Form.Item>
          </Form>

          <div className="auth-footer-link">
            <span>{t('alreadyHaveAccount')} </span>
            <button onClick={() => navigate('/login')}>
              {t('login')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}