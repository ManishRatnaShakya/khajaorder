import React, { Component } from 'react';
import { Container, Row, Col } from "reactstrap";
import BannerCard from './BannerCard';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {compose} from 'redux';
import {makeSelectBanner} from '../../store/Banner/selectors';
import {getBannerFromAPI} from '../../store/Banner/actions';
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//Import Images
import img1 from "../../assets/images/companies/img-1.png";
import img2 from "../../assets/images/companies/img-2.png";
import img3 from "../../assets/images/companies/img-3.png";
import img4 from "../../assets/images/companies/img-4.png";
import img5 from "../../assets/images/companies/img-5.png";
import img6 from "../../assets/images/companies/img-6.png";
import img7 from "../../assets/images/companies/img-7.png";
import img8 from "../../assets/images/companies/img-8.png";

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state={
            breadcrumbItems : [
                { title : "Dashboard", link : "/dashboard" },
                { title : "Banner", link : "/banner" },
            ],
            shops : [
                { img : img1, name : "Nedick's", owner : "Wayne McClain", products : "86", balance : "12,456" },
                { img : img2, name : "Brendle's", owner : "David Marshall", products : "72", balance : "10,352" },
                { img : img3, name : "Tech Hifi", owner : "Katia Stapleton", products : "75", balance : "9,963" },
                { img : img4, name : "Lafayette", owner : "Andrew Bivens", products : "65", balance : "14,568" },
                { img : img5, name : "Packer", owner : "Mae Rankin", products : "82", balance : "16,445" },
                { img : img6, name : "Micro Design", owner : "Brian Correa", products : "71", balance : "11,523" },
                { img : img7, name : "Keeney's", owner : "Dean Odom", products : "66", balance : "13,478" },
                { img : img8, name : "Tech Hifi", owner : "John McLeroy", products : "58", balance : "14,654" },
            ]
        }
    }
    componentDidMount(){
        this.props.onGetBannerDataAPI();
    }
    render() {
        console.table("from the banner",this.props.bannerData);
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                    <Breadcrumbs title="Banner" breadcrumbItems={this.state.breadcrumbItems} />

                        <Row>
                            {this.props.bannerData &&
                                this.props.bannerData.map((shop, key) =>
                                    <Col xl={3} sm={6} key={key}>
                                     <BannerCard shop={shop}/>
                                    </Col>
                                )
                            }
                        </Row>
                            
                       

                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps =createStructuredSelector({
    bannerData:makeSelectBanner(),
})
const mapDispatchToProps =(dispatch)=>{ 
    return {
    onGetBannerDataAPI:()=>dispatch(getBannerFromAPI())
    }
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Banner);