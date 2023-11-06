import { ChangeEvent, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { classNames } from '@/shared/lib/className'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { Button, ButtonTheme, HStack, Input } from '@/shared/ui'
import {
    addCommentFormActions,
    addCommentFormReducer,
} from '../../model/slices/addCommentFormSlice'
import {
    getAddCommentFormError,
    getAddCommentFormText,
} from '../../model/selectors/addCommentFormSelectors'

import styles from './AddCommentForm.module.scss'

export interface AddCommentFormProps {
    className?: string
    onSendComment: (text: string) => void
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
}

const AddCommentForm = memo((props: AddCommentFormProps) => {
    const { className, onSendComment } = props
    const { t } = useTranslation()
    const text = useSelector(getAddCommentFormText)
    const error = useSelector(getAddCommentFormError)
    const dispatch = useAppDispatch()

    const onCommentTextChange = useCallback(
        ({ target }: ChangeEvent<HTMLInputElement>) => {
            dispatch(addCommentFormActions.setText(target.value))
        },
        [dispatch]
    )

    const onSendHandler = useCallback(() => {
        onSendComment(text)
        dispatch(addCommentFormActions.setText(''))
    }, [dispatch, onSendComment, text])

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <HStack
                justify='between'
                max
                className={classNames(styles.AddCommentForm, {}, [className])}
            >
                <Input
                    className={styles.input}
                    placeholder='Введите текст комментария'
                    value={text}
                    onChange={onCommentTextChange}
                />
                <Button theme={ButtonTheme.OUTLINE} onClick={onSendHandler}>
                    {t('Отправить')}
                </Button>
            </HStack>
        </DynamicModuleLoader>
    )
})

export default AddCommentForm
