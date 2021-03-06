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
        myid: '',
        idCompany: '',
      };
    
    this.componentDidMount = this.componentDidMount.bind(this)
    this.getInfo = this.getInfo.bind(this)
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

  componentWillUpdate(nextProps, nextState){
    if (nextState.isSignedIn === true && this.state.isSignedIn === false) {
      this.getInfo()
    }
  }

  async getInfo(){
    var user = firebase.auth().currentUser;
    this.setState({
      myid: user.uid,
    })
    var id_company= await firebase.database().ref("Guides/" + user.uid );
    id_company.once("value")
          .then(snapshot => {
            if(snapshot.val() != null){
              this.setState({
                  idCompany: snapshot.val().Id_company
                })
            }
          });
  }
  
  render() 

  {
    if (!this.state.isSignedIn ) {
      return (
        <div >
          <body style={{backgroundColor: "#ffca28",  height: '100vh'}} >
          <Jumbotron style={{backgroundColor: "#ffca28"}} fluid>
            <Container style={{textAlign: "center"}}>
            <FaSignature size="100px" ></FaSignature>
              <h1 style={{paddingTop: "30px"}}>TRAVEL  IS  LIFE</h1>
              <p>
                Let's create the life you love.
              </p>
            </Container>
          </Jumbotron>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
          </body>
        </div>
      );
    }
    // setTimeout(() =>{
    //   this.setState({
    //     timeOut: true
    //   })
    // },500)
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