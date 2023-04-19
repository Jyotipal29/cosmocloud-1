import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import FormProvider from "./context/FormProvider";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FormProvider>

      <App />
      </FormProvider>
  </React.StrictMode>,
)
