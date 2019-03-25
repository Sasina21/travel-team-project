import React, { Component } from 'react'
import { Table , Image, Badge, Button} from 'react-bootstrap'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


class CreateTrip extends Component {


    render(){
        const TableFixed = styled.td`
            table-layout: fixed;
            width: 150px;
            height: 60px;
        `
        return(
            <div>
                
                <Table striped bordered responsive="sm" >
                    <thead>
                        <tr>
                        <th ></th>
                        <th >Day1</th>
                        <th >Day2</th>
                        <th >Day3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td style={{tableLayout: "fixed", width: "2px"}}>6.00</td>
                        <TableFixed style={{backgroundColor: "salmon"}}>
                            <h6 style={{textAlign: "end"}}><Badge variant="secondary">Delete</Badge></h6>
                            <Link to="/EditLocation"><Image src="https://d1kls9wq53whe1.cloudfront.net/articles/17085/ORG/312e6c80ac3bf30134743c243bd4ad25.jpg" fluid /></Link>
                        </TableFixed>
                        <TableFixed>@mdo</TableFixed>
                        </tr>
                        <tr>
                            <td style={{tableLayout: "fixed", width: "2px"}}>2</td>
                            <TableFixed>Jacob</TableFixed>
                            <TableFixed style={{backgroundColor: "salmon"}} rowSpan="2"><h6 style={{textAlign: "end"}}>
                                <Badge variant="secondary">Delete</Badge></h6>
                                Thornton</TableFixed>
                            <TableFixed>@fat</TableFixed>
                        </tr>
                        <tr>
                            <td style={{tableLayout: "fixed", width: "2px"}}>3</td>
                            <TableFixed >Larry the Bird</TableFixed>
                            <TableFixed>@twitter</TableFixed>
                        </tr>
                    </tbody>
                </Table>

            </div>
        )
    }

}
export default CreateTrip