import { useState } from "react"
import { useEntryContext } from "../hooks/useEntryContext"

const EntryForm = () => {
    const {dispatch} = useEntryContext()
    const [age, setAge] = useState ('')
    const [height, setHeight] = useState ('')
    const [weight, setWeight] = useState ('')
    const [sex, setSex] = useState ('')
    const [error, setError] = useState (null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const entry = {age, height, weight, sex}

        const response = await fetch('/api/healthData', {
            method: 'POST',
            body: JSON.stringify(entry),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setAge('')
            setHeight('')
            setWeight('')
            setSex('')
            setError(null)
            console.log('New entry added', json)
            dispatch({type: 'CREATE_ENTRY', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Create A New Entry</h3>

            <label>Age:</label>
            <input
                type="number"
                onChange={(e) => setAge(e.target.value)}
                value={age}
            />

            <label>Height (in cm):</label>
            <input
                type="number"
                onChange={(e) => setHeight(e.target.value)}
                value={height}
            />

            <label>Weight (in lbs):</label>
            <input
                type="number"
                onChange={(e) => setWeight(e.target.value)}
                value={weight}
            />

            <label>Sex (F/M):</label>
            <input
                type="text"
                onChange={(e) => setSex(e.target.value)}
                value={sex}
            />

            <button>Submit Entry</button>
            {error && <div className="error">error</div>}
        </form>
    )
}

export default EntryForm