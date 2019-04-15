import React, { Component } from 'react'
import firebase from '../firebase'
import Navbar from './Navbar'
import { Button, Card, Form, Row, Col, Badge} from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
// import { SyncWaterfallHook } from 'tapable';

class MyTrips extends Component {
    constructor(props){
        super(props);
        this.state={
            dataTrip: null,
            isSignedIn: false,
            myid: '',
            idCompany:'',
            displayName:'',
            alreadyReaddata: false,
            detailActiveTrip: '',
            alreadyReadActive: false,
            startDate: '',
            idActiveTrip: '',
            idActiveGroup: '',
            picActiveTrip: '',
        }
        this.readData = this.readData.bind(this)
        this.readActiveTrip = this.readActiveTrip.bind(this)
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

    async readData(){
        // console.log('read data')
        if(this.state.idCompany !== ''){
            var rootRef = await firebase.database().ref("Companies/" + this.state.idCompany + '/Trips');
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
        
    }

    async readActiveTrip(){
        // console.log('read data')
        if(this.state.idCompany !== ''){
            var rootRef = await firebase.database().ref("Guides/" + this.state.myid + '/activeTrip/idGroup');
        rootRef.once("value")
            .then(snapshot => {
                // var key = snapshot.key; // null
                // var childKey = snapshot.child("users/ada").key; // "ada"
                // console.log(Object.values(snapshot.val()))
                if(snapshot.val() != null){
                    this.setState({
                        idActiveGroup: snapshot.val()
                    })
                    console.log('idGroup '+ snapshot.val())
                    var myActive = firebase.database().ref("Groups/" + snapshot.val());
                    myActive.once("value")
                        .then(snapshot => {
                            console.log( snapshot.val().startDate)
                            this.setState({
                                // startDate: snapshot.val().startDate,
                                // idActiveTrip: snapshot.val().idTrip,
                                detailActiveTrip: snapshot.val(),
                                alreadyReadActive: true,
                            })
                            var dbCompany = firebase.database().ref("/Companies/" + this.state.idCompany + '/Trips/' + snapshot.val().idTrip + '/picfirst')
                            dbCompany.once("value")
                                .then(snapshot => {
                                    this.setState({
                                        picActiveTrip: snapshot.val()
                                    })
                                    console.log('pic' + this.state.picActiveTrip)
                                })
                        
                            // var detailTrip = firebase.database().ref("Groups/" + snapshot.val().idGroup);
                            // detailTrip.once("value")
                            //     .then(snapshot => {
                            //         console.log(Object.values(snapshot.val()))
                            //         this.setState({
                            //             detailActiveTrip: snapshot.val(),
                            //             alreadyReadActive: true,
                            //         })
                            //     })
                        }) 
                }
            });
        }
        
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
                  if(snapshot.val() != null){
                    this.setState({
                        idCompany: snapshot.val().Id_company
                      })
                  }
              });
        // console.log(this.state.displayName)
      }
    
    render(){
        if( !this.state.alreadyReaddata && !this.state.alreadyReadActive){
            this.readData()
            this.readActiveTrip()
        }
        if (this.state.isSignedIn && this.state.idCompany){
            return(
                <div>
                <Navbar displayName = {this.state.displayName} />
                {
                        this.state.detailActiveTrip.nameTrip && (
                        <Row style={{marginTop: "30px",marginLeft: "70px", marginRight: "50px"}}>   
                        <Col sm={3}>
                        <Card style={{ width: '18rem' , marginBottom: "25px"}}>
                            <Card.Img style={{maxWidth:"18rem"}} variant="top" src={this.state.picActiveTrip} />
                            <Card.Body>
                                <Card.Title >{this.state.detailActiveTrip.nameTrip}</Card.Title>
                                <Card.Text style={{fontSize: "14px"}} >{this.state.detailActiveTrip.country}</Card.Text>
                                <Card.Text style={{fontSize: "14px"}} >duration {this.state.detailActiveTrip.duration}</Card.Text>
                                <Card.Text><Badge variant="secondary">start date {this.state.detailActiveTrip.startDate}</Badge></Card.Text>
                                <Form.Group style={{textAlign: "end"}}>
                                <Link to={{
                                        pathname: "/ActiveSpecificTrip",
                                        state: {
                                            idTrip: this.state.idActiveTrip,
                                            duration: this.state.detailActiveTrip.duration,
                                            nameTrip: this.state.detailActiveTrip.nameTrip,
                                            country: this.state.detailActiveTrip.country,
                                            idGroup: this.state.idActiveGroup,
                                        }
                                        }}><Button variant="warning">Detail</Button></Link>
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    </Row>
                    )
                    }
                
                <hr/>


                <Row style={{marginTop: "30px",marginLeft: "70px", marginRight: "50px"}}>
                    {
                        this.state.dataTrip && 
                        this.state.dataTrip.map((item, index) => {
                            return (
                            <Col key={index} sm={3}>
                            <Card style={{ width: '18rem' , height: "25rem" , marginBottom: "25px"}}>
                                <Card.Img style={{maxWidth:"18rem" ,height: "50%"}} variant="top" src={item.picfirst} />
                                <Card.Body>
                                    <Card.Title >{item.nameTrip}</Card.Title>
                                    <Card.Text style={{fontSize: "14px"}} >{item.country}</Card.Text>
                                    <Card.Text style={{fontSize: "14px"}} >Duration: {item.duration}</Card.Text>
                                    <Form.Group style={{textAlign: "end"}}>
                                    <Link to={{
                                        pathname: "/SpecificTrip",
                                        state: {
                                            idTrip: item.idTrip,
                                            duration: item.duration,
                                            nameTrip: item.nameTrip,
                                            country: item.country
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
        }else if(!this.state.isSignedIn){
            return(
                <div style={{textAlign: "center", marginTop: "50px"}}>
                 <Link to ="/"><Button variant="warning">Sign In</Button></Link>
                </div>
            )
        }else {
            return(
            <div>
                <Form.Group style={{textAlign: 'center', marginTop: '10%'}}>
                    <Form.Text style={{fontSize: '20px'}}> You are not Guide </Form.Text>
                    <Link to="/"><Button style={{marginTop: '20px'}} variant="dark" onClick={() => firebase.auth().signOut()}>Sign Out</Button></Link>
                </Form.Group>
            </div>
            )
        }
    }

}
export default MyTrips