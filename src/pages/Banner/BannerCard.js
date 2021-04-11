import React, { Component } from 'react';
import {  Card, CardBody, Row, Col, Media,Button,Input,Badge } from "reactstrap";
import { Link } from "react-router-dom";
class BannerCard extends Component {
    state={
        isOpenURL: false,
        isImageUpload: false,
        b_home1_url:'',
        b_home1:[]
    }
    onSaveURL(){
        this.props.onChangeURL(this.state.b_home1_url);
    }
    render() {
        console.log(this.state)
        return(
                <Card>
                     <CardBody>
                                                <div className="text-center">
                                                    <img src={`https://khajaorder.com/korderapi/images/banners/${ this.props.shop.b_home1}`} alt="" className="avatar-sm mt-2 mb-4"/>
                                                    <Media body>
                                                        <h5 className="text-truncate"><Link to="#" className="text-dark">{this.props.shop.name}</Link></h5>
                                                        <p className="text-muted">
                                                            Link : {this.props.shop.b_home1_url}
                                                        </p>
                                                        <p>
                                                            {this.props.shop.b_status==="active"?<Badge className="badge-soft-success mr-1">Active</Badge>:<Badge className="badge-soft-danger mr-1">Not Active</Badge>}
                                                        </p>
                                                    </Media>
                                                </div>

                                                <hr className="my-4"/>
                                                 {this.state.isOpenURL?<Row><Col><Input placeholder="Enter URL" onChange={(e)=>this.setState({b_home1_url:e.target.value})} type="text"/></Col><Col style={{display:'flex'}}><Button>Save</Button><Button style={{marginLeft:'3px'}}onClick={()=>this.setState({isOpenURL:false})}>Cancel</Button></Col></Row>:
                                                 this.state.isImageUpload?<Row><Col><Input type="file"/></Col><Col style={{display:'flex'}}><Button>Save</Button><Button style={{marginLeft:'3px'}}onClick={()=>this.setState({isImageUpload:false})}>Cancel</Button></Col></Row>:
                                                <Row className="text-center">
                                                    <Col xs={6}>
                                                        <Button onClick={()=>this.setState({isOpenURL: true})}>Change URL</Button> 
                                                    </Col>
                                                    <Col xs={6}>
                                                        <Button onClick={()=>this.setState({isImageUpload: true})}>Change Img</Button> 
                                                    </Col>
                                                </Row>}
                                            </CardBody>
                                        </Card>
)
    }
}
export default BannerCard;
