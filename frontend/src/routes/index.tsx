import { productRoutes } from './product';
import { userSignRoutes } from './user';
import { adminRoutes } from './admin';

const routes = [...productRoutes, ...userSignRoutes, ...adminRoutes];
export { routes };
