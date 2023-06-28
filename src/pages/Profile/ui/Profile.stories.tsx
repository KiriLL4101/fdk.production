import type { Meta, StoryObj } from '@storybook/react'

import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'
import Profile from './Profile'

const meta = {
    title: 'pages/Profile',
    component: Profile,
    // tags: ['autodocs'],
    args: {}
} satisfies Meta<typeof Profile>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
    decorators: [StoreDecorator({})]
}

export const Dark: Story = {
    decorators: [ThemeDecorator(Theme.DARK), StoreDecorator({})]
}
