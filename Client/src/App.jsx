import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element ={<Register />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/home' element= {<Home />} />
      </Routes>
    </Router>
  )
}

export default App
