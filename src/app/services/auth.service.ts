import { Injectable } from '@angular/core';
import { UserAgentApplication } from 'msal';
import { User } from '../../../node_modules/msal/lib-commonjs/User';

@Injectable()
export class AuthService {
    private applicationConfig: any = {
        clientID: '50981e61-5e89-43c6-9829-9e6b1aa2fdb5',
        graphScopes: ['user.read', 'files.read']
    };
    private app: UserAgentApplication;

    constructor() {
        this.app = new UserAgentApplication(this.applicationConfig.clientID, '', () => {
            // callback for login redirect
        });
    }
    public login(): Promise<User> {
        return this.app.loginPopup(this.applicationConfig.graphScopes)
            .then(idToken => {
              return this.getUser();
            }, () => {
                return null;
            });
    }

    public getUser(): User {
        const user = this.app.getUser();
        if (user) {
            return user;
        } else {
            return null;
        }
    }

    public silentLogin(): void {
        return this.app.loginRedirect(this.applicationConfig.graphScopes);
    }

    public logout(): void {
        this.app.logout();
    }

    public getToken(): Promise<string> {
        return this.app.acquireTokenSilent(this.applicationConfig.graphScopes)
            .then(accessToken => {
                return accessToken;
            }, error => {
                return this.app.acquireTokenPopup(this.applicationConfig.graphScopes)
                    .then(accessToken => {
                        return accessToken;
                    }, err => {
                        console.error(err);
                        throw err;
                    });
            });
    }
}
