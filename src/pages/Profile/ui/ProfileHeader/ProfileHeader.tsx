import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { Button, ButtonTheme, Text } from 'shared/ui'
import {
    getProfileData,
    getProfileReadonly,
    profileActions,
    updateProfileData,
} from 'entities/Profile'
import { getUserAuthData } from 'entities/User'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'

import styles from './ProfileHeader.module.scss'

export const ProfileHeader = () => {
    const { t } = useTranslation('profile')

    const readonly = useSelector(getProfileReadonly)
    const authData = useSelector(getUserAuthData)
    const profileData = useSelector(getProfileData)

    const canEdit = authData?.id === profileData?.id

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
            {canEdit && (
                <div className={styles.btnsWrapper}>
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
            )}
        </div>
    )
}
