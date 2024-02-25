import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { useRoutes, BrowserRouter as Router, Navigate } from 'react-router-dom'
import { Register } from './register'

import Cookies from 'js-cookie';

// const ProtectedRoute = ({ path, element }) => {
//   const user = Cookies.get('user');
//   return user ? { path, element } : { path, element: <Navigate to="/register" replace /> };
// };


// const routes = useRoutes([
//   ProtectedRoute({ path: '/', element: <App /> }),
//   { path: '/register', element: <Register /> }
// ]);

// eslint-disable-next-line react-refresh/only-export-components
const Routes = () => {
  const user = Cookies.get('name');
  const routing = useRoutes([
    { path: '/', element: user ? <App /> : <Navigate to="/register" replace /> },
    { path: '/register', element: <Register /> },
  ]);

  return routing;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes />
    </Router>
  </React.StrictMode>,
)
