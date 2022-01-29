import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { 
  LandingPage,
  Login,
  AdminDashboard,
  HospitalDashboard,
  PatientDashboard,
} from './pages';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage}/>
                    
          <Route exact path="/adminDashboard" component={AdminDashboard} />
          <Route exact path="/hospitalDashboard" component={HospitalDashboard} />
          <Route exact path="/patientDashboard" component={PatientDashboard} />

          <Route exact path="/login" component={Login}/>

          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
