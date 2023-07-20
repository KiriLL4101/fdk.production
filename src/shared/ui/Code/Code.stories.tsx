import type { Meta, StoryObj } from '@storybook/react'

import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Code } from './Code'

const meta = {
    title: 'shared/Code',
    component: Code,
    args: {
        text: 'function calculateOrbit(planet) {\n // code to calculate the orbit of the planet\n return orbit;\n}',
    },
} satisfies Meta<typeof Code>

export default meta
type Story = StoryObj<typeof meta>

export const CodeDefault: Story = {
    args: {},
}

export const CodeDark: Story = {
    decorators: [ThemeDecorator(Theme.DARK)],
}
