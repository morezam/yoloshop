// Shared Types between frontend and backend

export interface ProductType<T> {
	_id: string;
	name: string;
	price: number;
	quantity: number;
	countInStock: number;
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
	createdAt: Date;
	updatedAt: Date;
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
	createdAt: Date;
	updatedAt: Date;
}

export interface UserType<T> {
	_id: string;
	name: string;
	email: string;
	password: string;
	isAdmin: boolean;
	isVerified: boolean;
	comments: CommentType<T>[];
	orders: T[];
	favorites: {
		_id: string;
		name: string;
	}[];
	createdAt: Date;
	updatedAt: Date;
}

export interface OrderType<T> {
	_id: string;
	user: T;
	orderItems: [
		{
			name: string;
			qty: number;
			price: number;
			image: string;
			product: ProductType<T> | T;
		}
	];
	shippingAddress: {
		address: string;
		city: string;
		postalCode: string;
	};
	taxPrice: number;
	shippingPrice: number;
	totalPrice: number;
	isPaid: boolean;
	paidAt: Date;
	isDelivered: boolean;
	deliveredAt: Date;
	createdAt: Date;
	updatedAt: Date;
}
