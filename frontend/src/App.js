import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch} from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";

import Navigation from "./components/Navigation";


import EventsPage  from "./components/EventsPage/EventsPage";
import TestComponent from "./components/TestComponent";
import AddEventForm from "./components/EventsPage/AddEventForm";
import SingleEventPage from "./components/SingleEventPage";
 import { getEvents } from "./store/event";
import EditEventForm from "./components/EventsPage/EditEventForm";

function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(getEvents())
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));

  }, [dispatch]);

  return (
    <>

        <Navigation isLoaded={isLoaded} />
        <TestComponent/>
        {/* anything that needs to persist sitewide must be above this line */}
        {isLoaded && (
          <Switch>
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
          </Switch>
        )}
    </>
  );
}

export default App;
