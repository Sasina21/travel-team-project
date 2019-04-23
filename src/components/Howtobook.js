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
            <Form style={{margin: '50px'}} >
                <Form.Label style={{display: 'block'}}>1. ดาวน์โหลดแอพพลิเคชั่น TraveTeam ที่ app store</Form.Label>
                <Image style={{height: '55px', marginLeft:'16px'}} src="https://firebasestorage.googleapis.com/v0/b/project-190f0.appspot.com/o/iTunesArtwork%403x.png?alt=media&token=b2bc3bb8-24e2-4e23-b7d3-31ba69ad89f0" rounded />
                <Form.Label style={{display: 'block'}}>2. สมัครสมาชิกในแอพพลิเคชั่น</Form.Label>
                <Form.Label style={{display: 'block'}}>3. ติดต่อเจ้าหน้าที่ โดยการ add Line @travelteam(มี@) หรือโทรติดต่อ 0897064093</Form.Label>
                <Form.Label style={{display: 'block', marginLeft: '16px'}}>แจ้งชื่อทริปที่สนใจอยากจอง และ <strong>E-mail ที่ลงทะเบียนไว้ใน application</strong> </Form.Label>
                <Form.Label style={{display: 'block'}}>4. เจ้าหน้าที่จะทำการแอดทริปให้ <strong>ภายใน 1 วัน</strong></Form.Label>
                <Form.Label style={{display: 'block', marginLeft: '16px'}}>เมื่อ log in ใช้งานใน application ท่านก็จะสามารถดูแผนการท่องเที่ยวที่ท่านได้ลงทะเบียนไว้ได้</Form.Label>
                <Form.Group style={{textAlign: "end"}}>
              <Button onClick={() => this.goBack()} variant="dark" style={{marginRight: "20px", marginTop: '10px'}}>Back</Button>
            </Form.Group>
            </Form>

            
            </div>
        )
        
    }

}
export default MyTrips