import {Routes} from '@angular/router';
import {MockComponent} from './mock/mock.component';

export const testRoutes: Routes = [
  {
    path: '',
    component: MockComponent
  },
  {
    path: 'login',
    component: MockComponent,
    children: [
      {
        path: 'msId',
        component: MockComponent
      }
    ]
  },
  {
    path: 'dashboard',
    component: MockComponent
  }
];
