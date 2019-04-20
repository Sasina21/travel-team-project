import React, { Component } from 'react'
import firebase from '../firebase'
import Navbar from './Navbar'
import { Button, Card, Form, Row, Col, Badge, Nav, Carousel} from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
// import { SyncWaterfallHook } from 'tapable';

class Main extends Component {
    constructor(props){
        super(props);
        this.state={
            dataTrip: null,
            alreadyReaddata: false,
            detailActiveTrip: '',
            alreadyReadActive: false,
            startDate: '',

        }
        this.readData = this.readData.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        
    };

    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => this.setState({isSignedIn: !!user})
        );
      }

    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    async readData(){
        // console.log('read data')
        var rootRef = await firebase.database().ref("Companies/00001/activeTrip");
        rootRef.once("value")
            .then(snapshot => {
                // var key = snapshot.key; // null
                // var childKey = snapshot.child("users/ada").key; // "ada"
                // console.log(Object.values(snapshot.val()))
                if(snapshot.val() != null){
                    this.setState({
                        dataTrip: Object.values(snapshot.val()),
                        alreadyReaddata: true,
                    })   
                }
            });
        
    }


    componentWillUpdate(nextProps, nextState){
        if (nextState.isSignedIn === true && this.state.isSignedIn === false) {
          return true
        }else{
            return true
        }
      }
    
    
    render(){
        if( !this.state.alreadyReaddata){
            this.readData()
            
        }
        if (this.state.alreadyReaddata){
            return(
                <div>
                    <Carousel style={{marginLeft: '150px', marginRight: '150px', marginTop: '50px'}} >
                       <Carousel.Item>
                       <img
                           className="d-block w-100"
                           src="https://firebasestorage.googleapis.com/v0/b/project-190f0.appspot.com/o/Screen%20Shot%202562-04-20%20at%2022.37.45.png?alt=media&token=798b074a-168f-4175-8f67-df617774b6ed"
                           alt="First slide"
                       />
                       </Carousel.Item>
                       <Carousel.Item>
                       <img
                           className="d-block w-100"
                           src="https://firebasestorage.googleapis.com/v0/b/project-190f0.appspot.com/o/Screen%20Shot%202562-04-20%20at%2022.31.25.png?alt=media&token=c7126272-58f4-494e-90f0-37cd5aa84519"
                           alt="Secound slide"
                       />

                       </Carousel.Item>
                       <Carousel.Item>
                       <img
                           className="d-block w-100"
                           src="https://firebasestorage.googleapis.com/v0/b/project-190f0.appspot.com/o/Screen%20Shot%202562-04-20%20at%2022.37.45.png?alt=media&token=798b074a-168f-4175-8f67-df617774b6ed"
                           alt="Third slide"
                       />
                       </Carousel.Item>
                   </Carousel>

                   <Nav style={{marginLeft: '150px', marginRight: '150px', marginTop: '50px'}} >
                        <Nav.Item>
                            <Nav.Link href="/">วิธีจองทัวร์</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/">ติดต่อเรา</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/Login">Guide SignIn</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Row style={{marginTop: "30px",marginLeft: "70px", marginRight: "50px"}}>
                       {
                           this.state.dataTrip && this.state.dataTrip.map((item, index) => {
                               console.log(item.duration)
                               return (
                               <Col key={index} sm={3}>
                               <Card style={{ width: '18rem' , height: "25rem" , marginBottom: "25px"}}>
                                   <Card.Img style={{maxWidth:"18rem" ,height: "50%"}} variant="top" src={item.picfirst} />
                                   <Card.Body>
                                       <Card.Title >{item.nameTrip}</Card.Title>
                                       <Card.Text style={{fontSize: "14px"}} >{item.country}</Card.Text>
                                       <Card.Text style={{fontSize: "14px"}} >Duration: {item.duration}</Card.Text>
                                       <Card.Text><Badge variant="secondary">start date {item.startDate}</Badge></Card.Text>
                                       <Form.Group style={{textAlign: "end"}}>
                                       <Link to={{
                                           pathname: "/ActiveSpecificTrip",
                                           state: {
                                               idGroup: item.idGroup,
                                               duration: item.duration,
                                               nameTrip: item.nameTrip,
                                               country: item.country,
                                               idTrip: item.idTrip,
                                           }
                                           }}>
                                           <Button variant="warning">Detail</Button></Link>
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
                
                </div>
            )
        }
    }

}
export default Main