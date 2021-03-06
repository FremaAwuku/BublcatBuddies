import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch} from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";


import EventsPage  from "./components/EventsPage/EventsPage";

import AddEventForm from "./components/EventsPage/AddEventForm";
import SingleEventPage from "./components/SingleEventPage";
import Footer from "./components/Footer";

 import { getEvents } from "./store/event";
import EditEventForm from "./components/EventsPage/EditEventForm";
import SplashPage from "./components/SplashPage";
import { getUsers } from "./store/user";
import { getUsersBuddies} from "./store/bublcat-buddies"
import BublcatBuddies from "./components/BublcatBuddies/BublcatBuddies";
import UserProfile from "./components/UserProfile/UserProfile";

function App() {
  const userId = useSelector(state => state.session?.user?.id)
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {

    dispatch(getUsers())
    dispatch(getEvents())
    dispatch(getUsersBuddies(userId))
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));



  }, [dispatch,userId]);

  return (
    <>

        <Navigation isLoaded={isLoaded} />


        {isLoaded && (
          <Switch>
            <Route  exact path="/">
              <SplashPage/>
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route exact path="/events">
              <EventsPage/>
            </Route>
            <Route path="/events/add">
              <AddEventForm/>
            </Route>
            <Route exact path="/events/:eventId">
              <SingleEventPage/>
            </Route>
            <Route path="/events/:eventId/edit">
              <EditEventForm/>
            </Route>
            <Route path="/bublcat-buddies">
              <BublcatBuddies/>

            </Route>
            <Route path="/users/:userId">
              <UserProfile/>

            </Route>
          </Switch>

        )}
      <Footer/>
    </>
  );
}

export default App;
