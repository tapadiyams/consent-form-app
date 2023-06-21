import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import { connect } from "react-redux";
import LogIn from "./components/LogIn";
import CustomerList from "./components/CustomerList";
import SignUp from "./components/SignUp";
import CustomerDetails from "./components/CustomerDetails";
import CustomerSelection from "./components/CustomerSelection";
import AdminActions from "./components/AdminActions";
import cookies from "js-cookie";

const languages = [
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
  {
    code: "sp",
    name: "Spanish",
    country_code: "sp",
  },
];

function App(props) {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  // For Language change
  const currentLanguageCode = cookies.get("i18next") || "en";
  const selectedLanguage = languages.find(
    (l) => l.code === currentLanguageCode
  );

  useEffect(() => {
    document.body.dir = selectedLanguage.dir || "ltr";
  }, [selectedLanguage]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home
              setCurrentLanguage={setCurrentLanguage}
              currentLanguage={currentLanguage}
              currentLanguageCode={currentLanguageCode}
              languages={languages}
            />
          </Route>
          <Route exact path="/signup">
            <SignUp currentLanguage={currentLanguage} />
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

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
