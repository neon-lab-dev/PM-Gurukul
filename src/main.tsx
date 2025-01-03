import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'
import { Toaster } from 'sonner'
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider >
        <RouterProvider router={router} />
        <Toaster position="top-center" richColors />
        </HelmetProvider>
  </React.StrictMode>
)
