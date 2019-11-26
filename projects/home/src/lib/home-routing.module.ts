import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {menuRouteLabelRoot, menuRoutePathRoot} from '@fox/shared';
import {QuickSearchComponent} from './quick-search/quick-search.component';

const HomeRoutes: Routes = [
  {
    path: '',
    redirectTo: 'menu'
  },
  {
    path: menuRoutePathRoot,
    component: QuickSearchComponent,
    data: {
      nav: {
        linksToThisPath: [
          {
            label: menuRouteLabelRoot,
            pageHeaderConfig: {
              headerType: 'none'
            }
          }
        ]
      }
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(HomeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule {

}
