import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/home/Home'
import Jobs from './components/jobs/Jobs'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import PrivateOutlet from './routes/PrivateOutlet'
import Header from './components/header/Header'


function App() {

  return (
    <>
      <Header/>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/*' element={<PrivateOutlet/>}>
              <Route path="jobs"  element={<Jobs/>}/>
          </Route>
      </Routes>
    </>
  )
}

export default App
