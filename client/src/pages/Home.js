import { useEffect } from 'react'
import { useEntryContext } from '../hooks/useEntryContext'
import { useAuthContext } from '../hooks/useAuthContext'

import HealthDetails from '../components/HealthDetails'
import EntryForm from '../components/EntryForm'

const Home = () => {
    const {healthData, dispatch} = useEntryContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchHealthData = async () => {
            const response = await fetch('/api/healthData', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_ENTRIES', payload: json})
            }
        }

        if (user) {
            fetchHealthData()
        }
    }, [dispatch, user])

    return (
        <div className="home">
            <div className='healthData'>
                {healthData && healthData.map((health) => (
                    <HealthDetails key={health._id} health={health} />
                ))}
            </div>
            <EntryForm />
        </div>
    )
}

export default Home