import React from 'react'
import { Link } from 'react-router-dom'

const Friend = props => {
    const friend = props.friends.find(i => String(i.id) === props.match.params.id)

    if (!friend) {
        return <p>...Loading</p>
    }
    return (
        <div>
            <h2>{friend.name}</h2>
            <p>{friend.age}</p>
            <p>{friend.email}</p>

            <Link to={`/update/${friend.id}`}>Update</Link>
        </div>
    )
}

export default Friend