import React, { Component } from 'react'
import { Button, Form} from 'react-bootstrap'
import Navbar from './Navbar'
import Table from './Table'



class CreateTrip extends Component {
    

    render(){
        return(
          <div>
            <Navbar></Navbar>
            <div class="container" style={{marginTop: "30px"}}>
                <Table></Table>

            <Form.Group style={{textAlign: "end"}}>
                <Button href="/DetailCreateTrip" variant="warning" style={{marginRight: "10px"}}>Edit</Button>
                <Button href="/ImitateTrip" variant="dark">Imitate</Button>
            </Form.Group>

            </div>
           
          </div>
        )
    }

}
export default CreateTrip