import { useEntryContext } from '../hooks/useEntryContext'
import { useAuthContext } from '../hooks/useAuthContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const EntryDetails = ({ entry }) => {
  const { dispatch } = useEntryContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/entries/' + entry._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_ENTRY', payload: json})
    }
  }

  return (
    <div className="entry-details">
      <p><strong>Age: </strong>{entry.age}</p>
      <p><strong>Height: </strong>{entry.height}</p>
      <p><strong>Weight: </strong>{entry.weight}</p>
      <p><strong>Sex: </strong>{entry.sex}</p>
      <p>{formatDistanceToNow(new Date(entry.createdAt), {addSuffix: true})}</p>
      <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
    </div>
  )
}

export default EntryDetails