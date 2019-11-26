/**
 * fox-claims
 * Monolithic-style application containing generated components from legacy code modernization and custom developed APIs to support core claim processing.
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

import {ClaimNoteVO} from './model/ClaimNoteVO';

@Injectable({
  providedIn: 'root'
})
export class ClaimNoteApi {
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
   * Create a claim note
   * To create a new claim note\&quot;
   * @param claimNumber Claim Number
   * @param claimNote To create a new claim note entry
   * @param requestCorrelationId Initial Request GUID
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createClaimNote(claimNumber: number, claimNote: ClaimNoteVO, requestCorrelationId?: string, observe?: 'body', reportProgress?: boolean): Observable<ClaimNoteVO>;
  public createClaimNote(claimNumber: number, claimNote: ClaimNoteVO, requestCorrelationId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ClaimNoteVO>>;
  public createClaimNote(claimNumber: number, claimNote: ClaimNoteVO, requestCorrelationId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ClaimNoteVO>>;
  public createClaimNote(claimNumber: number, claimNote: ClaimNoteVO, requestCorrelationId?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (claimNumber === null || claimNumber === undefined) {
      throw new Error('Required parameter claimNumber was null or undefined when calling createClaimNote.');
    }

    if (claimNote === null || claimNote === undefined) {
      throw new Error('Required parameter claimNote was null or undefined when calling createClaimNote.');
    }

    let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    if (claimNumber !== undefined && claimNumber !== null) {
      queryParameters = queryParameters.set('claimNumber', <any>claimNumber);
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
    ];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.post<ClaimNoteVO>(`${this.basePath}/api/claimhistory/note`,
      claimNote,
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
   * Delete claim note
   * To delete a specific claim note
   * @param claimNoteId Claim Note Key number
   * @param requestCorrelationId Initial Request GUID
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deleteClaimNote(claimNoteId: number, requestCorrelationId?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public deleteClaimNote(claimNoteId: number, requestCorrelationId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public deleteClaimNote(claimNoteId: number, requestCorrelationId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public deleteClaimNote(claimNoteId: number, requestCorrelationId?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (claimNoteId === null || claimNoteId === undefined) {
      throw new Error('Required parameter claimNoteId was null or undefined when calling deleteClaimNote.');
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

    return this.httpClient.delete<any>(`${this.basePath}/api/claimhistory/note/${encodeURIComponent(String(claimNoteId))}/`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Get claim note
   * To retrieve a specific claim note
   * @param claimNoteId Claim Note Key number
   * @param requestCorrelationId Initial Request GUID
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getClaimNote(claimNoteId: number, requestCorrelationId?: string, observe?: 'body', reportProgress?: boolean): Observable<ClaimNoteVO>;
  public getClaimNote(claimNoteId: number, requestCorrelationId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ClaimNoteVO>>;
  public getClaimNote(claimNoteId: number, requestCorrelationId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ClaimNoteVO>>;
  public getClaimNote(claimNoteId: number, requestCorrelationId?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (claimNoteId === null || claimNoteId === undefined) {
      throw new Error('Required parameter claimNoteId was null or undefined when calling getClaimNote.');
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

    return this.httpClient.get<ClaimNoteVO>(`${this.basePath}/api/claimhistory/note/${encodeURIComponent(String(claimNoteId))}/`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Update a claim note
   * To update a claim note
   * @param claimNoteId Claim Note Key number
   * @param updateClaimNote To update a Claim note
   * @param requestCorrelationId Initial Request GUID
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public updateClaimNote(claimNoteId: number, updateClaimNote: ClaimNoteVO, requestCorrelationId?: string, observe?: 'body', reportProgress?: boolean): Observable<ClaimNoteVO>;
  public updateClaimNote(claimNoteId: number, updateClaimNote: ClaimNoteVO, requestCorrelationId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ClaimNoteVO>>;
  public updateClaimNote(claimNoteId: number, updateClaimNote: ClaimNoteVO, requestCorrelationId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ClaimNoteVO>>;
  public updateClaimNote(claimNoteId: number, updateClaimNote: ClaimNoteVO, requestCorrelationId?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (claimNoteId === null || claimNoteId === undefined) {
      throw new Error('Required parameter claimNoteId was null or undefined when calling updateClaimNote.');
    }

    if (updateClaimNote === null || updateClaimNote === undefined) {
      throw new Error('Required parameter updateClaimNote was null or undefined when calling updateClaimNote.');
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

    return this.httpClient.put<ClaimNoteVO>(`${this.basePath}/api/claimhistory/note/${encodeURIComponent(String(claimNoteId))}/`,
      updateClaimNote,
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
