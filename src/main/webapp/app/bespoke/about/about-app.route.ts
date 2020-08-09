import { Route } from '@angular/router';
import { AboutComponent } from 'app/bespoke/about/about.component';

/**
 * Route for the about component
 */
export const ABOUT_APP_ROUTE: Route = {
  path: 'reports',
  component: AboutComponent,
  data: {
    authorities: [],
    pageTitle: 'Reports System',
  },
};
