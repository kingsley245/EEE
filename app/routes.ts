import {
  type RouteConfig,
  index,
  route,
  layout,
} from '@react-router/dev/routes';
export default [
  // 1. PUBLIC ROUTES
  index('routes/home.tsx'),
  route('login', 'pages/login.tsx'),
  route('register', 'pages/register.tsx'),
  route('contactus', 'pages/contactUs.tsx'),
  route('forgot-password', 'pages/forgot.tsx'),
  route('aboutus', 'pages/About.tsx'),
  route('reset-password', 'pages/resetpassword.tsx'),

  // 2. PORTAL ROUTES (Everything here is prefixed with /portal)
  route('portal', 'layouts/Portal.tsx', [
    index('routes/Home/route.tsx'),
    route('electronics', 'routes/Electronics/route.tsx'),
    route('tutorial', 'routes/Tutorial/route.tsx'),

    route('basics', 'routes/Basics/route.tsx'),
    route('electrical-wiring', 'routes/Wiring/route.tsx'),
    route('ee-essentials', 'routes/Essentials/route.tsx'),
    route('machines', 'routes/Machines/route.tsx'),
    route('power', 'routes/Power/route.tsx'),
    route('control', 'routes/Control/route.tsx'),
    // Note: I removed the '*' from here
  ]),

  // 3. GLOBAL CATCH-ALL (Move it here!)
  route('*', 'routes/notfound/route.tsx'),
] satisfies RouteConfig;
