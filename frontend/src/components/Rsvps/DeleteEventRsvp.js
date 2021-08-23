
import { useDispatch,useSelector } from "react-redux"

import { deleteRsvp} from "../../store/rsvp"

import"./Rsvp.css"
const DeleteEventRsvp = ({eventId, confirmed}) =>{
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session?.user?.id)
    const handleSubmit = async (e) =>{
        e.preventDefault()

        const payload = {
            eventId,
            userId,
           confirmed
        }

       dispatch(deleteRsvp(payload))
    }


    return(
        <>
        <form

        onSubmit={handleSubmit}>
        <button
        className="formBttn"
        type="submit">
            Cancel RSVP
        </button>
        </form>
        </>
    )

}
export default DeleteEventRsvp
