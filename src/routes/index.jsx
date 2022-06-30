import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import { LINK_DASHBOARD, LINK_LOGIN } from "../utils/link";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path={LINK_DASHBOARD} component={Dashboard} />
        <Route path={LINK_LOGIN} component={Login} />
        <Redirect to={LINK_DASHBOARD} />
      </Switch>
    </Router>
  );
};

export default Routes;
