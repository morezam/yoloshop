// Shared Types between frontend and backend

export interface ProductType<T> {
	_id: string;
	name: string;
	price: number;
	quantity: number;
	user: T;
	description: string;
	image: string;
	brand: string;
	rating: number;
	category: string;
	numComments: number;
	comments: CommentType<T>[];
}

export interface CommentType<T> {
	_id: string;
	rating: number;
	user: T;
	text: string;
	like?: number;
	disLike?: number;
	userName: string;
}

export interface UserType {
	_id: string;
	name: string;
	email: string;
	password: string;
	isAdmin: boolean;
	isVerified: boolean;
	favorites: {
		_id: string;
		name: string;
	}[];
}
