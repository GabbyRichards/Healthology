import {EntryContext} from '../context/EntryContext'
import {useContext} from 'react'

export const useEntryContext = () => {
    const context = useContext(EntryContext)

    if (!context) {
        throw Error('useEntryContext must be used within its provider')
    }

    return context
}