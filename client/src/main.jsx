import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './components/signIn/SignIn';
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />

const root = ReactDOM.createRoot(document.getElementById('root')); 

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
