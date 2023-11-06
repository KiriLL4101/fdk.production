import { fireEvent, screen } from '@testing-library/react'
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender'
import { Counter } from './Counter'

describe('Counter', () => {
    test('should render with initial state', () => {
        componentRender(<Counter />, {
            initialState: { counter: { value: 10 } }
        })
        expect(screen.getByTestId('value-title')).toHaveTextContent('10')
    })

    test('should increment counter on click btn', () => {
        componentRender(<Counter />, {
            initialState: { counter: { value: 10 } }
        })

        fireEvent.click(screen.getByTestId('increment-btn'))
        expect(screen.getByTestId('value-title')).toHaveTextContent('11')
    })

    test('should decrement counter on click btn', () => {
        componentRender(<Counter />, {
            initialState: { counter: { value: 10 } }
        })

        fireEvent.click(screen.getByTestId('decrement-btn'))
        expect(screen.getByTestId('value-title')).toHaveTextContent('9')
    })
})
