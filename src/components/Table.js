import React, { Component } from 'react'
import firebase from '../firebase'
import { Table , Image} from 'react-bootstrap'
import { Link } from 'react-router-dom'

class TableSchedul extends Component {

    constructor(props){
        super(props);
        this.state={
            dataTrip: null,
            dataTripCheck: false,
            alreadyReaddata: false,
            refresh: '',
        }
        this.componentWillMount = this.componentWillMount.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
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
        arr.push('24:00')
        return arr;
    }

    componentDidUpdate(prevProps){
        if(prevProps.idTripDetail !== this.props.idTripDetail){
            this.componentWillMount()
            this.setState({          
                refresh: this.props.idTripDetail
            });
        }
    }

    createTable(day){
        var arr = []
        var check =[]
        console.log(this.state.refresh)
        this.buildOptionsTime().map((time, index) => {
            for(let i = 0 ; i < this.state.dataTrip.length ; i++){
                // console.log('index' +index)
                if( this.state.dataTrip[i].bookDay == day){
                    const start = this.state.dataTrip[i].startTime.split(':')
                    const end = this.state.dataTrip[i].endTime.split(':')
                    const durationTime = ((parseInt(end[0])*60+parseInt(end[1])) - (parseInt(start[0])*60+parseInt(start[1])))/30
                    if( time == this.state.dataTrip[i].startTime ){
                        arr[index] = <td colSpan={durationTime} style={{backgroundColor: 'salmon' ,textAlign:'center',height: "120px"}} key={index}>
                            <Link style={{color:'black', fontSize:'12px'}} 
                            to={{
                                pathname: "/EditLocation",
                                state:({
                                    dataTripOnLocation: this.state.dataTrip[i],
                                    fromgroup: this.props.fromgroup,
                                    idTrip: this.props.idTrip,
                                    duration: this.props.duration,
                                    })
                                }}>
                                <Image style={{maxHeight:'120px'}} src={this.state.dataTrip[i].picture} fluid /><br/>{this.state.dataTrip[i].location}</Link>
                        </td>
                        for(let j = 1 ; j < durationTime ; j++){
                            check[index+j] = 'fill'
                        }
                        break
                    }else{
                        if(check[index] == 'fill'){

                        }else{
                            arr[index] = <td key={index}></td>
                        }
                        
                    }
                }
            }
        })

        return arr
    }

    
    componentWillMount(){
        // var rootRef = null
        console.log('table ' +this.props.fromgroup)
        if(this.props.fromgroup){
            var rootRef = firebase.database().ref("Groups/" + this.props.idTrip + '/Detail');
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
                })
        }else{
            rootRef = firebase.database().ref("Trips/" + this.props.idTrip + '/Detail');
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
                })
        }
            
    }
    

    render(){
        // console.log('render '+this.state.dataTrip)
        // console.log(this.buildOptionsTime())

        // const TableFixed = styled.td`
        //     table-layout: fixed;
        //     width: 150px;
        //     height: 60px;
        // `
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
                                        <th>Day {day}</th>
                                        {
                                            this.state.dataTrip && this.createTable(day)
                                        }
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