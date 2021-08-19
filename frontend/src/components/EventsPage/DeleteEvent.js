import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { deleteEvent } from "../../store/event"

const DeleteEvent = ({event}) =>{
const dispatch = useDispatch()
const history = useHistory()
    const handleSubmit = async (e) =>{
        e.preventDefault()

        const deletedEvent = await dispatch(deleteEvent(event))
        if(deletedEvent){
            history.push(`/events`)
        }

    }

    return (


        <form onSubmit={handleSubmit}>
        <button type="submit "
        >
        Delete Event
        </button>
        </form>
    )

}

export default DeleteEvent
