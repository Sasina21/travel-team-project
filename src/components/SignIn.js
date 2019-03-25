import React from 'react'
import { Redirect } from 'react-router-dom';
import { Jumbotron, Container} from 'react-bootstrap'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from '../firebase'
import { FaSignature} from "react-icons/fa";
// import Navbar from './Navbar'
// Configure Firebase.

class SignInScreen extends React.Component {

  // The component's Local state.
  constructor(props){
    super(props)
      this.state={
        isSignedIn: false,
      };
    
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  // state = {
  //   isSignedIn: false // Local signed-in state.
  // };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // Whether the display name should be displayed in the Sign Up page.
        requireDisplayName: true
      },
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }

  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
    
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <body style={{backgroundColor: "#ffca28" }} >
          <Jumbotron style={{backgroundColor: "#ffca28"}} fluid>
            <Container style={{textAlign: "center"}}>
            <FaSignature size="100px" ></FaSignature>
              <h1 style={{paddingTop: "30px"}}>TRAVEL  IS  LIFE</h1>
              <p>
                Let's create the life you love.
              </p>
            </Container>
          </Jumbotron>;
          {/* <Navbar isSignedIn={this.state.isSignedIn}></Navbar> */}
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
          </body>
        </div>
      );
    }
    return (
      <div>
        <Redirect to={{
          pathname: "/MyTrips",
        }} />
      </div>
    );
  }
}
export default SignInScreen