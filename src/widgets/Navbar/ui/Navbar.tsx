import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/className';
import { AppLink, AppLinkVariant } from 'shared/ui/AppLink/AppLink';

import styles from './Navbar.module.scss';

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = ({ className = '' }) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(styles.Navbar, {}, [className])}>
            <div className={styles.links}>
                <AppLink variant={AppLinkVariant.SECONDARY} to="/" className={styles.mainLink}>
                    {t('Главная')}
                </AppLink>
                <AppLink variant={AppLinkVariant.SECONDARY} to="/about">
                    {t('О сайте')}
                </AppLink>
            </div>
        </div>
    );
};
