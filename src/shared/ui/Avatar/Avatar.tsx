import { classNames } from 'shared/lib/className'
import styles from './Avatar.module.scss'

interface AvatarProps {
    className?: string
    src?: string
    size?: number
    alt?: string
}

export const Avatar = ({ className, src, size = 100, alt }: AvatarProps) => (
    <img
        src={src}
        alt={alt}
        height={size}
        width={size}
        className={classNames(styles.avatar, {}, [className])}
    />
)
