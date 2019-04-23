import React, { Component } from 'react'
import firebase from '../firebase'
import Navbar from './Navbar'
import { Button, Form, Col, Modal, ProgressBar, Image, Row} from 'react-bootstrap'
import TableSchedule from './Table'
import { Redirect ,Link } from 'react-router-dom';

class DetailCreateTrip extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // endDate: '',
      idTripDetail: '',
      showDone: false,
      check: false,
      showForm: false,
      isSignedIn: false,
      image: null,
      url: '',
      progress: 0,
      myid: '',
      idCompany:'',
      displayName:'',
      dataDetailTrip: '',  
    };
    this.handleChangePic = this.handleChangePic.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.handleDoneShow = this.handleDoneShow.bind(this);
    this.handleDoneClose = this.handleDoneClose.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
    // this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.insertDetailData = this.insertDetailData.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.getInfo = this.getInfo.bind(this)
    this.notNullCheck = this.notNullCheck.bind(this)
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
      this.setState({ showDone: true });
      // this.insertDetailData()
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
    if(this.notNullCheck()){
      var idTripDetail = null
      var location =  document.getElementById('location').value;
      var bookDay =  document.getElementById('bookDay').value;
      var description =  document.getElementById('description').value;
      var startTime =  document.getElementById('startTime').value;
      var endTime =  document.getElementById('endTime').value;
      // var alertTime = document.querySelector('input[name="radio1"]:checked').value;

      if( this.props.location.state.idTrip ){
        let dbCon = firebase.database().ref('Trips/' + this.props.location.state.idTrip);
          dbCon.update({
            duration: this.props.location.state.duration,
            nameTrip: this.props.location.state.nameTrip,
            country: this.props.location.state.country,
          })
          // let pathFirstpic = firebase.database().ref('Companies/' + this.state.idCompany +'/Trips/' + this.props.location.state.idTrip + '/picfirst')
          // pathFirstpic.once("value")
          //   .then(snapshot => {
          //     dbCon.update({
          //       picfirst: snapshot.val()
          //     })
          //   })

        let detail = firebase.database().ref('Trips/' + this.props.location.state.idTrip + '/Detail');
          idTripDetail = detail.push({
            bookDay: bookDay,
            location: location,
            startTime: startTime,
            endTime: endTime,
            // alertTime: alertTime,
            description: description,
            picture: this.state.url,
          }).key;
          detail.child(idTripDetail).update({
            idTripDetail: idTripDetail
          })

      }else if(this.props.location.state.idGroup){
        let dbCon = firebase.database().ref('Groups/' + this.props.location.state.idGroup);
          dbCon.update({
            duration: this.props.location.state.duration,
            nameTrip: this.props.location.state.nameTrip,
            country: this.props.location.state.country,
          })
        let detail = firebase.database().ref('Groups/' + this.props.location.state.idGroup + '/Detail');
          idTripDetail = detail.push({
            bookDay: bookDay,
            location: location,
            startTime: startTime,
            endTime: endTime,
            // alertTime: alertTime,
            description: description,
            picture: this.state.url,
          }).key;
          detail.child(idTripDetail).update({
            idTripDetail: idTripDetail
          })
      }
    
      this.setState({
          idTripDetail: idTripDetail,
          url: '',
          progress: 0,
          endDate:'',
          startDate: '',
      });
      // if(!this.state.picfirst){
      //   let picpath = firebase.database().ref('Companies/' + this.state.idCompany +'/Trips/' + this.props.location.state.idTrip);
      //   picpath.update({
      //     picfirst: this.state.url
      //   })
      // this.setState({
      //   picfirst: true,
      // })
      // }

      var rootRef = firebase.database().ref("Trips/" + this.props.location.state.idTrip + '/Detail');
        rootRef.once("value")
            .then(snapshot => {
              if(snapshot.val() != null){
                this.setState({
                  dataDetailTrip: Object.values(snapshot.val())
                })
                for(let i = 0 ;i < this.state.dataDetailTrip.length; i++){
                  if(this.state.dataDetailTrip[i].picture !== ''){
                    let picpath = firebase.database().ref('Companies/' + this.state.idCompany +'/Trips/' + this.props.location.state.idTrip);
                    picpath.update({
                      picfirst: this.state.dataDetailTrip[i].picture
                    })
                    break;
                  }
                  // console.log('pic '+this.state.dataDetailTrip[i].picture)
                  
                }
                  // let picpath = firebase.database().ref('Companies/' + this.state.idCompany +'/Trips/' + this.props.location.state.idTrip);
                  //   picpath.update({
                  //     picfirst: Object.values(snapshot.val())[0].picture
                  //   })
                  console.log(this.state.dataDetailTrip)
                  console.log(this.state.dataDetailTrip.length)
                }  
            })
      // แก้ โดยreadจากรูปแรกในTrips/Id_Trip
      document.getElementById("myForm").reset();
    }
    // else{
    //   console.log("null")
    //   this.setState({
    //     showForm: true,
    //   })
    // }
  }

  buildOptionsDuration() {
    var arr = [];
    for (let i = 1; i <= this.props.location.state.duration ; i++) {
        arr.push(<option key={i} value={i}>Day {i}</option>)
    }
    return arr; 
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
              idCompany: snapshot.val().Id_company
            })
          });
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
      // console.log('yess' + this.state.startDate);
      if (this.state.isSignedIn){
        return(

          <div>
          <Navbar displayName = {this.state.displayName} />
          <div className="container" style={{marginTop: "30px"}}>
            <Form id="myForm">
              <Form.Group>
                  <Form.Control size="lg"  id="bookDay" as="select">
                  {
                    this.buildOptionsDuration()
                  }
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
                <div className="form-group row">
                    <div className="col-xs-2">
                      <Form.Control style={{display: "inline"}} id="startTime" as="select">
                      {
                        this.buildOptionsTime().map((time) => <option key={time} value={time}>{time}</option>)
                      }
                      </Form.Control>
                    </div>
                    <div className="col-xs-2">
                      <Form.Text style={{display: "inline", paddingLeft: "10px", paddingRight: "10px"}}>to</Form.Text>
                    </div>
                    <div className="col-xs-2">
                      <Form.Control id="endTime" as="select">
                      {
                        this.buildOptionsTime().map((time) => <option key={time} value={time}>{time}</option>)
                      }
                      </Form.Control>
                    </div>
                  </div>

                    {/* <DatePicker id="endTime"
                    placeholderText="end time"
                    selected={this.state.endDate}
                    onChange={this.handleChangeEnd}
                    autoComplete="off"
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    dateFormat="h:mm aa"
                    timeCaption="Time"
                    /> */}
                
                  </Form.Group>

                  {/* <Form.Group >
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
                </Form.Group> */}
                </Form>
          
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
              
            {this.state.check &&
            <Redirect to={{
              pathname: "/MyTrips"
            }}></Redirect>}
          </div>
          <TableSchedule idTripDetail={this.state.idTripDetail} fromgroup={this.props.location.state.idGroup} duration={this.props.location.state.duration} idTrip={this.props.location.state.idTrip || this.props.location.state.idGroup}></TableSchedule>
        </div>
        )
      }else if(!this.state.isSignedIn){
        return(
            <div style={{textAlign: "center", marginTop: "50px"}}>
             <Link to ="/"><Button variant="warning">Sign In</Button></Link>
            </div>
        )
    }else {
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

}
export default DetailCreateTrip