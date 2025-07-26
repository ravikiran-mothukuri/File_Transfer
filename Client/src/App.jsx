import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
<<<<<<< HEAD
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

=======
import Register from './pages/Register'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import ProtectedRoute from './components/ProtectedRoute';
>>>>>>> 04fb2379da1934556ec3b85d0fe981dff5f96871

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element ={<Register />}/>
<<<<<<< HEAD
        <Route path='/login' element={<Login />} />
        <Route path='/home' element= {<Home />} />
=======
        <Route path='/login' element={<Login />}/>
        <Route 
          path='/homepage' 
          element=
          {
            <ProtectedRoute >
              {<Homepage />}
            </ProtectedRoute>
          }

        />
>>>>>>> 04fb2379da1934556ec3b85d0fe981dff5f96871
      </Routes>
    </Router>
  )
}

export default App
