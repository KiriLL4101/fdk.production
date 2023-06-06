import { CounterSchema } from '../types/counterSchema'
import { counterActions, counterReducer } from './counterSlice'

describe('counterSlice', () => {
    test('should decrement counter value', () => {
        const state: CounterSchema = { value: 10 }

        expect(counterReducer(state, counterActions.decrement())).toEqual({
            value: 9
        })
    })

    test('should increment counter value', () => {
        const state: CounterSchema = { value: 10 }

        expect(counterReducer(state, counterActions.increment())).toEqual({
            value: 11
        })
    })

    test('should increment/decrement counter value with empty state', () => {
        expect(counterReducer(undefined, counterActions.increment())).toEqual({
            value: 1
        })

        expect(counterReducer(undefined, counterActions.decrement())).toEqual({
            value: -1
        })
    })
})
