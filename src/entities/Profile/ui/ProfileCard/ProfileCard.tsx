import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { Input, Loader, Text, TextTheme, TextAlign, Avatar, HStack, VStack } from 'shared/ui'
import { classNames } from 'shared/lib/className'
import { Currency, CurrencySelect } from 'entities/Currency'
import { Country, CountrySelect } from 'entities/Country'
import { Profile } from '../../model/types/profile'

import styles from './ProfileCard.module.scss'

interface ProfileCardProps {
    className?: string
    data?: Profile
    isLoading?: boolean
    error?: string
    readonly?: boolean
    onChangeFirstName?: (value: ChangeEvent<HTMLInputElement>) => void
    onChangeLastName?: (value: ChangeEvent<HTMLInputElement>) => void
    onChangeAge?: (value: ChangeEvent<HTMLInputElement>) => void
    onChangeCity?: (value: ChangeEvent<HTMLInputElement>) => void
    onChangeUsername?: (value: ChangeEvent<HTMLInputElement>) => void
    onChangeAvatar?: (value: ChangeEvent<HTMLInputElement>) => void
    onChangeCurrency?: (value: Currency) => void
    onChangeCountry?: (value: Country) => void
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        data,
        isLoading,
        error,
        readonly,
        onChangeFirstName,
        onChangeLastName,
        onChangeAge,
        onChangeCity,
        onChangeUsername,
        onChangeAvatar,
        onChangeCountry,
        onChangeCurrency,
    } = props
    const { t } = useTranslation('profile')

    if (isLoading) {
        return (
            <HStack
                justify='center'
                max
                className={classNames(styles.profileCard, {}, [className, styles.loading])}
            >
                <Loader />
            </HStack>
        )
    }

    if (error) {
        return (
            <HStack
                justify='center'
                max
                className={classNames(styles.profileCard, {}, [className, styles.error])}
            >
                <Text
                    theme={TextTheme.ERROR}
                    title={t('Произошла ошибка при загрузке профиля')}
                    text={t('Попробуйте обновить страницу')}
                    align={TextAlign.CENTER}
                />
            </HStack>
        )
    }

    return (
        <VStack
            gap='8'
            max
            className={classNames(styles.profileCard, { [styles.editing]: !readonly }, [className])}
        >
            {data?.avatar && (
                <HStack justify='center' max className={styles.avatar}>
                    <Avatar src={data.avatar} size={200} alt={data?.firstName} />
                </HStack>
            )}
            <Input
                value={data?.firstName}
                label={t('Ваше имя')}
                className={styles.input}
                readOnly={readonly}
                onChange={onChangeFirstName}
            />
            <Input
                value={data?.lastName}
                label={t('Ваша фамилия')}
                className={styles.input}
                readOnly={readonly}
                onChange={onChangeLastName}
            />
            <Input
                value={data?.age}
                label={t('Ваш возраст')}
                className={styles.input}
                readOnly={readonly}
                onChange={onChangeAge}
            />
            <Input
                value={data?.city}
                label={t('Город')}
                className={styles.input}
                readOnly={readonly}
                onChange={onChangeCity}
            />
            <Input
                value={data?.username}
                label={t('Введите имя пользователя')}
                className={styles.input}
                readOnly={readonly}
                onChange={onChangeUsername}
            />
            <Input
                value={data?.avatar}
                label={t('Введите ссылку на аватар')}
                className={styles.input}
                readOnly={readonly}
                onChange={onChangeAvatar}
            />

            <CurrencySelect
                value={data?.currency}
                className={styles.input}
                readonly={readonly}
                onChange={onChangeCurrency}
            />

            <CountrySelect
                value={data?.country}
                className={styles.input}
                readonly={readonly}
                onChange={onChangeCountry}
            />
        </VStack>
    )
}
