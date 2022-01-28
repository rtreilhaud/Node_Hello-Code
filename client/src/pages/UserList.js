import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import Container from 'react-bootstrap/esm/Container';
import Table from 'react-bootstrap/esm/Table';
import { getUsers } from '../api/users';

const UserList = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getUsers()
			.then((users) => setUsers(users))
			.catch((error) => toast.error(error));
	}, []);

	return (
		<Container as='main' fluid='lg'>
			<h1>Liste des utilisateurs</h1>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Pseudo</th>
						<th>Email</th>
						<th>Créé le</th>
						<th>Modifé le</th>
						<th>Admin</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user._id}>
							<td>{user._id}</td>
							<td>{user.username}</td>
							<td>{user.email}</td>
							<td>{format(new Date(user.createdAt), 'dd/MM/yyyy')}</td>
							<td>{format(new Date(user.updatedAt), 'dd/MM/yyyy')}</td>
							<td>{user.admin ? 'Oui' : 'Non'}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</Container>
	);
};

export default UserList;
