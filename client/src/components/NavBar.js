import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import logo from '../images/logo.png';
import { getCurrentUser } from '../services/authentication';

const NavBar = ({ onLogout }) => {
	const user = getCurrentUser();

	return (
		<Navbar variant='dark' collapseOnSelect expand='sm' className='navbar'>
			<Container fluid='lg'>
				<Link to='/' className='navbar-brand flex'>
					<Image src={logo} thumbnail alt='Logo Hello-Code' />
					<span className='brand-name'>Hello-Code</span>
				</Link>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav'>
					<Nav as='ul'>
						<li>
							<Link to='/' className='nav-link'>
								Articles
							</Link>
						</li>
					</Nav>
				</Navbar.Collapse>
				<Nav as='ul' className='right-nav'>
					<li>Connecté.e ({user.username})</li>
					<li>
						<Link to='/register' className='nav-link' onClick={onLogout}>
							<Button variant='danger'>Déconnexion</Button>
						</Link>
					</li>
				</Nav>
			</Container>
		</Navbar>
	);
};

export default NavBar;
