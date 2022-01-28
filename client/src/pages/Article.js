import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import Container from 'react-bootstrap/esm/Container';
import Stack from 'react-bootstrap/Stack';
import Badge from 'react-bootstrap/Badge';
import { getArticleByID } from '../api/articles';

const Article = () => {
	const [article, setArticle] = useState({});
	const match = useRouteMatch();
	const { article_id } = match.params;

	useEffect(() => {
		getArticleByID(article_id)
			.then((article) => setArticle(article))
			.catch((error) => toast.error(error.message));
	}, []);

	return (
		<Container as='main' fluid='lg'>
			{Object.keys(article).length > 0 && (
				<>
					<h1>{article.title}</h1>
					<small className='align-right'>
						Publié le {format(new Date(article.createdAt), 'dd/MM/yyyy')}
						{article.createdAt !== article.updatedAt
							? `, modifié le ${format(
									new Date(article.createdAt),
									'dd/MM/yyyy'
							  )}`
							: ''}
					</small>
					<hr />
					<div className='flex'>
						<p>{article.textContent}</p>
						<Stack as='nav' gap={1}>
							<h2 className='center'>Tags</h2>
							{article.tags.map((tag) => (
								<Badge key={tag} bg='secondary'>
									<Link to={`/?tags=${tag}`}>{tag}</Link>
								</Badge>
							))}
						</Stack>
					</div>
				</>
			)}
		</Container>
	);
};

export default Article;
