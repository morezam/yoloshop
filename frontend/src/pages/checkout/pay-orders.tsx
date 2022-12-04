import { useAuthContext } from '@context/authContext';
import { useOrderContext } from '@context/orderContext';
import { useMutation } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { useNavigate, useParams } from 'react-router-dom';

const PayOrders = () => {
	const { user } = useAuthContext();
	const navigate = useNavigate();

	const params = useParams();

	const { mutate } = useMutation({
		mutationFn: () => {
			return shop.put(
				`/orders/${params.orderId}/payOrder`,
				{},
				{
					headers: {
						authorization: `Bearer ${user.token}`,
					},
				}
			);
		},
		onSuccess() {
			navigate(`/user/profile/${user.id}/orders`, {
				replace: true,
			});
		},
	});

	return <button onClick={() => mutate()}>PayOrders</button>;
};

export default PayOrders;
