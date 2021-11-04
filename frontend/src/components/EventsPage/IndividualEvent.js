
import {Link} from "react-router-dom"
import "./EventsTile.css"
import moment from 'moment'

const IndividualEvent = ({event})=> {

const formattedDate = moment(event.eventDate).format("MMMM Do YYYY")

//TODO Make only public events seen
    // if(!event.isPrivate){
        return(
        <>
            <span className="dataTile">
            <Link to={`/events/${event.id}`}>
            <img
            className="eventImg"
            src={event.eventImageUrl} alt="event visual description" ></img>
            </Link>
            <Link to={`/events/${event.id}`}>
            <h2
            className="eventName"
            >{event.eventName}</h2>
            </Link>
            <div className="eventDeets">
            <h4 id="host">Hosted By: {event.User.username}</h4>
            <p>{event.description}</p>
            <br></br>
            <p id="addy">{event.address}</p>

            <p id="date">{formattedDate}</p>
            </div>

            </span>
        </>
        )
    }

//    return(null)

// }

export default IndividualEvent
