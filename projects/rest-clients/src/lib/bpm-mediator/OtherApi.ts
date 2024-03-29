/**
 * bpm-mediator
 * BPM Mediator to facilitate interactions between BPM and other services
 *
 * OpenAPI spec version: v1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import {HttpClient, HttpEvent, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Inject, Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs';
import {Configuration} from '../configuration';
import {BASE_PATH} from '../variables';
import {ResourceOfMemberLookupProcessInfoVO} from './model/ResourceOfMemberLookupProcessInfoVO';
import {ResourceOfMemberLookupTaskVO} from './model/ResourceOfMemberLookupTaskVO';

@Injectable({
  providedIn: 'root'
})
export class OtherApi {
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  protected basePath = '';

  constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  /**
   * Get Process
   * To retrieve a specified process
   * @param processId Id of the process to return
   * @param requestCorrelationId Initial Request GUID
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getProcess(processId: string, requestCorrelationId?: string, observe?: 'body', reportProgress?: boolean): Observable<ResourceOfMemberLookupProcessInfoVO>;
  public getProcess(processId: string, requestCorrelationId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResourceOfMemberLookupProcessInfoVO>>;
  public getProcess(processId: string, requestCorrelationId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResourceOfMemberLookupProcessInfoVO>>;
  public getProcess(processId: string, requestCorrelationId?: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (processId === null || processId === undefined) {
      throw new Error('Required parameter processId was null or undefined when calling getProcess.');
    }

    let headers = this.defaultHeaders;
    if (requestCorrelationId !== undefined && requestCorrelationId !== null) {
      headers = headers.set('RequestCorrelationId', String(requestCorrelationId));
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [
      'application/json'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json'
    ];

    // authentication (OAuth2) required
    // oauth required
    if (this.configuration.accessToken) {
      const accessToken = typeof this.configuration.accessToken === 'function'
        ? this.configuration.accessToken()
        : this.configuration.accessToken;

      headers = headers.set('Authorization', 'Bearer ' + accessToken);
    }

    return this.httpClient.get<ResourceOfMemberLookupProcessInfoVO>(`${this.basePath}/api/foxprocess/memberlookup/${encodeURIComponent(String(processId))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Get Validation Task
   * To retrieve tasks for a specified process
   * @param processId Id of the process with the task to return
   * @param requestCorrelationId Initial Request GUID
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getTask(processId: string, requestCorrelationId?: string, observe?: 'body', reportProgress?: boolean): Observable<ResourceOfMemberLookupTaskVO>;
  public getTask(processId: string, requestCorrelationId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResourceOfMemberLookupTaskVO>>;
  public getTask(processId: string, requestCorrelationId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResourceOfMemberLookupTaskVO>>;
  public getTask(processId: string, requestCorrelationId?: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (processId === null || processId === undefined) {
      throw new Error('Required parameter processId was null or undefined when calling getTask.');
    }

    let headers = this.defaultHeaders;
    if (requestCorrelationId !== undefined && requestCorrelationId !== null) {
      headers = headers.set('RequestCorrelationId', String(requestCorrelationId));
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [
      'application/json'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json'
    ];

    // authentication (OAuth2) required
    // oauth required
    if (this.configuration.accessToken) {
      const accessToken = typeof this.configuration.accessToken === 'function'
        ? this.configuration.accessToken()
        : this.configuration.accessToken;

      headers = headers.set('Authorization', 'Bearer ' + accessToken);
    }

    return this.httpClient.get<ResourceOfMemberLookupTaskVO>(`${this.basePath}/api/foxprocess/memberlookup/${encodeURIComponent(String(processId))}/validationtask`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  private canConsumeForm(consumes: string[]): boolean {
    const form = 'multipart/form-data';
    for (const consume of consumes) {
      if (form === consume) {
        return true;
      }
    }
    return false;
  }

}
