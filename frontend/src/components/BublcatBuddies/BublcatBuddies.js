
import {  useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { getUsers } from '../../store/user';
import UserTile from './UserTile';
import "./buddiesSect.css"
const BublcatBuddies = () =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const users = useSelector(state => Object.values(state.users))
    const sessionUserId = useSelector(state => state.session?.user?.id)
     users.splice(sessionUserId -1,1)
    useEffect(()=>{

        dispatch(getUsers())
    },[dispatch])


if(!sessionUserId){
    history.push("/events")
}else{
return(
<div className="outerCont">
    <div className="userContainer">
    <h1 className="findFriends">Find Friends!</h1>

    <section className="tileSect">
        {users?.map ((user,i)=>{
            if(i % 2 === 0){
                return(

                    <span key={user.id}>
                    <UserTile user ={user}/>
                    </span>
                )
            }else{
                return(
                    <span key={user.id+user.name} className="flipped">
                    <UserTile user ={user}/>
                    </span>
                )
            }
        }


        )}

    </section>



    </div>
</div>)


}}

 export default BublcatBuddies
