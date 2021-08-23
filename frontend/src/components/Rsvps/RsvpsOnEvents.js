import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { getEventRsvps } from "../../store/rsvp"
import AddEventRsvp from "../Rsvps/AddEventRsvp"
import DeleteEventRsvp from "../Rsvps/DeleteEventRsvp"
import"./Rsvp.css"
const RsvpsOnEvents =  ({eventId})  =>{

const rsvps = useSelector(state =>Object.values(state.rsvps))
const rsvpedUser = useSelector(state =>Object.values(state.rsvps)).map(rsvp=> rsvp=rsvp.userId)
const confirmed = useSelector(state =>Object.values(state.rsvps)).filter(rsvp => rsvp.confirmed)
const interested = (rsvps.length - confirmed.length)
const dispatch = useDispatch()
const users = useSelector(state =>Object.values(state.users))
const sessionUser = useSelector(state=>state.session?.user)
 useEffect(()=>{

dispatch(getEventRsvps(eventId))


 },[dispatch,eventId])

let noDubs
if(rsvpedUser.includes(sessionUser?.id)){
    noDubs=(
        <span className="rsvpAct">
            <h3 style={{color:"rgb(69, 22, 106)"}}> You are RSVPed to this event </h3>
        <DeleteEventRsvp eventId={eventId} />
        </span>


    )
}else{
  noDubs = (
    <span className="rsvpAct">
    <AddEventRsvp eventId={eventId}/>
    </span>
    )
}


return(
    <>

    <div className="rsvpDeets">
    <h3>There are {rsvps.length - confirmed.length} people Interested in this event
        </h3>
        <h3>
        There are {confirmed.length} people Going to this event
        </h3>
    {noDubs}
    </div>


    </>
)

}

export default RsvpsOnEvents
