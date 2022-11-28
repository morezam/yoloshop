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
	addedToFavs: number;
	purchasedNum: number;
	viewedNum: number;
}

export interface CommentType<T> {
	_id: string;
	rating: number;
	user: T;
	text: string;
	like?: number;
	disLike?: number;
	userName: string;
	edited: boolean;
	product: T;
	votedUsers: {
		_id: string;
		like: boolean;
	}[];
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
