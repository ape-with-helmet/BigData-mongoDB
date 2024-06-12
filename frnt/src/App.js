import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CreateBlog from './pages/CreateBlog'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Main from './pages/Main'
import Validations from './Validations'
import LoginValid from './LoginValid'
import Navbar from './pages/Navbar'
import MyBlogs from './pages/MyBlogs'

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route element = {<Validations/>}>
          <Route element = {<CreateBlog/>} path='/post'/>
          <Route element = {<MyBlogs/>} path='/edit'/>
          <Route element = {<Main/>} path='/main'/>
        </Route>
        <Route element = {<LoginValid/>}>
          <Route element = {<HomePage/>} path='/'/>
          <Route element = {<Login/>} path='/login'/>
          <Route element = {<SignUp/>} path='/signup'/>
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App