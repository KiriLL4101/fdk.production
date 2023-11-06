import type { Meta, StoryObj } from '@storybook/react'

import { Theme } from '@/app/providers/ThemeProvider'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Modal } from './Modal'

const meta = {
    title: 'shared/Modal',
    component: Modal,
    // tags: ['autodocs'],
    args: {
        children: 'Text'
    }
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
    args: {
        isOpen: true,
        children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. .'
    }
}

export const Dark: Story = {
    args: {
        isOpen: true,
        children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. .'
    },
    decorators: [ThemeDecorator(Theme.DARK)]
}
