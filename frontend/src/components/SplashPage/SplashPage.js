import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Route, useParams, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import IndividualEvent from '../EventsPage/IndividualEvent';
import AddEventRsvp from '../Rsvps/AddEventRsvp';
import {getEvents} from '../../store/event'
import{getUserRsvps} from '../../store/rsvp'
import{ getUsers} from '../../store/user'
 const  SplashPage = () =>{
    const dispatch = useDispatch()
    //OBJ OF USER

    const events = useSelector(state => Object.values(state.events))
    const eventObj = useSelector(state => state.events)
    const sessionUser = useSelector(state => state.session.user)
    const user = useSelector(state => state.users[sessionUser.id])
    const rsvps = useSelector(state=>Object.values(state.rsvps))

    useEffect(()=>{
        console.log(eventObj,`<---------WTF`)
        dispatch(getUserRsvps(sessionUser.id))
        dispatch(getEvents())



    },[dispatch])


  let foundEvents
  let userEvents
  let interested

  foundEvents = events.filter(event => rsvps.filter(rsvps => rsvps.eventId))

  foundEvents?.map(event =>{
    if(event?.confirmed === false){
        interested =(

        <>
        <p>
            You are currently interested in this event
        </p>
        <p>
            CONFIRM TO GOING
            <AddEventRsvp/>
        </p>
        </>)
    }



  })





     userEvents =(

    <ul>
        <h4> you are currently interested in </h4>
        {foundEvents?.map(event =>(
        <li style={{padding:10}}>
            <h3 style={{textAlign:"center"}}> {event.eventName}</h3>
            <img src={event?.eventImageUrl} style={{maxWidth:150}}></img>
            <h5 style={{textAlign:"center"}} >{event?.confirmed} Confirmed </h5>
            {interested}



        </li>


        ))}
    </ul>
     )




    let userProfile
    if(sessionUser){
        userProfile =(

            <section className="userProf">
            <h3>HELLO {user?.firstName}</h3>
            <img src={user?.profileImgUrl} style={{maxWidth:300}}></img>
            <span>

                {userEvents}

            </span>
            </section>
        )
    }


    return(
        <>
           {userProfile}
            {events?.map((event)=>
                <IndividualEvent key={event.id} event={event}/>

                ) }

        </>
    )

 }


 export default SplashPage
