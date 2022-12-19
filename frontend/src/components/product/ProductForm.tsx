import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ProductType } from '@types';
import { shop } from '@utils/api';
import FormLayout from '@layouts/FormLayout';
import Input from '@components/Input';
import Btn from '@components/Btn';

interface ProductFormProps {
	onSubmit: SubmitHandler<ProductType<string>>;
	initial?: ProductType<string>;
	children?: React.ReactNode;
}

const ProductForm = ({ onSubmit, initial, children }: ProductFormProps) => {
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { isDirty, errors },
	} = useForm<ProductType<string>>();

	useEffect(() => {
		reset({
			name: initial?.name,
			price: initial?.price,
			quantity: initial?.quantity,
			description: initial?.description,
			brand: initial?.brand,
			category: initial?.category,
			image: initial?.image,
			countInStock: initial?.countInStock,
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
	const required = { value: true, message: 'This Field is Required' };

	return (
		<FormLayout
			title={`${initial ? 'Product Details :' : 'Create a New Product :'}`}
			styling="max-w-6xl">
			<form
				className="flex flex-col sm:grid sm:grid-cols-2 sm:gap-x-4"
				onSubmit={handleSubmit(onSubmit)}>
				<Input label="Name" {...register('name', { required })} />
				<Input
					type="number"
					label="Price"
					min={0}
					{...register('price', { required })}
					error={errors.name?.message}
				/>
				<Input
					type="number"
					label="Quantity"
					min={0}
					{...register('quantity', { required })}
					error={errors.quantity?.message}
				/>
				<Input
					type="number"
					min={0}
					label="Count In stock"
					{...register('countInStock', { required })}
					error={errors.countInStock?.message}
				/>
				<Input
					label="Brand"
					{...register('brand', { required })}
					error={errors.brand?.message}
				/>
				<div className="flex flex-col col-start-1 col-end-3">
					<label htmlFor="description">Description :</label>
					<textarea
						{...register('description', { required })}
						spellCheck={false}
						className="my-2 h-48 text-slate-900 focus:ring-0 focus:outline-0 px-2 py-1 rounded-md"
					/>
				</div>
				<Input label="Category" {...register('category', { required })} />
				<Input
					label="Image"
					styling="relative overflow-hidden"
					{...register('image', { required })}
					inner={
						<div className="absolute right-24 top-[2.16rem] w-0">
							<input
								type="file"
								onChange={uploadFileHandler}
								id="image"
								className="block file:rounded-full file:text-xs file:border-0 file:cursor-pointer file:mr-7 file:py-1 file:px-4 file:bg-violet-50 file:text-violet-700
								hover:file:bg-violet-100"
							/>
						</div>
					}
				/>

				<Btn
					disabled={!isDirty}
					styling={`disabled:bg-gray-500 col-start-1 ${
						initial ? 'col-end-2' : 'col-end-3'
					} mt-5`}>
					{initial ? 'Update Product' : 'Create'}
				</Btn>
				{children}
			</form>
		</FormLayout>
	);
};

export default ProductForm;
