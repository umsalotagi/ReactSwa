import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';

import styles from './style.less';

import {KeycloakService} from '@/utils/keycloak.service';
import { environment } from '../../../environments/environment';

export function initializer(keycloak) {
    return () => {
        return new Promise(async (resolve, reject) => {
            try {
                await keycloak.init({
                    config: environment.keycloak,
                    initOptions: {
                        onLoad: 'login-required',
                        checkLoginIframe: false
                    },
                    enableBearerInterceptor: true,
                    bearerExcludedUrls: []
                });
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    };
}


@connect(({ classroom }) => classroom)
class Page extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'classroom/fetch',
    });
  }

  buttonClicked = () => {
    console.log("cliked here ..");
    // KeycloakService.auth.loggedIn
    KeycloakService.init()
    .then(() => console.log("good"))
    .catch(e => console.log("rroorr"));
    //initializer(key);
    console.log("toickem  ");
    console.log(KeycloakService.auth.loggedIn)
    console.log(KeycloakService.getToken());
  }

  buttonClicked2 = () => {
    console.log("cliked here 2..");
    console.log("toickem  ");
    console.log(KeycloakService.auth.loggedIn)
    console.log(KeycloakService.getToken());
  }

  render() {
    const { text } = this.props;
    return (
      <div className={styles.container}>
        <Button onClick={this.buttonClicked}>{text}</Button>
        <Button onClick={this.buttonClicked2}>Two</Button>
      </div>
    );
  }
}

export default Page;
