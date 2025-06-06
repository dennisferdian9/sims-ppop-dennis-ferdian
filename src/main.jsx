import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login.jsx';
import AuthLayout from './layout/AuthLayout.jsx';
import ProfileLayout from './layout/ProfileLayout'
import Register from '@/pages/Register'
import HomeLayout from './layout/HomeLayout';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import { persistor, store } from './stores'
import { PersistGate } from 'redux-persist/integration/react';
import ProtectedRoute from './components/ProtectedRoute';
import Topup from './pages/Topup';
import Bayar from './pages/Bayar';
import Transactions from './pages/Transactions';
import Profile from './pages/Profile';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              {/* <Route path="register" element={<Register />} /> */}
            </Route>
            <Route element={
              <ProtectedRoute>
                <HomeLayout />
              </ProtectedRoute>}
            >
              <Route index element={<Home />} />
              <Route path='topup' element={<Topup />} />
              <Route path="bayar/:slug" element={<Bayar />} /> 
              <Route path="transactions" element={<Transactions />} /> 
            </Route>
              <Route element={
                <ProtectedRoute>
                  <ProfileLayout />
                </ProtectedRoute>}
              >
                <Route path="account" element={<Profile />} /> 
              </Route>
          </Routes>
        </BrowserRouter>
    </PersistGate>
    </Provider>
  </StrictMode>,
)
