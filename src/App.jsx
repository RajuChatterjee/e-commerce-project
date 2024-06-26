import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

//import VoiceSearch from './VoiceSearch';


import Home from './pages/home/Home';
import Order from './pages/order/Order';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import NoPage from './pages/nopage/NoPage';
import MyState from './context/data/myState';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import ProductInfo from './pages/productInfo/ProductInfo';
import AddProduct from './pages/admin/page/AddProduct';
import UpdateProduct from './pages/admin/page/UpdateProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Allproducts from './pages/allproducts/Allproducts';
import Customersupport from './pages/customersupport/Customersupport';
import Contact from './pages/contact/Contact';
import Privacypolicy from './pages/privacypolicy/Privacypolicy';
import Returnpolicy from './pages/returnpolicy/Returnpolicy';
import Termandconditions from './pages/termandconditions/Termandconditions';
import About from './pages/about/About';
import Entertainment from './pages/entertainment/Entertainment';
import Webseries from './pages/webseries/Webseries';
import Game from './pages/game/Game';


function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allproducts" element={<Allproducts />} />
          <Route path="/order" element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={
          <ProtectedRoute>
          <Cart />
          </ProtectedRoute>} />
          <Route path="/dashboard" element={
            <ProtectedRouteForAdmin>
              <Dashboard />
            </ProtectedRouteForAdmin>
          } />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/productinfo/:id' element={<ProductInfo/>} />
          <Route path='/addproduct' element={
           <ProtectedRouteForAdmin>
              <AddProduct/>
           </ProtectedRouteForAdmin>
          } />
          <Route path='/updateproduct' element={
            <ProtectedRouteForAdmin>
              <UpdateProduct/>
            </ProtectedRouteForAdmin>
          } />
          <Route path="/*" element={<NoPage />} />
          <Route path='/customersupport' element={<Customersupport/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/privacypolicy' element={<Privacypolicy/>} />
          <Route path='/returnpolicy' element={<Returnpolicy/>} />
          <Route path='/termandconditions' element={<Termandconditions/>} />
          <Route path='/entertainment' element={<Entertainment/>} />
          <Route path='/webseries' element={<Webseries/>} />
          <Route path='/game' element={<Game/>} />

        </Routes>

        <ToastContainer/>
      </Router>
    </MyState>

  )
}

export default App 

// user 

export const ProtectedRoute = ({children}) => {
  const user = localStorage.getItem('user')
  if(user){
    return children
  }else{
    return <Navigate to={'/login'}/>
  }
}

// admin 

const ProtectedRouteForAdmin = ({children})=> {
  const admin = JSON.parse(localStorage.getItem('user'))
  
  if(admin.user.email === 'rajuchatterjeeofficial@gmail.com'){
    return children
  }
  else{
    return <Navigate to={'/login'}/>
  }

}

// const express  = require('express');
// const app = express();

// // const http = require('http');
// //  const path = require('path');
// //  app.use(express.static(path.resolve("./")));
// // app.get('/', (req, res) => {
// //     return res.sendFile("/index.html");
// // });
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// app.listen(5000,() => {
//   console.log('Server is running on port 5000');
// });