import { useParams } from "react-router"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"


 const SingleEventPage = () =>{

    const eventId = useParams().eventId
    const event= useSelector(state =>state.events[eventId])
    const user = useSelector(state => state.session.user)

    if(!event) return null

 let editButton
    if(user.id === event.hostId){
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
    <h3>
        Event Description:
        {privateEvent}
        <p>

            {event.description}
        </p>
    </h3>
            <p>{event.address}</p>
            <p>{event.eventDate}</p>


     {editButton}

</>
)

 }
 export default SingleEventPage
