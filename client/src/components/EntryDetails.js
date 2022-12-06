import { useEntryContext } from '../hooks/useEntryContext'
import { useAuthContext } from '../hooks/useAuthContext'
//import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const EntryDetails = ({ entry }) => {
  const { dispatch } = useEntryContext()
  const { user } = useAuthContext()

  //deletes a user's entry when the user clicks on the trash icon
  const handleClick = async () => {
    if (!user) {
      return
    }

    //fetches the entry that needs to be deleted
    const response = await fetch('/api/entries/' + entry._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    //if the response is valid, dispatch an action that deletes the user's selected entry
    if (response.ok) {
      dispatch({type: 'DELETE_ENTRY', payload: json})
    }
  }

  //returns the data that the user has entered into our entry database
  //<p>{formatDistanceToNow(new Date(entry.createdAt), {addSuffix: true})}</p> (add after data to format time)
  return (
    <div className="entry-details">
      <p><strong>Age: </strong>{entry.age}</p>
      <p><strong>Height: </strong>{entry.height}</p>
      <p><strong>Weight: </strong>{entry.weight}</p>
      <p><strong>Sex: </strong>{entry.sex}</p>
      <p>{entry.createdAt}</p>
      <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
    </div>
  )
}

export default EntryDetails