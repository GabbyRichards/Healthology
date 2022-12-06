import * as React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme()

const Navbar = () => {
    //fetches the logout function and current user state
    const {logout} = useLogout()
    const {user} = useAuthContext()

    //dispatches logout function if the user clicks "logout"
    const handleClick = () => {
        logout()
    }

    //if the user is logged in, displays the website title and a logout button
    //if the user is logged out, displays the website title, login button, and sign up button
    //the buttons link to their respective authentication pages
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
                            <Link to="/signup">Sign up</Link>
                        </div>
                        )}
                    </nav>
                </div>
            </header>
        </ThemeProvider>
    )
}

export default Navbar