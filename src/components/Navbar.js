import React, { Component } from 'react'
import firebase from '../firebase'
import { Link } from 'react-router-dom'
import { Button, Navbar, Nav, Form} from 'react-bootstrap'
import { FaSignature} from "react-icons/fa";

class NavbarTemplate extends Component {

    render(){
        // console.log('state from nav ' + this.props.isSignedIn)
        return(
            <div>
                <Navbar bg="warning" expand="lg" >
                    <FaSignature style={{paddingRight: "5px"}} size="35px"/>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to="/MyTrips"><Navbar.Text style={{paddingRight: "10px"}}> My Trips</Navbar.Text></Link>
                            <Link to="/CreateTrip"><Navbar.Text style={{paddingRight: "10px"}}> Create New Trip</Navbar.Text></Link>
                            {/* <Nav.Link href="/MyTrips" style={{paddingRight: "10px"}}>My Trips</Nav.Link> */}
                            {/* <Nav.Link href="/CreateTrip">Create New Trip</Nav.Link> */}
                        </Nav>
                        <Form inline>
                        <Navbar.Text style={{paddingRight: "10px"}}><a href="/Profile">Mark Otto</a></Navbar.Text>
                        <Link to="/"><Button variant="dark" onClick={() => firebase.auth().signOut()}>Sign Out</Button></Link>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                {/* {this.currentUser()} */}
            </div>
        )
    }

}
export default NavbarTemplate