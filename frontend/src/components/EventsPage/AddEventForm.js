import {  useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux';
import { createEvent } from '../../store/event';
import './AddEventForm.css'
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

    const hostId = useSelector(state => state.session?.user?.id)

    useEffect(()=>{
        const errors = []
        let current = new Date()
        let currentDate = `${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate()}`



        if(name.length < 4)errors.push("Name must be longer than 4 character")
        if(name.length > 30 )errors.push("Name must be less than 30 Character")
        if(description.length< 0)errors.push("Description can not be Empty")
        if(image.length < 0)errors.push("Event Image URL can not be Empty")
        if(address.length < 0)errors.push("Address can not be Empty")
        if(date < currentDate )errors.push("Event Date must be set in the future ")
        setValidationErrors(errors)
    },[date,name,description,image,address])

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
        <section className="addEventForm">
            <h1 className="newEvent">CREATE NEW EVENT</h1>

            <form className="addEventForm" onSubmit={handleSubmit}>
            <span>
            <ul className="errors">
                {validationErrors && validationErrors.map(errors=>
                <li key={errors}>{errors}</li>)}
            </ul>
                <label
                className="formTempLabel"
                htmlFor="eventName"
                >Event Name:
                <input className="formTempInput"
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
                <input className="formTempInput"
                type="text"
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
                className="privacy
                "
                    >
                        Is this a Public Or Private Event?
                        <br/>


                    <label
                    className="formTempLabel"
                    >

                        Public
                        <input className="formTempInput"
                        type="radio"
                        value="public"
                        name="Public"
                        onChange={()=> setIsPrivate(false)}
                        checked = {isPrivate === false}
                        />
                        </label>
                        <label
                                        className="formTempLabel"
                        >
                        Private
                        <input className="formTempInput"
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
                htmlFor="eventImageUrl"
                className="imgLabel"
                >Event Image URL:
                <input className="formTempInput"
                type="text"
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
                htmlFor="address"
                >Event Location:
                <input className="formTempInput"
                type="text"
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
                <input className="formTempInput"
                type="date"
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
            type="submit"
            disabled = {validationErrors.length > 0}
            className="formBttn"
            >
                Submit Event
            </button>

            </form>
        </section>


    )
}

export default AddEventForm
