import {useEntryContext} from '../hooks/useEntryContext'
import { useAuthContext } from '../hooks/useAuthContext'
//import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const HealthDetails = ({health}) => {
    const {dispatch} = useEntryContext()
    const {user} = useAuthContext()

    const handleClick = async () => {
        if (!user){
            return
        }

        const response = await fetch('/api/healthData/' + health._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json

        if (response.ok) {
            dispatch({type: 'DELETE_ENTRY', payload: json})
        }
    }

    return (
        <div className="health-details">
            <p><strong>Age: </strong>{health.age}</p>
            <p><strong>Height: </strong>{health.height}</p>
            <p><strong>Weight: </strong>{health.weight}</p>
            <p><strong>Sex: </strong>{health.sex}</p>
            <p>{health.createdAt}</p>
            <span onClick={handleClick}>delete</span>
            <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
        </div>
    )
}

export default HealthDetails