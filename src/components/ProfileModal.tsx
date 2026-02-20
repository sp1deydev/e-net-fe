import React, { useState, useEffect } from 'react'
import {
    Modal,
    Avatar,
    Button,
    Input,
    Form,
    Typography,
    Divider,
    message,
    Upload
} from 'antd'
import {
    UserOutlined,
    MailOutlined,
    SolutionOutlined,
    SaveOutlined,
    EditOutlined,
    CalendarOutlined,
    CameraOutlined,
    CloseOutlined
} from '@ant-design/icons'
import { useAppSelector, useAppDispatch, updateProfile } from '../store'
import { useI18n } from '../i18n'
import '../pages/Profile.css'

const { Title, Paragraph, Text } = Typography

interface ProfileModalProps {
    open: boolean
    onClose: () => void
}

export default function ProfileModal({ open, onClose }: ProfileModalProps) {
    const { t } = useI18n()
    const dispatch = useAppDispatch()
    const { currentUser } = useAppSelector(state => state.user)
    const [form] = Form.useForm()
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        if (open && currentUser) {
            form.setFieldsValue(currentUser)
        }
    }, [open, currentUser, form])

    if (!currentUser) return null

    const handleSave = async () => {
        try {
            const values = await form.validateFields()
            dispatch(updateProfile(values))
            message.success(t('updateSuccess'))
            setIsEditing(false)
        } catch (error) {
            message.error(t('updateError'))
        }
    }

    const beforeUpload = (file: File) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpgOrPng) {
            message.error('Hệ thống chỉ hỗ trợ định dạng JPG/PNG!')
            return false
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
            message.error('Ảnh phải nhỏ hơn 2MB!')
            return false
        }

        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            const base64 = reader.result as string
            dispatch(updateProfile({ avatar: base64 }))
            message.success('Đã cập nhật ảnh đại diện!')
        }
        return false
    }

    return (
        <Modal
            title={null}
            open={open}
            onCancel={() => {
                setIsEditing(false)
                onClose()
            }}
            footer={null}
            width={560}
            className="profile-modal-premium wow-style"
            centered
            closeIcon={<div className="chat-modal-close-icon" style={{ top: 15, right: 15 }}>✕</div>}
        >
            {/* Cover Background */}
            <div className="profile-cover">
                <div className="profile-cover-overlay" />
            </div>

            {/* Avatar & Basic Info Header */}
            <div className="profile-avatar-container">
                <div className="avatar-wrapper">
                    <Avatar
                        size={120}
                        src={currentUser.avatar || 'https://cdn-icons-png.flaticon.com/512/1090/1090806.png'}
                        icon={<UserOutlined />}
                        className="avatar-main"
                        style={{ border: '4px solid var(--bg-card)' }}
                    />
                    <Upload
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        accept="image/*"
                    >
                        <div className="avatar-upload-overlay">
                            <CameraOutlined style={{ fontSize: 18 }} />
                        </div>
                    </Upload>
                </div>
                {!isEditing && (
                    <div className="user-identity">
                        <div className="username-tag">
                            @{currentUser.username}
                        </div>
                    </div>
                )}
            </div>

            <div className="profile-body">
                {!isEditing ? (
                    <>
                        {/* Action Bar - Balanced & Aligned */}
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                className="btn-wow primary"
                                onClick={() => setIsEditing(true)}
                            >
                                {t('editProfile')}
                            </Button>
                        </div>

                        {/* Bio Section */}
                        <div className="profile-card">
                            <div className="card-title">
                                <SolutionOutlined /> {t('bio')}
                            </div>
                            <div className="bio-text">
                                {currentUser.bio || t('bioPlaceholder')}
                            </div>
                        </div>

                        {/* Info List */}
                        <div className="info-grid">
                            <div className="info-box">
                                <span className="label">{t('email')}</span>
                                <span className="value">{currentUser.email}</span>
                            </div>
                            <div className="info-box">
                                <span className="label">{t('memberSince')}</span>
                                <span className="value">{currentUser.joinedDate}</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={currentUser}
                        onFinish={handleSave}
                        className="profile-edit-form"
                    >
                        <div className="profile-edit-header">
                            <span style={{ fontSize: '18px', fontWeight: 700, color: 'white' }}>
                                <EditOutlined style={{ marginRight: 8, color: 'var(--app-primary)' }} />
                                {t('editProfile')}
                            </span>
                            <Button
                                type="text"
                                icon={<CloseOutlined />}
                                onClick={() => setIsEditing(false)}
                                style={{ color: 'var(--app-text-muted)' }}
                            />
                        </div>

                        <Form.Item
                            name="bio"
                            label={t('bio')}
                            className="premium-input"
                        >
                            <Input.TextArea placeholder={t('bioPlaceholder')} autoSize={{ minRows: 3, maxRows: 6 }} />
                        </Form.Item>

                        <div className="profile-edit-footer">
                            <Button
                                className="btn-wow ghost"
                                onClick={() => setIsEditing(false)}
                            >
                                {t('cancel')}
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<SaveOutlined />}
                                className="btn-wow primary"
                            >
                                {t('saveChanges')}
                            </Button>
                        </div>
                    </Form>
                )}
            </div>
        </Modal>
    )
}
