import type { Meta, StoryObj } from '@storybook/react'

import { Theme } from '@/app/providers/ThemeProvider'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Input } from './Input'

const meta = {
    title: 'shared/Input',
    component: Input,
    // tags: ['autodocs'],
    args: {
        children: 'Text'
    }
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const InputDefault: Story = {
    args: {
        label: 'Email',
        value: '123@mail.ru'
    }
}

export const InputDark: Story = {
    args: {
        label: 'Email',
        value: '123@mail.ru'
    },
    decorators: [ThemeDecorator(Theme.DARK)]
}
