/**
 * payment-reconciliation
 * Services to support Payment Reconciliation screen consolidation.  These services are part of fox-claims, but are just in a separate specification.
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
import {BASE_PATH} from '../variables';
import {PagedResourcesOfResourceOfCheckSummaryVO} from './model/PagedResourcesOfResourceOfCheckSummaryVO';

@Injectable({
  providedIn: 'root'
})
export class FindAndBrowseCheckRegisterApi {
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
   * Returns a list of 0 to many check summary objects
   * To search the check register
   * @param searchBy type of search to perform
   * @param requestCorrelationId Initial Request GUID
   * @param checkSeries check series to search for
   * @param checkNumber check number to search for
   * @param issueDate date to search for
   * @param acctNumber account number to search for
   * @param claimNumber claim number to search for
   * @param tin provider&#39;s tax identification number to search for
   * @param npi National Provider ID
   * @param size List Size
   * @param page Page Number
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */

  public apiPaymentCheckGet(searchBy: string, requestCorrelationId?: string, checkSeries?: string, checkNumber?: number, issueDate?: string, acctNumber?: number, claimNumber?: string, tin?: number, npi?: number, size?: number, page?: number, observe?: 'body', reportProgress?: boolean): Observable<PagedResourcesOfResourceOfCheckSummaryVO>;
  public apiPaymentCheckGet(searchBy: string, requestCorrelationId?: string, checkSeries?: string, checkNumber?: number, issueDate?: string, acctNumber?: number, claimNumber?: string, tin?: number, npi?: number, size?: number, page?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PagedResourcesOfResourceOfCheckSummaryVO>>;
  public apiPaymentCheckGet(searchBy: string, requestCorrelationId?: string, checkSeries?: string, checkNumber?: number, issueDate?: string, acctNumber?: number, claimNumber?: string, tin?: number, npi?: number, size?: number, page?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PagedResourcesOfResourceOfCheckSummaryVO>>;
  public apiPaymentCheckGet(searchBy: string, requestCorrelationId?: string, checkSeries?: string, checkNumber?: number, issueDate?: string, acctNumber?: number, claimNumber?: string, tin?: number, npi?: number, size?: number, page?: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (searchBy === null || searchBy === undefined) {
      throw new Error('Required parameter searchBy was null or undefined when calling apiPaymentCheckGet.');
    }

    let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    if (searchBy !== undefined) {
      queryParameters = queryParameters.set('search_by', <any>searchBy);
    }
    if (checkSeries !== undefined) {
      queryParameters = queryParameters.set('check_series', <any>checkSeries);
    }
    if (checkNumber !== undefined) {
      queryParameters = queryParameters.set('check_number', <any>checkNumber);
    }
    if (issueDate !== undefined) {
      queryParameters = queryParameters.set('issue_date', <any>issueDate);
    }
    if (acctNumber !== undefined) {
      queryParameters = queryParameters.set('acct_number', <any>acctNumber);
    }
    if (claimNumber !== undefined) {
      queryParameters = queryParameters.set('claim_number', <any>claimNumber);
    }
    if (tin !== undefined) {
      queryParameters = queryParameters.set('tin', <any>tin);
    }
    if (npi !== undefined) {
      queryParameters = queryParameters.set('npi', <any>npi);
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
    const consumes: string[] = [
      'application/json'
    ];

    return this.httpClient.get<PagedResourcesOfResourceOfCheckSummaryVO>(`${this.basePath}/api/payment/check`,
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
