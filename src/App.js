import React, { useEffect } from "react";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import { Route, Switch, Redirect } from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import { connect } from "react-redux";
import { selectCurrentUser } from "./redux/user/user.selector";
import { createStructuredSelector } from "reselect";
import { checkUserSession } from "./redux/user/user.actions";

const HatsPage = () => (
	<div>
		<h1>Hats Page!</h1>
	</div>
);

const App = ({ checkUserSession, currentUser }) => {
	useEffect(() => {
		checkUserSession();
	}, [checkUserSession]);

	return (
		<div className='App'>
			<Header />
			<Switch>
				<Route exact path='/' component={HomePage} />
				<Route path='/shop' component={ShopPage} />
				<Route
					exact
					path='/signin'
					render={() =>
						currentUser ? <Redirect to='/' /> : <SignInAndSignUp />
					}
				/>
				<Route exact path='/checkout' component={CheckoutPage} />
			</Switch>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	checkUserSession: () => dispatch(checkUserSession()),
});

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
