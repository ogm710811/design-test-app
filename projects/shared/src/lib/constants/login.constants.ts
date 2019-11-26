import {dashboardUrlDefault} from './dashboard.constants';

// Root LoginModule path
export const loginRoutePathRoot = 'login';

// Login 'path' variables for Routes defined in LoginRoutingModule
export const loginRoutePathUsername = 'msId';
export const loginRoutePathCredentials = 'pw';

// Usable terminal url's in LoginModule
export const loginUrlUsername = '/' + loginRoutePathRoot + '/' + loginRoutePathUsername;
export const loginUrlCredentials = '/' + loginRoutePathRoot + '/' + loginRoutePathCredentials;

// Semantic routes accessed in LoginModule code
export const loginUrlOnLoggedIn = dashboardUrlDefault;
export const loginUrlOnLoggedOut = loginUrlUsername;

// LoginModule API url's
export const loginApiToken = '/uaa/oauth/token';
export const loginApiUserDetails = '/uaa/oauth/check_token';
export const loginApiLogout = '/uaa/oauth/revoke_token';

// General error messages
export const loginErrorMessageNotAuthorized = 'Credentials Not Authorized';
export const loginErrorMessageTechnicalReasons = 'The Server Rejected Your Request for Technical Reasons. Contact an Administrator.';
export const loginErrorMessageServerError = 'Server Error. Try Again, or If Repeated Failures Occur, Contact Administrator.';
export const loginErrorMessageUnexpected = 'Unexpected Response from Server. Cannot Login.';

// Token service error messages - map general to specific codes
export const loginErrorMessageToken400 = loginErrorMessageNotAuthorized;
export const loginErrorMessageToken401 = loginErrorMessageTechnicalReasons;
export const loginErrorMessageToken500 = loginErrorMessageServerError;
export const loginErrorMessageTokenOther = loginErrorMessageUnexpected;

// User Detail service error messages - map general to specific codes
export const loginErrorMessageUserDetails400 = loginErrorMessageTechnicalReasons;
export const loginErrorMessageUserDetails401 = loginErrorMessageTechnicalReasons;
export const loginErrorMessageUserDetails500 = loginErrorMessageServerError;
export const loginErrorMessageUserDetailsOther = loginErrorMessageUnexpected;
