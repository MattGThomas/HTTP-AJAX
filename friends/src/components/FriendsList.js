import React from 'react'
import { Link } from 'react-router-dom'

const FriendsList = props => {
    return (
        <div className='friends-List'>
            {props.friends.map((friend) => (
                <Link to={`/friend/${friend.id}`} key={friend.id}>
                    <p>{friend.name}</p>
                </Link>
            ))}
        </div>
    )
}

export default FriendsList