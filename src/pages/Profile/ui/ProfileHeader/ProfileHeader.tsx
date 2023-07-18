import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, ButtonTheme, Text } from 'shared/ui'

import { useSelector } from 'react-redux'
import {
    getProfileReadonly,
    profileActions,
    updateProfileData
} from 'entities/Profile'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import styles from './ProfileHeader.module.scss'

export const ProfileHeader = () => {
    const { t } = useTranslation('profile')

    const readonly = useSelector(getProfileReadonly)
    const dispatch = useAppDispatch()

    const onEditProfile = useCallback(() => {
        dispatch(profileActions.setReadonly(false))
    }, [dispatch])

    const onCancelEditProfile = useCallback(() => {
        dispatch(profileActions.cancelEdit())
    }, [dispatch])

    const onSaveProfile = useCallback(() => {
        dispatch(updateProfileData())
    }, [dispatch])

    return (
        <div className={styles.header}>
            <Text title={t('Профиль')} />
            {readonly ? (
                <Button
                    className={styles.editBtn}
                    theme={ButtonTheme.OUTLINE}
                    onClick={onEditProfile}
                >
                    {t('Редактировать')}
                </Button>
            ) : (
                <>
                    <Button
                        className={styles.editBtn}
                        theme={ButtonTheme.OUTLINE_RED}
                        onClick={onCancelEditProfile}
                    >
                        {t('Отменить')}
                    </Button>
                    <Button
                        className={styles.saveBtn}
                        theme={ButtonTheme.OUTLINE}
                        onClick={onSaveProfile}
                    >
                        {t('Сохранить')}
                    </Button>
                </>
            )}
        </div>
    )
}
