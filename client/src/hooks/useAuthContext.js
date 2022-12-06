import {AuthContext} from '../context/AuthContext'
import {useContext} from 'react'

//uses the authorization context from the AuthContext file
//if context is not within the correct provider, this function will throw an error
export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuthContext must be used inside an AuthContextProvider')
    }
    return context
}