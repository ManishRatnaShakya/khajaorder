import React, { Component } from 'react';
import { Container, Card, CardBody, Row, Nav, NavItem, NavLink,CardTitle,CardSubtitle, Spinner,TabPane, TabContent, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import classnames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Editor } from "react-draft-wysiwyg";
// import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {draftToHtml} from  'draftjs-to-html';
import { convertToHTML } from 'draft-convert';
//Dropzone
import Dropzone from "react-dropzone";
import {getRestuarantData} from '../../store/Restuarant/actions';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import {
    changeItemName,
    // changeEmail,
    changeItemNickname,
    changeCategory ,
    changeRestuarant,
    changeRegularPrice ,
    changeNewPrice,
    changeDiscountRate ,
    changeImage1 ,
    changeImage2 ,
    
    changeDescription ,
   setInitial,
    saveItemChanges
} from '../../store/Items/actions';
//select
import Select from 'react-select';
import { getCategoryData} from '../../store/Category/actions';
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { compose } from 'redux';
import {
    //  makeSelectItemName,
    // makeSelectItemNickname,
 
    // makeSelectRegularPrice,
    // makeSelectNewPrice,
    // makeSelectDiscountRate,
    // // contact1:makeSelectDescription(),
    // makeSelectImage2,
    // makeSelectImage1,
    // makeSelectDescription,
    makeSelectItemSuccess,
    makeSelectLoading,
    makeSelectError
    
 } from '../../store/Items/selectors';
 import {makeSelectCategory} from '../../store/Category/selectors';
 import {makeSelectRestaunt} from '../../store/Restuarant/selectors';
// import { setInitial } from '../../store/Restuarant/actions';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state={
            breadcrumbItems : [
                { title : "View Items ", link : "/items" },
                { title : "Add Items", link : "/add-items" },
            ],
            activeTab: 1,
            selectedFiles: [],
            selectedFiles1: [],
            selectedFilesCover: [],
            selectedFilesCover1: [],
            items:{
                i_available:"yes", 
            },
            isOffer: false,
            isAvailable: false,

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
          this.setState({selectedFiles:files})
        this.setState({items:{...this.state.items, i_image1: files }});
        // this.props.onChangeImage1(files);
      };
    handleAcceptedFiles1 = files => {
        files.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            formattedSize: this.formatBytes(file.size)
          })
        );
          this.setState({selectedFiles1:files})
        this.setState({items:{...this.state.items, i_image3: files }});
        // this.props.onChangeImage1(files);
      };
    handleAcceptedFilesCover = files => {
        files.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            formattedSize: this.formatBytes(file.size)
          })
        );
          this.setState({selectedFilesCover:files})
        this.setState({items:{...this.state.items,  i_image2: files }});
        // this.props.onChangeImage2(files);
      };
    handleAcceptedFilesCover1 = files => {
        files.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            formattedSize: this.formatBytes(file.size)
          })
        );
          this.setState({selectedFilesCover1:files})
        this.setState({items:{...this.state.items,  i_image4: files }});
        // this.props.onChangeImage2(files);
      };
    
      /**
       * Formats the size
       */
      
    onSuccess(){
        this.setState({
                    activeTab: 1
                });
         toastr.options={
            positionClass:"toast-bottom-right",
            closeButton:true
        }


        toastr.success("Items added successful");
        this.setState({items:{
            i_name:'',
            i_callname:'',
            i_cat_id:[],
            i_disc_percent:'',
            i_dis_price:'',
            i_price:'',
            i_image1:[],
            i_image2:[],
            i_image3:[],
            i_image4:[],
           
          
        }
        
        })
        this.setState({isOffer: false})
        this.setState({isAvailable: false})
        this.setState({selectedFiles: []})
        this.setState({selectedFilesCover1: []})
        this.setState({selectedFilesCover: []})
        this.setState({selectedFiles1: []})
        this.props.onGetRestuarantData();
        // this.props.onGetCategoryData();
        this.props.onSetInitial();    
    }  
      onSubmit(){
            const items=this.state.items
            console.log("from itemses",items)
            this.props.onSubmit(items)
      }
      formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024*5;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
      };

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            if(tab >= 1 && tab <=2 ){
                this.setState({
                    activeTab: tab
                });
            }
        }
    }
    isSetOffer(){
        this.setState({isOffer:!this.state.isOffer})
         if(this.state.isOffer===false){
        this.setState({items:{...this.state.items,i_offer:"yes"}});
        }
        else{
         this.setState({items:{...this.state.items,i_offer:"no"}});   
        }
    }
    isSetAvailable(){
        this.setState({isAvailable:!this.state.isAvailable})
         if(this.state.isAvailable===false){
        this.setState({items:{...this.state.items,i_available:"yes"}});
        }
        else{
         this.setState({items:{...this.state.items,i_available:"no"}});   
        }
    }
    onEditorStateChange=(editorState)=>{
        console.log("value from editor",draftToHtml(editorState));
    }

     onError(){
           toastr.options={
            positionClass:"toast-bottom-right",
            closeButton:true
        }

        toastr.warning("Please Recheck All the Fields");
        this.props.onSetInitial();
    }
    componentDidMount() {
        this.props.onGetRestuarantData();
        this.props.onGetCategoryData();
    }
  
    render() {
        console.log("from item category",this.state);
       
        if(this.props.success){
            this.onSuccess();
        }
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                    
                    <Breadcrumbs title="Add Items" breadcrumbItems={this.state.breadcrumbItems} />

                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <CardBody>
                                        
                                        <div id="addproduct-nav-pills-wizard" className="twitter-bs-wizard">
                                            <Nav pills justified className="twitter-bs-wizard-nav">
                                                <NavItem>
                                                    <NavLink onClick={() => { this.toggleTab(1); }} className={classnames({ active: this.state.activeTab === 1 })}>
                                                        <span className="step-number">01</span>
                                                        <span className="step-title">Items Info</span>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink onClick={() => { this.toggleTab(2); }} className={classnames({ active: this.state.activeTab === 2 })}>
                                                        <span className="step-number">02</span>
                                                        <span className="step-title">Items Images</span>
                                                    </NavLink>
                                                </NavItem>
                                                
                                                {/* <NavItem>
                                                    <NavLink onClick={() => { this.toggleTab(3); }} className={classnames({ active: this.state.activeTab === 3 })}>
                                                        <span className="step-number">03</span>
                                                        <span className="step-title">Social Media Information</span>
                                                    </NavLink>
                                                </NavItem> */}
                                            </Nav>
                                            <TabContent activeTab={this.state.activeTab} className="twitter-bs-wizard-tab-content">
                                                <TabPane tabId={1}>
                                                    <h4 className="card-title">Items Information</h4>
                                                    <p className="card-title-desc">Fill all information below</p>

                                                    <Form>
                                                        <FormGroup>
                                                            <Label htmlFor="productname">Item Name</Label>
                                                            <Input id="productname" onChange={(e)=>this.setState({items:{...this.state.items,i_name:e.target.value}})} name="productname" value={this.state.items.i_name} type="text" className="form-control"/>
                                                        </FormGroup>
                                                       
                                                                <FormGroup>
                                                                    <Label htmlFor="manufacturername">Nick Name</Label>
                                                                    <Input  onChange={(e)=>this.setState({items:{...this.state.items,i_callname:e.target.value}})} name="productname" value={this.state.items.i_callname} type="text" className="form-control"/>
                                                                </FormGroup>
                                                           
                                                        
                                                        <Row>
                                                            <Col md={6}>
                                                                
                                                                {/* <FormGroup>
                                                                    <Label htmlFor="manufacturerbrand">Category</Label>
                                                                    <Input  onChange={(e)=>this.setState({items:{...this.state.items,category:e.target.value}})}  value={this.state.items.category} type="text" className="form-control"/>
                                                                </FormGroup> */}
                                                                <FormGroup className="select2-container">
                                                                    <Label className="control-label">Multiple Select Category</Label>
                                                                    <Select
                                                                        value={this.state.items.i_cat_id}
                                                                        isMulti={true}
                                                                        onChange={(category)=>this.setState({items:{...this.state.items,i_cat_id:category}})}
                                                                        options={this.props.categoryData && this.props.categoryData.map(file=>({label:`${file.cat_name}`, value:`${file.cat_id}`}))}
                                                                        classNamePrefix="select2-selection"
                                                                    />
													            </FormGroup>
                                                            </Col>
                                                            <Col md={6}>
                                                                <FormGroup  className="select2-container">
                                                                    <Label className="control-label">Restuarant</Label>
                                                                    <Select 
                                                                    isMulti={true}
                                                                     onChange={(e)=>this.setState({items:{...this.state.items,i_r_id:e}})}  
                                                                        
                                                                        options=
                                                                        {this.props.restuarantData && this.props.restuarantData.map(restuarant=>
                                                                        ({label:`${restuarant.r_name}`,value:`${restuarant.r_id}`})
                                                                        )}
                                                                        />
                                                                    
                                                                </FormGroup>
                                                            </Col>
                                                           
                                                        </Row>

                                                        <Row>
                                                            <Col md={8}>
                                                             <FormGroup>
                                                                    <Label htmlFor="Regular Price">Regular Price</Label>
                                                                    <Input   onChange={(e)=>this.setState({items:{...this.state.items,i_price:e.target.value}})}  value={this.state.items.i_price} type="number" className="form-control"/>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col style={{display:"flex",alignItems:'flex-end'}} md={4}>
                                                                   <FormGroup>
                                                                     <div className="form-check mb-3" style={{display:"flex",alignItems:'flex-end'}}>
                                                                    <Input className="form-check-input" type="checkbox" value="" id="defaultCheck1" checked={this.state.isOffer} onClick={()=>this.isSetOffer()}/>
                                                                    <Label className="form-check-label" htmlFor="defaultCheck1">
                                                                        Is that an Offer?
                                                                    </Label>
                                                                    </div>
                                                                </FormGroup>
                                                                
                                                            </Col>
                                                        </Row>
                                                        {this.state.isOffer &&
                                                        <Row>
                                                             <Col md={6}>
                                                             <FormGroup>
                                                                    <Label htmlFor="Regular Price">New Price</Label>
                                                                    <Input   onChange={(e)=>this.setState({items:{...this.state.items,i_dis_price:e.target.value}})}  value={this.state.items.i_dis_price} type="number" className="form-control"/>
                                                                </FormGroup>
                                                            </Col>
                                                             <Col md={6}>
                                                             <FormGroup>
                                                                    <Label htmlFor="Regular Price">Discount Rate %</Label>
                                                                    <Input   onChange={(e)=>this.setState({items:{...this.state.items,i_disc_percent:e.target.value}})}  value={this.state.items.i_disc_percent} type="number" className="form-control"/>
                                                                </FormGroup>
                                                            </Col>

                                                        </Row>
                                                            }
                                                        <Row>
                                                        
                                                        <Col>
                                                            <Card>
                                                            <CardBody>
                                                                <CardTitle>Description</CardTitle>
                                                                <CardSubtitle className="mb-3">
                                                                    Some details about the Item.
                                                                </CardSubtitle>

                                                               
                                                                <Editor
                                                                    toolbarClassName="toolbarClassName"
                                                                    wrapperClassName="wrapperClassName"
                                                                    editorClassName="editorClassName"
                                                                    
                                                                    // onChange={this.props.onChangeDescription}
                                                                    onEditorStateChange={(editorState)=>this.setState({items:{...this.state.items, i_description:convertToHTML(editorState.getCurrentContent())}})}
                                                                    //   value={this.props.description} 
                                                                />
                                                               

                                                            </CardBody>
                                                            </Card>
                                                        </Col>
                                                        </Row>

                                                    </Form>
                    
                                                </TabPane>
                                                <TabPane tabId={2}>
                                                     <h4 className="card-title">Item Image</h4>
                                                        <p className="card-title-desc">Upload Item Images</p>
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
                                                        <h4 className="card-title">Item Image</h4>
                                                        <p className="card-title-desc">Upload Item Images</p>
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
                                                     <h4 className="card-title">Item Image</h4>
                                                        <p className="card-title-desc">Upload Item Images</p>
                                                    
                                                        <Dropzone
                                                            onDrop={acceptedFiles =>
                                                            this.handleAcceptedFiles1(acceptedFiles)
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
                                                            {this.state.selectedFiles1.map((f, i) => {
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
                                                        <h4 className="card-title">Item Image</h4>
                                                        <p className="card-title-desc">Upload Item Images</p>
                                                        <Dropzone
                                                            onDrop={acceptedFiles =>
                                                            this.handleAcceptedFilesCover1(acceptedFiles)
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
                                                            {this.state.selectedFilesCover1.map((f, i) => {
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
                                                              {this.props.loading? <Spinner style={{ width: '1.5rem', height: '1.5rem' }} />:<div>    
                                                        <Button color="primary" onClick={()=>this.onSubmit()} className="mr-2 waves-effect waves-light">Save Changes</Button>
                                                        <Button color="light" type="submit" className="waves-effect ml-1">Cancel</Button></div>}
                                                    </div>
                                                    {this.props.error && this.onError()}
                                                        </Form>

                                                </TabPane>
                                               

                                                  
                                                
                                            </TabContent>
                                            <ul className="pager wizard twitter-bs-wizard-pager-link">
                                            <li className={this.state.activeTab === 1 ? "previous disabled" : "previous"}><Link to="#" onClick={() => { this.toggleTab(this.state.activeTab - 1);} }>Previous</Link></li>
                                                <li className={this.state.activeTab === 2 ? "next disabled" : "next"}><Link to="#" onClick={() => { this.toggleTab(this.state.activeTab + 1);} }>Next</Link></li>
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
    success:makeSelectItemSuccess(),
    categoryData:makeSelectCategory(),
    restuarantData:makeSelectRestaunt(),
    loading:makeSelectLoading(),
    error:makeSelectError(),
})
const mapDispatchToProps =(dispatch)=>{ 
    return {
        onChangeItemName: evt=>dispatch(changeItemName(evt.target.value)),
        onChangeItemNickname: evt=>dispatch(changeItemNickname(evt.target.value)),
        onChangeCategory: evt=>dispatch(changeCategory(evt.target.value)),
        onChangeRestuarant: evt=>dispatch(changeRestuarant(evt.target.value)),
        onChangeRegularPrice: evt=>dispatch(changeRegularPrice(evt.target.value)),
        onChangeNewPrice: evt=>dispatch(changeNewPrice(evt.target.value)),
        onChangeDiscountRate: evt=>dispatch(changeDiscountRate(evt.target.value)),
        
        onChangeDescription: editorState=>dispatch(changeDescription(editorState)),
        
        onChangeImage1:(img)=>dispatch(changeImage1(img)),
        onChangeImage2:(cover)=>dispatch(changeImage2(cover)),
        onSetInitial:()=>dispatch(setInitial()),
        onSubmit:(items)=>dispatch(saveItemChanges(items)),
        onGetRestuarantData:()=>dispatch(getRestuarantData()),
        onGetCategoryData:()=>dispatch(getCategoryData()),
    }
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AddProduct);