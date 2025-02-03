
import './App.css'
import SideBar from './components/SideBar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home'
import Expenses from './components/Expenses';
import Settings from './components/Settings';
import Login from './components/Login';
import SignUp from './components/SignUp'
import Charts from './components/Charts';

function App() {

  return (
    <>
      <Router>
        <div className='app-section'>
          <SideBar />
          <div className='main-section'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/expenses' element={<Expenses />} />
              <Route path='/charts' element={<Charts />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  )
}

export default App
