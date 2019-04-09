import React, { Component } from 'react'
import Navbar from './Navbar'
import { Button, Form, Image, Row, Col} from 'react-bootstrap'
import DatePicker from "react-datepicker";
import { Link } from 'react-router-dom'
import { addDays } from "date-fns";

class ImitateTrip extends Component {
    
    render(){
        return(
            
            <div>
                <Navbar></Navbar>
                <div style={{marginTop: "30px",marginLeft: "70px", marginRight: "50px" }}>
                <Form>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Members' E-mail</Form.Label>
                        <Form.Control type="email" placeholder="e-mail" />
                    </Form.Group>
                        
                    <Button variant="warning" type="submit">
                        Submit
                    </Button>
                </Form>
                </div>
            </div>
        )
    }

}
export default ImitateTrip