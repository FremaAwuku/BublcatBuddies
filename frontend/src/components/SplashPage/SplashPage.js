import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import IndividualEvent from '../EventsPage/IndividualEvent';

import {getEvents} from '../../store/event'
import{getUserRsvps} from '../../store/rsvp'
import { getUsersBuddies} from "../../store/bublcat-buddies"
import UserTile from '../BublcatBuddies/UserTile'

import "./SplashPage.css"
 const  SplashPage = () =>{
    const dispatch = useDispatch()
    //OBJ OF USER

    const events = useSelector(state => Object.values(state.events))

    const sessionUser = useSelector(state => state.session?.user)
    const loggedInUser = useSelector(state => state.users[sessionUser?.id])
    const rsvpEvents = useSelector(state=>Object.values(state.rsvps))
    .map(rsvp => rsvp= rsvp.eventId)

    const users = useSelector(state => Object.values(state.users))
    const userBuddies = useSelector(state => Object.values(state.buddies))
    .map(buddy => buddy = buddy.buddyId)






    useEffect(()=>{
        dispatch(getUserRsvps(sessionUser?.id))
        dispatch(getEvents())
        dispatch(getUsersBuddies(sessionUser?.id))



    },[dispatch])




  let userEvents
    events?.map((event  =>{
        userEvents=(
            <ul>
                <IndividualEvent event={event}/>
            </ul>
            )
        }
    ))

    let userProfile
        userProfile =(
            <section className="userProf">
            <h1>HELLO {loggedInUser?.firstName}! </h1>
            <img src={loggedInUser?.profileImgUrl} style={{maxWidth:300}}></img>
            </section>
        )

        if(sessionUser){
        return(
        <div className="splashCont">
           {userProfile}

        <section className="eventSect">
        <h2> {`${loggedInUser?.firstName}'s Events` }</h2>
            {events?.map((event  =>{

            if(rsvpEvents.includes(event.id)){
                return(

                    <IndividualEvent event={event}/>
                )
            }else{
                return(
                    <>
                    </>
                )
            }
        }))}
        </section>

        <section className="buddySect">
        <h2> {`${loggedInUser?.firstName}'s Bublcat Buddies` }</h2>
        {users?.map((user =>{
            if(userBuddies.includes(user.id)){
                return(
                    <div className="splashTile" >
                    <img className="imgTile" src={user.profileImgUrl} alt="user tile" style={{width:200}}/>
                    <div className="userDetails" >
                        <span id="userDeets" style={{paddingTop:0}}>
                        <h3>{user.username}</h3>

                        </span>

                    </div>
                </div>
                )
            }
        }))}
        </section>
        </div>
    ) }else{
        return(

        <Redirect to="/events"/>
        )

    }
 }

 export default SplashPage
