import Layout from "./components/layout/Layout"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Pagenotfound from './pages/Pagenotfound'
import Menu from './pages/Menu'
import Test from "./pages/Test"


function App() {
  return (
     <div>
        <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/test" element={<Test />} />
            <Route path="/*" element={<Pagenotfound />} />
         </Routes>
        </BrowserRouter>
     </div>
  )
}

export default App
