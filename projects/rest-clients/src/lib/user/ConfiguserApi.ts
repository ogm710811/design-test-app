/**
 * user
 * Provides Oauth 2 Authentication and system configuration services for FOX. The Oauth2 endpoints support user authentication and granted authorities. Both static and user-set configuration data in the fox data store is accessed and maintained though the configuration endpoints.  Granted authorities defined in this data are also returned in the uaa/user response.
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
import {PagedResourcesOfResourceOfLogonActivityVO} from './model/PagedResourcesOfResourceOfLogonActivityVO';
import {PagedResourcesOfResourceOfUserRolesVO} from './model/PagedResourcesOfResourceOfUserRolesVO';
import {PagedResourcesOfResourceOfUserVO} from './model/PagedResourcesOfResourceOfUserVO';
import {ResourceOfInactiveUserVO} from './model/ResourceOfInactiveUserVO';
import {ResourceOfUserVO} from './model/ResourceOfUserVO';
import {RoleUserVO} from './model/RoleUserVO';

@Injectable({
  providedIn: 'root'
})
export class ConfiguserApi {
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
   * Add User
   * To add a user to the system configuration
   * @param user To add a user
   * @param requestCorrelationId Initial Request GUID
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public addUser(user: ResourceOfUserVO, requestCorrelationId?: string, observe?: 'body', reportProgress?: boolean): Observable<ResourceOfUserVO>;
  public addUser(user: ResourceOfUserVO, requestCorrelationId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResourceOfUserVO>>;
  public addUser(user: ResourceOfUserVO, requestCorrelationId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResourceOfUserVO>>;
  public addUser(user: ResourceOfUserVO, requestCorrelationId?: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (user === null || user === undefined) {
      throw new Error('Required parameter user was null or undefined when calling addUser.');
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
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    // authentication (OAuth2) required
    // oauth required
    if (this.configuration.accessToken) {
      const accessToken = typeof this.configuration.accessToken === 'function'
        ? this.configuration.accessToken()
        : this.configuration.accessToken;
      headers = headers.set('Authorization', 'Bearer ' + accessToken);
    }

    return this.httpClient.post<ResourceOfUserVO>(`${this.basePath}/api/config/user`,
      user,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Assign User Role
   * To assign a user to a role
   * @param userName User Name
   * @param user To add a user
   * @param requestCorrelationId Initial Request GUID
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public assignUserRole(userName: string, user: RoleUserVO, requestCorrelationId?: string, observe?: 'body', reportProgress?: boolean): Observable<RoleUserVO>;
  public assignUserRole(userName: string, user: RoleUserVO, requestCorrelationId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<RoleUserVO>>;
  public assignUserRole(userName: string, user: RoleUserVO, requestCorrelationId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<RoleUserVO>>;
  public assignUserRole(userName: string, user: RoleUserVO, requestCorrelationId?: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (userName === null || userName === undefined) {
      throw new Error('Required parameter userName was null or undefined when calling assignUserRole.');
    }
    if (user === null || user === undefined) {
      throw new Error('Required parameter user was null or undefined when calling assignUserRole.');
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
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    // authentication (OAuth2) required
    // oauth required
    if (this.configuration.accessToken) {
      const accessToken = typeof this.configuration.accessToken === 'function'
        ? this.configuration.accessToken()
        : this.configuration.accessToken;
      headers = headers.set('Authorization', 'Bearer ' + accessToken);
    }

    return this.httpClient.post<RoleUserVO>(`${this.basePath}/api/config/user/${encodeURIComponent(String(userName))}/roles`,
      user,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Delete User Role
   * To remove a user from a role
   * @param userName User Name
   * @param roleName User Name
   * @param requestCorrelationId Initial Request GUID
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deleteUserRole(userName: string, roleName: string, requestCorrelationId?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public deleteUserRole(userName: string, roleName: string, requestCorrelationId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public deleteUserRole(userName: string, roleName: string, requestCorrelationId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public deleteUserRole(userName: string, roleName: string, requestCorrelationId?: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (userName === null || userName === undefined) {
      throw new Error('Required parameter userName was null or undefined when calling deleteUserRole.');
    }
    if (roleName === null || roleName === undefined) {
      throw new Error('Required parameter roleName was null or undefined when calling deleteUserRole.');
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

    return this.httpClient.delete<any>(`${this.basePath}/api/config/user/${encodeURIComponent(String(userName))}/roles/${encodeURIComponent(String(roleName))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Find User Logon Activity
   * To search the logon activity history for a given user
   * @param userName User Name
   * @param requestCorrelationId Initial Request GUID
   * @param size List Size
   * @param page Page Number
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public findLogonActivity(userName: string, requestCorrelationId?: string, size?: number, page?: number, observe?: 'body', reportProgress?: boolean): Observable<PagedResourcesOfResourceOfLogonActivityVO>;
  public findLogonActivity(userName: string, requestCorrelationId?: string, size?: number, page?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PagedResourcesOfResourceOfLogonActivityVO>>;
  public findLogonActivity(userName: string, requestCorrelationId?: string, size?: number, page?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PagedResourcesOfResourceOfLogonActivityVO>>;
  public findLogonActivity(userName: string, requestCorrelationId?: string, size?: number, page?: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (userName === null || userName === undefined) {
      throw new Error('Required parameter userName was null or undefined when calling findLogonActivity.');
    }

    let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
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

    return this.httpClient.get<PagedResourcesOfResourceOfLogonActivityVO>(`${this.basePath}/api/config/user/${encodeURIComponent(String(userName))}/logon_activity`,
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
   * Find User
   * To search for users by criteria
   * @param requestCorrelationId Initial Request GUID
   * @param firstName User First Name
   * @param lastName User Last Name
   * @param teamCode Team Code
   * @param userName User MSID
   * @param size List Size
   * @param page Page Number
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public findUser(requestCorrelationId?: string, firstName?: string, lastName?: string, teamCode?: string, userName?: string, size?: number, page?: number, observe?: 'body', reportProgress?: boolean): Observable<PagedResourcesOfResourceOfUserVO>;
  public findUser(requestCorrelationId?: string, firstName?: string, lastName?: string, teamCode?: string, userName?: string, size?: number, page?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PagedResourcesOfResourceOfUserVO>>;
  public findUser(requestCorrelationId?: string, firstName?: string, lastName?: string, teamCode?: string, userName?: string, size?: number, page?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PagedResourcesOfResourceOfUserVO>>;
  public findUser(requestCorrelationId?: string, firstName?: string, lastName?: string, teamCode?: string, userName?: string, size?: number, page?: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    if (firstName !== undefined) {
      queryParameters = queryParameters.set('first_name', <any>firstName);
    }
    if (lastName !== undefined) {
      queryParameters = queryParameters.set('last_name', <any>lastName);
    }
    if (teamCode !== undefined) {
      queryParameters = queryParameters.set('team_code', <any>teamCode);
    }
    if (userName !== undefined) {
      queryParameters = queryParameters.set('user_name', <any>userName);
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

    return this.httpClient.get<PagedResourcesOfResourceOfUserVO>(`${this.basePath}/api/config/user`,
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
   * Get User
   * To return a requested user&#39;s profile
   * @param userName User Name
   * @param requestCorrelationId Initial Request GUID
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getUser(userName: string, requestCorrelationId?: string, observe?: 'body', reportProgress?: boolean): Observable<ResourceOfUserVO>;
  public getUser(userName: string, requestCorrelationId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResourceOfUserVO>>;
  public getUser(userName: string, requestCorrelationId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResourceOfUserVO>>;
  public getUser(userName: string, requestCorrelationId?: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (userName === null || userName === undefined) {
      throw new Error('Required parameter userName was null or undefined when calling getUser.');
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

    return this.httpClient.get<ResourceOfUserVO>(`${this.basePath}/api/config/user/${encodeURIComponent(String(userName))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * List All User Roles
   * To list all active users with their roles so that the Secure Sync file can be provided. System accounts are exluded.
   * @param requestCorrelationId Initial Request GUID
   * @param size List Size
   * @param page Page Number
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public listAllUserRoles(requestCorrelationId?: string, size?: number, page?: number, observe?: 'body', reportProgress?: boolean): Observable<PagedResourcesOfResourceOfUserRolesVO>;
  public listAllUserRoles(requestCorrelationId?: string, size?: number, page?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PagedResourcesOfResourceOfUserRolesVO>>;
  public listAllUserRoles(requestCorrelationId?: string, size?: number, page?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PagedResourcesOfResourceOfUserRolesVO>>;
  public listAllUserRoles(requestCorrelationId?: string, size?: number, page?: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
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

    return this.httpClient.get<PagedResourcesOfResourceOfUserRolesVO>(`${this.basePath}/api/config/user/roles`,
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
   * List User Inactivity
   * To list active users whose latest login is less than the provided date so that the Secure Inactivity file can be provided. System accounts are exluded.
   * @param requestCorrelationId Initial Request GUID
   * @param cutoffDate Highest Last Login Date
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public listUserInactivity(requestCorrelationId?: string, cutoffDate?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<ResourceOfInactiveUserVO>>;
  public listUserInactivity(requestCorrelationId?: string, cutoffDate?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ResourceOfInactiveUserVO>>>;
  public listUserInactivity(requestCorrelationId?: string, cutoffDate?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ResourceOfInactiveUserVO>>>;
  public listUserInactivity(requestCorrelationId?: string, cutoffDate?: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    if (cutoffDate !== undefined) {
      queryParameters = queryParameters.set('cutoff_date', <any>cutoffDate);
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

    return this.httpClient.get<Array<ResourceOfInactiveUserVO>>(`${this.basePath}/api/config/user/inactivity`,
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
   * List User Roles
   * To return a requested user&#39;s profile
   * @param userName User Name
   * @param requestCorrelationId Initial Request GUID
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public listUserRoles(userName: string, requestCorrelationId?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<RoleUserVO>>;
  public listUserRoles(userName: string, requestCorrelationId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<RoleUserVO>>>;
  public listUserRoles(userName: string, requestCorrelationId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<RoleUserVO>>>;
  public listUserRoles(userName: string, requestCorrelationId?: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (userName === null || userName === undefined) {
      throw new Error('Required parameter userName was null or undefined when calling listUserRoles.');
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

    return this.httpClient.get<Array<RoleUserVO>>(`${this.basePath}/api/config/user/${encodeURIComponent(String(userName))}/roles`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Update User
   * To modify an existing user record in the system configuration
   * @param userName User Name
   * @param user To update a user
   * @param requestCorrelationId Initial Request GUID
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public updateUser(userName: string, user: ResourceOfUserVO, requestCorrelationId?: string, observe?: 'body', reportProgress?: boolean): Observable<ResourceOfUserVO>;
  public updateUser(userName: string, user: ResourceOfUserVO, requestCorrelationId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResourceOfUserVO>>;
  public updateUser(userName: string, user: ResourceOfUserVO, requestCorrelationId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResourceOfUserVO>>;
  public updateUser(userName: string, user: ResourceOfUserVO, requestCorrelationId?: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (userName === null || userName === undefined) {
      throw new Error('Required parameter userName was null or undefined when calling updateUser.');
    }
    if (user === null || user === undefined) {
      throw new Error('Required parameter user was null or undefined when calling updateUser.');
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
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    // authentication (OAuth2) required
    // oauth required
    if (this.configuration.accessToken) {
      const accessToken = typeof this.configuration.accessToken === 'function'
        ? this.configuration.accessToken()
        : this.configuration.accessToken;
      headers = headers.set('Authorization', 'Bearer ' + accessToken);
    }

    return this.httpClient.put<ResourceOfUserVO>(`${this.basePath}/api/config/user/${encodeURIComponent(String(userName))}`,
      user,
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
