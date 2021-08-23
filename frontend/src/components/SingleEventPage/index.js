import { useParams } from "react-router"
import { useSelector,useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import RsvpsOnEvents from "../Rsvps/RsvpsOnEvents"
import IndividualEvent from "../EventsPage/IndividualEvent"

import { useEffect } from "react"
import { getEventRsvps } from "../../store/rsvp"
import "./SingleEvent.css"
 const SingleEventPage = () =>{

    const dispatch = useDispatch()

    const eventId = useParams().eventId
    const event= useSelector(state =>state.events[eventId])
    const user = useSelector(state => state.session?.user)

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
        <button
    className='addEventBtn'
        >Edit Event</button>
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

<div

className="indEventSect">

    <div
    className="eventTile"
   >
       <IndividualEvent event={event}/>
       </div>

<div
className="rsvpTile"
>
<RsvpsOnEvents eventId ={eventId}/>
{editButton}
</div>


    </div>



</>
)

 }
 export default SingleEventPage
