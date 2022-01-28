import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from '../images/logo.png';
import { signIn } from '../services/authentication';

const Login = ({ onLogin }) => {
	const [values, setValues] = useState({
		email: '',
		psw: ''
	});
	const history = useHistory();

	const handleChange = ({ target: { name, value } }) => {
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await signIn(values);
			onLogin(response.user);
			toast.success(response.message);
			history.push('/');
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<Container as='main' fluid='lg' className='center'>
			<Image src={logo} alt='Logo Hello-Code' />
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
				Pas encore inscrit ? <Link to='/register'>S'inscrire</Link>
			</p>
		</Container>
	);
};

export default Login;
