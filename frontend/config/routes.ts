export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: 'Login', path: '/user/login', component: './user/login' },
             { name: 'Register', path: '/user/register', component: './user/register' }
    ],
  },
  { path: '/welcome', name: 'Welcome', icon: 'smile', component: './Welcome' },
  {
    path: '/admin',
    name: 'Admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      { path: '/admin', redirect: '/admin/user-manage' },
      { path: '/admin/user-manage', name: 'User Management', component: './user-manage' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { component: '404', layout: false, path: './*' },
];
