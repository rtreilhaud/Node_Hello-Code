import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/esm/Button';
import { getTags } from '../api/articles';

const TagList = () => {
	const [tags, setTags] = useState([]);

	useEffect(() => {
		getTags()
			.then((data) => setTags(data))
			.catch((error) => toast.error(error.message));
	}, []);
	return (
		<Container as='main' fluid='lg' className='tags'>
			<h1>Liste des catégories</h1>
			<div className='flex'>
				{tags.map((tag) => (
					<Button key={tag}>
						<Link to={`/?tags=${tag}`}>{tag}</Link>
					</Button>
				))}
			</div>
		</Container>
	);
};

export default TagList;
