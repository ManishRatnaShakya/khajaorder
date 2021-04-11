import React, { Component } from 'react';
import { Container, Card, CardBody, Row, Nav, NavItem, NavLink, TabPane,Spinner, TabContent, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import classnames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
//Dropzone
import Dropzone from "react-dropzone";
import {
   
    saveChanges,
   
    setInitial,
} from '../../store/Restuarant/actions';
//select
// import Select from 'react-select';s

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { compose } from 'redux';
import {
    
   makeSelectSetSuccess,
   makeSelectSetError,
   makeSelectSetLoading,
 } from '../../store/Restuarant/selectors';
// import Alert from 'reactstrap/lib/Alert';
// import { makeSelectSetStatus } from './../../store/Restuarant/selectors';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state={
            breadcrumbItems : [
                { title : "Restuarant", link : "#" },
                { title : "Add Restuarant", link : "#" },
            ],
            activeTab: 1,
            selectedFiles: [],
            selectedFilesCover: [],
            restuarant:{}
            
        }
       
        this.toggleTab = this.toggleTab.bind(this);
        this.handleAcceptedFiles = this.handleAcceptedFiles.bind(this);
    }
    onSubmitData(){
        const data=this.state.restuarant;
        this.props.onSubmit(data);

    }
    
    componentDidMount(){
        console.log("this is renders")
    }
    
   
    
    handleAcceptedFiles = files => {
        files.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            formattedSize: this.formatBytes(file.size)
          })
        );
          
        this.setState({ selectedFiles: files });
        this.setState({restuarant:{...this.state.restuarant,r_logo:files}});
      };
    handleAcceptedFilesCover = files => {
        files.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            formattedSize: this.formatBytes(file.size)
          })
        );
    
        this.setState({ selectedFilesCover: files });
        this.setState({restuarant:{...this.state.restuarant,r_cover:files}});
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

    onSuccess(){
        this.setState({
                    activeTab: 1
                });
        
        toastr.options={
            positionClass:"toast-bottom-right",
            closeButton:true
        }

        toastr.success("Restuarant added successful");
        this.setState({restuarant:{
            r_name:'',
            ad_email:'',
            ad_password:'',
            r_streetname:'',
            r_tagline:'',
            r_state:'0',
            r_city:'',
            r_contact1:'',
            r_contact2:'',
            r_description:'',
            rd_f_link:'',
            r_zipcode:'',
            rd_i_link:'',
            rd_y_link:'',
            rd_gmap_code:'',
            rd_w_link:'',
            r_available:false,

        }
        })
          this.setState({ selectedFilesCover: [] });
          this.setState({ selectedFiles: [] });
          this.props.onSetInitial();    
    }   
    
    onError(){
         
        toastr.options={
            positionClass:"toast-bottom-right",
            closeButton:true
        }
        toastr.warning("Recheck The Email  ")
        this.props.onSetInitial();  
    }
    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            if(tab >= 1 && tab <=3 ){
                this.setState({
                    activeTab: tab
                });
            }
        }
    }
  
    isSetAvailable(){
        this.setState({isAvailable:!this.state.isAvailable})
        if(this.state.isAvailable===false){
            this.setState({restuarant:{...this.state.restuarant,r_available:"yes"}})
        }
        else{
            this.setState({restuarant:{...this.state.restuarant,r_available:"no"}})
        }
    }
    render() {
        console.log("state",this.state);

        if(this.props.success){
            this.onSuccess()
        }
         
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                    
                    <Breadcrumbs title="Add Product" breadcrumbItems={this.state.breadcrumbItems} />

                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <CardBody>
                                        
                                        <div id="addproduct-nav-pills-wizard" className="twitter-bs-wizard">
                                            <Nav pills justified className="twitter-bs-wizard-nav">
                                                <NavItem>
                                                    <NavLink onClick={() => { this.toggleTab(1); }} className={classnames({ active: this.state.activeTab === 1 })}>
                                                        <span className="step-number">01</span>
                                                        <span className="step-title">Restuarant Info</span>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink onClick={() => { this.toggleTab(2); }} className={classnames({ active: this.state.activeTab === 2 })}>
                                                        <span className="step-number">02</span>
                                                        <span className="step-title">Restuarant Images</span>
                                                    </NavLink>
                                                </NavItem>
                                                
                                                <NavItem>
                                                    <NavLink onClick={() => { this.toggleTab(3); }} className={classnames({ active: this.state.activeTab === 3 })}>
                                                        <span className="step-number">03</span>
                                                        <span className="step-title">Social Media Information</span>
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                            <TabContent activeTab={this.state.activeTab} className="twitter-bs-wizard-tab-content">
                                                <TabPane tabId={1}>
                                                    <h4 className="card-title">Restuarant Information</h4>
                                                    <p className="card-title-desc">Fill all information below</p>

                                                    <Form>
                                                        <FormGroup>
                                                            <Label htmlFor="productname">Restuarant Name</Label>
                                                            <Input id="productname" onChange={(e)=>this.setState({restuarant:{...this.state.restuarant,r_name:e.target.value}})} name="productname" value={this.state.restuarant.r_name} type="text" className="form-control"/>
                                                        </FormGroup>
                                                        <Row>
                                                            <Col lg={6}>
                                                                
                                                                <FormGroup>
                                                                    <Label htmlFor="manufacturername">Email Address</Label>
                                                                    <Input onChange={(e)=>this.setState({restuarant:{...this.state.restuarant,ad_email:e.target.value}})} name="productname" value={this.state.restuarant.ad_email} type="text" className="form-control"/>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col lg={6}>
                                                                
                                                                <FormGroup>
                                                                    <Label htmlFor="manufacturerbrand">Password</Label>
                                                                    <Input onChange={(e)=>this.setState({restuarant:{...this.state.restuarant,ad_password:e.target.value}})} value={this.state.restuarant.ad_password} type="password" className="form-control"/>
                                                                </FormGroup>
                                                            </Col>
                                                            
                                                        </Row>
                                                        <Row>
                                                           
                                                            <Col >
                                                                <FormGroup>
                                                                    <Label htmlFor="address">Street Name</Label>
                                                                    <Input onChange={(e)=>this.setState({restuarant:{...this.state.restuarant,r_streetname:e.target.value}})} value={this.state.restuarant.r_streetname} type="text" className="form-control"/>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md={4}>
                                                                <FormGroup>
                                                                    <Label htmlFor="city">City</Label>
                                                                    <Input onChange={(e)=>this.setState({restuarant:{...this.state.restuarant,r_city:e.target.value}})} value={this.state.restuarant.r_city}  type="text" className="form-control"/>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md={4}>
                                                                <FormGroup>
                                                                    <Label className="control-label">State</Label>
                                                                    <select className="form-control select2" onChange={(e)=>this.setState({restuarant:{...this.state.restuarant,r_state:e.target.value}})} defaultValue={this.state.restuarant.r_state}>
                                                                        <option value="0">Select State</option>
                                                                        <option value="1">1</option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>
                                                                        <option value="4">4</option>
                                                                        <option value="5">5</option>
                                                                    </select>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md={4}>
                                                                <FormGroup>
                                                                    <Label htmlFor="city">Zip Code</Label>
                                                                    <Input  onChange={(e)=>this.setState({restuarant:{...this.state.restuarant,r_zipcode:e.target.value}})} value={this.state.restuarant.r_zipcode} type="text" className="form-control"/>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col md={6}>
                                                                <FormGroup>
                                                                    <Label htmlFor="Contact 1">Contact 1</Label>
                                                                    <Input  onChange={(e)=>this.setState({restuarant:{...this.state.restuarant,r_contact1:e.target.value}})} value={this.state.restuarant.r_contact1} type="text" className="form-control"/>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md={6}>
                                                                <FormGroup>
                                                                    <Label htmlFor="Contact 2">Contact 2</Label>
                                                                    <Input  onChange={(e)=>this.setState({restuarant:{...this.state.restuarant,r_contact2:e.target.value}})} value={this.state.restuarant.r_contact2} type="text" className="form-control"/>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                        <FormGroup>
                                                            <Label htmlFor="Tagline">Tagline</Label>
                                                            <textarea className="form-control"  onChange={(e)=>this.setState({restuarant:{...this.state.restuarant,r_tagline:e.target.value}})} value={this.state.restuarant.r_tagline}  rows="5" placeholder="Write the Tagline"></textarea>
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Label htmlFor="description">Description</Label>
                                                            <textarea className="form-control" onChange={(e)=>this.setState({restuarant:{...this.state.restuarant,r_description:e.target.value}})} value={this.state.restuarant.r_description} rows="5" placeholder="Take a note here"></textarea>
                                                        </FormGroup>
                                                    </Form>
                    
                                                </TabPane>
                                                <TabPane tabId={2}>
                                                    <h4 className="card-title">Restuarant Logo</h4>
                                                    <p className="card-title-desc">Upload Restuarant Logo</p>
                                                    <Form>
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
                                                        <br/>
                                                        <br/>
                                                        <h4 className="card-title">Restuarant Cover Image</h4>
                                                        <p className="card-title-desc">Upload Restuarant cover images</p>
                                                        <Dropzone
                                                            onDrop={acceptedFiles =>
                                                            this.handleAcceptedFilesCover(acceptedFiles)
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
                                                            {this.state.selectedFilesCover.map((f, i) => {
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
                                                        </Form>

                                                </TabPane>
                                                <TabPane tabId={3}>
                                                    <h4 className="card-title">Meta Data</h4>
                                                    <p className="card-title-desc">Fill all information below</p>

                                                    <Form>
                                                        <Row>
                                                            <Col sm={3}>
                                                                <FormGroup>
                                                                    <Label htmlFor="metatitle">Facebook URL</Label>
                                                                    <Input  onChange={(e)=>this.setState({restuarant:{...this.state.restuarant,rd_f_link:e.target.value}})} value={this.state.restuarant.rd_f_link} type="text" className="form-control"/>
                                                                </FormGroup>
                                                                
                                                            </Col>
                    
                                                            <Col sm={3}>
                                                                <FormGroup>
                                                                    <Label htmlFor="metakeywords">Instagram URL</Label>
                                                                    <Input  onChange={(e)=>this.setState({restuarant:{...this.state.restuarant,rd_i_link:e.target.value}})} value={this.state.restuarant.rd_i_link} type="text" className="form-control"/>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col sm={3}>
                                                                <FormGroup>
                                                                    <Label htmlFor="metatitle">Youtube URL</Label>
                                                                    <Input  onChange={(e)=>this.setState({restuarant:{...this.state.restuarant,rd_y_link:e.target.value}})} value={this.state.restuarant.rd_y_link} type="text" className="form-control"/>
                                                                </FormGroup>
                                                                
                                                            </Col>
                    
                                                            <Col sm={3}>
                                                                <FormGroup>
                                                                    <Label htmlFor="metakeywords">WebLink</Label>
                                                                    <Input  onChange={(e)=>this.setState({restuarant:{...this.state.restuarant,rd_w_link:e.target.value}})} value={this.state.restuarant.rd_w_link} type="text" className="form-control"/>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>

                                                        <FormGroup>
                                                            <Label htmlFor="metadescription">Your Location On Google Map</Label>
                                                            <textarea className="form-control"  onChange={(e)=>this.setState({restuarant:{...this.state.restuarant,rd_gmap_code:e.target.value}})} value={this.state.restuarant.rd_gmap_code}id="metadescription" rows="5" placeholder="Share your map loaction with the link to Google map"></textarea>
                                                        </FormGroup>
                                                    </Form>
                                                     <Col style={{display:"flex",alignItems:'flex-end'}} md={4}>
                                                                   <FormGroup>
                                                                     <div className="form-check mb-3" style={{display:"flex",alignItems:'flex-end'}}>
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" checked={this.state.isAvailable} onClick={()=>this.isSetAvailable()}/>
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                       Available
                                                                    </Label>
                                                                    </div>
                                                                </FormGroup>
                                                                
                                                            </Col>
                                                    <div className="text-center mt-4">
                                                        {this.props.loading? <Spinner style={{ width: '1.5rem', height: '1.5rem' }} />:
                                                       <div>  <Button color="primary" type="submit" onClick={()=>this.onSubmitData()} className="mr-2 waves-effect waves-light">Save Changes</Button>
                                                        <Button color="light" type="submit" className="waves-effect ml-1">Cancel</Button></div> }
                                                    </div>
                                                    <div>
                                                        
                                                    </div>
                                                </TabPane>
                                            </TabContent>
                                            <ul className="pager wizard twitter-bs-wizard-pager-link" style={{display:'flex',justifyContent:"space-between"}}>
                                            <li className={this.state.activeTab === 1 ? "previous disabled" : "previous"}><Link to="#" onClick={() => { this.toggleTab(this.state.activeTab - 1);} }>Previous</Link></li>
                                            <li>
                                                 {this.props.error && this.onError()}

                                                </li>
                                                <li className={this.state.activeTab === 3 ? "next disabled" : "next"}><Link to="#" onClick={() => { this.toggleTab(this.state.activeTab + 1);} }>Next</Link></li>
                                                
                                            </ul>
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
   
        success:makeSelectSetSuccess(),
        error:makeSelectSetError(),
        loading:makeSelectSetLoading(),
    
})
const mapDispatchToProps =(dispatch)=>{ 
    return {
        onSetInitial:()=>dispatch(setInitial()),
     
        onSubmit:(data)=>dispatch(saveChanges(data)),
    }
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AddProduct);