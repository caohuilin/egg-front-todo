import {
  DefaultPage
} from './';

export default {
  path: '/todos',
  name: 'Todos',
  childRoutes: [
    { path: 'default-page',
      name: 'Default page',
      component: DefaultPage,
      isIndex: true,
    },
  ],
};
