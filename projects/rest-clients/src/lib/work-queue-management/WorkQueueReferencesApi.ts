/**
 * work-queue-management
 * Services to support Work Queue Management
 *
 * OpenAPI spec version: v1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Inject, Injectable, Optional} from '@angular/core';

import {Observable} from 'rxjs';
import {Configuration} from '../configuration';
import {CustomHttpUrlEncodingCodec} from '../encoder';
import {ReferenceValueVO} from '../ReferenceValueVO';

import {BASE_PATH} from '../variables';

import {CategoryVO} from './model/CategoryVO';

@Injectable({
  providedIn: 'root'
})
export class WorkQueueReferencesApi {
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
   * List of work queue reference values
   * Retrieve a list of work queue reference values
   * @param name Table names to query
   * @param requestCorrelationId Initial Request GUID
   * @param id Reference value id
   * @param code Reference coded value
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public workqueueReference(name: string, requestCorrelationId?: string, id?: number, code?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<ReferenceValueVO>>;
  public workqueueReference(name: string, requestCorrelationId?: string, id?: number, code?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ReferenceValueVO>>>;
  public workqueueReference(name: string, requestCorrelationId?: string, id?: number, code?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ReferenceValueVO>>>;
  public workqueueReference(name: string, requestCorrelationId?: string, id?: number, code?: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (name === null || name === undefined) {
      throw new Error('Required parameter name was null or undefined when calling workqueueReference.');
    }

    let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    if (name !== undefined) {
      queryParameters = queryParameters.set('name', <any>name);
    }
    if (id !== undefined) {
      queryParameters = queryParameters.set('id', <any>id);
    }
    if (code !== undefined) {
      queryParameters = queryParameters.set('code', <any>code);
    }

    let headers = this.defaultHeaders;
    if (requestCorrelationId !== undefined && requestCorrelationId !== null) {
      headers = headers.set('RequestCorrelationId', String(requestCorrelationId));
    }

    // authentication (oauth) required
    if (this.configuration.accessToken) {
      const accessToken = typeof this.configuration.accessToken === 'function'
        ? this.configuration.accessToken()
        : this.configuration.accessToken;
      headers = headers.set('Authorization', 'Bearer ' + accessToken);
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

    return this.httpClient.get<Array<ReferenceValueVO>>(`${this.basePath}/api/workqueue/reference/`,
      {
        params: queryParameters,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

    /**
     * Retrieve categories for a work type
     * Retrieve a list of categories for each work type
     * @param workType Work type of the category being requested
     * @param requestCorrelationId Initial Request GUID
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getCategoriesByWorkType(workType: string, requestCorrelationId?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<CategoryVO>>;
    public getCategoriesByWorkType(workType: string, requestCorrelationId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<CategoryVO>>>;
    public getCategoriesByWorkType(workType: string, requestCorrelationId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<CategoryVO>>>;
    public getCategoriesByWorkType(workType: string, requestCorrelationId?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (workType === null || workType === undefined) {
            throw new Error('Required parameter workType was null or undefined when calling getCategoriesByWorkType.');
        }

        let headers = this.defaultHeaders;
        if (requestCorrelationId !== undefined && requestCorrelationId !== null) {
            headers = headers.set('RequestCorrelationId', String(requestCorrelationId));
        }

        // authentication (oauth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
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

        return this.httpClient.get<Array<CategoryVO>>(`${this.basePath}/api/workqueue/reference/${encodeURIComponent(String(workType))}/categories`,
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