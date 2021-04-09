import React, { Component } from "react";

// import { Row, Col, Card, CardBody, Container, Table } from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {compose} from 'redux';
import {makeSelectDataFromAPI,makeSelectLoading} from "../../store/Restuarant/selectors";
import {getRestuarantData} from '../../store/Restuarant/actions';
// import React, { Component } from 'react';
import { Container,Badge, Card,Form,FormGroup, CardBody, Row, Col, Nav, NavItem, NavLink, UncontrolledTooltip, Input, Label, Button,Modal,ModalHeader,ModalBody } from "reactstrap";
import { Link } from "react-router-dom";
import classnames from 'classnames';

import { MDBDataTable } from "mdbreact";
import "./datatables.scss";
import { deleteRestuarant } from "../../store/Restuarant/actions";
import ModalFooter from "reactstrap/lib/ModalFooter";

//Import Breadcrumb
// import Breadcrumbs from '../../components/Common/Breadcrumb';

class ViewRestuarant extends Component {
    constructor(props) {
        super(props);
        this.state={
            breadcrumbItems : [
                { title : "Dashboard", link : "/dashboard" },
                { title : "View Items", link : "/view-items" },
            ],
            activeTab: '1',
            data:[] ,
            isModal:false,
            deleteId:'',  
            isChangePasswordModal:false,
            changePasswordId:''
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
    onDeleteWithId(id){
        this.setState({isModal:!this.state.isModal})
        this.setState({deleteId:id})
        console.log("with delete",this.state.deleteId);
    }
    componentDidMount(){
        document.getElementsByClassName("pagination")[0].classList.add("pagination-rounded");
        this.props.onGetRestuarantData();
        
       
    }
    onDeleteWithModal(){
        this.setState({isModal:!this.state.isModal});

    }
    onChangeWithId(id){
        this.setState({isChangePasswordModal:!this.state.isChangePasswordModal});
        this.setState({changePasswordId:id})
    }
    onChangePassword(id){
        this.setState({isChangePasswordModal:!this.state.isChangePasswordModal});
        // this.props.changePasswordFromAPI(id)
    }
    render() {
        // this.props.data && this.setState(this.props.data);
        console.log("log",this.props.data);
        // this.setState({data:this.props.data});
      
        const data = {
            columns: [
             
              {
                label: "Image",
                field: "image",
                sort: "asc",
                width: 78
              },
              {
                label: "Name",
                field: "name",
                sort: "asc",
                width: 78
              },
              {
                label: "Email",
                field: "email",
                sort: "asc",
                width: 93,
              },
              {
                label: "Streetname",
                field: "streetname",
                sort: "asc",
                width: 100
              },
              {
                label: "State",
                field: "state",
                sort: "asc",
                width: 100
              },
              {
                label: "Zip Code",
                field: "zip",
                sort: "asc",
                width: 100
              },

              {
                label: "Description",
                field: "description",
                sort: "asc",
                width: 135
              },
              {
                label: "Availability Status",
                field: "status",
                sort: "asc",
                width: 40
              },
              
              {
                label: "Action",
                field: "action",
                sort: "asc",
                width: 120
              },
            ],
          
            rows:
            
            this.props.data && [
                  ...this.props.data.map((td)=>({
                        image:<div style={{width:'60px',height:'60px'}}><img style={{width:'100%',height:'100%'}} src={`https://khajaorder.com/korderapi/images/resturants/${ td.r_logo}`} alt=""/></div>,
                        name:td.r_name,
                        email:td.ad_email,
                        streetname:td.r_streetname,
                        state:td.r_state,
                        zip:td.r_zipcode,
                        description:td.r_description,       
                        status:<>{td.r_available==="yes"?<Badge className="badge-soft-success mr-1">Active</Badge>:<Badge className="badge-soft-danger mr-1">Not Active</Badge>}</>,
                        action:<div style={{display: 'flex',justifyContent: 'space-between'}}><Link to={`/view-restuarant/${td.r_id}`} className="mr-3 text-primary" id="edit3"><i className="mdi mdi-pencil font-size-18"></i></Link>
                            <UncontrolledTooltip placement="top" target="edit3">
                                Edit
                            </UncontrolledTooltip >
                        <Link 
                         style={{marginRight:"18px"}}
                        onClick={()=>this.onDeleteWithId(td.r_id)}
                         className="text-danger" id="delete3"><i className="mdi mdi-trash-can font-size-18"></i></Link>
                            <UncontrolledTooltip placement="top" target="delete3">
                                Delete
                            </UncontrolledTooltip >

                        <Link 
                            onClick={()=>this.onChangeWithId(td.r_id)}
                         className="text-primary" id="password3"><i className="mdi mdi-key font-size-18"></i></Link>
                            <UncontrolledTooltip placement="top" target="password3">
                                Change Password
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
                              <Button onClick={()=>this.onDeleteRestuarant(this.state.deleteId)}>Ok</Button>
                              <Button onClick={() =>this.setState({isModal:!this.state.isModal})}>Cancel</Button>
                          </ModalFooter>
                        </Modal>

                        {/* change password */}
                        <Modal
                          size="lg"
                          isOpen={this.state.isChangePasswordModal}
                          toggle={this.tog_small}
                          style={{top:'140px'}}
                        >
                          <ModalHeader toggle={() => this.setState({ isChangePasswordModal: false })}>
                              <h5>Change {td.r_name} Restuarant's password </h5>
                          </ModalHeader>
                          <ModalBody>
                                   <Form>
                                        <FormGroup>
                                             <Label htmlFor="productname">Old Password</Label>
                                                            <Input id="productname" name="productname" type="password" className="form-control"/>
                                                        </FormGroup>
                                                        
                                                        <FormGroup>
                                                            <Label htmlFor="productname">New Password</Label>
                                                            <Input id="productname" name="productname" type="password" className="form-control"/>
                                                        </FormGroup>
                                                                                                                  
                                                        <FormGroup>
                                                                    <Label htmlFor="manufacturername">Re-check Password</Label>
                                                                    <Input id="manufacturername" name="manufacturername" type="password" className="form-control"/>
                                                        </FormGroup>
                                                         

                                                    </Form>
                          </ModalBody>
                          
                          <ModalFooter>
                              <Button color="primary" onClick={()=>this.onChangePassword(this.state.changePasswordId)}>Ok</Button>
                              <Button  color="light" onClick={() =>this.setState({isChangePasswordModal:!this.state.isChangePasswordModal})}>Cancel</Button>
                          </ModalFooter>
                        </Modal>
                </div>
                }))
            ]
                
            
        }
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        
                    <Breadcrumbs title="Restuarants" breadcrumbItems={this.state.breadcrumbItems} />
                       <div >
                       
                        </div>
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <CardBody className="pt-0">
                                        <Nav tabs className="nav-tabs-custom mb-4">
                                            <NavItem>
                                                <NavLink onClick={() => { this.toggleTab('1'); }} className={classnames({ active: this.state.activeTab === '1' }, "font-weight-bold p-3")}>All Restaurant</NavLink>
                                            </NavItem>
                                            {/* <NavItem>
                                                <NavLink onClick={() => { this.toggleTab('2'); }} className={classnames({ active: this.state.activeTab === '2' }, "p-3 font-weight-bold")}>Active</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink onClick={() => { this.toggleTab('3'); }} className={classnames({ active: this.state.activeTab === '3' }, " p-3 font-weight-bold")}>Unpaid</NavLink>
                                            </NavItem> */}
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
     data:makeSelectDataFromAPI(),
    loading:makeSelectLoading(),
})
const mapDispatchToProps =(dispatch)=>{ 
    return {
        onGetRestuarantData:()=>dispatch(getRestuarantData()),
        onDelete:(id)=>dispatch(deleteRestuarant(id)),
    }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ViewRestuarant);
