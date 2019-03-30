import React, { Component } from 'react'
import firebase from '../firebase'
import Navbar from './Navbar'
import { Button, Card, Form, Row, Col, Badge} from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import { SyncWaterfallHook } from 'tapable';

class MyTrips extends Component {
    constructor(props){
        super(props);
        this.state={
            dataTrip: null,
            isSignedIn: false,
        }
        this.readData = this.readData.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        
    };
    componentWillMount(){
        this.readData()
    }

    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => this.setState({isSignedIn: !!user})
        );
      }

    componentWillUnmount() {
    this.unregisterAuthObserver();
    
    }
    async readData(){
        var rootRef = await firebase.database().ref("Trips/");
        rootRef.once("value")
            .then(snapshot => {
                var key = snapshot.key; // null
                // var childKey = snapshot.child("users/ada").key; // "ada"
                // console.log(Object.values(snapshot.val()))
                this.setState({
                    dataTrip: Object.values(snapshot.val())
                })
            });
    }
    
    render(){
        
        if (this.state.isSignedIn){
            return(
                <div>
                <Navbar/>
                <Row style={{marginTop: "30px",marginLeft: "70px", marginRight: "50px"}}>
                    {
                        this.state.dataTrip && 
                        this.state.dataTrip.map((item, index) => {
                            return (
                            <Col key={index} sm={3}>
                            <Card style={{ width: '18rem' , marginBottom: "25px"}}>
                                <Card.Img style={{maxWidth:"18rem"}} variant="top" src="https://cdn.cnn.com/cnnnext/dam/assets/170606121226-japan---travel-destination---shutterstock-230107657.jpg" />
                                <Card.Body>
                                    <Card.Title >{item.country}</Card.Title>
                                    <Card.Text >{item.duration}</Card.Text>
                                    <Card.Text><Badge variant="secondary">12 March-17 March</Badge></Card.Text>
                                    <Form.Group style={{textAlign: "end"}}>
                                    <Link to="/SpecificTrip"><Button variant="warning">Detail</Button></Link>
                                    </Form.Group>
                                    </Card.Body>
                                </Card>
                            </Col>
                            )
                        })
                    }
                    
                </Row>
            </div>
            )
        }else{
            return(
                <div style={{textAlign: "center", marginTop: "50px"}}>
                 <Link to ="/"><Button variant="warning">Sign In</Button></Link>
                </div>
            )
        }
    }

}
export default MyTrips