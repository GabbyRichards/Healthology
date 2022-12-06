import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  //fetches the error and loading states
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    //fetches the user's email and password from MongoDB
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    //if the login fails, pause the loading state and output an error
    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    //if the response is valid, dispatch the login action
    if (response.ok) {
      //if user exits page, make it so they can get back in with jwt
      localStorage.setItem('user', JSON.stringify(json))

      dispatch({type: 'LOGIN', payload: json})

      setIsLoading(false)
    }
  }

  //returns the login state
  return { login, isLoading, error }
}