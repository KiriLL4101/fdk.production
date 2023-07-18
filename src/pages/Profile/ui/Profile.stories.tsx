import type { Meta, StoryObj } from '@storybook/react'

import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import Profile from './Profile'

const meta = {
    title: 'pages/Profile',
    component: Profile,
    args: {},
} satisfies Meta<typeof Profile>

export default meta
type Story = StoryObj<typeof meta>

export const Normal: Story = {
    decorators: [
        StoreDecorator({
            profile: {
                form: {
                    username: 'admin',
                    age: 22,
                    country: Country.Kazakhstan,
                    lastName: 'Ivanov',
                    firstName: 'Ivan',
                    city: 'asf',
                    currency: Currency.USD,
                },
                readonly: true,
            },
        }),
    ],
}

export const Dark: Story = {
    decorators: [
        ThemeDecorator(Theme.DARK),
        StoreDecorator({
            profile: {
                form: {
                    username: 'admin',
                    age: 22,
                    country: Country.Kazakhstan,
                    lastName: 'Ivanov',
                    firstName: 'Ivan',
                    city: 'asf',
                    currency: Currency.USD,
                },
                readonly: true,
            },
        }),
    ],
}
