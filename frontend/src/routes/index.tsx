import { productRoutes } from './product';
import { userSignRoutes } from './user';
import { adminRoutes } from './admin';
import { orderRoutes } from './order';

const routes = [
	...productRoutes,
	...userSignRoutes,
	...adminRoutes,
	...orderRoutes,
];
export { routes };
