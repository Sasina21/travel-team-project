import React, { Component } from 'react'
import firebase from '../firebase'
import Navbar from './Navbar'
import { Button, Form, Col, Modal, ProgressBar, Image, Row} from 'react-bootstrap'
import DatePicker from "react-datepicker";
import Table from './Table'
import { Redirect ,Link } from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";

class DetailCreateTrip extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      idTripDetail: '',
      showDone: false,
      check: false,
      showForm: false,
      isSignedIn: false,
      image: null,
      url: '',
      progress: 0,
    };
    this.handleChangePic = this.handleChangePic.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.handleDoneShow = this.handleDoneShow.bind(this);
    this.handleDoneClose = this.handleDoneClose.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.insertDetailData = this.insertDetailData.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
  }

  componentWillUnmount() {
  this.unregisterAuthObserver();
  }

  handleDoneClose() {
    this.setState({ 
      showDone: false ,
      check: true,
    });
  }

  handleFormClose() {
    this.setState({ 
      showForm: false,
    });
  }
  handleDoneShow() {
    if(this.notNullCheck()){
      this.setState({ showDone: true });
      this.insertDetailData()
    }else{
      console.log("null")
      this.setState({
        showForm: true,
      })
    }
  }
 
  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleUpload = () => {
    const {image} = this.state;
    const uploadTask =  firebase.storage().ref('images_location/' + image.name ).put(image)
    uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) *100)
      this.setState({progress})
    },
    (error) => {
      console.log(error)
    },
    () => {
      firebase.storage().ref('images_location').child(image.name).getDownloadURL().then(url => {
        console.log(url)
        this.setState({url})
      })
    })
  }

  handleChangePic = e => {
    if(e.target.files[0]){
      const image = e.target.files[0]
      this.setState(() => ({image}))
    }
  }

  notNullCheck(){
    if(document.getElementById('location').value === '' ||
      document.getElementById('startTime').value ==='' ||
      document.getElementById('endTime').value ===''||
      document.querySelector('input[name="radio1"]:checked').value ==='')
      {
      // console.log("null")
      return false
    }else{
      // console.log("complete")
      return true
    }
  }
  
  insertDetailData(){
    if(this.notNullCheck()){
      var location =  document.getElementById('location').value;
      var bookDay =  document.getElementById('bookDay').value;
      var description =  document.getElementById('description').value;
      var startTime =  document.getElementById('startTime').value;
      var endTime =  document.getElementById('endTime').value;
      var alertTime = document.querySelector('input[name="radio1"]:checked').value;
      let dbCon = firebase.database().ref('Trips/' + this.props.location.state.idTrip +'/detail');
        var idTripDetail = dbCon.push({
          bookDay: bookDay,
          location: location,
          startTime: startTime,
          endTime: endTime,
          alertTime: alertTime,
          description: description,
        }).key;
    
      this.setState({
          idTripDetail: idTripDetail,
      });
      document.getElementById("myForm").reset();
    }else{
      console.log("null")
      this.setState({
        showForm: true,
      })
    }
  }
  buildOptionsDuration() {
    var arr = [];
    for (let i = 1; i <= this.props.location.state.duration ; i++) {
        arr.push(<option key={i} value={i}>Day {i}</option>)
    }
    return arr; 
  }

    render(){
      // console.log('yess' + this.props.location.state.country);
      if (this.state.isSignedIn){
        return(

          <div>
          <Navbar></Navbar>
          <div className="container" style={{marginTop: "30px"}}>
            <Form>
              <Form.Group>
                  <Form.Control size="lg"  id="bookDay" as="select">
                  {this.buildOptionsDuration()}
                  </Form.Control>
                </Form.Group>

                <Form.Group >
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text" autoComplete="off" id="location" placeholder="Where do you want to go ?" />
                </Form.Group>
                
                <Form.Group>
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control type="file" id="fileButton" accept="image/x-png,image/jpeg" onChange={this.handleChangePic} />
                  <Button style={{marginTop: "10px", marginBottom: "10px", display: "block"}} variant="warning" onClick={this.handleUpload} >Upload</Button>
                  <ProgressBar style={{marginBottom: "10px"}} striped variant="warning" now={this.state.progress} max="100" />
                  {
                    this.state.url && <Image src={this.state.url} style={{display: "block"}} height="300" />
                  }
                </Form.Group>

                <Form.Group >
                  <Form.Label>Description</Form.Label>
                  <Form.Control id="description" as="textarea" rows="3" />
                </Form.Group>

                <Form.Group>
                <Form.Label>Time</Form.Label><br/>
                
                  <DatePicker id="startTime"
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    dateFormat="h:mm aa"
                    timeCaption="Time"
                  />
                  <Form.Text style={{display: "inline", paddingLeft: "10px", paddingRight: "10px"}}>to</Form.Text>
                    <DatePicker id="endTime"
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    dateFormat="h:mm aa"
                    timeCaption="Time"
                    />
                
                  </Form.Group>

                  <Form.Group >
                  <Form.Label>Alert</Form.Label>
                  <Col >
                    <Form.Check
                      type="radio"
                      label="Start Time"
                      name="radio1"
                      value="start time"
                    />
                    <Form.Check
                      type="radio"
                      label="End Time"
                      name="radio1"
                      value="end time"
                      
                    />
                    <Form.Check
                      type="radio"
                      label="Both"
                      name="radio1"
                      value="both"
          
                    />
                  </Col>
                </Form.Group>
          
                <Form.Group style={{textAlign: "end"}}>
                  <Button variant="warning" onClick={this.insertDetailData} style={{marginRight: "10px"}}>+ Add more</Button>
                  <Button variant="dark" onClick={this.handleDoneShow}>Done</Button>
                </Form.Group>

                <Modal show={this.state.showDone} onHide={this.handleDoneClose}>
                  <Modal.Header style={{backgroundColor: '#00c853'}} closeButton>
                    <Modal.Title>Woohoo!</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Your trip was done !</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleDoneClose}>
                      Go to My Trip
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Modal show={this.state.showForm} onHide={this.handleFormClose}>
                  <Modal.Header style={{backgroundColor: '#C21807', color: "white"}} closeButton>
                    <Modal.Title>Oops !</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>You did not complete the entire form.</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleFormClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>

              {/*  excludeTimes={[setHours(setMinutes(new Date(), 0), 17), 
                setHours(setMinutes(new Date(), 30), 18), 
                setHours(setMinutes(new Date(), 30), 19),
                setHours(setMinutes(new Date(), 30), 17)]} */}
              
            </Form>
            {this.state.check &&
            <Redirect to={{
              pathname: "/MyTrips"
            }}></Redirect>}
          </div>
          <Table></Table>
        </div>
        )
      }else{
        return(
          <div style={{textAlign: "center", marginTop: "50px"}}>
                 <Link to ="/"><Button variant="warning">Sign In</Button></Link>
                </div>
        )
      }
        
    }

}
export default DetailCreateTrip