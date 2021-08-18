import { useParams } from "react-router"
import { useSelector } from "react-redux"



 const SingleEventPage = () =>{

    const eventId = useParams().eventId
    const event= useSelector(state =>state.events[eventId])
    const user = useSelector(state => state.session.user)

    if(!event) return null
 let editButton
    if(user.id === event.hostId){
        editButton = (
        <form action={`/events/${event.id}/edit`}>
            <button>Edit Event</button>
        </form>
        )
    }

return(
<>

    <h2>{event.eventName}</h2>
     {editButton }

</>
)

 }
 export default SingleEventPage
