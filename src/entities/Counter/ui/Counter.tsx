/* eslint-disable react/button-has-type */
/* eslint-disable i18next/no-literal-string */
import { useDispatch, useSelector } from 'react-redux'

import { counterActions } from '../model/slice/counterSlice'

import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue'

export const Counter = () => {
    const dispatch = useDispatch()
    const counter = useSelector(getCounterValue)

    const increment = () => {
        dispatch(counterActions.increment())
    }

    const decrement = () => {
        dispatch(counterActions.decrement())
    }

    return (
        <div>
            <h1 data-testid='value-title'>{counter}</h1>
            <button onClick={increment} data-testid='increment-btn'>
                increment
            </button>
            <button onClick={decrement} data-testid='decrement-btn'>
                decrement
            </button>
        </div>
    )
}
