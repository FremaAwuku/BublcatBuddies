// import { useEffect } from "react"
import SingleEventPage from "../SingleEventPage"
const IndividualEvent = ({event})=> {

// useEffect(()=>{
// console.log(event.id)
// },[event])


    if(!event.isPrivate){
        return(
        <>
            <span>
            <a href={`/events/${event.id}`}>
                
                <img src={event.eventImageUrl} alt="event visual description"></img>
            </a>
            <h2>{event.eventName}</h2>
            <h4>Event Host Username: {event.User.username}</h4>
            <p>{event.description}</p>
            </span>
        </>
        )
    }

   return(null)

}

export default IndividualEvent
