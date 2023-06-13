import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import { useEffect } from "react";
import { getUserAuth } from "./actions";
import { connect } from "react-redux";
import LogIn from "./components/LogIn";
import View from "./components/View";

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <SignUp />
          </Route>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/admin-view">
            <View />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
