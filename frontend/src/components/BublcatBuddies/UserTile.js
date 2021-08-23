import "./buddiesSect.css"
import AddBuddy from "./AddBuddy"
const UserTile = ({user}) =>{


    return(
    <>

        <div >
            <img className="imgTile" src={user.profileImgUrl} alt="user tile" style={{width:250}}/>
            <span className="userDetails">
                <h3>{user.username}</h3>
                <AddBuddy buddyId={user.id}/>

            </span>
        </div>

    </>
    )
}

export default UserTile
