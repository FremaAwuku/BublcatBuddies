import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getComments } from "../../../store/comment"
import AddCommentModal from "../Comments/AddCommentModal/index"
import "./Comments.css"
import moment from 'moment'
import { useState,  } from "react"
import EditComment from "./EditComment"
import DeleteComment from "./DeleteComment"

const Comments = ({eventId}) =>{
const dispatch = useDispatch()
const history = useHistory()
const user = useSelector(state => state.session.user)
const comments = useSelector((state)=>Object.values(state.comments)).reverse()
const [showEdit, setShowEdit] = useState(false)


    const editShow =()=>{
        if(showEdit){
            setShowEdit(false)
        }else{
            setShowEdit(true)
        }

    }


    return (

        <>
       <h1>COMMENTS</h1>
       <div className="comment-scroll">
       {comments.map(comment =>{

        const formattedDate = moment(comment.createdAt).format("MMMM Do YYYY")

        let editButton
        var deleteButton
        if(user?.id === comment?.User?.id){
            editButton=(

               <button
               hidden={showEdit}
                onClick={editShow}
                >edit</button>

                )
                deleteButton=(
                   <DeleteComment commentId={comment?.id}/>
                )
        }else{
            editButton=(
                <></>
            )
            deleteButton=(
                <></>
            )
        }
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
                    <p
                    hidden={showEdit}
                    >
                        {comment.content}
                    </p>
                    {showEdit&&<EditComment showEdit={showEdit} setShowEdit={setShowEdit} commentId={comment.id} eventId={eventId}/>}

                    <div className="comments-extra">
                    <div className="comments-action">
                    {editButton}
                    {deleteButton}
                    </div>
                    <h6>
                    {formattedDate}
                    </h6>
                    </div>
               </div>

           </div>
       )})}
       </div>

        <AddCommentModal eventId={eventId}/>
        </>
    )

}

export default Comments
