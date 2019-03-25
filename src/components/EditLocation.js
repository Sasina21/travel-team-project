import React, { Component } from 'react'
import Navbar from './Navbar'
import { Button, Card, Image, Row, Col, Form} from 'react-bootstrap'
import DatePicker from "react-datepicker";

class EditLocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
          startDate: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
        
      }
     
      handleChange(date) {
        this.setState({
          startDate: date
        });
      }

    render(){
        return(
            
            <div>
                <Navbar></Navbar>
                <div style={{marginTop: "30px",marginLeft: "70px", marginRight: "50px" }}>
                    <Card>
                        <Card.Header as="h5">Name Trip</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col sm={6}>
                                    <div style={{textAlign: "center"}}>
                                        <Image style={{maxWidth: "600px", textAlign: "center"}} src="https://d1kls9wq53whe1.cloudfront.net/articles/17085/ORG/312e6c80ac3bf30134743c243bd4ad25.jpg" fluid />
                                    </div>
                                </Col>

                                <Col sm={6}>
                                <Form.Group>
                                    <Form.Label>Duration</Form.Label>
                                    <Form.Control id="bookDay" as="select">
                                        <option >1 Day</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                    </Form.Control>
                                </Form.Group>


                                <Form.Group >
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control id="location" type="location" placeholder="Where do you want to go ?" />
                                </Form.Group>
                                
                                <Form.Group>
                                    <Form.Label>Time</Form.Label><br/>
                                    <Form inline><DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleChange}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={30}
                                    dateFormat="h:mm aa"
                                    timeCaption="Time"
                                    />
                                    <Form.Text style={{paddingLeft: "10px", paddingRight: "10px"}}>to</Form.Text>
                                    <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleChange}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={30}
                                    dateFormat="h:mm aa"
                                    timeCaption="Time"
                                    />
                                    </Form>
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
        )
    }

}
export default EditLocation