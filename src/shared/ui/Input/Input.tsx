import {
    type ChangeEvent,
    type InputHTMLAttributes,
    memo,
    useId,
    useState,
    useRef,
    useEffect
} from 'react'
import { type DefaultTFuncReturn } from 'i18next'

import { classNames } from '@/shared/lib/className'

import styles from './Input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string | DefaultTFuncReturn
    className?: string
    autofocus?: boolean
}

export const Input = memo((props: InputProps) => {
    const {
        label,
        className,
        onChange,
        autofocus,
        readOnly,
        ...otherProps
    } = props

    const inputId = useId()

    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [caretPosition, setCaretPosition] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)

    const isCaretVisible = isFocused && !readOnly

    useEffect(() => {
        if (!autofocus) return

        setIsFocused(true)

        setTimeout(() => {
            inputRef.current?.focus()
        })
    }, [autofocus])

    const onBlur = () => {
        setIsFocused(false)
    }

    const onFocus = () => {
        setIsFocused(true)
    }

    const onSelect = (e: any) => {
        setCaretPosition(e?.target?.selectionStart || 0)
    }

    const onChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event)
        setCaretPosition(event.target.selectionStart || 0)
    }

    return (
        <div
            className={classNames(
                styles.wrapper,
                { [styles.readonly]: readOnly },
                [className]
            )}
        >
            {label && (
                <label className={styles.label} htmlFor={inputId}>
                    {`${label} >`}
                </label>
            )}
            <div className={styles.wrapperCaret}>
                <input
                    ref={inputRef}
                    id={inputId}
                    className={styles.input}
                    onChange={onChangeHandle}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onSelect={onSelect}
                    readOnly={readOnly}
                    data-testid='custom-input'
                    {...otherProps}
                />
                {isCaretVisible && (
                    <span
                        className={styles.caret}
                        style={{ left: `${caretPosition * 7}px` }}
                    />
                )}
            </div>
        </div>
    )
})
