

const IndividualEvent = ({event})=> {




    if(!event.private){
        return(
        <>
            <span>
            <a href={`/events/${event}`}>
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
