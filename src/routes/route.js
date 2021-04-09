import React from "react";
import {  BrowserRouter as Router, Route, Redirect,Switch} from "react-router-dom";
import PageNotFound from "../pages/Utility/Error404";
const AppRoute = ({
	component: Component,
	layout: Layout,
	isAuthProtected,
	...rest
}) => (
	
		<Switch>
			<Route 
				{...rest}
				render={props => {

					if (isAuthProtected && !localStorage.getItem("authUser")) {
						return (
							<Redirect to={{ pathname: "/login", state: { from: props.location } }} />
						);
					}
				
					return (
						<Layout>
							<Component {...props} />
						</Layout>
					);
				}}
			/>
			
			{/* <Route path="*" component={PageNotFound}/> */}
	</Switch>
	

	);

export default AppRoute;

