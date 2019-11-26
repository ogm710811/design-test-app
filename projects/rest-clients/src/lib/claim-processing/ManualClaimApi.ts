/**
 * fox-claims-receipt
 * Custom developed service operations to support claim processing before claim intake, such as member validation.
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
import {ManualClaimIntakeVO} from './model/ManualClaimIntakeVO';

@Injectable({
  providedIn: 'root'
})
export class ManualClaimApi {
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  protected basePath = '';

  constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  /**
   * Create Manual Claim
   * To create a new manual claim record
   * @param manualClaim To create a new claim with an initial status
   * @param requestCorrelationId Initial Request GUID
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createManualClaim(manualClaim: ManualClaimIntakeVO, requestCorrelationId?: string, observe?: 'body', reportProgress?: boolean): Observable<ManualClaimIntakeVO>;
  public createManualClaim(manualClaim: ManualClaimIntakeVO, requestCorrelationId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ManualClaimIntakeVO>>;
  public createManualClaim(manualClaim: ManualClaimIntakeVO, requestCorrelationId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ManualClaimIntakeVO>>;
  public createManualClaim(manualClaim: ManualClaimIntakeVO, requestCorrelationId?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (manualClaim === null || manualClaim === undefined) {
      throw new Error('Required parameter manualClaim was null or undefined when calling createManualClaim.');
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
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.post<ManualClaimIntakeVO>(`${this.basePath}/api/claim/manual`,
      manualClaim,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Deletion of Manual Claim
   * Delete a record in Fox for manual claim intake and related image in Excela
   * @param claimNumber claimNumber
   * @param requestCorrelationId Initial Request GUID
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deleteManualClaim(claimNumber: string, requestCorrelationId?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public deleteManualClaim(claimNumber: string, requestCorrelationId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public deleteManualClaim(claimNumber: string, requestCorrelationId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public deleteManualClaim(claimNumber: string, requestCorrelationId?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (claimNumber === null || claimNumber === undefined) {
      throw new Error('Required parameter claimNumber was null or undefined when calling deleteManualClaim.');
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

    return this.httpClient.delete<any>(`${this.basePath}/api/claim/manual/${encodeURIComponent(String(claimNumber))}`,
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
