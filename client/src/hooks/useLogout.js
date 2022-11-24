import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const {dispatch} = useAuthContext()

    const logout = () => {

        //remove user token from local storage
        localStorage.removeItem('user')

        //update global state
        dispatch({type: 'LOGOUT'})
    }

    return {logout}
}