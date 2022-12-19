export const imageSrc = (img: string) => {
	return img.startsWith('/') ? `https://yoloshop.onrender.com${img}` : img;
};
