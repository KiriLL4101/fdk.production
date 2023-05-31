import { useState } from 'react'

import { Button, ThemeSwitcher } from 'shared/ui'
import { classNames } from 'shared/lib/className'

import styles from './Sidebar.module.scss'

interface SidebarProps {
  className?: string
}

export const Sidebar = ({ className = '' }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)

  const onToggle = () => {
    setCollapsed((prev) => !prev)
  }

  return (
    <div className={classNames(styles.Sidebar, { [styles.collapsed]: collapsed }, [className])}>
      <Button onClick={onToggle}>Toggle</Button>

      <div className={styles.switchers}>
        <ThemeSwitcher />
      </div>
    </div>
  )
}
