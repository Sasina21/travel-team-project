import React, { Component } from 'react'
import firebase from '../firebase'
import Navbar from './Navbar'
import { Button, Form, Image, Row, Col} from 'react-bootstrap'
import DatePicker from "react-datepicker";
import { Redirect } from 'react-router-dom'
import { addDays } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

class ImitateTrip extends Component {
    constructor(props) {
        super(props);
        this.state = {
          startDate: new Date(),
          endDate: new Date(),
          isSignedIn: false,
          myid: '',
          idCompany:'',
          nameCompany:'',
          displayName:'',
          idGroup:'',
        };
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this)
        this.getInfo = this.getInfo.bind(this) 
        this.insertDataTrip = this.insertDataTrip.bind(this)
      }
    
      handleChangeStart(date) {
        this.setState({
          startDate: date
        });
      }
      handleChangeEnd(date) {
        this.setState({
          endDate: date
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
        displayName: user.email,
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
    
    readPicfirst(idGroup){
      let dbCon = firebase.database().ref('Groups/')
      let dbCompany = firebase.database().ref('/Companies/' + this.state.idCompany + '/activeTrip/' + idGroup)
      let pathFirstpic = firebase.database().ref('Companies/' + this.state.idCompany + '/Trips/' + this.props.location.state.idTrip + '/picfirst');
          pathFirstpic.once("value")
            .then(snapshot => {
              console.log(snapshot.val())
              dbCon.child(idGroup).update({
                picfirst: snapshot.val()
              })
              dbCompany.update({
                picfirst: snapshot.val()
              })
            })
    }
      
    async insertDataTrip(){
      var startDate =  await document.getElementById('startDate').value
      // var endDate =  await document.getElementById('endDate').value
      let dbCon = firebase.database().ref('Groups/')
      var idGroup = dbCon.push({
        startDate: startDate,
        // endDate: endDate,
        duration: this.props.location.state.duration,
        idTrip: this.props.location.state.idTrip,
        idGuide: this.state.myid,
        nameTrip: this.props.location.state.nameTrip,
        country: this.props.location.state.country,
      }).key
      this.setState({
        idGroup: idGroup,
      })
      this.readPicfirst(idGroup)
      // let pathFirstpic = firebase.database().ref('Trips/' + this.props.location.state.idTrip + '/picfirst');
      //     pathFirstpic.once("value")
      //       .then(snapshot => {
      //         dbCon.child(idGroup).update({
      //           picfirst: snapshot.val()
      //         })
      //       })

      let dbCompany = firebase.database().ref('/Companies/' + this.state.idCompany + '/activeTrip/' + idGroup)
      dbCompany.update({
        startDate: startDate,
        idGroup: idGroup,
        country: this.props.location.state.country,
        duration: this.props.location.state.duration,
        nameTrip: this.props.location.state.nameTrip,
        idTrip: this.props.location.state.idTrip,
        // picfirst: snapshot.val().picfirst
      })

      var dbTrip = firebase.database().ref('Trips/' + this.props.location.state.idTrip)
      dbTrip.once("value")
        .then(snapshot => {
          dbCon.child(idGroup).update({
            Detail: snapshot.val().Detail,
          })
        })
      dbCon.child(idGroup).update({
        idGroup: idGroup
      })

      // let dbCompany = firebase.database().ref('/Trips/' + this.props.location.state.idTrip + '/Groups')
      // dbCompany.push({
      //   idGroup: idGroup
      // })
      let dbGuide = firebase.database().ref('/Guides/' + this.state.myid + '/activeTrip/')
      dbGuide.update({
        idGroup: idGroup
      })

    }
    
    render(){
      console.log('imitate id group ' +this.state.idGroup)
        return(
            
            <div>
                <Navbar displayName={this.state.displayName}></Navbar>
                <div style={{marginTop: "30px",marginLeft: "70px", marginRight: "50px" }}>
                <Form>
                    <Form.Group >
                        <Form.Label style={{display: "block"}}>Start date</Form.Label>
                        <DatePicker
                          id='startDate'
                          selected={this.state.startDate}
                          onChange={this.handleChangeStart}
                          tabIndex={1}
                          minDate={new Date()}
                        />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label style={{display: "block"}}>End date</Form.Label>
                        <DatePicker
                          id="endDate"
                          type="text"
                          selected={addDays(this.state.startDate, this.props.location.state.duration)}
                          // onChange={this.handleChangeEnd}
                          // tabIndex={1}
                          // minDate={new Date()}
                          // includeDates={[new Date(), addDays(new Date(), 1)]}
                        />
                    </Form.Group>
                    
                    <Button onClick={this.insertDataTrip} variant="dark" type="submit">Next</Button>
                    {
                      this.state.idGroup &&
                      <Redirect to={{
                        pathname:'/AddMember',
                        state:{
                          idGroup: this.state.idGroup,
                        }
                      }}/>
                    }
                </Form>
                </div>
            </div>
        )
    }

}
export default ImitateTrip