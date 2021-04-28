import React from 'react'
import { Avatar } from '@material-ui/core'
function RecentPerson({ id, name, image }) {
    return (
        <div className="person" >
            <Avatar className="image" src={image} />
            <h5 >{name}</h5>
        </div>
    )
}

export default RecentPerson
