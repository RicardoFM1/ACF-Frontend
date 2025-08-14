import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer
      autoClose={3000}
      position="top-center"
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick={false}
      rtl={false}
      draggable
      theme="light"
      transition={Bounce}
      limit={1}
    />
    <BrowserRouter>
    <App />
    
    </BrowserRouter>
  </StrictMode>,
)
