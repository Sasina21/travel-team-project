import React, { Component } from 'react'
import { Button, Form} from 'react-bootstrap'
import Navbar from './Navbar'
import Table from './Table'
import { Link } from 'react-router-dom'


class CreateTrip extends Component {
    

    render(){
        return(
          <div>
            <Navbar></Navbar>
            <div class="container" style={{marginTop: "30px"}}>
                <Table></Table>

            <Form.Group style={{textAlign: "end"}}>
                <Link to="/DeatailCreateTrip"><Button variant="warning" style={{marginRight: "10px"}}>Edit</Button></Link>
                <Link to="/ImitateTrip"><Button variant="dark">Start Trip</Button></Link>
            </Form.Group>

            </div>
           
          </div>
        )
    }

}
export default CreateTrip