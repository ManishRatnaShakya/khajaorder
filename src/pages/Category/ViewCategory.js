import React, { Component } from 'react';
import { Container, Card, CardBody, Row, Col, Nav, NavItem, NavLink, UncontrolledTooltip,Modal,ModalHeader,ModalFooter, Input, Label, Button } from "reactstrap";
import { Link } from "react-router-dom";
import classnames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { MDBDataTable } from "mdbreact";
import "./datatables.scss";
import { compose } from 'redux';
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { makeSelectCategory } from './../../store/Category/selectors';
import {deleteCategory,getCategoryData} from '../../store/Category/actions'
class ViewCategory extends Component {
    constructor(props) {
        super(props);
        this.state={
            breadcrumbItems : [
                { title : "Dashboard", link : "/dashboard" },
                { title : "View Items", link : "/category" },
            ],
            activeTab: '1',
            deleteId:'', 
        isModal:false,       }
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
        this.props.onGetCategoryData();
    }
    onDeleteCategory(id) {
            this.setState({isModal:!this.state.isModal});
            this.props.onDeleteCategory(id)
    }
    onDelete(id){
           this.setState({isModal:!this.state.isModal});
            this.setState({deleteId:id});

    }
    render() {
        
        const data = {
            columns: [
             
              {
                label: "Id",
                field: "id",
                sort: "asc",
                width: 78
              },
              {
                label: "Image",
                field: "image",
                sort: "asc",
                width: 78
              },

              {
                label: "Category Name",
                field: "name",
                sort: "asc",
                width: 48
              },
              
              {
                label: "Action",
                field: "action",
                sort: "asc",
                width: 120
              },
            ],
            rows: this.props.category && [
                ...this.props.category.map((td)=>(
                    
                         {
                        
                        // eslint-disable-next-line jsx-a11y/alt-text
                        image:<div style={{width:'60px',height:'60px'}}><img style={{width:'100%',height:'100%'}} src={`https://khajaorder.com/korderapi/images/categories/${ td.cat_image}`}/></div> ,
                        id:td.cat_id,
                        name:td.cat_name,
                        action:<><Link to={`/category/${td.cat_id}`} className="mr-3 text-primary" id="edit3"><i className="mdi mdi-pencil font-size-18"></i></Link>
                            <UncontrolledTooltip placement="top" target="edit3">
                                Edit
                            </UncontrolledTooltip >
                        <Link to="#" onClick={()=>this.onDelete(td.cat_id)} className="text-danger" id="delete3"><i className="mdi mdi-trash-can font-size-18"></i></Link>
                            <UncontrolledTooltip placement="top" target="delete3">
                                Delete
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
                              <Button onClick={()=>this.onDeleteCategory(this.state.deleteId)}>Ok</Button>
                              <Button onClick={() =>this.setState({isModal:!this.state.isModal})}>Cancel</Button>
                          </ModalFooter>
                        </Modal>
                </>,
                    }
                    
                ))
            ]
        }
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        
                    <Breadcrumbs title="View Category" breadcrumbItems={this.state.breadcrumbItems} />
                        <Row className="mb-4">
                            <Col>
                           <Link to="add-category"><Button>Add Category</Button></Link> 
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <CardBody className="pt-0">
                                        <Nav tabs className="nav-tabs-custom mb-4">
                                            <NavItem>
                                                <NavLink onClick={() => { this.toggleTab('1'); }} className={classnames({ active: this.state.activeTab === '1' }, "font-weight-bold p-3")}>All Category</NavLink>
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
    // categoryName:makeSelectCategoryName(),
    // categoryImage:makeSelectCategoryImage(),
        category:makeSelectCategory()

})
const mapDispatchToProps =(dispatch)=>{ 
    return {
        // onChangeName: evt=>dispatch(changeCategoryName(evt.target.value)),
       onDeleteCategory: (id)=>dispatch(deleteCategory(id)),
        // onChangeImage:(image)=>dispatch(changeCategoryImage(image)),
        // onSubmit:()=>dispatch(saveChanges()),
        onGetCategoryData:()=>dispatch(getCategoryData())
    }
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ViewCategory);