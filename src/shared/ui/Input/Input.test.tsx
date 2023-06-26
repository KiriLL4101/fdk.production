import { render, screen } from '@testing-library/react'
import { Input } from './Input'

describe('Input', () => {
    test('component Input to be in the document', () => {
        render(<Input value="Test" />)
        expect(screen.getByText('Test')).toBeInTheDocument()
    })

    // test('component Button has class clear', () => {
    //     render(<Button theme={ButtonTheme.CLEAR}>Test</Button>)
    //     expect(screen.getByText('Test')).toHaveClass('clear')
    //     screen.debug()
    // })
})
