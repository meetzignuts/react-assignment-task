import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Account from './pages/Account';
import { LOCALSTORAGE_KEYS } from './utils/constants';
const PrivateRoutes = () => {
  return (
    localStorage.getItem(LOCALSTORAGE_KEYS.LOGGEDIN_USER) ? <Outlet /> : <Navigate to='/login' />
  )
}
const PublicRoutes = () => {
  return (
    localStorage.getItem(LOCALSTORAGE_KEYS.LOGGEDIN_USER) ? <Navigate to='/home' /> : <Outlet />
  )
}
function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route path="/account" element={<Account />} />
          </Route>

          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
