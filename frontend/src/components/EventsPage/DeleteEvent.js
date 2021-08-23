import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { deleteEvent } from "../../store/event"

import './AddEventForm.css'
const DeleteEvent = ({event}) =>{
const dispatch = useDispatch()
const history = useHistory()
    const handleSubmit = async (e) =>{
        e.preventDefault()

        dispatch(deleteEvent(event?.eventId))

            history.push(`/events`)

    }

    return (


        <form
        id="delete"
        onSubmit={handleSubmit}>
        <button
        className="formBttn"
        type="submit "
        >
        Delete Event
        </button>
        </form>
    )

}

export default DeleteEvent
