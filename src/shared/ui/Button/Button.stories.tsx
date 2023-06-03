import type { Meta, StoryObj } from '@storybook/react'

import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Button, ButtonSize, ButtonTheme } from './Button'

const meta = {
    title: 'shared/Button',
    component: Button,
    // tags: ['autodocs'],
    args: {
        children: 'Text'
    }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Clear: Story = {
    args: {
        theme: ButtonTheme.CLEAR
    }
}

export const Outline: Story = {
    args: {
        theme: ButtonTheme.OUTLINE
    }
}

export const OutlineSizeL: Story = {
    args: {
        theme: ButtonTheme.OUTLINE,
        size: ButtonSize.L
    }
}

export const OutlineSizeXL: Story = {
    args: {
        theme: ButtonTheme.OUTLINE,
        size: ButtonSize.XL
    }
}

export const OutlineDark: Story = {
    args: {
        theme: ButtonTheme.OUTLINE
    },
    decorators: [ThemeDecorator(Theme.DARK)]
}

export const BackgroundTheme: Story = {
    args: {
        theme: ButtonTheme.BACKGROUND
    }
}

export const BackgroundInverted: Story = {
    args: {
        theme: ButtonTheme.BACKGROUND_INVERTED
    }
}

export const Square: Story = {
    args: {
        children: '>',
        theme: ButtonTheme.BACKGROUND_INVERTED,
        square: true
    }
}
