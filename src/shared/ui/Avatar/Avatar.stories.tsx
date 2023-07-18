import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from './Avatar'

import MockImg from './storybook.jpg'

const meta = {
    title: 'shared/Avatar',
    component: Avatar,
    args: {}
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        src: MockImg
    }
}

export const Size: Story = {
    args: {
        size: 300,
        src: MockImg
    }
}
