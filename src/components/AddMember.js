import React, { Component } from 'react'
import firebase from '../firebase'
import Navbar from './Navbar'
import { Button, Form, Image, Row, Col} from 'react-bootstrap'

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
          readyToRead: false
        };
        this.componentDidMount = this.componentDidMount.bind(this)
        this.getInfo = this.getInfo.bind(this) 
        this.insertDataTrip = this.insertDataTrip.bind(this)
        this.readMember = this.readMember.bind(this)
      }
    componentWillMount(){
        let dbCon = firebase.database().ref('Users/' + this.props.location.state.idGroup)
         dbCon.once("value")
            .then(snapshot => {
                if(snapshot.val() != null){
                    this.setState({
                        members: snapshot.val().member,
                    })
                    console.log(this.state.members)
                }
            })
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
      let dbCon = firebase.database().ref('Users/' + this.props.location.state.idGroup)
       dbCon.update({
        idGroup: this.props.location.state.idGroup
      })
      dbCon.child('/member').push({
        email: emailMember
      })
      this.setState({
          readyToRead: true
      })
      document.getElementById("myForm").reset();
    }

    async readMember(){
        let dbCon = firebase.database().ref('Users/' + this.props.location.state.idGroup)
         dbCon.once("value")
            .then(snapshot => {
                this.setState({
                    members: snapshot.val().member,
                })
                console.log(this.state.members)
            })
        
      }
    
    
    render(){
        // console.log('idGroup' +this.props.location.state.idGroup)
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
                </div>
            </div>
        )
    }

}
export default ImitateTrip