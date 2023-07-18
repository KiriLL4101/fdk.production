import { ChangeEvent, memo, useMemo } from 'react'
import { DefaultTFuncReturn } from 'i18next'

import { classNames } from 'shared/lib/className'

import styles from './Select.module.scss'

export interface SelectOption {
    value: string
    content: string
}

interface SelectProps {
    className?: string
    label?: DefaultTFuncReturn | string
    options?: SelectOption[]
    selected?: string
    onChange?: (value: string) => void
    readonly?: boolean
}

export const Select = memo((props: SelectProps) => {
    const { className, label, options, onChange, selected, readonly } = props

    const onChangeHandler = ({ target }: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(target.value)
    }

    const optionsList = useMemo(
        () =>
            options?.map((opt) => (
                <option
                    className={styles.option}
                    value={opt.value}
                    key={opt.value}
                >
                    {opt.content}
                </option>
            )),
        [options]
    )

    return (
        <div className={classNames(styles.wrapper, {}, [className])}>
            {label && <span className={styles.label}>{`${label}>`}</span>}
            <select
                disabled={readonly}
                className={styles.select}
                value={selected}
                onChange={onChangeHandler}
            >
                {optionsList}
            </select>
        </div>
    )
})
