import React, { Component } from 'react';
import { Container, Card, CardBody, Row,Spinner, Nav, NavItem, NavLink,CardTitle,CardSubtitle, TabPane, TabContent, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import classnames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
//Dropzone
import Dropzone from "react-dropzone";
import {
    changeCategoryName,
    changeCategoryImage,
    saveChanges,
    setCategoryData,
    setInitial
} from '../../store/Category/actions';
//select
import Select from 'react-select';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { compose } from 'redux';
import {

  makeSelectLoading,
  makeSelectSuccess,
  makeSelectError
    
 } from '../../store/Category/selectors';
// import { setInitial } from '../../store/Items/actions';

class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.state={
            breadcrumbItems : [
                { title : "View Category ", link : "/category" },
                { title : "Add Category", link : "/add-category" },
            ],
            activeTab: 1,
            selectedFiles: [],
            selectedFilesCover: [],
            category:{}
        }
       
        this.toggleTab = this.toggleTab.bind(this);
        this.handleAcceptedFiles = this.handleAcceptedFiles.bind(this);
    }
   
    handleAcceptedFiles = files => {
        files.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            formattedSize: this.formatBytes(file.size)
          })
        );
          
        this.setState({ selectedFiles: files });
        this.setState({category:{...this.state.category,cat_image:files}})
        // this.props.onChangeImage(files);
      };
   
    
      /**
       * Formats the size
       */
      formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
      };

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            if(tab >= 1 && tab <=3 ){
                this.setState({
                    activeTab: tab
                });
            }
        }
    }

    onSuccess(){
        this.setState({
                    activeTab: 1
                });
        this.setState({category:{
            cat_name:'',
            cat_image:[]
        }
        })
         toastr.options={
            positionClass:"toast-bottom-right",
            closeButton:true
        }

        toastr.success("Category Edited Successful");
        this.setState({selectedFiles:[]})
        this.props.onSetInitial();    
    }    
    onError(){
           toastr.options={
            positionClass:"toast-bottom-right",
            closeButton:true
        }

        toastr.warning("Please Recheck All the Fields");
        this.props.onSetInitial();
    }
    render() {
        if(this.props.success){
            this.onSuccess()
        }
        console.log("data from category",this.state)
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                    
                    <Breadcrumbs title="Add Category" breadcrumbItems={this.state.breadcrumbItems} />

                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <CardBody>
                                        
                                        <div id="addproduct-nav-pills-wizard" className="twitter-bs-wizard">
                                            
                                            <TabContent activeTab={this.state.activeTab} className="twitter-bs-wizard-tab-content">
                                                <TabPane tabId={1}>
                                                    <h4 className="card-title">Category Information</h4>
                                                    <p className="card-title-desc">Fill all information below</p>

                                                    <Form>
                                                        <FormGroup>
                                                            <Label htmlFor="productname">Category Name</Label>
                                                            <Input id="productname" onChange={(e)=>this.setState({category:{...this.state.category,cat_name:e.target.value}})} name="productname" value={this.state.category.cat_name} type="text" className="form-control"/>
                                                        </FormGroup>
                                                       
                                                             
                                                        <Row >
                                                           <Col md={12}> 
                                                            <Dropzone
                                                            onDrop={acceptedFiles =>
                                                            this.handleAcceptedFiles(acceptedFiles)
                                                            }
                                                        >
                                                            {({ getRootProps, getInputProps }) => (
                                                            <div className="dropzone">
                                                                <div
                                                                className="dz-message needsclick mt-2"
                                                                {...getRootProps()}
                                                                >
                                                                <input {...getInputProps()} />
                                                                <div className="mb-3">
                                                                    <i className="display-4 text-muted ri-upload-cloud-2-line"></i>
                                                                </div>
                                                                <h4>Drop files here or click to upload.</h4>
                                                                </div>
                                                            </div>
                                                            )}
                                                        </Dropzone>
                                                        <div
                                                            className="dropzone-previews mt-3"
                                                            id="file-previews"
                                                        >
                                                            {this.state.selectedFiles.map((f, i) => {
                                                            return (
                                                                <Card
                                                                className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                                key={i + "-file"}
                                                                >
                                                                <div className="p-2">
                                                                    <Row className="align-items-center">
                                                                    <Col className="col-auto">
                                                                        <img
                                                                        data-dz-thumbnail=""
                                                                        height="80"
                                                                        className="avatar-sm rounded bg-light"
                                                                        alt={f.name}
                                                                        src={f.preview}
                                                                        />
                                                                    </Col>
                                                                    <Col>
                                                                        <Link
                                                                        to="#"
                                                                        className="text-muted font-weight-bold"
                                                                        >
                                                                        {f.name}
                                                                        </Link>
                                                                        <p className="mb-0">
                                                                        <strong>{f.formattedSize}</strong>
                                                                        </p>
                                                                    </Col>
                                                                    </Row>
                                                                </div>
                                                                </Card>
                                                            );
                                                            })}
                                                        </div>
                                                        </Col>
                                                        </Row>
                                                       
                                                        <div className="text-center mt-4">
                                                              {this.props.loading? <Spinner style={{ width: '1.5rem', height: '1.5rem' }} />:<>
                                                        <Button color="primary" onClick={()=>this.props.onSubmit(this.state.category)} className="mr-2 waves-effect waves-light">Save Changes</Button>
                                                        <Button color="light" type="submit" className="waves-effect ml-1">Cancel</Button></>}
                                                        </div>
                                                        {this.props.error && this.onError()}
                                                    </Form>
                    
                                                </TabPane>
                                            </TabContent>
                                          
                                        </div>
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
    loading:makeSelectLoading(),
    success:makeSelectSuccess(),
    error:makeSelectError(),
})
const mapDispatchToProps =(dispatch)=>{ 
    return {
      onSetInitial:()=>dispatch(setInitial()),
        onSubmit:(data)=>dispatch(setCategoryData(data)),
    }
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AddCategory);