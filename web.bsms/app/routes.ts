import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
    index('modules/home.tsx'),
    route('dashboard', 'modules/dashboard.tsx'),
    route('for-you', 'modules/for-you.tsx'),
    route('inbox', 'modules/inbox.tsx'),

    route('products', 'modules/products-managements/products/products.tsx'),
    route('products/create', 'modules/products-managements/products/product-create.tsx'),
    route('products/categories', 'modules/products-managements/category/categories.tsx'),
    route('products/brands', 'modules/products-managements/brand/brands.tsx'),

    route('people/customers', 'modules/people/Customers/customers.tsx'),
    route('people/suppliers', 'modules/people/Supliers/supliers.tsx'),

    route('signin', 'modules/auth/login.tsx'),
    route('signup', 'modules/auth/singup.tsx'),
] satisfies RouteConfig;
