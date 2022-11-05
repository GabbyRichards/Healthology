const HealthDetails = ({health}) => {
    return (
        <div className="health-details">
            <p><strong>Age: </strong>{health.age}</p>
            <p><strong>Height: </strong>{health.height}</p>
            <p><strong>Weight: </strong>{health.weight}</p>
            <p><strong>Sex: </strong>{health.sex}</p>
            <p>{health.createdAt}</p>
        </div>
    )
}

export default HealthDetails