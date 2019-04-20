import React, { Component } from 'react'
import Navbar from './Navbar'
import firebase from '../firebase'
import { Button, Form, Col, Row, Card, Image} from 'react-bootstrap'

class Profile extends Component {

    constructor(props){
        super(props);
        this.state={
            isSignedIn: false,
            myid: '',
            idCompany:'',
            nameCompany:'',
            displayName:'',
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.getInfo = this.getInfo.bind(this) 
    };

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
      
    render(){
      
        return(    
            <div>
                <div>
                <Navbar displayName={this.state.displayName}></Navbar>
                <div style={{marginTop: "30px",marginLeft: "70px", marginRight: "50px" }}>
                    <Card>
                    <Card.Header as="h5">Name Trip</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col sm={4}>
                                <div style={{textAlign: "center"}}>
                                <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2V-nyJgsaW7fv_aYJSfeFrdvWoZPu6QUXXOqpzeeuzJQjf5ZE" roundedCircle />
                                </div>
                            </Col>

                            <Col sm={6}>
                            <Form.Group >
                                <Form.Text>{this.state.displayName}</Form.Text>
                                <Form.Text >{this.state.nameCompany}</Form.Text>
                            </Form.Group>

                            {/* <Form.Group >
                                <Form.Label>Location</Form.Label>
                                <Form.Control id="location" type="location" placeholder="Where do you want to go ?" />
                            </Form.Group> */}
                            
                            </Col>
                        </Row>
                        
                    </Card.Body>
                </Card>
            </div>
        </div>
        </div>
        )
    }

}
export default Profile