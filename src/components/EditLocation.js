import React, { Component } from 'react'
import Navbar from './Navbar'
import { Button, Card, Image, Row, Col, Form} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import firebase from '../firebase'

class EditLocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
        //   alreadyDelete: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.goBack = this.goBack.bind(this);
        this.removeTrip = this.removeTrip.bind(this)
      }
     
      handleChange(date) {
        this.setState({
          startDate: date
        });
      }

    goBack(){
        this.props.history.goBack();
    }

    removeTrip(){
        if(this.props.location.state.fromgroup){
            console.log(this.props.location.state.dataTripOnLocation.idTripDetail)
            let dbGroups = firebase.database().ref('Groups/' + this.props.location.state.idTrip + '/Detail/' + this.props.location.state.dataTripOnLocation.idTripDetail)
            dbGroups.remove()
            // this.setState({
            //     alreadyDelete: true
            // })
        }else{
            console.log(this.props.location.state.dataTripOnLocation.idTripDetail)
            let dbTrips = firebase.database().ref('Trips/' + this.props.location.state.idTrip + '/Detail/' + this.props.location.state.dataTripOnLocation.idTripDetail)
            dbTrips.remove()
            // this.setState({
            //     alreadyDelete: true
            // })
        }
        
        this.goBack()
        // this.setState({
        //   showFormDelete: false,
        //   alreadyDelete: true,
        // })
  
      }

    render(){
        return(
            
            <div>
                <Navbar></Navbar>
                <div style={{marginTop: "30px",marginLeft: "70px", marginRight: "50px" }}>
                    <Card>
                        <Card.Header as="h5">{this.props.location.state.dataTripOnLocation.location}</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col sm={6}>
                                    <div style={{textAlign: "center"}}>
                                        <Image style={{maxWidth: "600px", textAlign: "center"}} src={this.props.location.state.dataTripOnLocation.picture} fluid />
                                    </div>
                                </Col>

                                <Col sm={6}>
                                <Form.Group>
                                    <Form.Label>Day {this.props.location.state.dataTripOnLocation.bookDay}</Form.Label>
                                </Form.Group>
                                
                                <Form.Group>
                                    <Form.Label>Start time : {this.props.location.state.dataTripOnLocation.startTime}</Form.Label>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>End time : {this.props.location.state.dataTripOnLocation.endTime}</Form.Label>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>Description : {this.props.location.state.dataTripOnLocation.description}</Form.Label>
                                </Form.Group>
                        
                                <Form.Group style={{textAlign: "end"}}>
                                    <Button onClick={this.removeTrip} variant="danger" style={{marginRight: "10px"}}>Delete</Button>
                                    <Button onClick={this.goBack} variant="dark" style={{marginRight: "10px"}}>Back</Button>
                                </Form.Group>
                                {/* {this.state.alreadyDelete && this.goBack()} */}
                                </Col>
                            </Row>
                            
                        </Card.Body>
                    </Card>

                </div>
            </div>
        )
    }

}
export default EditLocation