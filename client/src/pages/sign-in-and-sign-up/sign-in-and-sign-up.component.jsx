import React, { useState } from "react";
import "./sign-in-and-sign-up.styles.scss";
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";
import { useRef } from "react";

const SignInAndSignUp = () => {
	const [checkedRadio, setCheckedRadio] = useState("sign-in");

	const handleCheckedRadio = (e) => {
		setCheckedRadio(e.target.value);
	};

	return (
		<div>
			<div className='sign-in-and-sign-up'>
				<SignIn />
				<SignUp />
			</div>
			<div className='sign-in-and-sign-up-mobile'>
            <div className={`${checkedRadio === "sign-in" ? "checked-" : ""}input-label`}>
				<input
					type='radio'
					id='sign-in'
					value='sign-in'
					checked={checkedRadio === "sign-in"}
					onChange={handleCheckedRadio}
				/>
				<label htmlFor='sign-in'>I already have account</label>
            </div>
				{checkedRadio === "sign-in" ? <SignIn /> : null}
            <div className={`${checkedRadio === "sign-up" ? "checked-" : ""}input-label`}>
				<input
					type='radio'
					id='sign-up'
					value='sign-up'
					checked={checkedRadio === "sign-up"}
					onChange={handleCheckedRadio}
				/>
				<label htmlFor='sign-up'>I do not have an account</label>
            </div>
				{checkedRadio === "sign-up" ? <SignUp /> : null}
			</div>
		</div>
	);
};

export default SignInAndSignUp;
