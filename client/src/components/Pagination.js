import React, { useState } from 'react';
import PaginationElt from 'react-bootstrap/Pagination';

const Pagination = ({ itemsCount, itemsPerPage, onChange }) => {
	const [currentPage, setCurrentPage] = useState(1);

	const pagesCount = Math.ceil(itemsCount / itemsPerPage);
	const pages = [];
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i);
	}

	const handleClick = (page) => {
		setCurrentPage(page);
		onChange((page - 1) * itemsPerPage, page * itemsPerPage, page);
	};

	return (
		<PaginationElt>
			<PaginationElt.First onClick={() => handleClick(1)} />
			<PaginationElt.Prev
				className={currentPage === 1 ? 'disabled' : ''}
				onClick={() => handleClick(currentPage - 1)}
			/>
			{pages.map((page) => (
				<PaginationElt.Item
					key={page}
					className={page === currentPage ? 'active' : ''}
					onClick={() => handleClick(page)}
				>
					{page}
				</PaginationElt.Item>
			))}
			<PaginationElt.Next
				className={currentPage === pagesCount ? 'disabled' : ''}
				onClick={() => handleClick(currentPage + 1)}
			/>
			<PaginationElt.Last onClick={() => handleClick(pagesCount)} />
		</PaginationElt>
	);
};

export default Pagination;
