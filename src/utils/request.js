/**
 * request Network Request Tool
 * More detailed api documentation: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import {KeycloakService} from './keycloak.service';
const codeMessage = {
  200: 'Success',
  201: '201',
  202: '202',
  204: '204',
  400: '400',
  401: '401',
  403: '403',
  404: '404',
  406: '406',
  410: '410',
  422: '422',
  500: '500',
  502: '502',
  503: '503',
  504: '504',
};
/**
 * Exception handler
 */

const errorHandler = error => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `Request error ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'Your network is abnormal and cannot connect to the server',
      message: 'network anomaly',
    });
  }

  return response;
};
/**
 * Configure default parameters for request
 */

const request = extend({
  errorHandler,
  // Default error handling
  credentials: 'include', // Whether to bring cookies by default
 
});
export default request;
