import "./buddiesSect.css"
import AddBuddy from "./AddBuddy"
const UserTile = ({user}) =>{


    return(
    <>

        <div className="userTile" >
            <img className="imgTile" src={user.profileImgUrl} alt="user tile" style={{width:350}}/>
            <div className="userDetails" >
                <span id="userDeets">
                <h3>{user.username}</h3>
                <AddBuddy buddyId={user.id}/>
                </span>

            </div>
        </div>

    </>
    )
}

export default UserTile
