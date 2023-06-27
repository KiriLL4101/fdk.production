import { fireEvent, render, screen } from '@testing-library/react'
import { Input } from './Input'

const setup = () => {
    const utils = render(<Input />)
    const input = screen.getByTestId('custom-input') as HTMLInputElement
    return {
        input,
        ...utils
    }
}

describe('Input', () => {
    test('component Input to be in the document', () => {
        const { input } = setup()
        fireEvent.change(input, { target: { value: 'Test' } })
        expect(input.value).toBe('Test')
    })
})
