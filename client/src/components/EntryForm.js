import { useState } from "react"
import { useEntryContext } from "../hooks/useEntryContext"
import { useAuthContext } from '../hooks/useAuthContext'

const EntryForm = () => {
  const { dispatch } = useEntryContext()
  const { user } = useAuthContext()

  const [age, setAge] = useState ('')
  const [height, setHeight] = useState ('')
  const [weight, setWeight] = useState ('')
  const [sex, setSex] = useState ('')

  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const entry = {age, height, weight, sex}

    const response = await fetch('/api/entries', {
      method: 'POST',
      body: JSON.stringify(entry),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
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