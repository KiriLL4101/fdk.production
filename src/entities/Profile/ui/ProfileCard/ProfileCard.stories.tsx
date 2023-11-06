import type { Meta, StoryObj } from '@storybook/react'

import { Theme } from '@/app/providers/ThemeProvider'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import { ProfileCard } from './ProfileCard'

const meta = {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    args: {},
} satisfies Meta<typeof ProfileCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        data: {
            username: 'admin',
            age: 22,
            country: Country.Kazakhstan,
            lastName: 'Ivanov',
            firstName: 'Ivan',
            city: 'asf',
            currency: Currency.USD,
        },
    },
}

export const WithError: Story = {
    args: { error: 'Error example' },
}

export const Loading: Story = {
    args: { isLoading: true },
}

export const Dark: Story = {
    args: {
        data: {
            username: 'admin',
            age: 22,
            country: Country.Kazakhstan,
            lastName: 'Ivanov',
            firstName: 'Ivan',
            city: 'asf',
            currency: Currency.USD,
        },
    },
    decorators: [ThemeDecorator(Theme.DARK)],
}
