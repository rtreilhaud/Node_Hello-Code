import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from '../images/logo.png';

const Login = () => {
	const [values, setValues] = useState({
		email: '',
		psw: ''
	});
	const url = process.env.REACT_APP_API_URL;

	const handleChange = ({ target: { name, value } }) => {
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			await axios.post(url + '/auth', values);
			toast.success('Connexion réussie');
		} catch (error) {
			if (error.response) {
				const {
					data: { message }
				} = error.response;
				return toast.error(message);
			}
			return toast.error(error.message);
		}
	};

	return (
		<Container fluid='lg' className='register'>
			<Image src={logo} className='' />
			<h1>Hello-Code</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group as='fieldset'>
					<Form.Label>Adresse email</Form.Label>
					<Form.Control
						required
						type='email'
						placeholder='Entrez votre email'
						name='email'
						value={values.email}
						onChange={handleChange}
					></Form.Control>
				</Form.Group>
				<Form.Group as='fieldset'>
					<Form.Label>Mot de passe</Form.Label>
					<Form.Control
						required
						type='password'
						placeholder='Entrez votre mot de passe'
						name='psw'
						value={values.psw}
						onChange={handleChange}
					></Form.Control>
				</Form.Group>

				<Button type='submit'>Se connecter</Button>
			</Form>
			<p>
				Pas encore inscrit ? <a href='/'>S'inscrire</a>
			</p>
		</Container>
	);
};

export default Login;
