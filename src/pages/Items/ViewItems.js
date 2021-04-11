import React, { Component } from 'react';
import { Container, Card, CardBody, Row, Col, Nav, NavItem, NavLink, UncontrolledTooltip,Badge,Modal,ModalHeader,ModalFooter, Button } from "reactstrap";
import { Link } from "react-router-dom";
import classnames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {compose} from 'redux';
import { MDBDataTable } from "mdbreact";
import "./datatables.scss";
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { getItemData,deleteItem } from '../../store/Items/actions';
import {makeSelectDataFromAPI} from "../../store/Items/selectors"

class ViewItems extends Component {
    constructor(props) {
        super(props);
        this.state={
            breadcrumbItems : [
                { title : "Dashboard", link : "/dashboard" },
                { title : "View Items", link : "/view-items" },
            ],
            activeTab: '1',   
            isModal: false,
            deleteId:''
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

    componentDidMount(){
        document.getElementsByClassName("pagination")[0].classList.add("pagination-rounded");
        this.props.onGetItemDataAPI()
    }
    onDelete(id){
        this.setState({ isModal:!this.state.isModal});
        this.setState({ deleteId:id})
     
    }
    onDeleteItem(id){
        this.setState({ isModal:!this.state.isModal});
        this.props.onDeleteItem(id)
    }
  
    render() {
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
                label: "Nickname",
                field: "nickname",
                sort: "asc",
                width: 93
              },
              {
                label: "Category",
                field: "category",
                sort: "asc",
                width: 109
              },
              {
                label: "Price",
                field: "price",
                sort: "asc",
                width: 48
              },
              {
                label: "Discount Price",
                field: "discountPrice",
                sort: "asc",
                width: 48
              },
              {
                label: "Discount Rate",
                field: "discountRate",
                sort: "asc",
                width: 48
              },
              {
                label: "Availability Status",
                field: "status",
                sort: "asc",
                width: 135
              },
              
              {
                label: "Action",
                field: "action",
                sort: "asc",
                width: 120
              },
            ],
            rows: 
                this.props.data &&  [...this.props.data.map((td)=>(
                    
                         {
                        
                        // eslint-disable-next-line jsx-a11y/alt-text
                        image:<div style={{width:'60px',height:'60px'}}><img style={{width:'100%',height:'100%'}} src={`https://khajaorder.com/korderapi/images/items/${ td.i_image1}`}/></div> ,
                        name:td.i_name, 
                        category:td.category.map((cat,i)=><div style={{display:'flex'}}><p>{i+1}. </p><p>{cat.label}</p></div>),
                        nickname:td.i_callname,
                        price:td.i_price,
                        discountPrice  : td.i_dis_price,
                        discountRate: td.i_disc_percent+"%",
                        status :<>{td.i_available==="yes"?<Badge className="badge-soft-success mr-1">Active</Badge>:<Badge className="badge-soft-danger mr-1">Not Active</Badge>}</>, 
                       action:<>
                       <Link to={`items/${td.i_id}`} className="mr-3 text-primary" id="edit3"><i className="mdi mdi-pencil font-size-18"></i></Link>
                            <UncontrolledTooltip placement="top" target="edit3">
                                Edit
                            </UncontrolledTooltip >
                        <Link to="#" onClick={()=>this.onDelete(td.i_id)} className="text-danger" id="delete3"><i className="mdi mdi-trash-can font-size-18"></i></Link>
                            <UncontrolledTooltip placement="top" target="delete3">
                                Delete
                            </UncontrolledTooltip >
                            
                             <Modal
                          size="sm"
                          isOpen={this.state.isModal}
                          toggle={this.tog_small}
                          style={{top:'300px' }}
                        >
                          <ModalHeader toggle={() => this.setState({ isModal: false })}>
                              <h5>Do you want to delete it?</h5>
                          </ModalHeader>
                          
                          <ModalFooter>
                              <Button onClick={()=>this.onDeleteItem(this.state.deleteId)}>Ok</Button>
                              <Button onClick={() =>this.setState({isModal:!this.state.isModal})}>Cancel</Button>
                          </ModalFooter>
                        </Modal>
                        </>,
                    }
                    
                ))
            ]
        }

        console.log("data items",this.props.data)
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        
                    <Breadcrumbs title="ITEMS" breadcrumbItems={this.state.breadcrumbItems} />
                        <Row className="mb-4">
                            <Col>
                           <Link to="add-item"><Button>Add Items</Button></Link> 
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <CardBody className="pt-0">
                                        <Nav tabs className="nav-tabs-custom mb-4">
                                            <NavItem>
                                                <NavLink onClick={() => { this.toggleTab('1'); }} className={classnames({ active: this.state.activeTab === '1' }, "font-weight-bold p-3")}>All Items</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink onClick={() => { this.toggleTab('2'); }} className={classnames({ active: this.state.activeTab === '2' }, "p-3 font-weight-bold")}>Active</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink onClick={() => { this.toggleTab('3'); }} className={classnames({ active: this.state.activeTab === '3' }, " p-3 font-weight-bold")}>Unpaid</NavLink>
                                            </NavItem>
                                        </Nav>
                                        <MDBDataTable responsive data={data} className="mt-4" />
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
    // loading:makeSelectLoading(),
    
})
const mapDispatchToProps =(dispatch)=>{ 
    return {
         onGetItemDataAPI:()=>dispatch(getItemData()),
         onDeleteItem:(id)=>dispatch(deleteItem(id)),
        
        // onDelete:(id)=>dispatch(deleteRestuarant(id)),
    }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ViewItems);
