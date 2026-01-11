import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import AddBike from './pages/AddBikes/AddBike'
import ViewBike from './pages/ViewBikes/ViewBike'
import Orders from "./pages/Orders/Orders";  
import Sidebar from './components/Sidebar/Sidebar'
import Menubar from './components/Menubar/Menubar'
import { ToastContainer } from 'react-toastify'

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const toggleSidebar=() => {
    setSidebarVisible(!sidebarVisible)
  }
  return (
    
      <div className="d-flex" id="wrapper">
        <Sidebar sidebarVisible = {sidebarVisible}/>
          <div id="page-content-wrapper">
            <Menubar toggleSidebar = {toggleSidebar}/>
            <ToastContainer/>
              <div className="container-fluid">
                  <Routes>
                    <Route path = "/add" element={<AddBike/>}></Route>
                    <Route path = "/view" element={<ViewBike/>}></Route>
                    <Route path = "/orders" element={<Orders/>}></Route>
                    <Route path = "/" element={<ViewBike/>}></Route>
                  </Routes>
              </div>
          </div>
      </div>
  )
}

export default App