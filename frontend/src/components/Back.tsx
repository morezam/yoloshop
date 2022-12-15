import { Link } from 'react-router-dom';
import { TbArrowBackUp } from 'react-icons/tb';

const Back = ({ to, children }: { to: string; children: React.ReactNode }) => {
	return (
		<Link to={to} className="w-full flex items-center text-lg p-1">
			<TbArrowBackUp />
			{children}
		</Link>
	);
};

export default Back;
