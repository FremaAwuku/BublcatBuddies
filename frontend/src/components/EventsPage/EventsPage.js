import {  useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { NavLink, Route, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'


import {getEvents} from '../../store/event'
import  IndividualEvent  from "./IndividualEvent";
import styles from "./EventsPage.module.css"

const EventsPage = () =>{
    const dispatch = useDispatch()
    const events = useSelector(state =>Object.values(state.event))

    useEffect(()=>{
        dispatch(getEvents())

    },[dispatch])

return(
    <div className={styles.mainContainer}>
        <main>
            <h1> Become a Bublcat Buddy Today</h1>
        </main>
        {/* make sure to include  */}
        <form method="get" action="/events/add">
            <button>Add An Event </button>
        </form>
        {events.map((event)=>
        <IndividualEvent key={event.id} event={event}/>

         ) }

    </div>

)
}
export default EventsPage
