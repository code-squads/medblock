import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import {
  LandingPage,
  Login,
  AdminDashboard,
  HospitalDashboard,
  PatientDashboard,
} from "./pages";

import { Navbar } from "./components/core";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import "./apis/medblock";

import { AuthProvider } from "./services/authorization";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={LandingPage} />

          <Route exact path="/adminDashboard" component={AdminDashboard} />
          <Route
            exact
            path="/hospitalDashboard"
            component={HospitalDashboard}
          />
          <Route exact path="/patientDashboard" component={PatientDashboard} />

          <Route exact path="/login/:type" component={Login}/>

          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
