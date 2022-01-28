import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import logo from '../images/logo.png';
import { signOut } from '../services/authentication';

const NavBar = () => {
	return (
		<Navbar variant='dark' className='navbar'>
			<Container fluid='lg'>
				<Link to='/' className='navbar-brand flex'>
					<Image src={logo} thumbnail alt='Logo Hello-Code' />
					<span className='brand-name'>Hello-Code</span>
				</Link>
				<Nav as='ul'>
					<li>
						<Link to='/' className='nav-link'>
							Articles
						</Link>
					</li>
				</Nav>
				<Nav as='ul'>
					<li>
						<Link to='/register' className='nav-link' onClick={signOut}>
							Se déconnecter
						</Link>
					</li>
				</Nav>
			</Container>
		</Navbar>
	);
};

export default NavBar;
