import React, { Component } from 'react'
import firebase from '../firebase'
import Navbar from './Navbar'
import { Button, Form, Image, Row, Col} from 'react-bootstrap'
import DatePicker from "react-datepicker";
import { Link } from 'react-router-dom'
import { addDays } from "date-fns";

class ImitateTrip extends Component {
    constructor(props) {
        super(props);
        this.state = {
          startDate: new Date(),
          isSignedIn: false,
          myid: '',
          idCompany:'',
          nameCompany:'',
          displayName:'',
        };
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this)
        this.getInfo = this.getInfo.bind(this) 
      }
    
      handleChange(date) {
        this.setState({
          startDate: date
        });
      }

    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => this.setState({isSignedIn: !!user})
        );
      }

    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    componentWillUpdate(nextProps, nextState){
        if (nextState.isSignedIn === true && this.state.isSignedIn === false) {
          this.getInfo()
        }
      }

      async getInfo(){
        var user = firebase.auth().currentUser;
        this.setState({
          myid: user.uid,
          displayName: user.displayName,
        })
        var id_company= await firebase.database().ref("Guides/" + user.uid );
        id_company.once("value")
              .then(snapshot => {
                this.setState({
                  idCompany: snapshot.val().Id_company,
                })
                var namecompany= firebase.database().ref("Companies/" + this.state.idCompany +'/name' );
                namecompany.once("value")
                .then(snapshot => {
                    this.setState({
                        nameCompany: snapshot.val()
                    })
                })
              });
        // console.log(this.state.displayName)
        }
    render(){
        return(
            
            <div>
                <Navbar displayName={this.state.displayName}></Navbar>
                <div style={{marginTop: "30px",marginLeft: "70px", marginRight: "50px" }}>
                <Form>
                    <Form.Group >
                        <Form.Label style={{display: "block"}}>Start date</Form.Label>
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                            tabIndex={1}
                            minDate={new Date()}
                        />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label style={{display: "block"}}>End date</Form.Label>
                        <DatePicker
                            selected={addDays(this.state.startDate, this.props.location.state.duration)}
                            onChange={this.handleChange}
                            tabIndex={1}
                            // minDate={new Date()}
                            // includeDates={[new Date(), addDays(new Date(), 1)]}
                        />
                    </Form.Group>
                    
                    <Link to="/AddMember"><Button variant="dark" type="submit">Done</Button></Link>
                    {/* ขึ้น Alert ว่าพิมเสร็จแล้ว  */}
                </Form>
                </div>
            </div>
        )
    }

}
export default ImitateTrip