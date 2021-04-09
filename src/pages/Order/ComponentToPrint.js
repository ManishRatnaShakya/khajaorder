import React, { Component } from "react";
import { Table } from "reactstrap";
class ComponentToPrint extends Component {
    render() {
        return (
        <div style={{ width:"90%",marginTop:"5px"}}> 

             <div style={{display: 'flex',justifyContent: 'space-between'}}>
                                <div>
                                <p><h5 style={{fontWeight:'bold'}}>Ordered By</h5>{this.props.td.u_fullname}</p>
                                <br/>  
                                <p><h5 style={{fontWeight:'bold'}}>Delivery Location</h5>{this.props.td.o_location}</p>
                                <br/>
                                <p><h5 style={{fontWeight:'bold'}}>Phone</h5>{this.props.td.u_phone}</p>
                                <br/>
                                </div>
                                <div>
                                <p><h5 style={{fontWeight:'bold'}}>Payment Type</h5>{this.props.td.o_paymenttype}</p>
                                <br/>
                                <p><h5 style={{fontWeight:'bold'}}>Special Note</h5>{this.props.td.o_note}</p>
                                <br/>
                                <p><h5 style={{fontWeight:'bold'}}>Ordered By</h5>{this.props.td.u_fullname}</p>
                                <br/>
                                </div>
                              </div>
                                 <Table className="mb-0" style={{overflow:'scroll'}}>
        
                                                <thead>
                                                    <tr>
                                                        <th>Item Name</th>
                                                        <th>Item Quantity</th>
                                                        <th>Price</th>
                                                        {/* <th>Username</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                   
                                                  {this.props.items && this.props.items.filter(item =>item.i_id===this.props.td.o_i_id).map((item)=>
                                                  
                                                  <tr>
                                                      <td>{item.i_name}</td>    
                                                      <td>{this.props.td.qty}</td>    
                                                      <td>{item.i_price}</td>    
                                                  </tr>    
                                                  )}
                                                  
                                                </tbody>
                                            </Table>
                                            <br/>
                                            <br/>
                                            <br/>
                                            <div style={{display: 'flex',justifyContent: 'flex-end'}}>
                                                 <p><h5 style={{fontWeight:'bold'}}>Sub Total</h5>{this.props.td.o_totalamount}</p>
                                                 </div>

</div>
        )
    }
}

export default ComponentToPrint