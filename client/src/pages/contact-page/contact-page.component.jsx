import React, { useState } from "react";
import { useSelector } from "react-redux";
import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import axios from "axios";
import "./contact-page.styles.scss";
import { selectCurrentUser } from "../../redux/user/user.selector";

const ContactPage = () => {
	const [message, setMessage] = useState({
		subject: "",
		content: "",
	});

	const { subject, content } = message;

	const currentUser = useSelector(selectCurrentUser);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setMessage({ ...message, [name]: value });
	};

	const handleClick = (e) => {
		e.preventDefault();

		if (currentUser !== null) {
			const { displayName, email } = currentUser;

			axios({
				url: "email",
				method: "post",
				data: {
					subject,
					content,
					displayName,
					email,
				},
			})
				.then((response) => {
					alert("Email sent successfuly");
					setMessage({ subject: "", content: "" });
				})
				.catch((error) => {
					console.log("Error ", error.message);
					alert("There was an issue with sending the email!");
				});
		} else {
			alert("You have to sign-in in order to contact us!");
		}
	};

	return (
		<div className='contact-page'>
			<form onSubmit={handleClick}>
				<FormInput
					name='subject'
					type='text'
					label='Subject'
					value={subject}
					handleChange={handleChange}
					required
				/>
				<textarea
					className='content'
					placeholder='Message'
					name='content'
					value={content}
					onChange={handleChange}
				/>
				<CustomButton className='send-button'>Send</CustomButton>
			</form>
		</div>
	);
};

export default ContactPage;
