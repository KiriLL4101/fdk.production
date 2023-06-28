import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { App } from 'app/App'
import { StoreProvider } from 'app/providers/StoreProvider'
import ThemeProvider from './app/providers/ThemeProvider/ui/ThemeProvider'

import 'app/styles/index.scss'

import 'shared/config/i18n/i18n'

render(
    <BrowserRouter>
        <StoreProvider>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </StoreProvider>
    </BrowserRouter>,
    document.getElementById('root')
)
