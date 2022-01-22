import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { Redirect, useParams, useHistory } from 'react-router-dom';
import { getUsers } from '../../store/user';

const UserProfile = () =>{
    const history = useHistory()
    const dispatch = useDispatch()
    const {userId} = useParams
    //user
    const user = useSelector(state => state.session.user)
    const userList = useSelector(state => Object.values(state.users) )

    //userId
    useEffect(()=>{
        dispatch(getUsers())
    },[dispatch])


if(user){

return(
    <>
    <h1>

        Welcome {user.username}
    </h1>
    </>
)




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
