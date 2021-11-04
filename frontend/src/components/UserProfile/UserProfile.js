import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { Redirect, useParams, useHistory } from 'react-router-dom';

const UserProfile = () =>{
    const history = useHistory()
    //user
    const user = useSelector(state => state.session.user)
    //userId
    const {userId} = useParams

if(user){





   if (Number(userId) === Number(user?.id)) {
        return(
            <>
            Session User Profile
            </>
        )
    }else{
        return(
            <>
            User Profile
            </>

        )
    }
}else{
    <Redirect to="/events"></Redirect>
    history.push("/events")

    return(
        <>
        </>
    )
}
}

export default UserProfile
