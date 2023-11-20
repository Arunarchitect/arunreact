import Layout from "./components/layout/Layout"
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Pagenotfound from './pages/Pagenotfound'
import Menu from './pages/Menu'
import Test from "./pages/tools/Test"
import LoginReg from "./pages/auth/LoginReg"
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail"
import Dashboard from "./pages/Dashboard"
import { useSelector } from "react-redux";
import ResetPassword from "./pages/auth/ResetPassword"
import Schedule from "./pages/tools/Schedule"
import Blog from "./pages/Blog"


function App() {
   const { access_token } = useSelector(state => state.auth)
  return (
     <div>
        <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/test" element={<Test />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/login" element={!access_token ? <LoginReg /> : <Navigate to='/dashboard' />} />
            <Route path='resetpass' element={<SendPasswordResetEmail />} />
            <Route path='apis/user/reset-password/:id/:token' element={<ResetPassword />} />
            <Route path="/dashboard" element={access_token ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/*" element={<Pagenotfound />} />
         </Routes>
        </BrowserRouter>
     </div>
  )
}

export default App
