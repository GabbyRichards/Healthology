import * as React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme()

const Navbar = () => {
    const {logout} = useLogout()
    const {user} = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <ThemeProvider theme={theme}>
            <header>
                <div className="container">
                    <Link to="/">
                        <h1>Healthology</h1>
                    </Link>
                    <nav>
                        {user && (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                        )}
                        {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign-up</Link>
                        </div>
                        )}
                    </nav>
                </div>
            </header>
        </ThemeProvider>
    )
}

export default Navbar