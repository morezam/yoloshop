export const createStarArr = (num: number) => {
	const star = [];
	for (let i = 0; i < 5; i++) {
		if (num > 0) {
			let push = num === 0.5 ? 0.5 : 1;
			star.push(push);
		} else {
			star.push(0);
		}
		num = num - 1;
	}

	return star;
};
