import React from 'react';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import { format } from 'date-fns';

const SmallArticle = ({ article: a }) => {
	return (
		<article>
			<h2>
				<Link to={`/articles/${a._id}`}>{a.title}</Link>
			</h2>
			<p>{a.abstract}</p>
			<hr />
			<p>Evaluation : {a.evaluated ? 'oui' : 'non'}</p>
			<p>
				Tags :
				{a.tags.map((tag) => (
					<Badge key={tag} bg='secondary'>
						<Link to=''>{tag}</Link>
					</Badge>
				))}
			</p>

			<small className='align-right'>
				Publié le {format(new Date(a.createdAt), 'dd/MM/yyyy')}
				{a.createdAt !== a.updatedAt
					? `, modifié le ${format(new Date(a.createdAt), 'dd/MM/yyyy')}`
					: ''}
			</small>
		</article>
	);
};

export default SmallArticle;
