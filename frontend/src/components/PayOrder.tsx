import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useAuthContext } from '@context/authContext';
import { shop } from '@utils/api';

interface PayOrdersProps {
	onSuccess: any;
	orderId: string;
	children: React.ReactNode;
}

const PayOrders = ({ onSuccess, orderId, children }: PayOrdersProps) => {
	const { user } = useAuthContext();

	const { mutate } = useMutation({
		mutationFn: () => {
			return shop.put(
				`/orders/${orderId}/payOrder`,
				{},
				{
					headers: {
						authorization: `Bearer ${user.token}`,
					},
				}
			);
		},
		onSuccess() {
			// navigate(`/user/profile/${user.id}/orders`, {
			// 	replace: true,
			// });
			onSuccess();
		},
	});

	return <div onClick={() => mutate()}>{children}</div>;
};

export default PayOrders;
