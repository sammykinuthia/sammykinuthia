import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx'
import './index.css'
import LoginPage from './pages/Login.tsx';
import RegisterPage from './pages/Register.tsx';
import RequestPasswordResetPage from './pages/RequestPasswordReset.tsx';
import ResetPasswordPage from './pages/ResetPassword.tsx';
import AdminPage from './pages/Admin.tsx';
import BlogPostPage from './pages/BlogPost.tsx';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/request-password-reset', element: <RequestPasswordResetPage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },
  { path: '/admin', element: <AdminPage /> },
  { path: '/blog/:id', element: <BlogPostPage /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
