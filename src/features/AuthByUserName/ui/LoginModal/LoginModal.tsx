import { Suspense } from 'react'

import { Loader, Modal } from 'shared/ui'
import LoginForm from '../LoginForm/LoginForm'

import styles from './LoginModal.module.scss'

interface LoginModalProps {
    isOpen: boolean
    onClose: () => void
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <div className={styles.LoginModal}>
            <Suspense fallback={<Loader />}>
                <LoginForm />
            </Suspense>
        </div>
    </Modal>
)
