export const formatRating = (rating: number) => {
	const decimal = rating % 1;
	let mid: number;
	let returnNum: number;

	if (decimal >= 0 && decimal <= 0.5) {
		mid = 0.25;
	} else if (decimal > 0.5 && decimal <= 1) {
		mid = 0.75;
	}

	if (decimal >= mid) {
		returnNum = Math.floor(rating) + mid + 0.25;
	} else if (decimal < mid) {
		returnNum = Math.floor(rating) + mid - 0.25;
	}

	return returnNum;
};
