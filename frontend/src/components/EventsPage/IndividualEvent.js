// import { useEffect } from "react"
import {Link} from "react-router-dom"
// import { useDispatch,useSelector } from "react-redux"
// import { getEventRsvps } from "../../store/rsvp"
const IndividualEvent = ({event})=> {

// useEffect(()=>{
//     dispatch(getEventRsvps(event.id))
//     console.log(rsvps)
// },[dispatch])

//TODO Make only public events seen
    // if(!event.isPrivate){
        return(
        <>
            <span>

            <Link to={`/events/${event.id}`}>
            <img src={event.eventImageUrl} alt="event visual description"></img>
            </Link>

            <h2>{event.eventName}</h2>
            <h4>Event Host Username: {event.User.username}</h4>
            <p>{event.description}</p>
            <p>{event.address}</p>
            <p>{event.eventDate}</p>

            </span>
        </>
        )
    }

//    return(null)

// }

export default IndividualEvent
