import { createContext, useReducer } from 'react'

//creates context for every user entry and manages the global state
export const EntryContext = createContext()

//defines three actions: set, create, and delete
//these actions will be dispatch when the user deletes and creates a new entry
export const entriesReducer = (state, action) => {
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
        entries: state.entries.filter((entry) => entry._id !== action.payload._id)
      }
    default:
      return state
  }
}

//children represents the App component since
//EntryContextProvider wraps it in index.js
export const EntryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, {
    entries: null
  })

  return (
    <EntryContext.Provider value={{...state, dispatch}}>
      { children }
    </EntryContext.Provider>
  )
}