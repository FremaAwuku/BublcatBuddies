
import {  useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { NavLink, Route, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { getUsers } from '../../store/user';

const BublcatBuddies = () =>{
    const dispatch = useDispatch()

    const users = useSelector(state => Object.values(state.users))
    useEffect(()=>{

        dispatch(getUsers())
    },[dispatch])

return(
<>
<h1>Find Friends!</h1>
 <ul>
     {users?.map ((user)=>(
         <li>
             <h4>{user?.userName}</h4>
             <img src={user.profileImageUrl} atl="users"></img>
              </li>
     ))}
 </ul>

</>)

}

 export default BublcatBuddies
