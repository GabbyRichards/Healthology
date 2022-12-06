import {EntryContext} from '../context/EntryContext'
import {useContext} from 'react'

//uses the authorization context from the EntryContext file
//if context is not within the correct provider, this function will throw an error
export const useEntryContext = () => {
    const context = useContext(EntryContext)

    if (!context) {
        throw Error('useEntryContext must be used within its provider')
    }

    return context
}