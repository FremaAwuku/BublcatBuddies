import { useEffect} from "react"
import { useDispatch,useSelector } from "react-redux"
import { addUserBuddy ,getUsersBuddies} from "../../store/bublcat-buddies"
import DeleteButton from "./DeleteBuddy"
const AddBuddy = ({buddyId}) =>{

    const userId = useSelector(state => state.session?.user?.id)
    const dispatch = useDispatch()
    const userBuddies = useSelector(state => Object.values(state.buddies))
    .map(buddy => buddy = buddy.buddyId)


    useEffect(()=>{

        dispatch(getUsersBuddies(userId))


    },[dispatch,userId])


    const handleSubmit = async (e) =>{
        e.preventDefault()

        const payload = {
            buddyId,
            userId
        }

       await dispatch(addUserBuddy(payload))
    }

    if(userBuddies.includes(buddyId)){

        return(
            <>
            <p> You Are Already Friends</p>
            <DeleteButton buddyId={buddyId}/>
            </>
        )

    }
    return(
        <form
        onSubmit={handleSubmit}>

            <button ><i class="far fa-check-square"><br/>ADD</i>

</button>
        </form>
    )




}

export default AddBuddy
