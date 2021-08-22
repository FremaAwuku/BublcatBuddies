import { useEffect, useState} from "react"
import { useDispatch,useSelector } from "react-redux"

import { getEventRsvps , addEventRsvp} from "../../store/rsvp"

import "./AddEventRsvp.css"

const AddEventRsvp = ({eventId}) =>{
    const dispatch = useDispatch()

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
         <div >
                        <h1 className="header">RSVP TO THIS EVENT</h1>
                            <form
                            onSubmit={handleSubmit}
                            style={{width:350 ,backgroundColor:"red"}}
                            >

                                    <label>
                                        Interested

                                        <input
                                        className="inputbox"
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
                                        className="inputbox"
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

                            </form>

         </div>)
     }

    //should only render if user doesnt already have an rsvp
    //get rsvps for event
    //if rsvp at the user id is includes then
    //show nothing but if it does show add rsvp
    //
}


export default AddEventRsvp
