import { useEffect, useState } from 'react'

import HealthDetails from '../components/HealthDetails'

const Home = () => {

    const [healthData, setHealthData] = useState(null)

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/healthData')
            const json = await response.json()

            if (response.ok) {
                setHealthData(json)
            }
        }

        fetchWorkouts()
    }, [])

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