import { Redirect, Route, Router, Switch, useLocation } from "wouter";
import ViewLogin from "../views/login/ViewLogin";
import ViewSearch from "../views/search/ViewSearch";

/**
 * This component handles high-level concerns like views and routing.
 */
function App() {
  const [location] = useLocation();
  if (location === "/") {
    // Ensure a URL of just the host, e.g. localhost:XXXX doesn't land on an
    // empty page. This shouldn't be a problem in the prod build.
    return <Redirect to="/fetch-a-dog/login" />;
  }

  return (
    // The app currently gets deployed to joetheis.me/fetch-a-dog, so this
    // base needs to be added. If it ever gets its own domain, this can be
    // removed.
    <Router base="/fetch-a-dog">
      <Switch>
        <Route path="/login" component={ViewLogin} />
        <Route path="/search" component={ViewSearch} />
        <Route>
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
