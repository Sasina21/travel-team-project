import React, { Component } from 'react';
import './App.css';
import { Route , BrowserRouter ,Switch} from 'react-router-dom'
import CreateTrip from './components/CreateTrip'
import Table from './components/Table'
import EditLocation from './components/EditLocation'
import DetailCreateTrip from './components/DetailCreateTrip'
import MyTrips from './components/MyTrips'
import SpecificTrip from './components/SpecificTrip'
import Profile from './components/Profile'
import ImitateTrip from './components/ImitateTrip'
import Login from './components/SignIn'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/MyTrips" component={MyTrips} />
          <Route exact path="/CreateTrip" component={CreateTrip} />
          <Route exact path="/Table" component={Table} />
          <Route exact path="/DetailCreateTrip" component={DetailCreateTrip} />
          <Route exact path="/SpecificTrip" component={SpecificTrip} />
          <Route exact path="/EditLocation" component={EditLocation} />
          <Route exact path="/Profile" component={Profile} />
          <Route exact path="/ImitateTrip" component={ImitateTrip} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
