import { BrowserRouter as Router, Switch } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import { Main, Send, Unlock } from "../views";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <PublicRoute path="/unlock" Component={Unlock} />
        <PrivateRoute path="/send" Component={Send} />
        <PrivateRoute path="/" Component={Main} />
      </Switch>
    </Router>
  );
}
