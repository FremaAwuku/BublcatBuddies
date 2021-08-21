import { useParams } from "react-router"
import { useSelector,useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import RsvpsOnEvents from "../Rsvps/RsvpsOnEvents"
import AddEventRsvp from "../Rsvps/AddEventRsvp"
import DeleteEventRsvp from "../Rsvps/DeleteEventRsvp"
import { useEffect } from "react"
import { getEventRsvps } from "../../store/rsvp"

 const SingleEventPage = () =>{

    const dispatch = useDispatch()

    const eventId = useParams().eventId
    const event= useSelector(state =>state.events[eventId])
    const user = useSelector(state => state.session.user)

    useEffect(()=>{
        dispatch(getEventRsvps(eventId))

    },[eventId, dispatch])

    if(!event) return null

 let editButton
 if(!user){
     editButton=(
        <></>
     )
    }else if(user.id === event.hostId){
        editButton = (
        <Link to={`/events/${event.id}/edit`}>
        <button>Edit Event</button>
        </Link>
        )
    }

let privateEvent

    if(event.isPrivate){
        privateEvent=
        (<p style={{color:"red" }}>This is a Private Event</p>)
    }

return(
<>

    <h2>{event.eventName}</h2>
    <img src={event.eventImageUrl}/>
    {editButton}
    <h3>
        Event Description:
        {privateEvent}
        <p>

            {event.description}
        </p>
    </h3>
            <p>{event.address}</p>
            <p>{event.eventDate}</p>

    <RsvpsOnEvents eventId ={eventId}/>
    <AddEventRsvp eventId={eventId}/>
    <DeleteEventRsvp eventId={eventId} />



</>
)

 }
 export default SingleEventPage
