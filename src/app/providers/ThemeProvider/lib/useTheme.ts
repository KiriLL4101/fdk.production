/* eslint-disable indent */
import { useContext } from 'react'
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext'

interface UseThemeOutput {
    theme: Theme
    toggleTheme: () => void
}

export function useTheme(): UseThemeOutput {
    const context = useContext(ThemeContext)

    //  if (!context) {
    //     throw new Error('useTheme hook must be used within a Theme Provider')
    //   }

    const { theme, setTheme } = context

    const toggleTheme = () => {
        let newTheme: Theme

        switch (theme) {
            case Theme.DARK:
                newTheme = Theme.LIGHT
                break
            case Theme.LIGHT:
                newTheme = Theme.BLUE
                break
            case Theme.BLUE:
                newTheme = Theme.DARK
                break
            default:
                newTheme = Theme.LIGHT
        }

        setTheme?.(newTheme)

        document.body.classList.value = ''
        document.body.classList.add(newTheme)

        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
    }

    return {
        theme: theme || Theme.LIGHT,
        toggleTheme,
    }
}
