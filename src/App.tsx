import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

function App() {

  return (
    <Router>
      <div>
        <h1 className='text-slate-500'>React Application</h1>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignUpPage/>}/>

        </Routes>
      </div>
    </Router>
  )
}

export default App
