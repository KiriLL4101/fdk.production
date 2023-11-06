import type { Meta, StoryObj } from '@storybook/react'

import { Theme } from '@/app/providers/ThemeProvider'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { NotFound } from './NotFound'

const meta = {
    title: 'pages/NotFound',
    component: NotFound,
    // tags: ['autodocs'],
    args: {}
} satisfies Meta<typeof NotFound>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
    args: {}
}

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)]
}
