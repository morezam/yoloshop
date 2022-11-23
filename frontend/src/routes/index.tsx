import { productRoutes } from './product';
import { userSignRoutes } from './user';

const routes = [...productRoutes, ...userSignRoutes];
export { routes };
