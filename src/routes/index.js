import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';
import SignInForm from '../components/SignInForm';
import Interventions from '../components/Interventions';
import Redflags from '../components/Redflags';
import Landing from '../components/Landing';
import DisplayItem from '../components/Redflags';
import CreateIncident from '../components/CreateIncident';


const Routes = () => (
  <Switch>
    <Route exact path="/gh" component={Landing} />
    <Route exact path="/display" component={DisplayItem} />
    <Route exact path="/" component={SignInForm} />
    <Route exact path="/signup" component={SignUpForm} />
    <Route exact path="/interventions" component={Interventions} />
    <Route exact path="/redflags" component={Redflags} />
    <Route exact path="/create" component={CreateIncident} />
  </Switch>
);

export default Routes;