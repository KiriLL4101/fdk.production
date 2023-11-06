import { classNames } from '@/shared/lib/className'
import { Loader } from '@/shared/ui'

import styles from './PageLoader.module.scss'

interface PageLoaderProps {
    className?: string
}

export const PageLoader = ({ className = '' }: PageLoaderProps) => (
    <div className={classNames(styles.PageLoader, {}, [className])}>
        <Loader />
    </div>
)
