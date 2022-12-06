//LOGIN PAGE INSPIRED BY THE NET NINJA MERN STACK CRASH COURSE ON YOUTUBE https://youtu.be/98BzS5Oz5E4
//THIS FILE IS CURRENTLY NOT USED WITHIN OUR APPLICATION
import {useState} from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email,password)
    }

    return (
        <form className='login' onSubmit={handleSubmit}>
            <h3>Log in</h3>

            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value= {email}
            />

            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value= {password}
            />

            <button disabled={isLoading}>Log in</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Login