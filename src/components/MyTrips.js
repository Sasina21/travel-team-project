import React, { Component } from 'react'
import Navbar from './Navbar'
import { Button, Card, Form, Row, Col, Badge} from 'react-bootstrap'

class MyTrips extends Component {
    // constructor(props){
    //     super(props);
    //     this.state={
    //         isSignedIn : '',
    //     }
    // };

    render(){
        // console.log('my trips' +this.props.location.state.isSignedIn)
        return(
            
            <div>
                <Navbar></Navbar>
                <div style={{marginTop: "30px",marginLeft: "70px", marginRight: "50px" }}>
                <Row>
                    <Col sm={3}>
                        <Card style={{ width: '18rem' , marginBottom: "25px"}}>
                            <Card.Img style={{maxWidth:"18rem"}} variant="top" src="https://cdn.cnn.com/cnnnext/dam/assets/170606121226-japan---travel-destination---shutterstock-230107657.jpg" />
                            <Card.Body>
                                <Card.Title>Japan</Card.Title>
                                <Card.Text>3 Days</Card.Text>
                                <Card.Text><Badge variant="secondary">12 March-17 March</Badge></Card.Text>
                                <Form.Group style={{textAlign: "end"}}>
                                  <Button href="/SpecificTrip" variant="warning">Detail</Button>
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>

                    
                </Row>
                
                
                <Row>
                    <Col sm={3}>
                        <Card style={{ width: '18rem' , marginBottom: "25px"}}>
                            <Card.Img style={{maxWidth:"18rem"}} variant="top" src="https://cdn.cnn.com/cnnnext/dam/assets/170606121226-japan---travel-destination---shutterstock-230107657.jpg" />
                            <Card.Body>
                                <Card.Title>Japan</Card.Title>
                                <Card.Text>3 Days</Card.Text>
                                <Form.Group style={{textAlign: "end"}}>
                                    <Button href="/SpecificTrip" variant="dark">Detail</Button>
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    <Col sm={3}>
                        <Card style={{ width: '18rem' , marginBottom: "25px"}}>
                            <Card.Img style={{maxWidth:"18rem"}} variant="top" src="https://cdn.cnn.com/cnnnext/dam/assets/170606121226-japan---travel-destination---shutterstock-230107657.jpg" />
                            <Card.Body>
                                <Card.Title>Japan</Card.Title>
                                <Card.Text>3 Days</Card.Text>
                                <Form.Group style={{textAlign: "end"}}>
                                    <Button href="/SpecificTrip" variant="dark">Detail</Button>
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col sm={3}>
                        <Card style={{ width: '18rem' , marginBottom: "25px"}}>
                            <Card.Img style={{maxWidth:"18rem"}} variant="top" src="https://cdn.cnn.com/cnnnext/dam/assets/170606121226-japan---travel-destination---shutterstock-230107657.jpg" />
                            <Card.Body>
                                <Card.Title>Japan</Card.Title>
                                <Card.Text>3 Days</Card.Text>
                                <Form.Group style={{textAlign: "end"}}>
                                    <Button href="/SpecificTrip" variant="dark">Detail</Button>
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col sm={3}>
                        <Card style={{ width: '18rem' , marginBottom: "25px"}}>
                            <Card.Img style={{maxWidth:"18rem"}} variant="top" src="https://cdn.cnn.com/cnnnext/dam/assets/170606121226-japan---travel-destination---shutterstock-230107657.jpg" />
                            <Card.Body>
                                <Card.Title>Japan</Card.Title>
                                <Card.Text>3 Days</Card.Text>
                                <Form.Group style={{textAlign: "end"}}>
                                    <Button href="/SpecificTrip" variant="dark">Detail</Button>
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col sm={3}>
                        <Card style={{ width: '18rem' , marginBottom: "25px"}}>
                            <Card.Img style={{maxWidth:"18rem"}} variant="top" src="https://cdn.cnn.com/cnnnext/dam/assets/170606121226-japan---travel-destination---shutterstock-230107657.jpg" />
                            <Card.Body>
                                <Card.Title>Japan</Card.Title>
                                <Card.Text>3 Days</Card.Text>
                                <Form.Group style={{textAlign: "end"}}>
                                    <Button href="/SpecificTrip" variant="dark">Detail</Button>
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                </Row>
                
                

                </div>
            </div>
        )
    }

}
export default MyTrips