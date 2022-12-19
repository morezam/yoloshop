import { Link, LoaderFunction } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { queryClient } from '@utils/queryClient';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ProductType } from '@types';
import React, { useState } from 'react';
import Pagination from '@components/pagination';
import TableLayout, { Td } from '@layouts/TableLayout';
import DeleteProduct from '@components/product/DeleteProduct';
import AdminNav from '@components/adminProfile/AdminNav';
import Copy from '@components/Copy';
import DeleteModal from '@components/modals/DeleteModal';
import Btn from '@components/Btn';
import Spinner from '@components/spinner';
import NotFound from '@components/NotFound';

interface ResponseData {
	products: ProductType<string>[];
	pages: number;
	page: number;
}

const getAllProducts = (page: number) => ({
	queryKey: ['allProducts', page],
	queryFn: async () => {
		return shop.get<ResponseData>(`/products?page=${page}&limit=20`);
	},
	keepPreviousData: true,
});

export const productsLoader: LoaderFunction = async () => {
	const query = getAllProducts(1);

	return (
		queryClient.getQueryData(query.queryKey) ??
		(await queryClient.fetchQuery(query))
	);
};

const Products = () => {
	const [page, setPage] = useState(1);
	const [isOpen, setOpen] = useState(false);

	const { data, refetch, isLoading } = useQuery(getAllProducts(page));
	return (
		<>
			<AdminNav />
			{isLoading && <Spinner />}
			{data && data.data.products.length !== 0 ? (
				<>
					<TableLayout
						headers={[
							'R',
							'Name',
							'Product Id',
							'Price',
							'Brand',
							'Category',
							'Edit',
							'Delete',
						]}>
						{data.data.products.map((product, i) => {
							return (
								<React.Fragment key={product._id}>
									<tr>
										<Td>{i + 1}</Td>
										<Td>
											<p className="w-52 lg:w-72">{product.name}</p>
										</Td>
										<Td>
											<Copy
												styling="font-mono hover:text-gray-500"
												text={product._id}>
												{product._id}
											</Copy>
										</Td>
										<Td>${product.price}</Td>
										<Td>{product.brand}</Td>
										<Td styling="whitespace-nowrap">{product.category}</Td>
										<Td btn>
											<Link to={`/user/profile/product/${product._id}`}>
												<FaEdit className="inline-block" />
											</Link>
										</Td>
										<Td btn>
											<FaTrash
												onClick={() => setOpen(true)}
												className="inline-block fill-rose-600"
											/>
										</Td>
									</tr>
									<DeleteModal isOpen={isOpen} setOpen={setOpen}>
										<DeleteProduct
											id={product._id}
											onSuccess={refetch}
											image={product.image}>
											<Btn
												onClick={() => setOpen(false)}
												styling="text-red-500 hover:bg-transparent bg-transparent">
												Delete
											</Btn>
										</DeleteProduct>
									</DeleteModal>
								</React.Fragment>
							);
						})}
					</TableLayout>

					<Pagination
						currentPage={page}
						onPageChange={page => setPage(page)}
						pageSize={10}
						totalPageCount={data.data.pages}
					/>
				</>
			) : (
				<NotFound>No Products Found</NotFound>
			)}
		</>
	);
};

export default Products;
