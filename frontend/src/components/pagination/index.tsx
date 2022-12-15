import { usePagination, DOTS, UsePaginationProps } from '@hooks/usePagination';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

interface PaginationProps extends UsePaginationProps {
	onPageChange: (page: number) => void;
}

const Pagination = (props: PaginationProps) => {
	const {
		onPageChange,
		totalPageCount,
		siblingCount = 1,
		currentPage,
		pageSize,
	} = props;

	const paginationRange = usePagination({
		currentPage,
		totalPageCount,
		siblingCount,
		pageSize,
	}) as (string | number)[];

	const navigate = useNavigate();

	if (currentPage === 0 || paginationRange.length < 2) {
		return null;
	}

	const onNext = () => {
		navigate(`?page=${currentPage + 1}`);
		onPageChange(currentPage + 1);
	};

	const onPrevious = () => {
		navigate(`?page=${currentPage - 1}`);
		onPageChange(currentPage - 1);
	};

	let lastPage = paginationRange[paginationRange.length - 1];

	return (
		<ul className="pagination-container">
			<li
				className={`pagination-item ${currentPage === 1 ? 'disabled' : null}`}
				onClick={onPrevious}>
				<div className="arrow left" />
			</li>
			{paginationRange.map(pageNumber => {
				if (pageNumber === DOTS) {
					return <li className="pagination-item dots">&#8230;</li>;
				}

				return (
					<li
						key={pageNumber}
						className={`pagination-item ${
							pageNumber === currentPage ? 'selected' : 'null'
						}`}
						onClick={() => {
							navigate(`?page=${pageNumber}`);
							onPageChange(+pageNumber);
						}}>
						{pageNumber}
					</li>
				);
			})}

			<li
				className={`pagination-item ${
					currentPage === lastPage ? 'disabled' : null
				}`}
				onClick={onNext}>
				<div className="arrow right" />
			</li>
		</ul>
	);
};

export default Pagination;
