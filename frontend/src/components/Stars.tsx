import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { createStarArr } from '@utils/createStarArr';

const Stars = ({ rating }: { rating: number }) => {
	const startArr = createStarArr(rating);

	const stars = () => {
		return startArr.map((star, i) => {
			if (star === 1) {
				return <BsStarFill key={i} className="fill-yellow-400" />;
			} else if (star === 0.5) {
				return <BsStarHalf key={i} className="fill-yellow-400" />;
			} else if (star === 0) {
				return <BsStar key={i} />;
			}
		});
	};

	return <div className="flex">{stars()}</div>;
};

export default Stars;
