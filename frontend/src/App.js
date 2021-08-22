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
import BublcatBuddies from "./components/BublcatBuddies/BublcatBuddies";

function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {

    dispatch(getUsers())
    dispatch(getEvents())
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));


  }, [dispatch]);

  return (
    <>

        <Navigation isLoaded={isLoaded} />

        <Footer/>
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
          </Switch>

        )}

    </>
  );
}

export default App;
