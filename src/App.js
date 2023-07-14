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
import ExistingCustomer from "./components/ExistingCustomer";
import EntryPoint from "./components/EntryPoint";

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
  // Create a difference beetween test env and prod env
  const isLocalhost = window.location.hostname === "localhost";

  let hasWebsiteAccess;
  if (isLocalhost) {
    // For testing, use this
    hasWebsiteAccess = true;
  } else {
    // For production, use this
    hasWebsiteAccess = localStorage.getItem("hasWebsiteAccess");
  }

  console.log("Shubham, hasWebsiteAccess: ", hasWebsiteAccess);
  // For Language change
  const currentLanguageCode = cookies.get("i18next") || "en";
  const [selectedLanguage, setSelectedLanguage] = useState(
    languages.find((l) => l.code === currentLanguageCode)
  );

  useEffect(() => {
    document.body.dir = selectedLanguage.dir || "ltr";
  }, [selectedLanguage, props.employee]);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <EntryPoint />
          </Route>
          {hasWebsiteAccess && (
            <>
              <Route exact path="/home">
                <Home
                  currentLanguageCode={currentLanguageCode}
                  setSelectedLanguage={setSelectedLanguage}
                  languages={languages}
                />
              </Route>
              <Route exact path="/signup">
                <SignUp selectedLanguage={selectedLanguage} />
              </Route>
              <Route exact path="/lookup">
                <ExistingCustomer selectedLanguage={selectedLanguage} />
              </Route>
              <Route path="/customer/:id">
                <CustomerDetails />
              </Route>

              <Route path="/login">
                <LogIn />
              </Route>
              <Route path="/admin-actions">
                <AdminActions />
              </Route>
              <Route path="/view">
                <CustomerList />
              </Route>
              <Route path="/customer-selection/:id">
                <CustomerSelection />
              </Route>
            </>
          )}
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    employee: state.stoneState.employee,
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
