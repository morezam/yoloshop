import { useAuthContext } from '@context/authContext';
import { useMutation } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { queryClient } from '@utils/queryClient';
import { useNavigate } from 'react-router-dom';

interface DeleteProductProps {
	id: string;
	onSuccess?: any;
	image: string;
	children: React.ReactNode;
}

const DeleteProduct = ({
	id,
	image,
	onSuccess,
	children,
}: DeleteProductProps) => {
	const { user } = useAuthContext();
	const navigate = useNavigate();

	const { mutate } = useMutation({
		mutationFn: (image: string) => {
			return shop.delete(`/products/${id}?image=${image}`, {
				headers: {
					authorization: `Bearer ${user.token}`,
				},
			});
		},
		onSuccess() {
			onSuccess
				? onSuccess()
				: navigate('/user/profile/products', { replace: true });
		},
	});

	return <div onClick={() => mutate(image)}>{children}</div>;
};

export default DeleteProduct;
