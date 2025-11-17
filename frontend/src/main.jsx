
//frontend/src/main.jsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CartProvider } from './context/CartContext.jsx'
import { StoreProvider } from "./context/StoreContext";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
    <StoreProvider>
    <App />
    </StoreProvider>
    </CartProvider>
  </StrictMode>,
)
