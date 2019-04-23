import React, { Component } from 'react'
import { Button, Form, Image} from 'react-bootstrap'
// import { SyncWaterfallHook } from 'tapable';

class MyTrips extends Component {
    goBack(){
        this.props.history.goBack();
      }
    render(){
        return(
            <div>
            <Form style={{margin: '100px'}} >
                <Form.Label style={{display: 'block'}}>add Line @travelteam(มี@)</Form.Label>
                <Form.Label style={{display: 'block'}}>เบอร์ติดต่อ 0897064093</Form.Label>
                
                <Form.Group style={{textAlign: "end"}}>
                    <Button onClick={() => this.goBack()} variant="dark" style={{marginRight: "20px", marginTop: '10px'}}>Back</Button>
                </Form.Group>
            </Form>

            
            </div>
        )
        
    }

}
export default MyTrips