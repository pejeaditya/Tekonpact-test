import { StrictMode } from 'react'
import { ThemeProvider } from 'next-themes'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import "@fontsource-variable/geist/index.css"
import '@fontsource/lato/300.css'
import '@fontsource/lato/400.css'
import '@fontsource/lato/400-italic.css'
import '@fontsource/lato/700.css'
import '@fontsource/lato/700-italic.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="teknopact-theme">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
