import { useEffect, useState} from "react"
import { useDispatch,useSelector } from "react-redux"

import { getEventRsvps , addEventRsvp} from "../../store/rsvp"

import"./Rsvp.css"

const AddEventRsvp = ({eventId}) =>{
    const dispatch = useDispatch()

    const userId = useSelector(state => state.session?.user?.id)
    const userRsvps = useSelector(state => Object.values(state.rsvps))

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



    //  if(userRsvps.find(user => userId === user.id)){

    //     return(
    //         <>
    //         </>
    //     )
    //  }else{
         return(
         <div >
                        <h2 style={{color:"rgb(69, 22, 106)" , textAlign:"center"}}>RSVP TO THIS EVENT</h2>
                            <form
                            onSubmit={handleSubmit}
                            className="rsvpForm"
                            >
                                <span className="radio">
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
                                        </span>
                                    <br/>
                                    <button
                                    style={{height:"fit-content", marginTop:10}}
                                    className="formBttn"
                                    type="submit">
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
// }


export default AddEventRsvp
