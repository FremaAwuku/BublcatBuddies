import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getComments } from "../../../store/comment"


const Comments = ({eventId}) =>{
const dispatch = useDispatch()
const history = useHistory()
const comments = useSelector((state)=>Object.keys(state.comments))
console.log(comments,"comments")

    const handleSubmit = async (e) =>{
        e.preventDefault()

        await dispatch(getComments())




    }

    return (


       <h1>COMMENTS</h1>
    )

}

export default Comments
