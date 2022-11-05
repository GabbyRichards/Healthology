import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Appbar from "./Appbar"
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Logon from './pages/Logon'
import Signup2 from './pages/Signup2'

function App() {
  return (
    <div className="App">  
      <BrowserRouter>
        <Navbar/>
        <div className='pages'>
          <Routes>
            <Route
              path="/"
              element={<Home />}
              />
              <Route
              path="/login"
              element={<Login />}
              />
              <Route
              path="/signup"
              element={<Signup />}
              />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
