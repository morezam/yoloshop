export const imageSrc = (img: string) => {
	// TODO : change this to production URL
	return img.startsWith('/') ? `http://localhost:5000${img}` : img;
};
