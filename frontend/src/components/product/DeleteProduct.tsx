import Btn from '@components/Btn';
import { useAuthContext } from '@context/authContext';
import { useMutation } from '@tanstack/react-query';
import { shop } from '@utils/api';
import { useNavigate } from 'react-router-dom';

interface DeleteProductProps {
	id: string;
	to?: string;
	image: string;
	children: React.ReactNode;
}

const DeleteProduct = ({ id, to, image, children }: DeleteProductProps) => {
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
			to ? navigate(to, { replace: true }) : null;
		},
	});

	return <div onClick={() => mutate(image)}>{children}</div>;
};

export default DeleteProduct;
