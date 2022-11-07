import React, { useEffect, lazy, Suspense } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/header/header.component";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "./redux/user/user.selector";
import { checkUserSession } from "./redux/user/user.actions";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import ContactPage from "./pages/contact-page/contact-page.component";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const SignInAndSignUp = lazy(() =>
	import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));

const App = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector(selectCurrentUser);

	useEffect(() => {
		dispatch(checkUserSession());
	}, []);

	return (
		<div className='App'>
			<Header />
			<Switch>
				<ErrorBoundary>
					<Suspense fallback={<Spinner />}>
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
						<Route exact path='/contact' component={ContactPage} />
					</Suspense>
				</ErrorBoundary>
			</Switch>
		</div>
	);
};

export default App;
