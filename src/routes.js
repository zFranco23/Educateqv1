import React from 'react';

const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
const Tables = React.lazy(() => import('./views/notas/tables/Tables'));

const Test=React.lazy(()=> import('./views/notas/test/Test'))
const Breadcrumbs = React.lazy(() => import('./views/notas/breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/notas/cards/Cards'));
const Carousels = React.lazy(() => import('./views/notas/carousels/Carousels'));
const Collapses = React.lazy(() => import('./views/notas/collapses/Collapses'));
const BasicForms = React.lazy(() => import('./views/notas/forms/BasicForms'));
const Semanales = React.lazy(() => import('./views/notas/Ex. semanales/semanales'));
const Mensuales = React.lazy(() => import('./views/notas/Ex. mensuales/mensuales'));
const Bimestrales = React.lazy(() => import('./views/notas/Ex. bimestrales/bimestrales'));

const Jumbotrons = React.lazy(() => import('./views/notas/jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/notas/list-groups/ListGroups'));
const Navbars = React.lazy(() => import('./views/notas/navbars/Navbars'));
const Navs = React.lazy(() => import('./views/notas/navs/Navs'));
const Paginations = React.lazy(() => import('./views/notas/paginations/Pagnations'));
const Popovers = React.lazy(() => import('./views/notas/popovers/Popovers'));
const ProgressBar = React.lazy(() => import('./views/notas/progress-bar/ProgressBar'));
const Switches = React.lazy(() => import('./views/notas/switches/Switches'));

const Tabs = React.lazy(() => import('./views/notas/tabs/Tabs'));
const Tooltips = React.lazy(() => import('./views/notas/tooltips/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const Charts = React.lazy(() => import('./views/charts/Charts'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));

const Alumno= React.lazy(()=> import ('./views/alumno/alumno/Alumno'));
const Notas= React.lazy(()=> import('./views/alumno/notas/Notas'));
const Asistencia=React.lazy(()=> import('./views/alumno/asistencia/Asistencia'));
const Cursos= React.lazy(()=> import('./views/alumno/cursos/Cursos'));
const Observaciones= React.lazy(()=> import('./views/alumno/observaciones/Observaciones'));
const Colors = React.lazy(() => import('./views/alumno/colors/Colors'));
const Typography = React.lazy(() => import('./views/alumno/typography/Typography'));
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/alumno', name: 'Alumno', component: Colors, exact: true },
  { path: '/alumno/alumno', name: 'Alumno', component: Alumno },
  { path: '/alumno/notas', name: 'Notas', component: Notas },
  { path: '/alumno/asistencia', name: 'Asistencia', component: Asistencia },
  { path: '/alumno/cursos', name: 'Cursos', component: Cursos },
  { path: '/alumno/observaciones', name: 'Observaciones', component: Observaciones },
  { path: '/alumno/colors', name: 'Colors', component: Colors },
  { path: '/alumno/typography', name: 'Typography', component: Typography },
  { path: '/notas', name: 'notas', component: Cards, exact: true },
  { path: '/notas/test', name: 'Test', component: Test },
  { path: '/notas/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/notas/cards', name: 'Cards', component: Cards },
  { path: '/notas/carousels', name: 'Carousel', component: Carousels },
  { path: '/notas/collapses', name: 'Collapse', component: Collapses },
  { path: '/notas/forms', name: 'Forms', component: BasicForms },
  { path: '/notas/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/notas/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/notas/navbars', name: 'Navbars', component: Navbars },
  { path: '/notas/navs', name: 'Navs', component: Navs },
  { path: '/notas/paginations', name: 'Paginations', component: Paginations },
  { path: '/notas/popovers', name: 'Popovers', component: Popovers },
  { path: '/notas/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/notas/switches', name: 'Switches', component: Switches },
  { path: '/notas/tables', name: 'Tables', component: Tables },
  { path: '/notas/tabs', name: 'Tabs', component: Tabs },
  { path: '/notas/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/notas/semanales', name: 'Semanales', component: Semanales },
  { path: '/notas/mensuales', name: 'Mensuales', component: Mensuales },
  { path: '/notas/bimestrales', name: 'Bimestrales', component: Bimestrales },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
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
