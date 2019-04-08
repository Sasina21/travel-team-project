import React, { Component } from 'react'
import { Button, Form} from 'react-bootstrap'
import Navbar from './Navbar'
import TableScheDule from './Table'
import { Link } from 'react-router-dom'


class CreateTrip extends Component {
    

    render(){
      console.log(this.props.location.state.idTrip)
        return(
          <div>
            <Navbar></Navbar>
            <div className="container" style={{marginTop: "30px"}}>
                <TableScheDule duration={this.props.location.state.duration} idTrip={this.props.location.state.idTrip}></TableScheDule>

            <Form.Group style={{textAlign: "end"}}>
                <Link to={{
                  pathname:"/DetailCreateTrip",
                  state:{
                    idTrip: this.props.location.state.idTrip ,
                    duration: this.props.location.state.duration,
                    nameTrip: this.props.location.state.nameTrip,
                    country: this.props.location.state.country,
                  }
                  }}>
                <Button variant="warning" style={{marginRight: "10px"}}>Edit</Button></Link>
                <Link to="/ImitateTrip"><Button variant="dark">Start Trip</Button></Link>
            </Form.Group>

            </div>
           
          </div>
        )
    }

}
export default CreateTrip