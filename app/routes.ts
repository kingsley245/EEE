import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('/electronics', 'routes/electronics/route.tsx'),
  route('/about', 'components/About.tsx'),
  route('/contact', 'components/ContactUs.tsx'),
  route('/Tutorial', 'routes/Tutorial/route.tsx'),
  route('/basics', 'routes/Basics/route.tsx'),
  route('/electrical-wiring', 'routes/Wiring/route.tsx'),
  route('/ee-essentials', 'routes/Essentials/route.tsx'),
  route('/machines', 'routes/Machines/route.tsx'),
  route('/power', 'routes/Power/route.tsx'),
  route('/control', 'routes/Control/route.tsx'),
  route('*', 'routes/notfound/route.tsx'),
] satisfies RouteConfig;
