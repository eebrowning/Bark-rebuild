import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import CreatePlaceForm from './components/CreatePlaceForm'
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Places from "./components/Places";
import Place from "./components/Place";
import EditPlaceForm from './components/EditPlaceForm'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/create'>
            <CreatePlaceForm />
          </Route>
          <Route exact path={['/', '/places']}>
            <Places />
          </Route>
          <Route exact path={'/places/:placeId'}>
            <Place isLoaded={isLoaded} />
            {/* isLoaded may be unnecessary */}
          </Route>
          <Route exact path={'/places/:placeId/edit'}>
            <EditPlaceForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
