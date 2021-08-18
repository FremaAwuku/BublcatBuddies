import {  useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux';
import { createEvent } from '../../store/event';

const AddEventForm = () =>{
    const dispatch = useDispatch()
    const history = useHistory()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)
    const [address, setAddress] = useState('')
    const [date, setDate] = useState('')
    const [validationErrors,setValidationErrors] = useState([])

    const updateName = (e) => setName (e.target.value)
    const updateDescription = (e) => setDescription (e.target.value)
    const updateImage = (e) => setImage (e.target.value)
    const updateAddress = (e) => setAddress (e.target.value)
    const updateDate = (e) => setDate (e.target.value)

    const hostId = useSelector(state => state.session.user.id)

    useEffect(()=>{
        const errors = []
        let current = new Date()
        let currentDate = `${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate()}`



        if(name.length < 4)errors.push("Name must be longer than 4 character")
        if(name.length > 30 )errors.push("Name must be less than 30 Character")
        if(date < currentDate )errors.push("Event Date must be set in the future ")
        setValidationErrors(errors)
    },[date,name])

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const payload ={
            name,
            description,
            image,
            hostId,
            isPrivate,
            address,
            date
        }
        const newEvent = await dispatch(createEvent(payload))

        if(newEvent){
            history.push(`/events`)
        }

    }

    return(
        <section>
            <h1>Create new Event</h1>
            <ul className="errors">
                {validationErrors && validationErrors.map(errors=>
                <li key={errors}>{errors}</li>)}
            </ul>
            <form onSubmit={handleSubmit}>
            <span>
                <label htmlFor="eventName"
                >Event Name:</label>
                <input
                type="text"
                required
                placeholder="Event Name"
                name="eventName"
                value={name}
                onChange={updateName}
                />
            </span>

            <span>
                <label htmlFor="description"
                >Event Description:</label>
                <input
                type="text"
                required
                placeholder="Event Description"
                name="description"
                value={description}
                onChange={updateDescription}
                />
            </span>


            <span>
                <label htmlFor="eventImageUrl"
                >Insert Event Image URL:</label>
                <input
                type="text"
                required
                placeholder="Event Image"
                name="eventImageUrl"
                value={image}
                onChange={updateImage}
                >
                </input>
            </span>

            <span>
                <label >

                Public
                <input
                type="radio"
                value="public"
                name="Public"
                onChange={()=> setIsPrivate(false)}
                checked = {isPrivate === false}
                />
                </label>
                <label>
                Private
                <input
                type="radio"
                value="private"
                name="Private"
                onChange={(e)=> setIsPrivate(true)}
                checked = {isPrivate === true}
                />
                </label>
            </span>


            <span>
                <label htmlFor="address"
                >Event Location:</label>
                <input
                type="text"
                required
                placeholder="Event Address"
                name="address"
                value={address}
                onChange={updateAddress}
                >
                </input>
            </span>

            <span>
                <label htmlFor="eventDate"
                >Date of Event:</label>
                <input
                type="date"
                required
                placeholder="Event Date"
                name="eventDate"
                value={date}
                onChange={updateDate}
                >
                </input>
            </span>
            <button
            type="submit"
            disabled = {validationErrors.length > 0}
            >
                Submit Event
            </button>

            </form>
        </section>


    )
}

export default AddEventForm
