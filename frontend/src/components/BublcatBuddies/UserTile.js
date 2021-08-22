import "./buddiesSect.css"
const UserTile = ({user}) =>{


    return(
    <>

        <div >
            <img className="imgTile" src={user.profileImgUrl} alt="user tile" style={{width:250}}/>
            <span className="userDetails">
                <h3>{user.username}</h3>
                
            </span>
        </div>

    </>
    )
}

export default UserTile
