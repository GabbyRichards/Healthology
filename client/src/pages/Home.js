import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

import HealthDetails from '../components/HealthDetails'

const Home = () => {

    const [healthData, setHealthData] = useState(null)
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
                setHealthData(json)
            }
        }

        if (user) {
            fetchHealthData()
        }
    }, [user])

    return (
        <div className="home">
            <div className='healthData'>
                {healthData && healthData.map((health) => (
                    <HealthDetails key={health._id} health={health} />
                ))}
            </div>
        </div>
    )
}

export default Home