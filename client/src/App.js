import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

import * as React from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login2 from './pages/Login2'
import Signup2 from './pages/Signup2'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme()

function App() {
  const {user} = useAuthContext()
  return (
    <ThemeProvider theme={theme}>
      <div className="App">  
        <BrowserRouter>
          <Navbar/>
          <div className='pages'>
            <Routes>
              <Route
                path="/"
                element={user ? <Home /> : <Navigate to= "/login" />}
                />
                <Route
                path="/login"
                element={!user ? <Login2 /> : <Navigate to="/" />}
                />
                <Route
                path="/signup"
                element={!user ? <Signup2 /> : <Navigate to="/" />}
                />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
