import { fireEvent, screen } from '@testing-library/react'

import { renderWithTranslation } from 'shared/lib/tests/renderWithTranslation/renderWithTranslation'
import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
    test('Sidebar has data id sidebar', () => {
        renderWithTranslation(<Sidebar />)
        expect(screen.getByTestId('sidebar')).toBeInTheDocument()
        screen.debug()
    })

    test('Sidebar toggle', () => {
        renderWithTranslation(<Sidebar />)
        const toggleBtn = screen.getByTestId('sidebar-toggle')
        expect(expect(screen.getByTestId('sidebar')).toBeInTheDocument())
        fireEvent.click(toggleBtn)
        expect(expect(screen.getByTestId('sidebar')).toHaveClass('collapsed'))
    })
})
