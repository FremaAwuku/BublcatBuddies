import {  useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { NavLink, Route, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'


import {getEvents} from '../../store/event'
import  IndividualEvent  from "./IndividualEvent";
import styles from "./EventsPage.module.css"

const EventsPage = () =>{
    const dispatch = useDispatch()
    const events = useSelector(state =>Object.values(state.events))
    const sessionUser = useSelector(state => state.session?.user);
    let addEventButton;
    if(sessionUser){
        addEventButton = (
        <form method="get" action="/events/add" className={styles.btnContainer}>
            <button className={styles.addEventBtn}>Add An Event </button>
        </form>)
                }

    useEffect(()=>{
        dispatch(getEvents())

    },[dispatch])

return(
    <div className={styles.container} >
        <main className={styles.landing} >
            <img  src="http://www.vectorfree.com/media/vectors/sixties-wallpaper.jpg"></img>
                <h1 style={{textAlign:"center"}} > Explore Events in Atlanta</h1>
                <h2  style={{textAlign:"center"}}>Explore Events in Atlanta</h2>
        </main>

            {addEventButton}



        <section className={styles.mainContainer}>
        {events?.map((event)=>
                <IndividualEvent key={event.id} event={event}/>

                ) }
        </section>


    </div>

)
}
export default EventsPage
