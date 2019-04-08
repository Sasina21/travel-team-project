import React, { Component } from 'react'
import firebase from '../firebase'
import { Table , Image, Badge, Button} from 'react-bootstrap'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

class TableSchedul extends Component {

    constructor(props){
        super(props);
        this.state={
            dataTrip: null,
            dataTripCheck: false,
            alreadyReaddata: false,
        }
        this.componentWillMount = this.componentWillMount.bind(this)
    }

    buildOptionsDuration() {
        var arr = [];
        for (let i = 1; i <= this.props.duration ; i++) {
            arr.push(i)
        }
        return arr; 
    }

    buildOptionsTime() {
        var arr = [];
        for (let i = 6; i <= 23 ; i++) {
            arr.push(i+':00 ')
            arr.push(i+':30 ')
        }
        arr.push('0:00')
        return arr;
    }

    createTable(day){
        var arr = []
        console.log('createTable '+day)
        for(let i = 0 ; i < this.state.dataTrip.length ; i++ ){
            console.log('bookDay '+this.state.dataTrip[i].bookDay)
            if(parseInt(this.state.dataTrip[i].bookDay) === parseInt(day)){
                this.buildOptionsTime().map((time) => {
                    if(this.state.dataTrip[i].startTime === time){
                        arr.push(<td style={{tableLayout: "fixed", backgroundColor: 'salmon' }} key={time}></td>)
                    }else{
                        arr.push(<td style={{tableLayout: "fixed" }} key={time}></td>)
                    }
                })
            }
        }
        
        return arr
    }

    
    componentWillMount(){
        console.log('table ' +this.props.idTrip)
        var rootRef = firebase.database().ref("Trips/" + this.props.idTrip + '/Detail');
        rootRef.once("value")
            .then(snapshot => {
                if(snapshot.val() != null){
                    console.log('Object.values(snapshot.val())')
                    this.setState({
                        dataTrip: Object.values(snapshot.val()),
                        dataTripCheck: true
                    })
                    console.log(this.state.dataTrip) 
                }  
                // console.log('eiei ' + this.state.dataTrip)  
                // console.log(this.state.dataTrip[1].bookDay)        
            })
            
    }

    render(){
        // console.log('render '+this.state.dataTrip)
        // console.log(this.buildOptionsTime())

        // const TableFixed = styled.td`
        //     table-layout: fixed;
        //     width: 150px;
        //     height: 60px;
        // `

        // <TableFixed style={{backgroundColor: "salmon"}}>
        //     <h6 style={{textAlign: "end"}}><Badge variant="secondary">Delete</Badge></h6>
        //     <Link to="/EditLocation"><Image src="https://d1kls9wq53whe1.cloudfront.net/articles/17085/ORG/312e6c80ac3bf30134743c243bd4ad25.jpg" fluid /></Link>
        // </TableFixed>
        return(
            <div>
                <Table striped bordered responsive="sm" style={{overflow:'auto', display: 'block', tableLayout: 'auto'}} >
                    <thead>
                        <tr>
                        <th ></th>
                        {
                            this.buildOptionsTime().map((time) => <td style={{fontSize:"50%"}}key={time}>{time}</td>) 
                        }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // this.state.dataTrip
                            this.buildOptionsDuration().map((day) => {
                                return(
                                    <tr key={day}>
                                        <th >Day {day}</th>
                                        {
                                            this.state.dataTrip && this.createTable(day)
                                        }
                                        {/* {
                                            this.buildOptionsTime().map((time) => <td style={{tableLayout: "fixed", backgroundColor: 'salmon' }} key={time}></td>)
                                            
                                        } */}
                                    </tr>
                                )
                            })
                        }
                       
                    </tbody>
                </Table>

            </div>
        )
    }

}
export default TableSchedul