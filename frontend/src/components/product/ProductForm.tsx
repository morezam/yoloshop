import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ProductType } from '@types';
import { shop } from '@utils/api';

interface ProductFormProps {
	onSubmit: SubmitHandler<ProductType<string>>;
	initial?: ProductType<string>;
}

const ProductForm = ({ onSubmit, initial }: ProductFormProps) => {
	const { register, handleSubmit, reset, setValue } = useForm<
		ProductType<string>
	>({
		defaultValues: {
			name: '',
			price: 0,
			quantity: 0,
			description: '',
			brand: '',
			category: '',
			image: '',
		},
	});

	useEffect(() => {
		reset({
			name: initial?.name,
			price: initial?.price,
			quantity: initial?.quantity,
			description: initial?.description,
			brand: initial?.brand,
			category: initial?.category,
			image: initial?.image,
		});
	}, [initial]);

	const uploadFileHandler = async (e: any) => {
		const file = e.target.files[0];
		const formData = new FormData();

		formData.append('image', file);

		try {
			const { data } = await shop.post('/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			setValue('image', data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<label htmlFor="name">Name:</label>
			<input type="text" {...register('name')} id="name" />

			<label htmlFor="price">price:</label>
			<input type="number" {...register('price')} id="price" />

			<label htmlFor="quantity">quantity:</label>
			<input type="number" {...register('quantity')} id="quantity" />

			<label htmlFor="description">description:</label>
			<input type="text" {...register('description')} id="description" />

			<label htmlFor="brand">brand:</label>
			<input type="text" {...register('brand')} id="brand" />

			<label htmlFor="category">category:</label>
			<input type="text" {...register('category')} id="category" />

			<label htmlFor="image">image:</label>
			<input type="file" onChange={uploadFileHandler} id="image" />

			<button>Submit</button>
		</form>
	);
};

export default ProductForm;
