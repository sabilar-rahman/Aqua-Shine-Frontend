import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router.tsx'
import { Toaster } from 'sonner'
import { Provider } from "react-redux";
// import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from './redux/store.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
      <Toaster richColors />

    </Provider>
  </React.StrictMode>,
)
