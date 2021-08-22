
import {  useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { NavLink, Route, useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { useDispatch } from 'react-redux'
import { getUsers } from '../../store/user';
import UserTile from './UserTile';
import "./buddiesSect.css"
const BublcatBuddies = () =>{
    const dispatch = useDispatch()

    const users = useSelector(state => Object.values(state.users))
    const sessionUserId = useSelector(state => state.session.user.id)
     users.splice(sessionUserId -1,1)
    useEffect(()=>{

        dispatch(getUsers())
    },[dispatch])



return(
<div className="userContainer">
<h1 className="findFriends">Find Friends!</h1>

<section className="tileSect">
    {users?.map ((user,i)=>{
        if(i % 2 === 0){
            return(

                <span key={user.id} className="userTile">
                <UserTile user ={user}/>
                </span>
            )
        }else{
            return(
                <span key={user.id} className="userTile" className="flipped">
                <UserTile user ={user}/>
                </span>
            )
        }
    }


    )}

</section>



</div>)

}

 export default BublcatBuddies
