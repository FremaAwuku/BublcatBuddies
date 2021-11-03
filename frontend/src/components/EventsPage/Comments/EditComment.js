import { useSelector,useDispatch } from "react-redux"
import { getComments, editComment } from "../../../store/comment"
import { useState, useEffect } from "react"
const EditComment =({showEdit , setShowEdit, commentId, eventId})=>{

    const dispatch = useDispatch()
    const comments = useSelector(state=> state.comments)
    const [content,setContent]= useState(comments[commentId]?.content)

      const [validationErrors,setValidationErrors] = useState([])
      useEffect(()=>{
         dispatch(getComments(eventId))
        const errors = []
        if(content === ''){

          errors.push("Comment can not be empty")
        }

        setValidationErrors(errors)
      },[dispatch,content])

    const handleEdit = async (e) =>{
        e.preventDefault()

        const payload = {
            content,
            commentId
        }
        await dispatch(editComment(payload))


        setShowEdit(false)

    }


    const editShow =()=>{
        if(showEdit){
            setShowEdit(false)
        }else{
            setShowEdit(true)
        }

    }

    return(
    <>
    {showEdit&&
    <form
    onSubmit={handleEdit}
    className="edit-form">
        <h6 className="close-edit"
        onClick={editShow}
        >x</h6>
       <textarea
       className="edit-comment"
       value={content}
       name='content'
      maxLength="280"
       onChange ={(e)=>setContent(e.target.value)}>

       </textarea>
       <button

       disabled={validationErrors.length>0}>
           Save
       </button>
        </form>}
        </>
    )
}

export default EditComment
