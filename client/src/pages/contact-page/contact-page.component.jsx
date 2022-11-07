import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import { sendMessageStart } from "../../redux/contact/contact.actions";
import "./contact-page.styles.scss";

const ContactPage = () => {
	const [message, setMessage] = useState({
		subject: "",
		content: "",
	});

	const { subject, content } = message;

	const dispatch= useDispatch();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setMessage({ ...message, [name]: value });
	};
	return (
		<div className='contact-page'>
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
			<CustomButton className='send-button' onClick={()=>dispatch(sendMessageStart(message))}>Send</CustomButton>
		</div>
	);
};

export default ContactPage;
