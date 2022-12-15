export const numFormatter = (number: number) => {
	const formatter = Intl.NumberFormat('en-US', {
		notation: 'compact',
		maximumFractionDigits: 1,
	});

	return formatter.format(number);
};
