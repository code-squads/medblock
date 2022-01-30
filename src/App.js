import React from "react";
import NewRecord from "./pages/NewRecord";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import {
  LandingPage,
  Login,
  AdminDashboard,
  HospitalDashboard,
  PatientDashboard,
  AnyRecord,
  AnyRecordDisplay,
  PatientRegistration,
  HospitalRegistration
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
          <Route exact path="/newRecord" component={NewRecord} />

          <Route exact path="/login/:type" component={Login}/>
          <Route exact path="/anyRecord" component={AnyRecord}/>
          <Route exact path="/anyRecordDisplay" component={AnyRecordDisplay}/>

          <Route exact path="/newPatient" component={PatientRegistration} />
          <Route exact path="/newHospital" component={HospitalRegistration} />

          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
