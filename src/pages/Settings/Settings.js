/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Container, Card, CardBody, Row, Nav, NavItem, NavLink, TabPane, TabContent, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import classnames from 'classnames';

//Dropzone
import Dropzone from "react-dropzone";

//select
import Select from 'react-select';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state={
            breadcrumbItems : [
                { title : "Dashboard", link : "/dashboard" },
                { title : "Settings", link : "" },
            ],
            activeTab: 1,
            selectedFiles: [],
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

    render() {
        const options = [
            { value : "TO", label : "Touchscreen" },
            { value : "CF", label : "Call Function" },
            { value : "NO", label : "Notifications" },
            { value : "FI", label : "Fitness" },
            { value : "OU", label : "Outdoor" },
        ]
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                    <Breadcrumbs title="Change Password" breadcrumbItems={this.state.breadcrumbItems} />

                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <CardBody>
                                        
                                        <div id="addproduct-nav-pills-wizard" className="twitter-bs-wizard">
                                            <Nav pills justified className="twitter-bs-wizard-nav">
                                                <NavItem>
                                                    <NavLink onClick={() => { this.toggleTab(1); }} className={classnames({ active: this.state.activeTab === 1 })}>
                                                        <span className="step-number">01</span>
                                                        <span className="step-title">Change Password</span>
                                                    </NavLink>
                                                </NavItem>
                                             
                                            </Nav>
                                            <TabContent activeTab={this.state.activeTab} className="twitter-bs-wizard-tab-content">
                                                <TabPane tabId={1}>
                                                    <h4 className="card-title">Profile Information</h4>
                                                    <p className="card-title-desc">You can change your profile information</p>

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
                                                   

                                                    <div className="text-center mt-4">
                                                        <Button color="primary" type="submit" className="mr-2 waves-effect waves-light">Save Changes</Button>
                                                        <Button color="light" type="submit" className="waves-effect ml-1">Cancel</Button>
                                                    </div>
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

export default Settings;