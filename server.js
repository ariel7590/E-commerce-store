const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const compression = require("compression");
const enforce = require("express-sslify");
const nodemailer = require("nodemailer");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
	app.use(enforce.HTTPS({ trustProtoHeader: true }));
	app.use(express.static(path.join(__dirname, "client/build")));

	app.get("*", function (req, res) {
		res.sendFile(path.join(__dirname, "client/build", "index.html"));
	});
}

app.listen(port, (error) => {
	if (error) throw error;
	console.log("Server running on port " + port);
});

app.get("./service-worker.js", (req, res) => {
	res.sendFile(path.resolve(__dirname, "..", "build", "service-worker"));
});

app.post("/payment", (req, res) => {
	const body = {
		source: req.body.token.id,
		amount: req.body.amount,
		currency: "usd",
	};

	stripe.charges.create(body, (stripeErr, stripeRes) => {
		if (stripeErr) {
			res.status(500).send({ error: stripeErr });
		} else {
			res.status(200).send({ success: stripeRes });
		}
	});
});

function replaceAll(originalStr, find, replace) {
	var str = originalStr;
	return str.replace(new RegExp(find, "g"), replace);
}

function createTransporter() {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "maillaproyectim",
			pass: process.env.MAIL_PASSWORD,
		},
	});

	return transporter;
}

app.post("/email", (req, res) => {
	var transporter = createTransporter();
	const { subject, content, displayName, email } = req.body;
	const mailBody = {
		from: email,
		to: "ariel7590@gmail.com",
		subject: "Crwn-clothing contact: " + subject,
		html: `
			<div dir="ltr" style="border:3px solid black; margin: auto; width: 388px; height: 500px; border-radius: 8px">
				<div style="padding: 10px 2px; display:flex; justify-content: space-between;">
					<img src="https://iili.io/y2f7CG.png" alt="crwn-clothing" width="70" height="70">
					<h1 style="font-family: 'open sans serif'; margin-left:20px; color: #abacaf;">Crwn-clothing-email</h1>
				</div>
				<br>
				<div style="margin-top: 30px; padding: 10px">
					From: ${displayName}
					<br>
					email: ${email}
					<br><br>
					${replaceAll(content, "\n", "<br>")}
				</div>
			</div>`,
	};

	transporter.sendMail(mailBody, (error, info) => {
		if (error) {
			res.status(500).send({ error: error });
		} else {
			res.status(200).send({ success: info });
		}
	});
});

app.post("/receipt", (req, res) => {
	
	var transporter = createTransporter();

	const { cartItems, total } = req.body;

	const mailBody = {
		from: "maillaproyectim",
		to: "ariel7590@gmail.com",
		subject: "Thank you for your purchase!",
		html: `
			<div style="border:3px solid black; margin: auto; width: 388px; min-height: 500px; border-radius: 8px; overflow: hidden;">
				<div dir="ltr" style="padding: 10px 2px; display:flex; justify-content: space-between;">
					<img src="https://iili.io/y2f7CG.png" alt="crwn-clothing" width="70" height="70">
					<h1 style="font-family: 'open sans serif'; margin-left:20px; color: #abacaf;">Your Order</h1>
				</div>
				<br>
				<div dir="ltr" style="margin-top: 30px; padding: 10px; font-family: 'open sans'; font-size: 16px">
					<table style="width: 100%;">
						<tr style="background-color: black; color:white;" align="center">
							<th />
							<th>Name</th>
							<th>Price</th>
							<th>Amount</th>
							<th>Total</th>
						</tr>
						${cartItems.map(
							(item) => `
						<tr align="center" key=${item.id}>
							<td><img src="${item.imageUrl}" width="70" height="70" /></td>
							<td>${item.name}</td>
							<td>${item.price}$</td>
							<td>${item.quantity}</td>
							<td>${item.quantity * item.price}$</td>
						</tr>
						`
						)}
					</table>
				</div>
				<br>
				<span align="right" style="font-weight: bold; font-size: 20px; color: #abacaf; padding: 10px 10px;">Total: ${total}$</span>
			</div>`,
	};

	transporter.sendMail(mailBody, (error, info) => {
		if (error) {
			res.status(500).send({ error: error });
		} else {
			res.status(200).send({ success: info });
		}
	});
});
