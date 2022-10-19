import React from "react";
import Spinner from "../spinner/spinner.component";

const WithSpinner =
	(WrappedComponent) =>
	({ isLoaded, ...otherProps }) => {
		return isLoaded ? <Spinner /> : <WrappedComponent {...otherProps} />;
	};

export default WithSpinner;
