import type { Meta, StoryObj } from '@storybook/react'

import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import Main from './Main'

const meta = {
    title: 'pages/Main',
    component: Main,
    // tags: ['autodocs'],
    args: {}
} satisfies Meta<typeof Main>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
    args: {}
}

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)]
}
