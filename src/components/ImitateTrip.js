import React, { Component } from 'react'
import Navbar from './Navbar'
import { Button, Form, Image, Row, Col} from 'react-bootstrap'
import DatePicker from "react-datepicker";
import { Link } from 'react-router-dom'

class ImitateTrip extends Component {

    render(){
        return(
            
            <div>
                <Navbar></Navbar>
                <div style={{marginTop: "30px",marginLeft: "70px", marginRight: "50px" }}>
                <Form>
                    <Form.Group >
                        <Form.Label style={{display: "block"}}>Start date</Form.Label>
                        <DatePicker placeholderText="Click to select a date" />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label style={{display: "block"}}>End date</Form.Label>
                        <DatePicker placeholderText="Click to select a date" />
                        {/* โชว์สิ่งที่คิดให้แล้ว จากการบวก duration */}
                    </Form.Group>
                    
                    <Link to="/MyTrips"><Button variant="dark" type="submit">Done</Button></Link>
                    {/* ขึ้น Alert ว่าพิมเสร็จแล้ว  */}
                </Form>
                </div>
            </div>
        )
    }

}
export default ImitateTrip