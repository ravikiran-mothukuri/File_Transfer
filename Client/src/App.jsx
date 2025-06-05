import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element ={<Register />}/>
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
      </Routes>
    </Router>
  )
}

export default App
