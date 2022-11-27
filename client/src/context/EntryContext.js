import {createContext, useReducer} from 'react'

export const EntryContext = createContext()

export const entryReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ENTRIES':
            return {
                entries: action.payload
            }
        case 'CREATE_ENTRY':
            return {
                entries: [action.payload, ...state.entries]
            }
        case 'DELETE_ENTRY':
            return {
                entries: state.entries.filter((h) => h._id !== action.payload._id)
            }
        default:
            return state
    }
}

//children represents the App component since
//EntryContextProvider wraps it in index.js
export const EntryContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(entryReducer, {
        entries: null
    })


    return (
        <EntryContext.Provider value={{...state, dispatch}}>
            {children}
        </EntryContext.Provider>
    )
}