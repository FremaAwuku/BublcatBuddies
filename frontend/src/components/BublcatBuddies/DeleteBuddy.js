import { useEffect} from "react"
import { useDispatch,useSelector } from "react-redux"
import { deleteBuddy } from "../../store/bublcat-buddies"

const DeleteButton =({buddyId}) =>{
    const userId = useSelector(state => state.session?.user?.id)
    const dispatch = useDispatch()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const payload ={
            buddyId,
            userId
        }
        await dispatch(deleteBuddy(payload))

    }


    return(
        <form
        onSubmit={handleSubmit}>
            <button

            >
            <i class="fas fa-user-slash"></i> <br></br>
            Remove Friend
            </button>
        </form>
    )
}
export default DeleteButton
