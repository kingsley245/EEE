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
  // The private Routes   protected
  route('portal', 'layouts/Portal.tsx', [
    index('routes/Home/route.tsx'),
    route('electronics', 'routes/Electronics/route.tsx'),
    route('tutorial', 'routes/Tutorial/route.tsx'),

    route('basics', 'routes/Basics/route.tsx'),
    route('electrical-wiring', 'routes/Wiring/route.tsx'),
    route('assignments/:id', 'pages/AssignmentPage.tsx'),
    route('ee-essentials', 'routes/Essentials/route.tsx'),
    route('Posts', 'pages/Post.tsx'),
    route('admin', 'pages/AdminDash.tsx'),
    route('machines', 'routes/Machines/route.tsx'),
    route('contribute', 'pages/contribute.tsx'),
    route('contributePQ', 'pages/contributePQ.tsx'),
    route('power', 'routes/Power/route.tsx'),
    route('control', 'routes/Control/route.tsx'),
  ]),

  route('*', 'routes/notfound/route.tsx'),
] satisfies RouteConfig;
