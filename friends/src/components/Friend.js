import React from 'react'
import { Link } from 'react-router-dom'

const Friend = props => {
    const friend = props.friends.find(i => String(i.id) === props.match.params.id)

    if (!friend) {
        return <p>...Loading</p>
    }
    return (
        <div className='friend-Card'>
            <h2>{friend.name}</h2>
            <p><strong>Age: {friend.age}</strong></p>
            <p><strong>Email: {friend.email}</strong></p>

            <Link to={`/update/${friend.id}`}>Update Friend Here</Link>
        </div>
    )
}

export default Friend