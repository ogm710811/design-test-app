import {CommonModule} from '@angular/common';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NgModule} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {SwaggerGeneratedModule} from '@fox/rest-clients';
import {MockComponent} from './mock/mock.component';
import {testRoutes} from './test-routing.constants';

@NgModule({
  imports: [CommonModule, RouterTestingModule.withRoutes(testRoutes), HttpClientTestingModule, SwaggerGeneratedModule],
  declarations: [MockComponent],
  exports: [CommonModule, MockComponent, RouterTestingModule, HttpClientTestingModule]
})
export class TestSupportModule {
}
