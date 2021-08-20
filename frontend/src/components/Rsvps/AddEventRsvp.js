import { useEffect, useState} from "react"
import { useDispatch,useSelector } from "react-redux"
import {useHistory} from 'react-router-dom'
import { getEventRsvps , addEventRsvp} from "../../store/rsvp"


const AddEventRsvp = ({eventId}) =>{
    const dispatch = useDispatch()
    const history = useHistory()

    const userId = useSelector(state => state.session.user.id)
    const userRsvps = useSelector(state =>Object.values(state.rsvps))

    const [confirmed, setConfirmed] = useState(false)




     useEffect(()=>{

    dispatch(getEventRsvps(eventId))


     },[dispatch])

     const handleSubmit = async (e) =>{
         e.preventDefault()

         const payload = {
             eventId,
             userId,
             confirmed
         }

        await dispatch(addEventRsvp(payload))
     }



     if(userRsvps.find(user => userId === user.id)){

        return(
            <>
            </>
        )
     }else{
         return(
         <>
         <h4>RSVP TO THIS EVENT</h4>
            <form
            onSubmit={handleSubmit}>
                <span>
                    <label>
                        Interested

                        <input
                        type="radio"
                        value="interested"
                        name="Interested"
                        onChange={()=> setConfirmed(false)}
                        checked = {confirmed === false}
                        />
                    </label>
                    <label>
                        Going

                        <input
                        type="radio"
                        value="confirmed"
                        name="Confirmed"
                        onChange={()=> setConfirmed(true)}
                        checked = {confirmed === true}
                        />
                    </label>
                    <button type="submit">
                        RSVP TO THIS EVENT
                        </button>
                </span>
            </form>
         </>)
     }

    //should only render if user doesnt already have an rsvp
    //get rsvps for event
    //if rsvp at the user id is includes then
    //show nothing but if it does show add rsvp
    //
}


export default AddEventRsvp
