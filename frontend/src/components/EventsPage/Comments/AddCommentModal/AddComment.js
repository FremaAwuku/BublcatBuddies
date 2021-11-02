import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { addComment, getComments} from "../../../../store/comment"
import { useState, useEffect } from "react"
const AddComment = ({eventId, setShowModal}) => {


    const dispatch = useDispatch()
    const history = useHistory()
    const [content,setContent]= useState('')
    const [validationErrors,setValidationErrors] = useState([])
    const user= useSelector(state=>state.session.user)
    useEffect(()=>{
      const errors = []
      if(content === ''){

        errors.push("Comment can not be empty")
      }

      setValidationErrors(errors)
    },[dispatch,content])

const handleSubmit = async (e) =>{
    e.preventDefault()

    const payload ={
        userId:user?.id,
        eventId,
        content
    }


   await dispatch(addComment(payload))

  await dispatch(getComments(eventId))
  setContent("")
  history.push(`/events/${eventId}`)
  setShowModal(false)

}
const closeModal = () =>{
  setShowModal(false)
}

return(
  <div className="univ-modal-wrapper comment">
     <h5
      id="close-modal"
      onClick={closeModal}>CLOSE</h5>
    <form
    className="univ-form-wrapper"
    onSubmit={handleSubmit}
    >
    <div
    style={{textAlign:'center'}}
    className="univ-form-errors">
      {validationErrors.map((error, int) => (<div key={int}>{error}</div>))}
      </div>
      <label
      style={{textAlign:'center'}}
      className="univ-form-label"
      htmlFor='content'
      >
         Make a Comment
          <textarea
          className="univ-form-input"
          placeholder={content}
          name='content'
          onChange ={(e)=>setContent(e.target.value)}
          />
      </label>
      <button
      disabled={validationErrors.length>0}
      className="primary-button"
      type="submit">
          Post Comment
      </button>

    </form>
    </div>
)

}

export default AddComment
