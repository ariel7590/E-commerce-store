import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/cart/cart.actions";
import {
	selectCartItems,
	selectCartTotal,
} from "../../redux/cart/cart.selector";
import Swal from "sweetalert2";

const StripeCheckoutButton = ({ price }) => {
	const priceForStripe = price * 100;
	const publishableKey =
		"pk_test_51LmyXHLC61uMLZqqcE9n9HzEDumnX4Zja7zmvM33i0D22hrqCvngSRY3rYntDPZsqnXOuSPCuom2ni0vYlrtWkLP00BSLZTh2e";
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);
	const total = useSelector(selectCartTotal);

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
				Swal.fire({
					icon: "success",
					title: "Payment successful",
				});
				axios({
					url: "receipt",
					method: "post",
					data: {
						cartItems,
						total,
					},
				})
					.then((response) => {
						dispatch(clearCart());
					})
					.catch((error) => {
						console.log("Email error ", error.message);
						Swal.fire({
							icon: "error",
							title: "Oops...",
							text: "There was an issue with sending your receipt!",
						});
					});
			})
			.catch((error) => {
				console.log("Payment error ", error.message);
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "There was an issue with your payment. Please make sure you use the provided credit card!",
				});
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
