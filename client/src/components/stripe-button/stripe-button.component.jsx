import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
	const priceForStripe = price * 100;
	const publishableKey =
		"pk_test_51LmyXHLC61uMLZqqcE9n9HzEDumnX4Zja7zmvM33i0D22hrqCvngSRY3rYntDPZsqnXOuSPCuom2ni0vYlrtWkLP00BSLZTh2e";

	const onToken = (token) => {
		axios({
			url: "payment",
			method: "post",
			data: {
				amount: priceForStripe,
				token,
			},
		})
			.then((response) => {
				alert("Payment successful");
			})
			.catch((error) => {
				console.log("Payment error ", error.message);
				alert(
					"There was an issue with your payment. Please make sure you use the provided credit card!"
				);
			});
	};

	return (
		<StripeCheckout
			label='Pay Now'
			name='CRWN Clothing Ltd.'
			billingAddress
			shippingAddress
			image='https://svgshare.com/i/CUz.svg'
			description={`Your total is $${price}`}
			amount={priceForStripe}
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};

export default StripeCheckoutButton;