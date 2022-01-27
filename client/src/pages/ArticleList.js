import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Container from 'react-bootstrap/esm/Container';
import SmallArticle from '../components/SmallArticle';
import Pagination from '../components/Pagination';

const ArticleList = ({ itemsPerPage = 10 }) => {
	const [articles, setArticles] = useState([]);
	const [pagination, setPagination] = useState({
		start: 0,
		end: itemsPerPage
	});
	const url = process.env.REACT_APP_API_URL;

	const getAllArticles = async () => {
		try {
			const { data } = await axios.get(url + '/articles');
			setArticles(data);
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		getAllArticles();
	}, []);

	const handlePageChange = (start, end) => {
		setPagination({ start, end });
	};

	return (
		<Container as='main' fluid='lg'>
			<h1>Liste des articles</h1>
			{articles.slice(pagination.start, pagination.end).map((article) => (
				<SmallArticle key={article._id} article={article} />
			))}
			<Pagination
				onChange={handlePageChange}
				itemsCount={articles.length}
				itemsPerPage={itemsPerPage}
			></Pagination>
		</Container>
	);
};

export default ArticleList;
