import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Features from './pages/Features';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Gallery from './pages/Gallery';
import AuthProvider from './components/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';



const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home></Home>
    },
    {
      path: '/Features',
      element: <Features></Features>
    },
    {
      path: '/Signup',
      element: <Signup></Signup>
    },

    {
      path: '/Login',
      element: <Login></Login>
    },

    {
      path: '/Gallery',
      element: <ProtectedRoute><Gallery /></ProtectedRoute>
    },





  ]
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
