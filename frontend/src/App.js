import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch} from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

// import HeaderContainer from "./components/HeaderContainer"
// import BodyContainer from "./components/BodyContainer"
// import FooterContainer from "./components/FooterContainer"
import EventsPage  from "./components/EventsPage/EventsPage";
import TestComponent from "./components/TestComponent";
import AddEventForm from "./components/EventsPage/AddEventForm";
import SingleEventPage from "./components/SingleEventPage";
 import { getEvents } from "./store/event";

function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(getEvents())
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
            <Route path={`/events/:eventId`}>
              <SingleEventPage/>
            </Route>
          </Switch>
        )}
    </>
  );
}

export default App;
