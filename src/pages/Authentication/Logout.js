import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'; 
import { logoutUser } from '../../store/actions';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
class Logout extends Component {

    constructor(props) {
        super(props);
        this.state = {  };
    }

    componentDidMount() {
     
        // Fire Action for Remove all Item from localstorage and redirect to login page
        this.props.logoutUser(this.props.history);
    }

    render() {
        let today = new Date()
        let ampm =today.getHours() >= 12 ? 'pm' : 'am';

        let time = today.getHours() + ':' + today.getMinutes() +' '+ ampm;

   
          toastr.options={
                 positionClass:"toast-bottom-right",
                closeButton:true
            }
           toastr.success("You were logged out",time);
        return (
           <Redirect to="/login" />
        );
    }
}

export default withRouter(connect(null,{ logoutUser })(Logout));

