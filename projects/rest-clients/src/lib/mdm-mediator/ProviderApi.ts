/**
 * MDM Mediator
 * This is the MDM Mediator REST API
 *
 * OpenAPI spec version: 1.0.0
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

import {BASE_PATH} from '../variables';
import {PagedResourcesOfResourceOfProviderVO} from './model/PagedResourcesOfResourceOfProviderVO';
import {ResourceOfProviderVO} from './model/ResourceOfProviderVO';

@Injectable({
  providedIn: 'root'
})
export class ProviderApi {
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
   * Returns the set of provider lookup results given query parameters
   * Provider lookup service will return zero to many provider results
   * @param tin Tax Identifier Number
   * @param npi National Provider ID
   * @param businessName Business Name of Provider
   * @param firstName First Name of Provider
   * @param lastName Last Name of Provider
   * @param providerType Provider Type
   * @param city City of the Provider Address
   * @param state State of the Provider Address
   * @param zip Zipcode of the Provider Address
   * @param size List Size
   * @param page Page Number
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public findProvider(requestCorrelationId?: string,  tin?: number, npi?: number, businessName?: string, firstName?: string, lastName?: string, providerType?: string, city?: string, state?: string, zip?: string, size?: number, page?: number, observe?: 'body', reportProgress?: boolean): Observable<PagedResourcesOfResourceOfProviderVO>;
  public findProvider(requestCorrelationId?: string,  tin?: number, npi?: number, businessName?: string, firstName?: string, lastName?: string, providerType?: string, city?: string, state?: string, zip?: string, size?: number, page?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PagedResourcesOfResourceOfProviderVO>>;
  public findProvider(requestCorrelationId?: string,  tin?: number, npi?: number, businessName?: string, firstName?: string, lastName?: string, providerType?: string, city?: string, state?: string, zip?: string, size?: number, page?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PagedResourcesOfResourceOfProviderVO>>;
  public findProvider(requestCorrelationId?: string,  tin?: number, npi?: number, businessName?: string, firstName?: string, lastName?: string, providerType?: string, city?: string, state?: string, zip?: string, size?: number, page?: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    if (tin !== undefined) {
      queryParameters = queryParameters.set('tin', <any>tin);
    }
    if (npi !== undefined) {
      queryParameters = queryParameters.set('npi', <any>npi);
    }
    if (businessName !== undefined) {
      queryParameters = queryParameters.set('business_name', <any>businessName);
    }
    if (firstName !== undefined) {
      queryParameters = queryParameters.set('first_name', <any>firstName);
    }
    if (lastName !== undefined) {
      queryParameters = queryParameters.set('last_name', <any>lastName);
    }
    if (providerType !== undefined) {
      queryParameters = queryParameters.set('provider_type', <any>providerType);
    }
    if (city !== undefined) {
      queryParameters = queryParameters.set('city', <any>city);
    }
    if (state !== undefined) {
      queryParameters = queryParameters.set('state', <any>state);
    }
    if (zip !== undefined) {
      queryParameters = queryParameters.set('zip', <any>zip);
    }
    if (size !== undefined) {
      queryParameters = queryParameters.set('size', <any>size);
    }
    if (page !== undefined) {
      queryParameters = queryParameters.set('page', <any>page);
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
    const consumes: string[] = [];

    return this.httpClient.get<PagedResourcesOfResourceOfProviderVO>(`${this.basePath}/api/provider`,
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
   * Returns details about a single provider based on the unique Provider MDM attribute, providerId
   * Provider lookup service will return zero to one provider results
   * @param providerId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getProvider(providerId: number, requestCorrelationId?: string, observe?: 'body', reportProgress?: boolean): Observable<ResourceOfProviderVO>;
  public getProvider(providerId: number, requestCorrelationId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResourceOfProviderVO>>;
  public getProvider(providerId: number, requestCorrelationId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResourceOfProviderVO>>;
  public getProvider(providerId: number, requestCorrelationId?: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (providerId === null || providerId === undefined) {
      throw new Error('Required parameter providerId was null or undefined when calling getProvider.');
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
    const consumes: string[] = [];

    return this.httpClient.get<ResourceOfProviderVO>(`${this.basePath}/api/provider/${encodeURIComponent(String(providerId))}`,
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
