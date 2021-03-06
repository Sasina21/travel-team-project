import React, { Component } from 'react'
import firebase from '../firebase'
import { Button, Form, Modal} from 'react-bootstrap'
import Navbar from './Navbar'
import TableScheDule from './Table'
import { Link, Redirect } from 'react-router-dom'


class SpecificTrip extends Component {
  constructor(props){
    super(props);
    this.state={
        isSignedIn: false,
        myid: '',
        idCompany:'',
        displayName:'',
        showFormDelete: false,
        showFormTerminate: false,
        alreadyDelete: false,
        idGroup: ''
    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.getInfo = this.getInfo.bind(this)
    this.removeTrip = this.removeTrip.bind(this)
    this.terminateTrip = this.terminateTrip.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChangeDelete = this.handleChangeDelete.bind(this)
    this.handleChangeTerminate = this.handleChangeTerminate.bind(this)
    
};
handleClose() {
  this.setState({ 
    showFormDelete: false ,
    showFormTerminate: false
  });
}

handleChangeDelete(){
  this.setState({ showFormDelete: true });
}

handleChangeTerminate(){
  this.setState({ showFormTerminate: true });
}
componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
  }

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
      displayName: user.email,
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
    // console.log(this.state.displayName)
  }

    removeTrip(){
      let dbGroups = firebase.database().ref('Groups/' + this.props.location.state.idGroup)
      dbGroups.remove()
      let dbTrips = firebase.database().ref('Trips/' + this.props.location.state.idTrip + '/Groups/' + this.props.location.state.idGroup)
      dbTrips.remove()
      let dbGuide = firebase.database().ref('Guides/' + this.state.myid + '/activeTrip/idGroup')
      dbGuide.remove()
      let dbCompany = firebase.database().ref('Companies/00001/activeTrip/' + this.props.location.state.idGroup)
      dbCompany.remove()

      let dbUser = firebase.database().ref('Users/')
      dbUser.once("value")
        .then(snapshot => {
          // console.log(snapshot.val())
          Object.values(snapshot.val()).map((item, index) => {
            console.log(item.activeTrip)
            if(item.activeTrip != null){
              console.log(item.activeTrip.idGroup)
              if(item.activeTrip.idGroup == this.props.location.state.idGroup){
                dbUser.child(item.useruid + '/activeTrip').remove()
              }
            }
        })
      })
      this.setState({
        showFormDelete: false,
        alreadyDelete: true,
      })

    }

    terminateTrip(){
      let dbCompany = firebase.database().ref('Companies/00001/activeTrip/' + this.props.location.state.idGroup)
      dbCompany.remove()
      let dbGuide = firebase.database().ref('Guides/' + this.state.myid)
      dbGuide.child('oldTrip').push({
        idGroup: this.props.location.state.idGroup
      })
      dbGuide.child('activeTrip/idGroup').remove()
    
      let dbUser = firebase.database().ref('Users/')
      dbUser.once("value")
        .then(snapshot => {
          // console.log(snapshot.val())
          Object.values(snapshot.val()).map((item, index) => {
            console.log(item.activeTrip)
            if(item.activeTrip != null){
              console.log(item.activeTrip.idGroup)
              if(item.activeTrip.idGroup == this.props.location.state.idGroup){
                dbUser.child(item.useruid + '/oldTrip').push({
                  idGroup: this.props.location.state.idGroup
                })
                dbUser.child(item.useruid + '/activeTrip/idGroup').remove()
              }
            }
        })
      })
      this.setState({
        showFormTerminate: false,
        alreadyDelete: true,
      })
    }

    goBack(){
      this.props.history.goBack();
    }

    render(){
      console.log('idTrip ' +this.props.location.state.idTrip)
        return(
          <div>
            {
              this.state.idCompany && <Navbar displayName={this.state.displayName}></Navbar>
            }
            <div className="container" style={{marginTop: "30px"}}>
            {
              this.state.idCompany && 
              (<Form.Group style={{textAlign: "end"}}>
              <Button onClick={this.handleChangeDelete} variant="danger" style={{marginRight: "10px"}}>Delete</Button>
              <Button onClick={this.handleChangeTerminate} variant="dark" style={{marginRight: "10px"}}>Terminate</Button>
            </Form.Group>)
            }

            <Form.Group style={{textAlign: "end"}}>
              <Button onClick={() => this.goBack()} variant="dark" style={{marginRight: "10px"}}>Back</Button>
            </Form.Group>
              <TableScheDule fromgroup={this.props.location.state.idGroup} duration={this.props.location.state.duration} idTrip={this.props.location.state.idGroup}></TableScheDule>
              {
                this.state.idCompany && 
                (<Form.Group style={{textAlign: "end"}}>
                <Link to={{
                    pathname:"/DetailCreateTrip",
                    state:{
                      idGroup: this.props.location.state.idGroup ,
                      duration: this.props.location.state.duration,
                      nameTrip: this.props.location.state.nameTrip,
                      country: this.props.location.state.country,
                    }
                    }}>
                    <Button variant="warning" style={{marginRight: "10px"}}>Add More+</Button>
                  </Link>

                  <Link to={{
                    pathname:"/AddMember",
                    state:{
                      idGroup: this.props.location.state.idGroup ,
                    }
                    }}>
                    <Button variant="dark" style={{marginRight: "10px"}}>Add Member</Button>
                  </Link>
              </Form.Group>)
              }
              

            </div>
            {
              this.state.alreadyDelete && <Redirect to={{pathname: '/MyTrips'}}/>
            }
            <Modal show={this.state.showFormDelete} onHide={this.handleClose}>
              <Modal.Header style={{backgroundColor: '#C21807', color: "white"}} closeButton>
                <Modal.Title>Delete this trip ?</Modal.Title>
              </Modal.Header>
              <Modal.Body> Would You like to delete this trip.</Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={this.removeTrip}>
                  Yes
                </Button>
                
              </Modal.Footer>
            </Modal>

            <Modal show={this.state.showFormTerminate} onHide={this.handleClose}>
              <Modal.Header style={{backgroundColor: '#C21807', color: "white"}} closeButton>
                <Modal.Title>Terminate this trip ?</Modal.Title>
              </Modal.Header>
              <Modal.Body> Would You like to terminate this trip.</Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={this.terminateTrip}>
                  Yes
                </Button>
                
              </Modal.Footer>
            </Modal>
          </div>
        )
    }

}
export default SpecificTrip