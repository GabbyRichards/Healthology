import  { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    //fetches error and loading states
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (email, password) => {
        //initializes error and loading values
        setIsLoading(true)
        setError(null)

        //accesses user's username and password from MongoDB
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        //if the data entered is not valid, pause loading and set the error type
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        //if the response is valid, enter the user's authentication data into MongoDB and link them to the homepage
        if (response.ok){
            //if user exits page, make it so they can get back in with jwt
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }
    //return signup state
    return {signup, isLoading, error}
} 