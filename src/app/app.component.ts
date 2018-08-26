import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { AuthService } from 'app/services/auth.service';
import { GraphService } from 'app/services/graph.service';
import { User } from '../../node_modules/msal/lib-commonjs/User';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
    public user: User = null;
    public info: any = null;
    public token: string = null;
    public apiCallFailed: boolean;
    public loginFailed: boolean;
    public photo: any;

    constructor(private authService: AuthService,
                private graphService: GraphService,
                private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        console.log('Started ngOnInit');
        this.user = this.authService.getUser();
        if (this.user === null) { return; }

        // If we have a user then we can grab the token for that user
        this.getToken();
    }

    private getToken(): void {
      this.authService.getToken()
          .then(token => {
              this.token = token;
          }).catch(err => {
              console.log(`Error during ngOnInit: ${err}`);
          });
    }

    public getPhoto(): void {
        this.apiCallFailed = false;
        this.graphService.getPhoto(this.token)
            .subscribe(photo => {
                const url = window.URL;
                // Create an objectUrl for the blob
                const blobUrl = url.createObjectURL(photo);
                // Tell Angular that it should trust this Url
                this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
            }, error => {
                console.error(error);
                this.apiCallFailed = true;
            });
    }

    public login(): void {
        this.loginFailed = false;
        this.authService.login()
            .then(user => {
                if (user) {
                    this.user = user;
                    this.getToken();
                } else {
                    this.loginFailed = true;
                }
            }, () => {
                this.loginFailed = true;
            });
    }

    public callMeApi(): void {
        this.apiCallFailed = false;
        this.graphService.getUserInfo(this.token)
            .subscribe(data => {
                this.info = data;
            }, error => {
                console.error(error);
                this.apiCallFailed = true;
            });
    }

    public callDrivesApi(): void {
        this.apiCallFailed = false;

        this.graphService.getDrive(this.token)
            .subscribe(data => {
                this.info = data;
            }, error => {
                console.error(error);
                this.apiCallFailed = true;
            });
    }

    public logout(): void {
        this.authService.logout();
    }
}
