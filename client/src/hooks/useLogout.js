import { useAuthContext } from "./useAuthContext"
import { useEntryContext } from "./useEntryContext"

//function that is called when the user logs out of the application
export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch: dispatchEntries} = useEntryContext()

    const logout = () => {
        //remove user token from local storage
        localStorage.removeItem('user')

        //update global state
        dispatch({type: 'LOGOUT'})
        dispatchEntries({type: 'SET_ENTRIES', payload: null})
    }

    //returns logout state
    return {logout}
}