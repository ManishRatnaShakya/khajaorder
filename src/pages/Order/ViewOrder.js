import React, { Component } from "react";

// import { Row, Col, Card, CardBody, Container, Table } from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {compose} from 'redux';
import {makeSelectLoading} from "../../store/Restuarant/selectors";
import {makeSelectOrder} from "../../store/orders/selectors";
import {getOrderDataAPI} from '../../store/orders/actions';
// import React, { Component } from 'react';
import { Container, Card, CardBody, Row, Col, Nav, NavItem, NavLink, UncontrolledTooltip, Button,Modal,ModalHeader,ModalBody } from "reactstrap";
import { Link } from "react-router-dom";
import classnames from 'classnames';
import {makeSelectItems} from '../../store/Items/selectors'
import { MDBDataTable } from "mdbreact";
import "./datatables.scss";
import { deleteRestuarant } from "../../store/Restuarant/actions";
import ModalFooter from "reactstrap/lib/ModalFooter";
import {getItemData} from "../../store/Items/actions";
import ReactToPrint from "react-to-print";
import {changeOrderStatus} from '../../store/orders/actions';
import {makeSelectOrderStatus} from '../../store/orders/selectors';
import ComponentToPrint from './ComponentToPrint';
class ViewOrder extends Component {
    constructor(props) {
        super(props);
        this.state={
            breadcrumbItems : [
                { title : "Dashboard", link : "/dashboard" },
                { title : "Orders", link : "" },
            ],
            activeTab: '1',
            data:[] ,
            isModal:false,
            isViewOrder: false,
           orderStatus:''
        }
        this.toggleTab = this.toggleTab.bind(this);
    }
    

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    onDeleteRestuarant(id){
        this.setState({isModal:!this.state.isModal});
       this.props.onDelete(id);
    }
    componentDidMount(){
        document.getElementsByClassName("pagination")[0].classList.add("pagination-rounded");
        this.props.onGetOrderData();
        this.props.onGetItemsData();
       
    }
    onDeleteWithModal(){
        this.setState({isModal:!this.state.isModal});

    }
    render() {
        // this.props.data && this.setState(this.props.data);
        console.log("log orders",this.props.items);
        // this.setState({data:this.props.data});
      
        const data = {
            columns: [
             
              {
                label: "Order No.",
                field: "order_no",
                sort: "asc",
                width: 78
              },
              {
                label: "Phone",
                field: "phone",
                sort: "asc",
                width: 78
              },
              {
                label: "Destination",
                field: "destination",
                sort: "asc",
                width: 93,
              },
              {
                label: "Status",
                field: "status",
                sort: "asc",
                width: 109
              },
              
              {
                label: "Change Status",
                field: "change_status",
                sort: "asc",
                width: 120
              },
              {
                label: "Action",
                field: "action",
                sort: "asc",
                width: 120
              },
             
            ],
          
            rows:
            
            this.props.orders && [
                  ...this.props.orders.map((td)=>({
                        order_no:<p>#{td.o_common_id}</p>,
                        phone:td.u_phone,
                        destination:td.o_location,       
                        // status:<>{td.r_available==="yes"?<Badge className="badge-soft-success mr-1">Active</Badge>:<Badge className="badge-soft-danger mr-1">Not Active</Badge>}</>,
                        status:<>{this.state.orderStatus==="processing"?<p>processing</p>:this.state.orderStatus==="Delivered"?<p>Delivered</p>:this.state.orderStatus==="payment accepted"?<p>payment accepted</p>:this.state.orderStatus==="refunded"?<p>Refunded</p>:this.state.orderStatus==="cancelled"?<p>Cancelled</p> :<p> no status</p> }</>  
                      ,
                        change_status:
                        <div><select  className="form-control select2"  onChange={(e)=>this.props.onChangeOrderStatus(e.target.value)}  value={this.props.orderStatus}>
                                                                        
                                                                        <option>Select status</option>
                                                                        <option value="processing">Processing</option>                    
                                                                        <option value="Delivered">Delivered</option>
                                                                        <option value="payment accepted">Payment Accept</option>
                                                                        <option value="cancelled">Cancelled</option>
                                                                        <option value="refunded">Refunded</option>
                                                                       
                        </select>
                        </div>,
                          action:<>
                                          <Link 
                        // onClick={()=>this.onDeleteRestuarant(td.r_id)} 
                        onClick={()=>this.setState({isModal:!this.state.isModal})}
                         className="mr-3 text-danger" id="delete3"><i className="mdi mdi-trash-can font-size-18"></i></Link>
                            <UncontrolledTooltip placement="top" target="delete3">
                                Delete
                            </UncontrolledTooltip >
                        <Link id="view3" onClick={()=>this.setState({isViewOrder:!this.state.isViewOrder})}><i className="mdi mdi-eye font-size-18"></i></Link>
                        <UncontrolledTooltip placement="top" target="view3">
                                View
                        </UncontrolledTooltip >

                          
                            <Modal
                          size="sm"
                          isOpen={this.state.isModal}
                          toggle={this.tog_small}
                          style={{top:'300px'}}
                        >
                        
                          <ModalHeader toggle={() => this.setState({ isModal: false })}>
                              <h5>Do you want to delete it?</h5>
                          </ModalHeader>
                          
                          <ModalFooter>
                              <Button onClick={()=>this.onDeleteRestuarant(td.r_id)}>Ok</Button>
                              <Button>Cancel</Button>
                          </ModalFooter>
                        </Modal>

                        
                        <Modal
                          size="lg"
                          isOpen={this.state.isViewOrder}
                        //   toggle={this.tog_large}
                          style={{top:'130px',height:'35em'}}
                          scrollable={true}
                        >
                          <ModalHeader toggle={() => this.setState({ isViewOrder: false })}>
                            <div style={{display: 'flex' ,justifyContent:"space-between"}}>
                            <div>
                             <h2>#{td.o_common_id}</h2>
                             <p>{td.o_date}</p>  
                             </div>
                             <div>
                              <ReactToPrint
                                 trigger={() => <Button>Print this out!</Button>}
                                  content={() => this.componentRef}
                                />
                              
                              </div>
                              </div>
                          </ModalHeader>
                          <ModalBody style={{display: 'flex',justifyContent: 'center'}}>
                            
                            <ComponentToPrint td={td} items={this.props.items} ref={el => (this.componentRef = el)} />
                          </ModalBody>
                        </Modal>

                              
                          </>
                                     
                }))
            ]
                
            
        }
        console.log("thie state",this.state)
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        
                    <Breadcrumbs title="Orders" breadcrumbItems={this.state.breadcrumbItems} />
                       <div >
                       
                        </div>
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <CardBody className="pt-0">
                                        <Nav tabs className="nav-tabs-custom mb-4">
                                            <NavItem>
                                                <NavLink onClick={() => { this.toggleTab('1'); }} className={classnames({ active: this.state.activeTab === '1' }, "font-weight-bold p-3")}>All Orders</NavLink>
                                            </NavItem>
                                           
                                        </Nav>
                                        <MDBDataTable responsive data={data} className="mt-4" bordered  hover={true}/>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                    </Container> 
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps =createStructuredSelector({
    orders:makeSelectOrder(),
    loading:makeSelectLoading(),
    items:makeSelectItems(),
    orderStatus:makeSelectOrderStatus(),
})
const mapDispatchToProps =(dispatch)=>{ 
    return {
        onGetOrderData:()=>dispatch(getOrderDataAPI()),
        onDelete:(id)=>dispatch(deleteRestuarant(id)),
        onGetItemsData:()=>dispatch(getItemData()),
        onChangeOrderStatus:()=>dispatch(changeOrderStatus()),
    }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ViewOrder);
