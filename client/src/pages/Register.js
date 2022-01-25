import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from '../images/logo.png';

const Register = () => {
	const [values, setValues] = useState({
		username: '',
		email: '',
		psw: '',
		psw2: ''
	});
	const url = process.env.REACT_APP_API_URL;

	const handleChange = ({ target: { name, value } }) => {
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		axios.post(url + '/register', values);
	};

	return (
		<Container fluid='lg' className='register'>
			<Image src={logo} className='' />
			<h1>Hello-Code</h1>
			<p>
				Cette application contient des articles pour vous aider à maîtriser les
				outils Web App tels que JavaScript, PHP et Python. <br /> Vous pourrez
				aussi vous perfectionner en Data analyse et en bases de données.
			</p>
			<p>
				Inscrivez-vous pour accéder à tous les articles et pour tester vos
				connaissances !
			</p>
			<Form onSubmit={handleSubmit}>
				<Form.Group as='fieldset'>
					<Form.Label>Pseudo</Form.Label>
					<Form.Control
						required
						type='text'
						placeholder='Entrez votre pseudo'
						name='username'
						value={values.username}
						onChange={handleChange}
					></Form.Control>
				</Form.Group>
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
				<Form.Group as='fieldset'>
					<Form.Label>Confirmer le mot de passe</Form.Label>
					<Form.Control
						required
						type='password'
						placeholder='Confirmez votre mot de passe'
						name='psw2'
						value={values.psw2}
						onChange={handleChange}
					></Form.Control>
				</Form.Group>

				<Button type='submit'>S'inscrire</Button>
			</Form>
			<p>
				Déjà inscrit ? <a href='/login'>Se connecter</a>
			</p>
		</Container>
	);
};

export default Register;
