import React, { Component } from 'react';
import './App.css';
import { Route , BrowserRouter ,Switch} from 'react-router-dom'
import CreateTrip from './components/CreateTrip'
import Table from './components/Table'
import EditLocation from './components/EditLocation'
import DetailCreateTrip from './components/DetailCreateTrip'
import MyTrips from './components/MyTrips'
import SpecificTrip from './components/SpecificTrip'
import ActiveSpecificTrip from './components/ActiveSpecificTrip'
import Profile from './components/Profile'
import ImitateTrip from './components/ImitateTrip'
import Login from './components/SignIn'
import NotGuide from './components/NotGuide'
import AddMember from './components/AddMember'
import Main from './components/Main'
import Howtobook from './components/Howtobook'
import ContactUs from './components/ContactUs'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/MyTrips" component={MyTrips} />
          <Route exact path="/CreateTrip" component={CreateTrip} />
          <Route exact path="/Table" component={Table} />
          <Route exact path="/DetailCreateTrip" component={DetailCreateTrip} />
          <Route exact path="/SpecificTrip" component={SpecificTrip} />
          <Route exact path="/ActiveSpecificTrip" component={ActiveSpecificTrip} />
          <Route exact path="/EditLocation" component={EditLocation} />
          <Route exact path="/Profile" component={Profile} />
          <Route exact path="/ImitateTrip" component={ImitateTrip} />
          <Route exact path="/NotGuide" component={NotGuide} />
          <Route exact path="/AddMember" component={AddMember} />
          <Route exact path="/Howtobook" component={Howtobook} />
          <Route exact path="/ContactUs" component={ContactUs} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
