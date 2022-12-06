import { useState } from "react"
import { useEntryContext } from "../hooks/useEntryContext"
import { useAuthContext } from '../hooks/useAuthContext'

const EntryForm = () => {
  //fetches dispatch action and user currently using the website
  const { dispatch } = useEntryContext()
  const { user } = useAuthContext()

  //creates functions to update the user's age, height, weight, and sex
  const [age, setAge] = useState ('')
  const [height, setHeight] = useState ('')
  const [weight, setWeight] = useState ('')
  const [sex, setSex] = useState ('')

  //updates the error state and message as well as the variable that stores the fields that a user leaves empty in an entry
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  //handles the submission of the user's login
  const handleSubmit = async (e) => {
    e.preventDefault()

    //makes sure that the user can only enter new data if logged in
    if (!user) {
      setError('You must be logged in')
      return
    }

    const entry = {age, height, weight, sex}

    //verifies that the application is accessing the right user's data and makes sure data is only accesssed by the correct user
    const response = await fetch('/api/entries', {
      method: 'POST',
      body: JSON.stringify(entry),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    
    const json = await response.json()

    //if the response is not valid, put an error in the error state and fill the emptyFields array with all fields left empty
    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    //creates a new entry if the response is valid and sets the error state to NULL
    if (response.ok) {
      setAge('')
      setHeight('')
      setWeight('')
      setSex('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_ENTRY', payload: json})
    }
  }

  return (
    //returns the data entry form
    //for each piece of data, ensure that it is the right type and that the user did not leave the field blank
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add A New Entry</h3>
    
      <label>Age:</label>
      <input 
        type="number"
        onChange={(e) => setAge(e.target.value)}
        value={age}
        className={emptyFields.includes('age') ? 'error' : ''}
      />

      <label>Height (in cm):</label>
      <input 
        type="number"
        onChange={(e) => setHeight(e.target.value)}
        value={height}
        className={emptyFields.includes('height') ? 'error' : ''}
      />

      <label>Weight (in lbs)</label>
      <input 
        type="number"
        onChange={(e) => setWeight(e.target.value)}
        value={weight}
        className={emptyFields.includes('weight') ? 'error' : ''}
      />

      <label>Sex (F/M):</label>
      <input 
        type="text"
        onChange={(e) => setSex(e.target.value)}
        value={sex}
        className={emptyFields.includes('sex') ? 'error' : ''}
      />

      <button>Submit Entry</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default EntryForm