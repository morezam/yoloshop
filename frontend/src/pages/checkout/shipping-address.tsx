import { useAuthContext } from '@context/authContext';
import { useOrderContext } from '@context/orderContext';
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
		formState: { errors, isValid },
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
		<form onSubmit={handleSubmit(onAddressSubmit)}>
			<input
				type="text"
				{...register('address', {
					required: {
						value: true,
						message: 'This field is required',
					},
				})}
			/>
			<input
				type="text"
				{...register('city', {
					required: {
						value: true,
						message: 'This field is required',
					},
				})}
			/>
			<input
				type="text"
				{...register('postalCode', {
					required: {
						value: true,
						message: 'This field is required',
					},
				})}
			/>
			<button>Submit</button>

			<p>{errors.address ? errors.address.message : null}</p>

			{isValid && order.address ? (
				<Link to={'/checkout/place-orders'}>Move on to Place orders</Link>
			) : null}
		</form>
	);
};

export default ShippingAddressPage;
