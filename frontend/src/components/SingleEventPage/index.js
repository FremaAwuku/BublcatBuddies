import { useParams } from "react-router"
import { useSelector,useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import RsvpsOnEvents from "../Rsvps/RsvpsOnEvents"
import IndividualEvent from "../EventsPage/IndividualEvent"
import Comments from "../EventsPage/Comments/Comments"
import { useEffect } from "react"
import { getEventRsvps } from "../../store/rsvp"
import "./SingleEvent.css"
import { getComments } from "../../store/comment"
 const SingleEventPage = () =>{

    const dispatch = useDispatch()

    const eventId = useParams().eventId
    const event= useSelector(state =>state.events[eventId])
    const user = useSelector(state => state.session?.user)
    const comments = useSelector((state)=>Object.values(state.comments))

   
    useEffect(()=>{
        dispatch(getEventRsvps(eventId))
        dispatch(getComments(eventId))

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
<div className="single-event-page">

<div

className="indEventSect">

    {/* <div
    className="eventTile"
   > */}
       <IndividualEvent event={event}/>
       {/* </div> */}

 <div
    className="details-sect"
   >
    <section
    className="rsvpTile"
    >
    <RsvpsOnEvents eventId ={eventId}/>
    {editButton}
    </section>



    <section className="comments-sect">
        <Comments eventId={eventId}/>
    </section>
    </div>
</div>
</div>
)

 }
 export default SingleEventPage
