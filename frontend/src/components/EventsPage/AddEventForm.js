import {  useState } from 'react';
import { useSelector } from 'react-redux';
const AddEventForm = () =>{
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)
    const [address, setAddress] = useState('')
    const [date, setDate] = useState(new Date())

    const updateName = (e) => setName (e.target.value)
    const updateDescription = (e) => setDescription (e.target.value)
    const updateImage = (e) => setImage (e.target.value)
    const updateAddress = (e) => setAddress (e.target.value)
    const updateDate = (e) => setDate (e.target.value)

    const hostId = useSelector(state => state.session.id)
    const handleSubmit = async (e) =>{
        e.preventDefault();



    }

    return(
        <section>
            <h1>Create new Event</h1>
            <form onSubmit={handleSubmit}>
                <label for="eventName"
                >Event Name:</label>
                <input type="text">
                </input>
                <label for="description"
                >Event Description:</label>
                <input>
                </input>
                <label for="eventImageUrl"
                >Insert Url for Event Image:</label>
                <input>
                </input>
                <label for="isPrivate"
                >Is This Event Private?</label>
                <select>
                    <option>Yes</option>
                    <option>No</option>
                </select>
                <label for="address"
                >Event Location:</label>
                <input>
                </input>
                <label for="eventDate"
                >Date of Event:</label>
                <input>
                </input>
            </form>
        </section>


    )
}

export default AddEventForm
