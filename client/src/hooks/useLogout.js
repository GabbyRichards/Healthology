import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    
    const logout = () => {

        //remove user token from local storage
        localStorage.removeItem('user')

        //update global state
        dispatchEvent({type: 'LOGOUT'})
    }

    return {logout}
}