import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'
import { Toaster } from 'sonner'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { CartProvider } from './Providers/CartProvider/CartProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <CartProvider>
          <RouterProvider router={router} />
          <Toaster position="top-center" richColors />
        </CartProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
)
