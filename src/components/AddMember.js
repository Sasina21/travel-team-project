import React, { Component } from 'react'
import firebase from '../firebase'
import Navbar from './Navbar'
import { Button, Form, Card, ListGroup, Modal} from 'react-bootstrap'

class ImitateTrip extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isSignedIn: false,
          myid: '',
          idCompany:'',
          nameCompany:'',
          displayName:'',
          idGroup:'',
          members:null,
          readyToRead: false,
          noUserShow: false,
        };
        this.componentDidMount = this.componentDidMount.bind(this)
        this.componentWillMount = this.componentWillMount.bind(this)
        this.getInfo = this.getInfo.bind(this) 
        this.insertDataTrip = this.insertDataTrip.bind(this)
        this.readMember = this.readMember.bind(this)
        this.deleteMember= this.deleteMember.bind(this)
        this.handleClose = this.handleClose.bind(this)
      }

      handleClose() {
        this.setState({ 
          noUserShow: false
        });
      }

    componentWillMount(){
      this.readMember()
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
              this.setState({
                idCompany: snapshot.val().Id_company,
              })
              var namecompany= firebase.database().ref("Companies/" + this.state.idCompany +'/name' );
              namecompany.once("value")
              .then(snapshot => {
                  this.setState({
                      nameCompany: snapshot.val()
                  })
              })
            });
      // console.log(this.state.displayName)
    }
      
    async insertDataTrip(){
      var emailMember =  await document.getElementById('emailMember').value
      let dbUser = firebase.database().ref('Users/')
      dbUser.once("value")
        .then(snapshot => {
          console.log(Object.values(snapshot.val()))
          Object.values(snapshot.val()).map((item, index) => {
            if(item.email == emailMember){
              console.log(item.email)
              dbUser.child(item.useruid + '/activeTrip').update({
                idGroup: this.props.location.state.idGroup
              })
              let dbGroup = firebase.database().ref('Groups/' + this.props.location.state.idGroup + '/members')
              var idPushMem = dbGroup.push({
                useruid: item.useruid,
                email: emailMember
              }).key
              dbGroup.child(idPushMem).update({
                idPushMem: idPushMem
              })
            }
            // else if(index >= Object.values(snapshot.val()).length-1){
            //   this.setState({
            //     noUserShow: true
            //   })
            // }
          })
        })
        this.readMember()
      document.getElementById("myForm").reset();
    }

  
    async readMember(){
      let dbGroup = firebase.database().ref('Groups/' + this.props.location.state.idGroup + '/members')
      dbGroup.once("value")
        .then(snapshot => {
          if(snapshot.val() != null){
            this.setState({
              members: Object.values(snapshot.val())
            })
            console.log(this.state.members)
          }
        })
    }

    deleteMember(idPushMem, idUser){
      let dbGroup = firebase.database().ref('Groups/' + this.props.location.state.idGroup + '/members/' + idPushMem)
      dbGroup.remove()

      let dbUser = firebase.database().ref('Users/' + idUser +  '/activeTrip')
      dbUser.remove()

      this.readMember()
    }
    
    
    render(){
        console.log(this.state.idCompany)
        return(
            <div>
                <Navbar></Navbar>
                <div style={{marginTop: "30px",marginLeft: "70px", marginRight: "50px" }}>
                <Form id='myForm'>
                    <Form.Group >
                        <Form.Label>Members' E-mail</Form.Label>
                        <Form.Control autoComplete='off' id='emailMember' type="email" placeholder="e-mail" />
                    </Form.Group>
                </Form>
                <Button onClick={this.insertDataTrip} variant="warning" >Submit</Button>

                <Card style={{ marginTop: '20px' }}>
                  <ListGroup variant="flush">
                  {
                    this.state.members && this.state.members.map((item, index) => {
                      // this.state.readytoDelete && this.deleteMember(item.idPushMem, item.idUser)
                      return(
                        <ListGroup.Item><Button onClick={() => this.deleteMember(item.idPushMem, item.useruid)} variant="danger" >Delete</Button> {item.email}</ListGroup.Item>
                      )
                      
                    })
                    
                  }
                  </ListGroup>
                </Card>
                </div>
                <Modal show={this.state.noUserShow} onHide={this.handleClose}>
                  <Modal.Header style={{backgroundColor: '#C21807', color: "white"}} closeButton>
                    <Modal.Title>No E-mail</Modal.Title>
                  </Modal.Header>
                  <Modal.Body> This email address is not registered </Modal.Body>
                  <Modal.Footer>
                    <Button variant="danger" onClick={this.handleClose}>
                      OK
                    </Button>
                    
                  </Modal.Footer>
                </Modal>
            </div>
        )
    }

}
export default ImitateTrip