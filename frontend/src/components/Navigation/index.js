import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul>
      {isLoaded && sessionLinks}
      <li>
        <NavLink exact to="/" className='navLink' id="home">Home</NavLink>

      </li>
      <br/>
      <li>
        <NavLink to="/events" className='navLink' id="event">Events</NavLink>
      </li>
      <br/>
      <li>
        <NavLink to="/bublcat-buddies" className='navLink' id="bublcat">Find Bublcat Buddies</NavLink>
      </li>
      <br/>
    </ul>
  );
}

export default Navigation;
