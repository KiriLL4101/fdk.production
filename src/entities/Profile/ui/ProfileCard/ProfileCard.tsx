import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { Button, ButtonTheme, Input, Text } from 'shared/ui'
import { classNames } from 'shared/lib/className'
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData'

import cls from './ProfileCard.module.scss'

interface ProfileCardProps {
    className?: string
}

export const ProfileCard = ({ className }: ProfileCardProps) => {
    const { t } = useTranslation('profile')

    const data = useSelector(getProfileData)
    // const isLoading = useSelector(getProfileIsLoading);
    // const error = useSelector(getProfileError);

    return (
        <div className={classNames(cls.ProfileCard, {}, [className])}>
            <div className={cls.header}>
                <Text title={t('Профиль')} />
                <Button className={cls.editBtn} theme={ButtonTheme.OUTLINE}>
                    {t('Редактировать')}
                </Button>
            </div>
            <div className={cls.data}>
                <Input
                    value={data?.firstName}
                    label={t('Ваше имя')}
                    className={cls.input}
                />
                <Input
                    value={data?.lastName}
                    label={t('Ваша фамилия')}
                    className={cls.input}
                />
            </div>
        </div>
    )
}
