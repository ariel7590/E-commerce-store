import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./sign-in.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {
	googleSignInStart,
	emailSignInStart,
} from "../../redux/user/user.actions";

const SignIn = () => {
	const dispatch = useDispatch();
	const googleSignIn = () => dispatch(googleSignInStart());
	const emailSignIn = (email, password) =>
		dispatch(emailSignInStart({ email, password }));

	const [userCredentials, setCredentials] = useState({
		email: "",
		password: "",
	});

	const { email, password } = userCredentials;

	const handleSubmit = async (event) => {
		event.preventDefault();
		emailSignIn(email, password);
	};

	const handleChange = (event) => {
		const { value, name } = event.target;
		setCredentials({ ...userCredentials, [name]: value });
	};

	return (
		<div className='sign-in'>
			<h2 className="title">I already have account</h2>
			<span>Sign in with your email and password</span>

			<form onSubmit={handleSubmit}>
				<FormInput
					name='email'
					type='email'
					value={email}
					label='email'
					handleChange={handleChange}
					required
				/>
				<FormInput
					name='password'
					type='password'
					value={password}
					label='password'
					handleChange={handleChange}
					required
				/>

				<div className='buttons'>
					<CustomButton type='submit'> Sign in </CustomButton>
					<CustomButton type='button' onClick={googleSignIn} isGoogleSignIn>
						{" "}
						Sign in with google{" "}
					</CustomButton>
				</div>
			</form>
		</div>
	);
};

export default SignIn;
