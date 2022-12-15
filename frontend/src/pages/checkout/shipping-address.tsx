import Btn from '@components/Btn';
import Input from '@components/Input';
import Nav from '@components/Nav';
import { useAuthContext } from '@context/authContext';
import { useOrderContext } from '@context/orderContext';
import FormLayout from '@layouts/FormLayout';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

interface Address {
	address: string;
	city: string;
	postalCode: string;
}

const ShippingAddressPage = () => {
	const { user } = useAuthContext();
	const { order, setOrder } = useOrderContext();

	const {
		handleSubmit,
		register,
		reset,
		formState: { errors, isValid, isDirty },
	} = useForm({
		defaultValues: {
			address: '',
			city: '',
			postalCode: '',
		},
	});

	const navigate = useNavigate();

	useEffect(() => {
		if (!user.token) {
			navigate('/login?redirect=checkout/shipping-address');
		}

		if (order.address) {
			reset(order.address);
		}
	}, []);

	const onAddressSubmit = (data: Address) => {
		setOrder(oldOrder => ({ items: oldOrder.items, address: data }));
	};

	return (
		<>
			<Nav />
			<FormLayout title="Please Enter Your Address" styling="max-w-lg mx-auto">
				<form
					onSubmit={handleSubmit(onAddressSubmit)}
					className="flex flex-col">
					<Input
						error={errors.address?.message}
						label="Address"
						{...register('address', {
							required: {
								value: true,
								message: 'This field is required',
							},
						})}
					/>

					<Input
						error={errors.city?.message}
						label="City"
						{...register('city', {
							required: {
								value: true,
								message: 'This field is required',
							},
						})}
					/>

					<Input
						error={errors.postalCode?.message}
						label="Postal Code"
						{...register('postalCode', {
							required: {
								value: true,
								message: 'This field is required',
							},
						})}
					/>

					<Btn disabled={!isDirty} styling="mt-4">
						Submit
					</Btn>

					{isValid && order.address ? (
						<Link to={'/checkout/place-orders'}>
							<Btn styling="my-4">Move on to Place orders</Btn>
						</Link>
					) : null}
				</form>
			</FormLayout>
		</>
	);
};

export default ShippingAddressPage;
