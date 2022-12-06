import {createContext, useReducer, useEffect} from 'react'

//creates a context for authorization purposes
export const AuthContext = createContext()

export const authReducer = (state, action) => {
    //these are the two action types that a user can dispatch during authentication
    switch (action.type) {
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    //if the user is valid, dispatch login
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            dispatch({type: 'LOGIN', payload: user})
        }
    }, [])

    console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}