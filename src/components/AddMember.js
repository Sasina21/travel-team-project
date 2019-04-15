import React, { Component } from 'react'
import firebase from '../firebase'
import Navbar from './Navbar'
import { Button, Form, Card, ListGroup, Col} from 'react-bootstrap'

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
        };
        this.componentDidMount = this.componentDidMount.bind(this)
        this.componentWillMount = this.componentWillMount.bind(this)
        this.getInfo = this.getInfo.bind(this) 
        this.insertDataTrip = this.insertDataTrip.bind(this)
        this.readMember = this.readMember.bind(this)
        this.deleteMember= this.deleteMember.bind(this)
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
        displayName: user.displayName,
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
        // console.log(this.readMember)
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
                      return(
                        <ListGroup.Item><Button  variant="danger" >Delete</Button> {item.email}</ListGroup.Item>
                      )
                    })
                  }
                  </ListGroup>
                </Card>
                </div>
            </div>
        )
    }

}
export default ImitateTrip