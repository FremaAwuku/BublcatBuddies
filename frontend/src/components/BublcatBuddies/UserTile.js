import "./buddiesSect.css"
import AddBuddy from "./AddBuddy"
import { useSelector } from "react-redux"
const UserTile = ({user}) =>{
    const authUser = useSelector((state)=>state.session.user)
let add
if(authUser){
    add=(
        <AddBuddy buddyId={user.id}/>
    )
    }else{
        add=(
            <></>
        )
    }

    return(
    <>

        <div className="userTile" >
            <img className="imgTile" src={user.profileImgUrl} alt="user tile" style={{width:350}}/>
            <div className="userDetails" >
                <span id="userDeets">
                <h3>{user.username}</h3>
                {add}
                </span>

            </div>
        </div>

    </>
    )
}

export default UserTile
