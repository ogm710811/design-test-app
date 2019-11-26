import { MatDividerModule, MatTabsModule, MatSelectModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '@fox/shared';
import { NgModule } from '@angular/core';
import { QuickSearchComponent } from './quick-search/quick-search.component';
import { HomeRoutingModule } from './home-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatDividerModule,
    HomeRoutingModule
  ],
  declarations: [
    QuickSearchComponent
  ]
})
export class HomeModule {
}
