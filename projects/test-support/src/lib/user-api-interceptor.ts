import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of as observableOf, throwError as observableThrowError} from 'rxjs';
import {loginTestData, teamTestData} from './test.constants';

@Injectable()
export class UaaApiTestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = req.url;
    if (url.includes('/uaa/oauth/token') && req.method === 'POST') {
      console.log('/uaa/oauth/token');
      return this.handleLoginUserTokenPostRequest(req);
    } else if (url.includes('/uaa/oauth/check_token') && req.method === 'POST') {
      console.log('/uaa/oauth/check_token');
      return this.handleLoginUserDetailsGetRequest(req);
    } else if (url.includes('/api/config/user') && req.method === 'GET') {
      return this.handleConfigUser(req);
    }
    return next.handle(req);
  }

  handleConfigUser(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    const pathElems: string[] = request.url.split('/');
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    if (pathElems) {
      const lastPathEl = pathElems[pathElems.length - 1];
      let matchingLogin = {};
      if (lastPathEl === 'user') {
        let mustMatch = ['first_name', 'last_name', 'team_code', 'user_name'];
        mustMatch = mustMatch.filter(p => request.params.has(p));
        const matchingLogins = loginTestData.filter(x => {
          return mustMatch.map((param) => {
            return param === 'first_name' ? x['firstName'] === request.params.get(param) :
              param === 'last_name' ? x['lastName'] === request.params.get(param) :
                param === 'team_code' ? x['teamCode'] === request.params.get(param) :
                  param === 'user_name' ? x['username'] === request.params.get(param) : false;
          }).reduce((prev, current) => {
            return prev && current;
          }, true);
        }).map(ml => {
          const matchingTeams = teamTestData.filter(d => d['code'] === ml['teamCode']);
          const matchingTeam = matchingTeams && matchingTeams.length ? matchingTeams[0] : undefined;
          return {
            _links: {
              'me': 'http://me.me'
            },
            active: true,
            firstName: ml['firstName'],
            lastName: ml['lastName'],
            id: 0,
            team: matchingTeam,
            userName: ml['username']
          };
        });
        const rOpts = {
          status: 200,
          headers: headers,
          statusText: 'OK',
          body: {
            _embedded: {
              items: matchingLogins
            },
            _links: {'me': 'http://me.me'},
          },
          url: request.url
        };
        return observableOf(new HttpResponse(rOpts));
      } else {
        const username: string = lastPathEl;
        if (username) {
          const matchingLogins = loginTestData.filter(d => d['username'] === username);
          if (matchingLogins) {
            matchingLogin = matchingLogins[0];
            if (matchingLogin) {
              const matchingTeams: any[] = teamTestData.filter(d => d['code'] === matchingLogin['teamCode']);
              if (matchingTeams) {
                const matchingTeam: any = matchingTeams[0];
                if (matchingTeam) {
                  const rOpts = {
                    status: 200,
                    headers: headers,
                    statusText: 'OK',
                    body: {
                      _links: {'me': 'http://me.me'},
                      active: true,
                      firstName: matchingLogin['firstName'],
                      lastName: matchingLogin['lastName'],
                      id: 0,
                      team: matchingTeam,
                      userName: matchingLogin['username']
                    },
                    url: request.url
                  };
                  return observableOf(new HttpResponse(rOpts));
                }
              }
            }
          }
        }
      }
    }

    const errOpts = {
      status: 404,
      statusText: 'Not Found',
      body: {
        error: 'not_found',
        error_description: 'Not Found'
      },
      url: request.url
    };
    return observableThrowError(new HttpErrorResponse(errOpts));
  }

  handleLoginUserTokenPostRequest(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    const input = new URLSearchParams(request.body);

    const matchingUsers = loginTestData.filter(u => {
      return u['username'] === input.get('username') && u['password'] === input.get('password');
    });
    if (matchingUsers.length === 1) {

      console.log('found ' + input.get('username'));
      let headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json');

      if (matchingUsers[0]['authorities'].length === 0) {
        console.log('no roles ' + input.get('username'));
        const errOpts = {
          status: 400,
          statusText: 'Bad Request',
          body: {
            error: 'invalid_grant',
            error_description: 'Bad credentials'
          },
          url: request.url
        };
        return observableThrowError(new HttpErrorResponse(errOpts));

      }
      const rOpts = {
        status: 200,
        headers: headers,
        statusText: 'OK',
        body: {
          access_token: matchingUsers[0]['access_token'],
          token_type: 'bearer',
          refresh_token: 'c4279487-0cb4-43a0-a5af-9c531c8f9052',
          expires_in: 38346,
          scope: 'read write'
        },
        url: request.url
      };
      return observableOf(new HttpResponse(rOpts));
    } else {
      console.log('not found ' + input.get('username'));
      const rOpts = {
        status: 400,
        statusText: 'Bad Request',
        body: {
          error: 'invalid_grant',
          error_description: 'Bad credentials'
        },
        url: request.url
      };
      return observableThrowError(new HttpErrorResponse(rOpts));
    }
  }

  handleLoginUserDetailsGetRequest(request: HttpRequest<any>): Observable<HttpEvent<any>> {

    const input = new URLSearchParams(request.body);

    const matchingUsers = loginTestData.filter(u => {
      return u['access_token'] === input.get('token');
    });
    if (matchingUsers.length === 1) {

      let headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json');

      const rOpts = {
        status: 200,
        headers: headers,
        statusText: 'OK',
        body: {
          user_name: matchingUsers[0]['username'],
          authorities: matchingUsers[0]['authorities'],
          tokenValue: matchingUsers[0]['access_token'],
          authenticated: 'true'
        },
        url: request.url
      };
      return observableOf(new HttpResponse(rOpts));
    } else {
      const rOpts = {
        status: 400,
        statusText: 'Bad Request',
        body: {
          error: 'invalid_grant',
          error_description: 'Bad credentials'
        },
        url: request.url
      };
      return observableThrowError(new HttpErrorResponse(rOpts));
    }
  }
}
