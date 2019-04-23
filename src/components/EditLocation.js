import React, { Component } from 'react'
import Navbar from './Navbar'
import { Button, Card, Image, Row, Col, Form , Modal, ProgressBar} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import firebase from '../firebase'

class EditLocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
        isSignedIn: false,
        myid: '',
        idCompany:'',
        displayName:'',
        showFormDelete: false,
        alreadyDelete: false,
        showForm: false,
        url: '',
        progress: 0,
        };
        this.handleChangeDelete = this.handleChangeDelete.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.goBack = this.goBack.bind(this);
        this.removeTrip = this.removeTrip.bind(this)
        this.notNullCheck = this.notNullCheck.bind(this)
        this.insertDetailData= this.insertDetailData.bind(this)
        this.handleChangePic = this.handleChangePic.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.getInfo = this.getInfo.bind(this)
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
                  if(snapshot.val() != null){
                    this.setState({
                        idCompany: snapshot.val().Id_company
                      })
                  }
              });
        // console.log(this.state.displayName)
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
            // console.log(url)
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

      handleClose() {
        this.setState({ 
          showFormDelete: false ,
        });
      }
      
      handleChangeDelete(){
        this.setState({ showFormDelete: true });
      }

    goBack(){
        this.props.history.goBack();
    }

    removeTrip(){
        if(this.props.location.state.fromgroup){
            console.log(this.props.location.state.dataTripOnLocation.idTripDetail)
            let dbGroups = firebase.database().ref('Groups/' + this.props.location.state.idTrip + '/Detail/' + this.props.location.state.dataTripOnLocation.idTripDetail)
            dbGroups.remove()
            // this.setState({
            //     alreadyDelete: true
            // })
        }else{
            console.log(this.props.location.state.dataTripOnLocation.idTripDetail)
            let dbTrips = firebase.database().ref('Trips/' + this.props.location.state.idTrip + '/Detail/' + this.props.location.state.dataTripOnLocation.idTripDetail)
            dbTrips.remove()
            // this.setState({
            //     alreadyDelete: true
            // })
        }
        
        this.goBack()
        this.setState({
          showFormDelete: false,
          alreadyDelete: true,
        })
  
      }

      notNullCheck(){
        if(document.getElementById('location').value === '' ||
          document.getElementById('startTime').value ==='' ||
          document.getElementById('endTime').value ==='')
          // document.querySelector('input[name="radio1"]:checked').value ==='')
          {
            this.setState({
              showForm: true,
            })
          return false
        }else{
          // console.log("complete")
          return true
        }
      }
      
      insertDetailData(){
        
          var location =  document.getElementById('location').value;
          var bookDay =  document.getElementById('bookDay').value;
          var description =  document.getElementById('description').value;
          var startTime =  document.getElementById('startTime').value;
          var endTime =  document.getElementById('endTime').value;

          if(this.props.location.state.fromgroup){
            let dbGroups = firebase.database().ref('Groups/' + this.props.location.state.idTrip + '/Detail/' + this.props.location.state.dataTripOnLocation.idTripDetail)
              dbGroups.update({
                bookDay: bookDay,
                location: location,
                startTime: startTime,
                endTime: endTime,
                description: description,
              });
              if(this.state.url){
                  dbGroups.update({
                    picture: this.state.url
                  })
              }
          }else {
            let dbTrips = firebase.database().ref('Trips/' + this.props.location.state.idTrip + '/Detail/' + this.props.location.state.dataTripOnLocation.idTripDetail)
              dbTrips.update({
                bookDay: bookDay,
                location: location,
                startTime: startTime,
                endTime: endTime,
                description: description,
              });
              if(this.state.url){
                dbTrips.update({
                  picture: this.state.url
                })
            }
          }
        
        //   this.setState({
        //       url: '',
        //       progress: 0,
        //       endDate:'',
        //       startDate: '',
        //   });
        this.goBack()
        
      }

      buildOptionsDuration() {
        var arr = [];
        for (let i = 1; i <= this.props.location.state.duration ; i++) {
            arr.push(<option key={i} value={i}>{i}</option>)
        }
        return arr; 
      }

      buildOptionsTime() {
        var arr = [];
        for (let i = 6; i <= 23 ; i++) {
            arr.push(i+':00 ')
            arr.push(i+':30 ')
        }
        arr.push('24:00')
        return arr;
    }
    render(){
        if(this.state.idCompany){

            return(
                
                <div>
                    <Navbar></Navbar>
                    <div style={{marginTop: "30px",marginLeft: "70px", marginRight: "50px" }}>
                        <Card>
                            <Card.Header as="h5">{this.props.location.state.dataTripOnLocation.location}</Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col sm={6}>
                                        <div style={{textAlign: "center"}}>
                                            <Image style={{maxWidth: "600px", textAlign: "center"}} src={this.props.location.state.dataTripOnLocation.picture} fluid />
                                        </div>
                                        <Form.Group>
                                            <Form.Label>Upload Image</Form.Label>
                                            <Form.Control type="file" id="fileButton" accept="image/x-png,image/jpeg" onChange={this.handleChangePic} />
                                            <Button style={{marginTop: "10px", marginBottom: "10px", display: "block"}} variant="warning" onClick={this.handleUpload} >Upload</Button>
                                            <ProgressBar style={{marginBottom: "10px"}} striped variant="warning" now={this.state.progress} max="100" />
                                            {
                                                this.state.url && <Image src={this.state.url} style={{display: "block"}} height="300" />
                                            }
                                        </Form.Group>
                                    </Col>
    
                                    <Col sm={6}>
    
                                    <Form.Group >
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            id="location"
                                            placeholder="location"
                                            autoComplete="off"
                                            defaultValue={this.props.location.state.dataTripOnLocation.location}
                                            />
                                    </Form.Group>
    
                                    <Form.Group>
                                    <Form.Label>Day</Form.Label>
                                    <Form.Control size="lg"  id="bookDay" as="select" defaultValue={this.props.location.state.dataTripOnLocation.bookDay} autoComplete="off">
                                    {
                                        this.buildOptionsDuration()
                                    }
                                    </Form.Control>
                                    </Form.Group>
    
                                    <Form.Group>
                                        <Form.Label>Start time : </Form.Label>
                                        <Form.Control style={{display: "inline"}} id="startTime" as="select" defaultValue={this.props.location.state.dataTripOnLocation.startTime}>
                                        {
                                            this.buildOptionsTime().map((time) => <option key={time} value={time}>{time}</option>)
                                        }
                                        </Form.Control>
                                    </Form.Group>
    
                                    <Form.Group >
                                        <Form.Label>End time :</Form.Label>
                                        <Form.Control style={{display: "inline"}} id="endTime" as="select" defaultValue={this.props.location.state.dataTripOnLocation.endTime}>
                                        {
                                            this.buildOptionsTime().map((time) => <option key={time} value={time}>{time}</option>)
                                        }
                                        </Form.Control>
                                    </Form.Group>
    
                                    <Form.Group >
                                        <Form.Label>Description :</Form.Label>
                                        <Form.Control
                                            required
                                            id="description" as="textarea" rows="3"
                                            autoComplete="off"
                                            defaultValue={this.props.location.state.dataTripOnLocation.description}
                                            />
                                    </Form.Group>
                            
                                    <Form.Group style={{textAlign: "end"}}>
                                        <Button onClick={this.handleChangeDelete} variant="danger" style={{marginRight: "10px"}}>Delete</Button>
                                        <Button onClick={this.insertDetailData} variant="dark" style={{marginRight: "10px"}}>Save</Button>
                                    </Form.Group>
                                    {/* {this.state.alreadyDelete && this.goBack()} */}
                                    </Col>
                                </Row>
                                
                            </Card.Body>
                        </Card>
    
                    </div>
                    <Modal show={this.state.showFormDelete} onHide={this.handleClose}>
                        <Modal.Header style={{backgroundColor: '#C21807', color: "white"}} closeButton>
                            <Modal.Title>Delete this trip ?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body> Would You like to delete this trip.</Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={this.removeTrip}>
                            Yes
                            </Button>
                            
                        </Modal.Footer>
                    </Modal>
                </div>
            )
        }else{
            return(
                    <div style={{marginTop: "30px",marginLeft: "70px", marginRight: "50px" }}>
                    <Card>
                        <Card.Header as="h5">{this.props.location.state.dataTripOnLocation.location}</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col sm={6}>
                                    <div style={{textAlign: "center"}}>
                                        <Image style={{maxWidth: "600px", textAlign: "center"}} src={this.props.location.state.dataTripOnLocation.picture} fluid />
                                    </div>
                                </Col>

                                <Col sm={6}>
                                <Form.Group>
                                    <Form.Label>Day {this.props.location.state.dataTripOnLocation.bookDay}</Form.Label>
                                </Form.Group>
                                
                                <Form.Group>
                                    <Form.Label>Start time : {this.props.location.state.dataTripOnLocation.startTime}</Form.Label>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>End time : {this.props.location.state.dataTripOnLocation.endTime}</Form.Label>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label>Description : {this.props.location.state.dataTripOnLocation.description}</Form.Label>
                                </Form.Group>
                        
                                <Form.Group style={{textAlign: "end"}}>
                                    <Button onClick={this.goBack} variant="dark" style={{marginRight: "10px"}}>Back</Button>
                                </Form.Group>
                                {/* {this.state.alreadyDelete && this.goBack()} */}
                                </Col>
                            </Row>
                            
                        </Card.Body>
                    </Card>
                </div>
            )
        }
    }

}
export default EditLocation