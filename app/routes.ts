import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('*', 'routes/notfound/route.tsx'),
] satisfies RouteConfig;
