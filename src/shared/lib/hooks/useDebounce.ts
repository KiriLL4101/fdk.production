import { useCallback, useRef } from 'react'

export const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
    const timerIdRef = useRef<NodeJS.Timeout | null>(null)

    return useCallback(
        (...args: any[]) => {
            if (timerIdRef.current) {
                clearTimeout(timerIdRef.current)
            }

            timerIdRef.current = setTimeout(() => {
                callback(...args)
            }, delay)
        },
        [callback, delay]
    )
}
