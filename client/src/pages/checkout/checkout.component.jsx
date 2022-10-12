import React from "react";
import { useSelector } from "react-redux";
import {
	selectCartItems,
	selectCartTotal,
} from "../../redux/cart/cart.selector";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";
import "./checkout.styles.scss";

const CheckoutPage = () => {

	const cartItems=useSelector(selectCartItems);
	const total=useSelector(selectCartTotal);

	return(
	<div className='checkout-page'>
		<div className='checkout-header'>
			<div className='header-blocks'>
				<span>Product</span>
			</div>
			<div className='header-blocks'>
				<span>Description</span>
			</div>
			<div className='header-blocks'>
				<span>Quantity</span>
			</div>
			<div className='header-blocks'>
				<span>Price</span>
			</div>
			<div className='header-blocks'>
				<span>Remove</span>
			</div>
		</div>
		{cartItems.map((cartItem) => (
            <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))}

		<div className='total'>
			<span>TOTAL: ${total}</span>
		</div>
		<StripeCheckoutButton price={total} />
		<div style={{marginTop:'50px'}}>*test credit card*</div>
		<div>4242424242424242 - Exp: 01/23 - CVV: 123</div>
	</div>
	)
};

export default CheckoutPage;
