import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
	const location = useLocation();
	const url = process.env.REACT_APP_API_URL;

	const getArticles = async () => {
		try {
			const { data } = await axios.get(url + '/articles' + location.search);
			setArticles(data);
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		getArticles();
	}, [location]);

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
