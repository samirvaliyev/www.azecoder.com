import React, { useState } from "react";
import { db } from "../../Firebase";

const Form = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const [loader, setLoader] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoader(true);

		db.collection("contacts")
			.add({
				name: name,
				email: email,
				message: message,
			})
			.then(() => {
				setLoader(false);
				alert("Your message has been sent");
			})
			.catch((error) => {
				alert(error.message);
				setLoader(false);
			});

		setName("");
		setEmail("");
		setMessage("");
	};

	return (
		<form className="form" onSubmit={handleSubmit}>
			<h3>Contact Us </h3>

			<input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />

			<input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

			<textarea
				placeholder="Message"
				value={message}
				onChange={(e) => setMessage(e.target.value)}></textarea>

			<button type="submit" style={{ background: loader ? "#ccc" : "#5900ff" }}>
				SEND MESSAGE
			</button>
		</form>
	);
};

export default Form;
