import type { Meta, StoryObj } from '@storybook/react'

import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import About from './About'

const meta = {
    title: 'pages/About',
    component: About,
    // tags: ['autodocs'],
    args: {}
} satisfies Meta<typeof About>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
    args: {}
}

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)]
}
