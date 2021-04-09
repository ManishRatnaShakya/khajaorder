import React, { Component } from 'react';
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

//Import Logo
import logodark from '../../assets/images/Khajaorder.jpg';
import bg from "../../assets/images/maintenance-bg.png";

class Maintenance extends Component {
    constructor(props) {
        super(props);
        this.state={
            breadcrumbItems : [
                { title : "Utility", link : "#" },
                { title : "Dashboard", link : "#" },
            ],
        }
    }
    render() {
        return (
            <React.Fragment>
        <div className="home-btn d-none d-sm-block">
            <Link to="/" className="text-dark"><i className="mdi mdi-home-variant h2"></i></Link>
        </div>

        <div className="my-5 pt-sm-5">
            <Container>
                <Row>
                    <Col xs={12}>
                        <div className="text-center">
                            <div className="mb-2" style={{height:'90px'}}>
                                <Link to="/">
                                    <img src={logodark} alt="logo" style={{height:'80px'}} />
                                </Link>
                            </div>

                            <Row className="justify-content-center">
                                <Col sm={4}>
                                    <div className="maintenance-img">
                                        <img src={bg} alt="" className="img-fluid mx-auto d-block"/>
                                    </div>
                                </Col>
                            </Row>
                            <h3 className="mt-5">Page is Under Maintenance</h3>
                            <p>Please check back in sometime.</p>

                            <Row>
                                <Col md={4}>
                                    <div className="mt-4 maintenance-box">
                                        <div className="p-3">
                                            <div className="avatar-sm mx-auto">
                                                <span className="avatar-title bg-soft-primary rounded-circle">
                                                    <i className="mdi mdi-access-point-network font-size-24 text-primary"></i>
                                                </span>
                                            </div>
                                            
                                            <h5 className="font-size-15 text-uppercase mt-4">Why is the Site Down?</h5>
                                            <p className="text-muted mb-0">This Page Is Under Construction Right Now. Due To The Requirement Made By The Client.</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="mt-4 maintenance-box">
                                        <div className="p-3">
                                            <div className="avatar-sm mx-auto">
                                                <span className="avatar-title bg-soft-primary rounded-circle">
                                                    <i className="mdi mdi-clock-outline font-size-24 text-primary"></i>
                                                </span>
                                            </div>
                                            <h5 className="font-size-15 text-uppercase mt-4">
                                                What is the Downtime?</h5>
                                            <p className="text-muted mb-0">Its A Construction Time. This Is Made With React And Redux </p>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="mt-4 maintenance-box">
                                        <div className="p-3">
                                            <div className="avatar-sm mx-auto">
                                                <span className="avatar-title bg-soft-primary rounded-circle">
                                                    <i className="mdi mdi-email-outline font-size-24 text-primary"></i>
                                                </span>
                                            </div>
                                            <h5 className="font-size-15 text-uppercase mt-4">
                                                Do you need Support?</h5>
                                            <p className="text-muted mb-0">PLease Feel Free To Contact Us
                                                <Link
                                                        to="#"
                                                        className="text-decoration-underline">lightwebgroup.com</Link></p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>

            </React.Fragment>
        );
    }
}

export default Maintenance;