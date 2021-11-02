import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session?.user);

  let sessionLinks;
  let homeIcon
  let buddyShow

  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );

    homeIcon=(
      <li>
      <NavLink exact to="/" className='navLink' id="home">
      <i class="fas fa-home"></i>
      </NavLink>

    </li>
    )
    buddyShow=(
      <li>
      <NavLink to="/bublcat-buddies" className='navLink' id="buddies">FIND BUBLCAT BUDDIES</NavLink>
    </li>
    )
  } else {
    sessionLinks = (
      <div className="loginActions">
        <LoginFormModal />
        <NavLink
        className="signUp"
        to="/signup">
          <button
          className="paw-btn-signup">
          Sign Up
            </button></NavLink>
      </div>
    );
    homeIcon=(
      <></>
    )
    buddyShow=(
     <></>
    )
  }

  return (
    <nav className="navBarCont">
    {isLoaded && sessionLinks}
      <ul className='navBar'
      style={{marginRight:15}}>

          {homeIcon}



        <br/>
        <li >
          <NavLink to="/events" className='navLink' id="event">EVENTS</NavLink>
        </li>
        <br/>
        {buddyShow}
      </ul>
    </nav>
  );
}

export default Navigation;
