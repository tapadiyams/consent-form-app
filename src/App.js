import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import { useEffect } from "react";
// import { getUserAuth } from "./actions";
import { connect } from "react-redux";
import LogIn from "./components/LogIn";
import CustomerList from "./components/CustomerList";
import SignUp from "./components/SignUp";
import CustomerDetails from "./components/CustomerDetails";
import CustomerSelection from "./components/CustomerSelection";
import AdminActions from "./components/AdminActions";

function App(props) {
  // useEffect(() => {
  //   props.getUserAuth();
  // }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/admin-action">
            <AdminActions />
          </Route>
          <Route path="/view">
            <CustomerList />
          </Route>
          <Route path="/customer-selection/:id">
            <CustomerSelection />
          </Route>
          <Route path="/customer/:id">
            <CustomerDetails />
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
  // getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
