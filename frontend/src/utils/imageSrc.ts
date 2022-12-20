export const imageSrc = (img: string) => {
	// return img.startsWith('/') ? `https://yoloshop.onrender.com${img}` : img;
	return img.startsWith('/') ? `${process.env.WEBSITE_URL}${img}` : img;
};
