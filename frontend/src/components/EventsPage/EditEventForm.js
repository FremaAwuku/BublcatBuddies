import { useParams, useHistory } from "react-router-dom"
import { useSelector ,useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { editEvent, getEvents } from "../../store/event"
import DeleteEvent from "./DeleteEvent"

import './AddEventForm.css'
const EditEventForm = () =>{
    const dispatch = useDispatch()
    const history = useHistory()

    const {eventId} = useParams()

    const event = useSelector(store => store.events[eventId])
    const hostId = useSelector(store => store.session?.user?.id)

//issue with rendering the useState for eventName
    const [name, setName] = useState(event?.eventName)
    const [description, setDescription] = useState(event?.description)
    const [image, setImage] = useState(event?.eventImageUrl)
    const [isPrivate, setIsPrivate] = useState(event?.isPrivate)
    const [address, setAddress] = useState(event?.address)
    const [date, setDate] = useState(event?.eventDate)
    const [validationErrors,setValidationErrors] = useState([])

    const updateName = (e) => setName (e.target.value)
    const updateDescription = (e) => setDescription (e.target.value)
    const updateImage = (e) => setImage (e.target.value)
    const updateAddress = (e) => setAddress (e.target.value)
    const updateDate = (e) => setDate (e.target.value)

    useEffect(()=>{
        dispatch(getEvents())
        const errors = []
        let current = new Date()
        let currentDate = `${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate()}`



        if(name?.length < 4)errors.push("Name must be longer than 4 character")
        if(name?.length > 30 )errors.push("Name must be less than 30 Character")
        if(description?.length< 0)errors.push("Description can not be Empty")
        if(image?.length< 0)errors.push("Event Image URL can not be Empty")
        if(address?.length< 0)errors.push("Address can not be Empty")
        if(date < currentDate )errors.push("Event Date must be set in the future ")
        setValidationErrors(errors)
    },[date,name,description,image,address,dispatch])

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const payload ={
            name,
            description,
            image,
            hostId,
            isPrivate,
            address,
            date,
            eventId

        }
        const editedEvent = await dispatch(editEvent(payload))

        if(editedEvent){

            history.push(`/events/${event.id}`)

    }
}


return(
    <section
    className="addEventForm"
    id="edit"
    >
        <h1
        className="newEvent"
        >{`Edit ${event?.eventName}`}</h1>
        <ul className="errors">
            {validationErrors && validationErrors.map(errors=>
            <li key={errors}>{errors}</li>)}
        </ul>
        <form

        onSubmit={handleSubmit} className="editForm">
        <span>
            <label
            className="formTempLabel"
            htmlFor="eventName"
            >Event Name:
            <input
            className="formTempInput"
            type="text"
            required
            placeholder="Event Name"
            name="eventName"
            value={name}
            onChange={updateName}
            />
            </label>
        </span>

        <span>
            <label
            className="formTempLabel"
            htmlFor="description"
            >Event Description:
            <input
            type="text"
            className="formTempInput"
            required
            placeholder="Event Description"
            name="description"
            value={description}
            onChange={updateDescription}
            />
            </label>
        </span>


        <span>
            <label
            className="formTempLabel"
            htmlFor="eventImageUrl"
            >Insert Event Image URL:
            <input
            type="text"
            className="formTempInput"
            required
            placeholder="Event Image"
            name="eventImageUrl"
            value={image}
            onChange={updateImage}
            >
            </input>
            </label>
        </span>

        <span>
            <label
            className="formTempLabel"
            >
            Is this Event Public or Private?
            <label

            >

            Public
            <input
            type="radio"
            value="public"
            name="Public"
            onChange={()=> setIsPrivate(false)}
            checked = {isPrivate === false}
            />
            </label>
            <label

            >
            Private
            <input
            type="radio"
            value="private"
            name="Private"
            onChange={(e)=> setIsPrivate(true)}
            checked = {isPrivate === true}
            />
            </label>
            </label>
        </span>


        <span>
            <label
            className="formTempLabel"
            htmlFor="address"
            >Event Location:
            <input
            type="text"
            className="formTempInput"
            required
            placeholder="Event Address"
            name="address"
            value={address}
            onChange={updateAddress}
            >
            </input>
            </label>
        </span>

        <span>
            <label
            className="formTempLabel"
            htmlFor="eventDate"
            >Date of Event:
            <input
            type="date"
            className="formTempInput"
            required
            placeholder="Event Date"
            name="eventDate"
            value={date}
            onChange={updateDate}
            >
            </input>
            </label>
        </span>
        <button
        className="formBttn"
        type="submit"
        disabled = {validationErrors.length > 0}

        >
            Edit Event
        </button>

        </form>
        <DeleteEvent   eventId={eventId}/>
    </section>
)

}

export default EditEventForm
