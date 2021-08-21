import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { getEventRsvps } from "../../store/rsvp"


const RsvpsOnEvents =  ({eventId})  =>{

const rsvps = useSelector(state =>Object.values(state.rsvps))
const confirmed = useSelector(state =>Object.values(state.rsvps).filter(rsvp => rsvp.confirmed))
const dispatch = useDispatch()

 useEffect(()=>{

dispatch(getEventRsvps(eventId))


 },[dispatch,eventId])
return(
    <>
        <h3>There are {rsvps.length} people Interested in this event


        </h3>
        <h3>
        There are {confirmed.length} people Going to this event
        </h3>
    </>
)

}

export default RsvpsOnEvents
