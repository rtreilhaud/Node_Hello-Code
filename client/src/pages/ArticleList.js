import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Container from 'react-bootstrap/esm/Container';
import SmallArticle from '../components/SmallArticle';
import Pagination from '../components/Pagination';
import { getArticles } from '../api/articles';

const ArticleList = ({ itemsPerPage = 10 }) => {
	const [articles, setArticles] = useState([]);
	const [pagination, setPagination] = useState({
		start: 0,
		end: itemsPerPage
	});
	const location = useLocation();

	useEffect(() => {
		getArticles(location.search)
			.then((articles) => setArticles(articles))
			.catch((error) => toast.error(error.message));
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
			{articles.length >= itemsPerPage && (
				<Pagination
					onChange={handlePageChange}
					itemsCount={articles.length}
					itemsPerPage={itemsPerPage}
				></Pagination>
			)}
		</Container>
	);
};

export default ArticleList;
