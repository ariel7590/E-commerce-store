import React, { useState } from "react";
import "./sign-up.styles.scss";
import CustomButton from "../custom-button/custom-button.component";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../redux/user/user.actions";
import FormInput from "../form-input/form-input.component";
import Swal from "sweetalert2";

const SignUp = ({}) => {
	const dispatch = useDispatch();

	const [userCredentials, setCredentials] = useState({
		displayName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const { displayName, email, password, confirmPassword } = userCredentials;

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Passwords don't match",
			  })
			return;
		}

		dispatch(signUpStart({ displayName, email, password }));
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setCredentials({ ...userCredentials, [name]: value });
	};

	return (
		<div className='sign-up'>
			<h2 className='title'> I do not have a account</h2>
			<span>Sign up with your email and password</span>
			<form className='sign-up-form' onSubmit={handleSubmit}>
				<FormInput
					type='text'
					name='displayName'
					value={displayName}
					onChange={handleChange}
					label='Display Name'
					required
				/>
				<FormInput
					type='email'
					name='email'
					value={email}
					onChange={handleChange}
					label='Email'
					required
				/>
				<FormInput
					type='password'
					name='password'
					value={password}
					onChange={handleChange}
					label='Password'
					required
				/>
				<FormInput
					type='password'
					name='confirmPassword'
					value={confirmPassword}
					onChange={handleChange}
					label='Confirm Password'
					required
				/>
				<CustomButton className="button" type='submit'> SIGN UP </CustomButton>
			</form>
		</div>
	);
};

export default SignUp;
