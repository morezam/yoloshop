export const createPaginatedRes = <T>(
	array: T[],
	page: number,
	perPage: number
) => {
	const count = array.length;

	const pages = Math.ceil(count / perPage);

	const firstPageIndex = (page - 1) * perPage;
	const lastPageIndex = firstPageIndex + perPage;

	const sliced = array.slice(firstPageIndex, lastPageIndex);

	return { sliced, pages };
};
