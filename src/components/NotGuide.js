import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form} from 'react-bootstrap'
import firebase from '../firebase'


class NotGuide extends Component {
    render(){
        return(
            <div>
                <Form.Group style={{textAlign: 'center', marginTop: '10%'}}>
                <Form.Text style={{fontSize: '20px'}}> You are not Guide </Form.Text>
                <Link to="/"><Button style={{marginTop: '20px'}} variant="dark" onClick={() => firebase.auth().signOut()}>Sign Out</Button></Link>
                </Form.Group>
            </div>
        )
    }

}
export default NotGuide