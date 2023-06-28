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
import { createBrowserHistory } from "history";
import NotFound from "./components/NotFound";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

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
  const [hasWebsiteAccess, setHasWebsiteAccess] = useState(true);

  const [employeeName, setEmployeeName] = useState("");
  const [employeePermission, setEmployeePermission] = useState("");

  const history = createBrowserHistory();

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
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <EntryPoint setHasWebsiteAccess={setHasWebsiteAccess} />
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
                <CustomerDetails
                  employeeName={employeeName}
                  employeePermission={employeePermission}
                />
              </Route>

              <Route path="/login">
                <LogIn
                  setEmployeeName={setEmployeeName}
                  setEmployeePermission={setEmployeePermission}
                />
              </Route>
              <Route path="/admin-actions">
                <AdminActions
                  employeeName={employeeName}
                  employeePermission={employeePermission}
                />
              </Route>
              <Route path="/view">
                <CustomerList
                  employeeName={employeeName}
                  employeePermission={employeePermission}
                />
              </Route>
              <Route path="/customer-selection/:id">
                <CustomerSelection
                  employeeName={employeeName}
                  employeePermission={employeePermission}
                />
              </Route>
              <Route path="/not-found" component={NotFound} />
              {/* Redirect to the not-found page for any other route */}
              <Redirect to="/not-found" />
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
