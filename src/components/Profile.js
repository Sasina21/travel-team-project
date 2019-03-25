import React, { Component } from 'react'
import Navbar from './Navbar'
import { Button, Form, Col, Row, Card, Image} from 'react-bootstrap'
import DatePicker from "react-datepicker";
import Table from './Table'

class Profile extends Component {

    InsertData(){
        console.log('Data');
    }

    render(){
      
        return(    
            <div>
                <div>
                <Navbar></Navbar>
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
                                <Form.Label>Location</Form.Label>
                                <Form.Control id="location" type="location" placeholder="Where do you want to go ?" />
                            </Form.Group>
                            
                            
                    
                            <Form.Group style={{textAlign: "end"}}>
                                <Button href="/SpecificTrip" variant="dark">Done</Button>
                            </Form.Group>
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