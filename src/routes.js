import React from 'react';

const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));

const Breadcrumbs = React.lazy(() => import('./views/notas/breadcrumbs/Breadcrumbs'));

const Semanales = React.lazy(() => import('./views/notas/Ex. semanales/semanales'));
const Mensuales = React.lazy(() => import('./views/notas/Ex. mensuales/mensuales'));
const Bimestrales = React.lazy(() => import('./views/notas/Ex. bimestrales/bimestrales'));


const Charts = React.lazy(() => import('./views/charts/Charts'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));

const Alumno= React.lazy(()=> import ('./views/alumno/alumno/Alumno'));
const Asistencia=React.lazy(()=> import('./views/alumno/asistencia/Asistencia'));
const Cursos= React.lazy(()=> import('./views/alumno/cursos/Cursos'));
const Observaciones= React.lazy(()=> import('./views/alumno/observaciones/Observaciones'));
const Horario= React.lazy(()=> import('./views/alumno/horario/Horario'));
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/alumno/alumno', name: 'Alumno', component: Alumno },
  { path: '/alumno/asistencia', name: 'Asistencia', component: Asistencia },
  { path: '/alumno/cursos', name: 'Cursos', component: Cursos },
  { path: '/alumno/observaciones', name: 'Observaciones', component: Observaciones },
  { path: '/alumno/horario', name:'Horario', component: Horario},
  { path: '/notas/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/notas/semanales', name: 'Semanales', component: Semanales },
  { path: '/notas/mensuales', name: 'Mensuales', component: Mensuales },
  { path: '/notas/bimestrales', name: 'Bimestrales', component: Bimestrales },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User }
];

export default routes;
