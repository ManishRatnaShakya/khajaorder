import React from "react";
import {  Route, Redirect,Switch} from "react-router-dom";
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

