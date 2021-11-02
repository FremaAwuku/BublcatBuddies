import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getComments } from "../../../store/comment"
import AddCommentModal from "../Comments/AddCommentModal/index"
import "./Comments.css"
import moment from 'moment'

const Comments = ({eventId}) =>{
const dispatch = useDispatch()
const history = useHistory()
const comments = useSelector((state)=>Object.values(state.comments)).reverse()
console.log(comments,"comments")

    const handleSubmit = async (e) =>{
        e.preventDefault()

        await dispatch(getComments())




    }

    return (

        <>
       <h1>COMMENTS</h1>
       <div className="comment-scroll">
       {comments.map(comment =>{

        const formattedDate = moment(comment.createdAt).format("MMMM Do YYYY")

       return(
           <div className="indv-comment">
               <div className="comment-user">

                   <img
                   className="comment-user-pic" src={comment?.User?.profileImgUrl}
                   >
                   </img>
                   <p>
                   {comment?.User?.username}
                   </p>
               </div>
               <div className="comment-content">
                    <p>
                        {comment.content}
                    </p>
                    <h6>
                    {formattedDate}
                    </h6>
               </div>

           </div>
       )})}
       </div>

        <AddCommentModal eventId={eventId}/>
        </>
    )

}

export default Comments
