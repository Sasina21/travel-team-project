import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, Form, Row, Col, Carousel, Nav} from 'react-bootstrap'
import firebase from '../firebase'
// import Navbar from './Navbar'
// Configure Firebase.

class Main extends React.Component {
    constructor(props, context){
        super(props, context);
        this.state={
            dataTrip: null,
            isSignedIn: false,
            myid: '',
            idCompany:'',
            displayName:'',
            alreadyReaddata: false,
            detailActiveTrip: null,
            alreadyReadActive: false,
            startDate: '',
            idActiveTrip: '',
            idActiveGroup: '',
            picActiveTrip: '',
        }
        this.readData = this.readData.bind(this)
        
    };
    componentWillMount(){
        this.readData()
    }

    async readData(){
        var arr = []
        var dbUser= await firebase.database().ref("Companies/00001/activeTrip")
            dbUser.once("value")
                    .then(snapshot => {
                      if(snapshot.val() !== null){
                        console.log(Object.values(snapshot.val()))
                        Object.values(snapshot.val()).map((item,index) => {
                          console.log(item.idGroup)
                          var dbGroup = firebase.database().ref("Groups/" + item.idGroup )
                            dbGroup.once("value")
                              .then(snapshot => {
                                arr.push(snapshot.val())
                              })
                        })
                        this.setState({
                            dataTrip: arr,
                            alreadyReaddata: true
                        })
                        console.log(this.state.dataTrip)
                      }
                    })
    }
  
  render() {
      if(this.state.dataTrip){

          return(
              <div>
                  <Carousel style={{marginLeft: '150px', marginRight: '150px', marginTop: '50px'}} >
                       <Carousel.Item>
                       <img
                           className="d-block w-100"
                           src="https://firebasestorage.googleapis.com/v0/b/project-190f0.appspot.com/o/Screen%20Shot%202562-04-20%20at%2022.37.45.png?alt=media&token=798b074a-168f-4175-8f67-df617774b6ed"
                           alt="First slide"
                       />
                       </Carousel.Item>
                       <Carousel.Item>
                       <img
                           className="d-block w-100"
                           src="https://firebasestorage.googleapis.com/v0/b/project-190f0.appspot.com/o/Screen%20Shot%202562-04-20%20at%2022.31.25.png?alt=media&token=c7126272-58f4-494e-90f0-37cd5aa84519"
                           alt="Secound slide"
                       />

                       </Carousel.Item>
                       <Carousel.Item>
                       <img
                           className="d-block w-100"
                           src="https://firebasestorage.googleapis.com/v0/b/project-190f0.appspot.com/o/Screen%20Shot%202562-04-20%20at%2022.37.45.png?alt=media&token=798b074a-168f-4175-8f67-df617774b6ed"
                           alt="Third slide"
                       />
                       </Carousel.Item>
                   </Carousel>

                   <Nav style={{marginLeft: '150px', marginRight: '150px', marginTop: '50px'}} >
                        <Nav.Item>
                            <Nav.Link href="/">วิธีจองทัวร์</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/">ติดต่อเรา</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/Login">Guide SignIn</Nav.Link>
                        </Nav.Item>
                    </Nav>
       
                  <Row style={{marginTop: "30px",marginLeft: "70px", marginRight: "50px"}}>
                       {
                           this.state.dataTrip && this.state.dataTrip.map((item, index) => {
                               return (
                               <Col key={index} sm={3}>
                               <Card style={{ width: '18rem' , height: "25rem" , marginBottom: "25px"}}>
                                   <Card.Img style={{maxWidth:"18rem" ,height: "50%"}} variant="top" src={item.picfirst} />
                                   <Card.Body>
                                       <Card.Title >{item.nameTrip}</Card.Title>
                                       <Card.Text style={{fontSize: "14px"}} >{item.country}</Card.Text>
                                       <Card.Text style={{fontSize: "14px"}} >Duration: {item.duration}</Card.Text>
                                       <Form.Group style={{textAlign: "end"}}>
                                       <Link to={{
                                           pathname: "/SpecificTrip",
                                           state: {
                                               idTrip: item.idTrip,
                                               duration: item.duration,
                                               nameTrip: item.nameTrip,
                                               country: item.country
                                           }
                                           }}>
                                           <Button variant="warning">Detail</Button></Link>
                                       </Form.Group>
                                       </Card.Body>
                                   </Card>
                               </Col>
                               )
                           })
                       }
                   </Row>
              </div>
          )
      }else{
          return(
              <div></div>
          )
      }
  }
}
export default Main