import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session?.user);

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
    <nav className="navBarCont">
    {isLoaded && sessionLinks}
      <ul className='navBar'>




        <li>
          <NavLink exact to="/" className='navLink' id="home">
          <i class="fas fa-home"></i>
          </NavLink>

        </li>
        <br/>
        <li>
          <NavLink to="/events" className='navLink' id="event">EVENTS</NavLink>
        </li>
        <br/>
        <li>
          <NavLink to="/bublcat-buddies" className='navLink' id="buddies">FIND BUBLCAT BUDDIES</NavLink>
        </li>

      </ul>
    </nav>
  );
}

export default Navigation;
