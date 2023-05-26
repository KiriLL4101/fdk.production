import { useState } from 'react'
import styles from './Counter.module.scss'

export const Counter = () => {
  const [counter, setCounter] = useState(0)

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.h1}>{counter}</h1>
      <button className={styles.button} onClick={() => setCounter(counter + 1)}>
        Click
      </button>
    </div>
  )
}
